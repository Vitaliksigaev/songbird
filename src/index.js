import './sass/main.scss';
import birdsData from './js/birds';

const stage = 0;

const body = document.querySelector('body');
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
body.appendChild(wrapper);
const header = document.createElement('header');
header.className = 'header';
wrapper.appendChild(header);
const headerTop = document.createElement('div');
headerTop.className = 'header__top';
header.appendChild(headerTop);

const logo = document.createElement('img');
logo.className = 'logo';
logo.src = '../src/assets/logo-bird.jpg';
logo.setAttribute('alt', 'bird-logo');
headerTop.appendChild(logo);

const headerNavBox = document.createElement('div');
headerNavBox.className = 'nav__box';
headerTop.appendChild(headerNavBox);

const title = document.createElement('h1');
title.className = 'title';
title.innerHTML = 'SongBird';
headerNavBox.appendChild(title);

const headerNav = document.createElement('nav');
headerNav.className = 'nav__header';
headerNav.innerHTML = '<ul><li><a href="#">Главная</a></li><li><a href="#">Играть</a></li><li><a href="#">Результаты</a></li></ul>';
headerNavBox.appendChild(headerNav);


const scoreBox = document.createElement('div');
scoreBox.className = 'score__box';
headerTop.appendChild(scoreBox);
scoreBox.innerHTML = '<h2>Score: </h2><h2 class="score"> 0 </h2>';

const headerBottom = document.createElement('div');
headerBottom.className = 'header__bottom';
const topicsUl = document.createElement('ul');
topicsUl.className = 'topics';
topicsUl.innerHTML =
  '<li class="topic__li active-topics">Врановые птицы</li><li class="topic__li">Экзотические птицы</li><li class="topic__li">Попугаи</li><li class="topic__li">Хищные птицы</li><li class="topic__li">Фермерские птицы</li><li class="topic__li">Певчие птицы</li>';
headerBottom.appendChild(topicsUl);
header.appendChild(headerBottom);

const main = document.createElement('main');
main.className = 'wrapper__main';

const question = document.createElement('div');
question.className = 'question';

const imgQuastion = document.createElement('img');
imgQuastion.className = 'bird__image';
imgQuastion.src = '../src/assets/search-bird.jpg';
imgQuastion.setAttribute('alt', 'search-bird');
question.appendChild(imgQuastion);

const birdQuastion = document.createElement('div');
birdQuastion.className = 'bird__quastion';
birdQuastion.innerHTML = '<h3 class="bird__title">++++++++++++++++</h3>';
question.appendChild(birdQuastion);

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  console.log(Math.floor(rand));
  return Math.floor(rand);
}

const indexStartGame = randomInteger(0,5);

const createAudio = (stage, index) => {
  const audio = document.createElement('audio');
  audio.setAttribute('src', birdsData[stage][index].audio);
  audio.setAttribute('id', 'audio');
  audio.setAttribute('preload', 'none');
  audio.setAttribute('controls', 'controls');
  audio.setAttribute('loop', 'loop');
  birdQuastion.appendChild(audio);
};
createAudio(stage, indexStartGame);

// const startRandomGame = (stage) => {
//   let indexRigthAnswer = randomInteger(0, 5);
//   audio.setAttribute('src', birdsData[stage][indexRigthAnswer].audio);


// };

main.appendChild(question);

const answers = document.createElement('div');
answers.className = 'answers';
for (let i = 0; i < birdsData[stage].length; i += 1) {
  const btn = document.createElement('button');
  btn.className = 'answer__option';
  btn.innerHTML = birdsData[stage][i].name;
  answers.appendChild(btn);
}
main.appendChild(answers);

const answer = document.createElement('div');
answer.className = 'answer';
answer.innerHTML = '<p>Угадай! Выбери правильный ответ и получи баллы</p>';
// const answerImage = document.createElement('img');
// const answerTitle = document.createElement('h4');
// const answerSubText = document.createElement('p');
// const answerText = document.createElement('p');
main.appendChild(answer);

const controls = document.createElement('div');
controls.className = 'controls';
controls.innerHTML = '<button class="button" disabled="">NEXT  LEVEL</button>';
main.appendChild(controls);

wrapper.appendChild(main);

const footer = document.createElement('footer');
footer.className = 'footer';
wrapper.appendChild(footer);

const footerLogo = document.createElement('div');
footerLogo.innerHTML = '<a href="https://rs.school/js/"><img src="../src/assets/rs_school_js.svg" alt="альтернативный текст"></a>';
footer.appendChild(footerLogo);

const footerText= document.createElement('a');
footerText.setAttribute ('href', 'https://github.com/Vitaliksigaev');
footerText.innerHTML = '(c) GitHub > Vitalik Sigaev, 2023';
footer.appendChild(footerText);

const changeAudio = (stage, index) => {
  const audio = document.querySelector('#audio');
  audio.setAttribute('src', birdsData[stage][index].audio);
};

const changeBtnAnswers = (stage) => {
  const answers = document.querySelectorAll('.answer__option');
  for (let i = 0; i < answers.length; i += 1) {
    answers[i].innerHTML = birdsData[stage][i].name;
  }
};
changeBtnAnswers(stage);

const addEventBtn = (stage, index) => {
  const answers = document.querySelectorAll('.answer__option');
  for (let i = 0; i < answers.length; i += 1) {
    const ararat = () => {
      checkAnswer(stage, answers[i].innerHTML, answers[i], answers, index);
    };
    answers[i].addEventListener('click', ararat, { once: true });
  }
};
addEventBtn(stage, indexStartGame);

// const removeLisenBtn = () => {
//   const answers = document.querySelectorAll('.answer__option');
//   for (let i = 0; i < answers.length; i += 1) {
//     const ararat = () => {
//       checkAnswer(stage, answers[i].innerHTML, answers );
//     };
//     answers[i].removeEventListener('click', ararat);
//   }
// };

const changeImage = (stage) => {
  const image = document.querySelector('.bird__image');
  image.setAttribute('src', birdsData[stage][1].image);
};

const defaultImage = () => {
  const image = document.querySelector('.bird__image');
  image.setAttribute('src', '../src/assets/search-bird.jpg');
};

const defaultAnswer = () => {
  const answer = document.querySelector('.answer');
  answer.innerHTML = '<p>Угадай кто</p>>';
  const answerTitle = document.querySelector('.bird__title');
  answerTitle.innerHTML = '++++++';
};

const addClassActiveTopics = (stage) => {
    const topic = document.querySelector('.active-topics');
    topic.classList.remove('active-topics');
    const topics = document.querySelectorAll('.topic__li');
    topics[stage].classList.add('active-topics');
}

const activateButton = (stage) => {
  const btn = document.querySelector('.button');
  btn.disabled = false;
  btn.addEventListener('click', () => {
    let index = randomInteger(0, 5);

    addClassActiveTopics(stage);
    createBtnAnswers(stage);
    addEventBtn(stage, index);
    changeAudio(stage, index);
    defaultAnswer();
    defaultImage();
    btn.disabled = true;
    // btn.addEventListener('click', event.target);
  });
};

const disabledButton = () => {
  const btn = document.querySelector('.button');
  btn.disabled = true;
};
disabledButton();

const pushAnswerAdditionalInfo = (stage) => {
  const answerTitle = document.querySelector('.bird__title');
  answerTitle.innerHTML = birdsData[stage][0].name;
  const answer = document.querySelector('.answer');
  const questionInfo = document.querySelector('.question');
  let clone = questionInfo.cloneNode(true);

  answer.innerHTML = '';
  answer.appendChild(clone);
  let description = document.createElement('p');
  description.innerHTML = birdsData[stage][0].species + ' / ' + birdsData[stage][0].description;
  answer.appendChild(description);
};
const step = 10;
const addScore = () => {
  const score = document.querySelector('.score');
  score.innerHTML = Number(score.innerHTML) + step;
};

const removeScore = () => {
  const score = document.querySelector('.score');
  if (Number(score.innerHTML) > 0) {
    score.innerHTML = Number(score.innerHTML) - 1;
  }
};

const addStyle = (btn, nameStyle, answerbtn, spanStyle) => {
  // console.log(btn);
  // console.log(nameStyle);
  // console.log(answerbtn);
  answerbtn.classList.add(nameStyle);
  let span = document.createElement('span');
  span.classList.add(spanStyle);
  span.innerHTML = ' @';
  answerbtn.appendChild(span);
};

const soundGoodAnswer = () => {
  const audio = new Audio(); 
  audio.src = './assets/song/good-answer.mp3';
  audio.autoplay = true;
};
const soundBadAnswer = () => {
  const audio = new Audio(); 
  audio.src = './assets/song/wrong-answer.mp3';
  audio.autoplay = true;
};

const pushInfoBird = (stage, answer) => {
  let descriptionBird = document.createElement('p');
  for(let i = 0; i< 6; i++) {
    if(birdsData[stage][i].name === answer) {
      descriptionBird.innerHTML = birdsData[stage][i].species + ' / ' + birdsData[stage][i].description;
    }
  }
  const answerPage = document.querySelector('.answer');
  answerPage.innerHTML = '';
  answerPage.appendChild(descriptionBird);
};

const checkAnswer = (stage, answer, answerbtn, answers, index) => {
  console.log(stage);
  console.log(answer);
  console.log(answerbtn);
  console.log(answers);
  console.log(index);

  pushInfoBird(stage, answer);
    if (answer === birdsData[stage][index].name) {
      soundGoodAnswer();
      addStyle(answer, 'answer_good', answerbtn, 'span-good');
      addScore();
      changeImage(stage);
      pushAnswerAdditionalInfo(stage);
      if (stage < 5) {
        stage += 1;
        activateButton(stage);
      } else {
          setTimeout(() => {
              alert('You WIN!');
              const score = document.querySelector('.score');
              alert(score.innerHTML);
          }, 3000);
      }
    } else {
      let num = 0;
      for (let i = 0; i < 6; i++) {
        if(answers[i].classList.contains('answer_good')){
          num = num + 1;
        }      
      }
      if(num === 0) {
          soundBadAnswer();
          addStyle(answer, 'answer_bad', answerbtn, 'span-bad');
          removeScore();
      }
    }

};

const createBtnAnswers = (stage) => {
  const answers = document.querySelector('.answers');
  answers.innerHTML = '';
  for (let i = 0; i < birdsData[stage].length; i++) {
    const btn = document.createElement('button');
    btn.className = 'answer__option';
    btn.innerHTML = birdsData[stage][i].name;
    answers.appendChild(btn);
  }
};
