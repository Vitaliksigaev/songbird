import './sass/main.scss';
import birdsData from './js/birds';

let stage = 0;

let body = document.querySelector('body');
let wrapper = document.createElement('div');
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

const scoreBox = document.createElement('div');
scoreBox.className = 'score__box';
headerTop.appendChild(scoreBox);
scoreBox.innerHTML = '<p>Score:</p><p class="score">0</p>';

const headerBottom = document.createElement('div');
headerBottom.className = 'header__bottom';
const topicsUl = document.createElement('ul');
topicsUl.className = 'topics';
topicsUl.innerHTML = '<li class="active">Врановые птицы</li><li class="">Экзотические птицы</li><li class="">Попугаи</li><li class="">Хищные птицы</li><li class="">Фермерские птицы1</li><li class="">Певчие птицы</li>';
headerBottom.appendChild(topicsUl);
header.appendChild(headerBottom);

const main = document.createElement('main');
main.className = 'wrapper__main';

const question = document.createElement('div');
question.className = 'question';

const imgQuastion = document.createElement('img');
imgQuastion.className = 'bird__image';
imgQuastion.src = '../src/assets/logo-bird.jpg';
imgQuastion.setAttribute('alt', 'bird-img');
question.appendChild(imgQuastion);

const birdQuastion = document.createElement('div');
birdQuastion.className = 'bird__quastion';
birdQuastion.innerHTML = '<p class="bird__title">++++</p>';
question.appendChild(birdQuastion);


const createAudio = function (stage) {
  const audio = document.createElement('audio');
  audio.setAttribute('src', birdsData[stage][1].audio);
  audio.setAttribute('id', 'audio');
  audio.setAttribute('preload', 'auto');
  audio.setAttribute('controls', 'controls');
  audio.setAttribute('loop', 'loop');
  birdQuastion.appendChild(audio);

};
createAudio(stage);

main.appendChild(question);

const answers = document.createElement('div');
answers.className = 'answers';
for (let i = 0; i < birdsData[0].length; i++) {
  let btn = document.createElement('button');
  btn.className = 'answer__option';
  btn.innerHTML = birdsData[0][i].name;
  answers.appendChild(btn);
}
//<button type="button" class="answer__option">Ворон</button>
main.appendChild(answers);

const answer = document.createElement('div');
answer.className = 'answer';
answer.innerHTML = '<p>Угадай! Выбери правильный ответ и получи баллы</p>';
main.appendChild(answer);

const controls = document.createElement('div');
controls.className = 'controls';
controls.innerHTML = '<button class="button" disabled="">NEXT  LEVEL</button>';
main.appendChild(controls);

wrapper.appendChild(main);

const footer = document.createElement('footer');
footer.className = 'footer';
footer.innerHTML = '(c) Vitalik Sigaev, 2023';
wrapper.appendChild(footer);


// console.log(birdsData[0][0]);

// const stageGame = 0;
// console.log(answers);


const changeAudio = function (stage) {
    const audio = document.querySelector('#audio');
    audio.setAttribute('src', birdsData[stage][1].audio);
  };

  const changeBtnAnswers = function (stage) {
    const answers = document.querySelectorAll('.answer__option');
    for (let i = 0; i < answers.length; i += 1) {
      answers[i].innerHTML = birdsData[stage][i].name;
      answers[i].addEventListener('click', () => {
        checkAnswer(stage, answers[i].innerHTML);
      }, { once: true });
    }
  }
  changeBtnAnswers(stage);

  const changeImage = function (stage) {
    const image = document.querySelector('.bird__image');
    image.setAttribute('src', birdsData[stage][1].image);
  };

  const defaultImage = function() {
    const image = document.querySelector('.bird__image');
    image.setAttribute('src', '../src/assets/logo-bird.jpg');
  }

const defaultAnswer = function () {
    const answer = document.querySelector('.answer');
    answer.innerHTML = '<p>Угадай кто</p>>';
    const answerTitle = document.querySelector('.bird__title');
    answerTitle.innerHTML = '++++++';
    defaultImage();
};



const activateButton = function (stage) {

    // stage = stage + 1;
    const btn = document.querySelector('.button');
    btn.disabled = false;
    btn.addEventListener('click', () => {
        // console.log(stage);
        defaultAnswer();
        btn.disabled = true;
        changeBtnAnswers(++stage);
        changeAudio(stage);

    })
  };
  
  const disabledButton = function () {
    const btn = document.querySelector('.button');
    btn.disabled = true;
  };
  disabledButton ();




const pushAnswerAdditionalInfo = function (stage) {
  const answer = document.querySelector('.answer');
  answer.innerHTML = birdsData[stage][0].description;
  const answerTitle = document.querySelector('.bird__title');
  answerTitle.innerHTML = birdsData[stage][0].name;
};
const step = 10;
const addScore = function () {
  const score = document.querySelector('.score');
//   console.log('WIN');
//   console.log(step);   
//   console.log(score.innerHTML);
  score.innerHTML = Number(score.innerHTML) + step;
//   console.log(score.innerHTML);
};

const removeScore = function () {
  const score = document.querySelector('.score');
  if (Number(score.innerHTML) > 0) {
    score.innerHTML = Number(score.innerHTML) - 1;
  }
};

const checkAnswer = (stage, answer) => {
  if (answer === birdsData[stage][0].name) {
    const score = document.querySelector('.score');
    addScore();
    // alert(score.innerHTML);

    changeImage(stage);
    pushAnswerAdditionalInfo(stage);

    if(stage < 5) {
        activateButton(stage);
    } 
    // else {
    //     alert('You WIN!');
    //     const score = document.querySelector('.score');
    //     alert(score.innerHTML);
    // }
  } else {
    removeScore();
  }
};

// функция убирающая прослушку во всех кнопках варианта
