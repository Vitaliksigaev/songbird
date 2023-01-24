import './sass/main.scss';
import birdsData from './js/birds';

const stage = 0;
const body = document.querySelector('body');
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
body.appendChild(wrapper);

const saveResults = (value) => {
  const date = new Date();
  localStorage.setItem(date, value);
}

const clearMain = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

// const createPageResults = () => {
//   const mainWrapper = document.querySelector('.wrapper__main');
//   mainWrapper.innerHTML = localStorage.getItem('results');
// }

const navBtnMain = document.createElement('button');
const navBtnPlay = document.createElement('button');
const navBtnResults = document.createElement('button');

const createHeader = function () {
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

  navBtnMain.innerHTML = 'Главная';
  navBtnPlay.innerHTML = 'Играть';
  navBtnResults.innerHTML = 'Результаты';

  headerNav.appendChild(navBtnMain);
  headerNav.appendChild(navBtnPlay);
  headerNav.appendChild(navBtnResults);


  // const navUl = document.createElement('ul');
  // headerNav.appendChild(navUl);
  // headerNav.innerHTML = '<ul><li><a id="link__main" href="/src/main.html">Главная</a></li><li><a id="link__play" href="/src/index.html">Играть</a></li><li><a id="link__results" href="/src/results.html">Результаты</a></li></ul>';
  
  headerNavBox.appendChild(headerNav);
  
  const scoreBox = document.createElement('div');
  scoreBox.className = 'score__box';
  headerTop.appendChild(scoreBox);
  scoreBox.innerHTML = '<h2>Score : </h2><h2 class="score"> 0 </h2>';
  
  const headerBottom = document.createElement('div');
  headerBottom.className = 'header__bottom';
  const topicsUl = document.createElement('ul');
  topicsUl.className = 'topics';
  topicsUl.innerHTML =
    '<li class="topic__li active-topics">Врановые птицы</li><li class="topic__li">Экзотические птицы</li><li class="topic__li">Попугаи</li><li class="topic__li">Хищные птицы</li><li class="topic__li">Фермерские птицы</li><li class="topic__li">Певчие птицы</li>';
  headerBottom.appendChild(topicsUl);
  header.appendChild(headerBottom);
}
createHeader();

const main = document.createElement('main');
main.className = 'wrapper__main';
wrapper.appendChild(main);

const createMainResults = () => {
  const headerBottom = document.querySelector('.header__bottom');
  headerBottom.style.display = 'none';

  clearMain();

  // main.innerHTML = localStorage.getItem('results');

  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    const localStorageValue = document.createElement('p');
    localStorageValue.className = 'localStorage__value';
    localStorageValue.innerHTML = `${key}: ${localStorage.getItem(key)}`;
    main.appendChild(localStorageValue);
  }
  main.style.alignItems = 'normal';
  main.style.flexDirection = 'column';
//flex-wrap: wrap

};

const createMainPlay = () => {
  const headerNav = document.querySelector('.nav__header');
  const headerBottom = document.querySelector('.header__bottom');
  headerNav.style.display = 'flex';
  headerBottom.style.display = 'block';
  const score = document.querySelector('.score');
  score.innerHTML = 0;

  clearMain();
  // main.className = 'wrapper__main';
  main.style.alignItems = 'center';
  main.style.flexDirection = 'column';
  
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
  
  const firstPlayer = createAudio(stage, indexStartGame);
  
  birdQuastion.appendChild(firstPlayer);
  // const startRandomGame = (stage) => {
  //   let indexRigthAnswer = randomInteger(0, 5);
  //   audio.setAttribute('src', birdsData[stage][indexRigthAnswer].audio);
  
  
  // };
  
  main.appendChild(question);
  main.style.alignItems = 'normal';
  main.style.flexDirection = 'row';
  
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
  
  // wrapper.appendChild(main);
  changeBtnAnswers(stage);
  addEventBtn(stage, indexStartGame);
  disabledButton();
};

const createMainStart = () => {
  // const main = document.createElement('main');
  // main.className = 'wrapper__main';

  main.innerHTML = '';
  navBtnMain.addEventListener('click', createMainStart);
  navBtnPlay.addEventListener('click', createMainPlay);
  navBtnResults.addEventListener('click', createMainResults);
  // main.innerHTML = '<button class="btn__main btn-star">Играть</button>';
  //<button class="btn__main btn-game">Главная</button><button class="btn__main btn-results">Результаты</button>
  const headerNav = document.querySelector('.nav__header');
  headerNav.style.display = 'none';

  const headerBottom = document.querySelector('.header__bottom');
  headerBottom.style.display = 'none';

  const btn1 = document.createElement('button');
  btn1.className = 'btn__main btn-start';
  btn1.innerHTML = 'Lets PLAY';
  btn1.addEventListener('click', createMainPlay);
  main.appendChild(btn1);
  // const btnMain = document.querySelector('btn-game');
  // btnMain.addEventListener('click', createMainStart);
  
  // const btnPlay = document.querySelector('.btn-star');
  // btnPlay.addEventListener('click', createMainPlay);  
  // const btnResults = document.querySelector('btn-results');
  // btnResults.addEventListener('click', createMainResults);
};
createMainStart();


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
  return audio
};

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

let maxScore = 5;
const addEventBtn = (stage, index) => {
  const answers = document.querySelectorAll('.answer__option');
  for (let i = 0; i < answers.length; i += 1) {
    const ararat = () => {
      checkAnswer(stage, answers[i].innerHTML, answers[i], answers, index);
    };
    answers[i].addEventListener('click', ararat, { once: true });
  }
};

const changeMainImage = (stage, index) => {
  const image = document.querySelector('.bird__image');
  image.setAttribute('src', birdsData[stage][index].image);
};
const changeMainTitle = (stage, index) => {
  const answerTitle = document.querySelector('.bird__title');
  answerTitle.innerHTML = birdsData[stage][index].name;
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
  maxScore = 5;
  const btn = document.querySelector('.button');
  btn.disabled = false;
  btn.addEventListener('click', () => {
    let index = randomInteger(0, 5);
    maxScore = 5;
    addClassActiveTopics(stage);
    createBtnAnswers(stage);
    addEventBtn(stage, index);
    changeAudio(stage, index);
    defaultAnswer();
    defaultImage();
    btn.disabled = true;
    btn.addEventListener('click', event.target);
  });
};

const disabledButton = () => {
  const btn = document.querySelector('.button');
  btn.disabled = true;
};

///////////////////////==
const pushAnswerAdditionalInfo = (stage, index, answerClick, answers) => {
  const answer = document.querySelector('.answer');
  answer.innerHTML = '';
  const boxMiniTitleImage = document.createElement('div')
  boxMiniTitleImage.classList.add('box_mini_title_image');
  answer.appendChild(boxMiniTitleImage);

    // создаем заголовок клика
  const miniTitle = document.createElement('h4');
  miniTitle.className = 'mini-title';
  miniTitle.innerHTML = answerClick;
  boxMiniTitleImage.appendChild(miniTitle);

  // поиск индекса ответа из массива
  for (let i = 0; i < 6; i++) {
    // console.log(answer);
    // console.log(birdsData[stage][i].name);
    if(birdsData[stage][i].name === answerClick) {

      // создаем картинку с клика
      const imgMini = document.createElement('img');
      imgMini.className = 'bird__image-mini';
      imgMini.setAttribute('src', birdsData[stage][i].image);
      imgMini.setAttribute('alt', 'search-bird-mini');
      boxMiniTitleImage.appendChild(imgMini);

      //добавляем дополнительную информацию
      let description = document.createElement('p');
      description.classList.add('description');
      description.innerHTML = birdsData[stage][i].species + ' / ' + birdsData[stage][i].description;
      answer.appendChild(description);

      // создаем плейер клика
      const miniPlayer = createAudio(stage, i);
      miniPlayer.className = 'mini-player';
      answer.appendChild(miniPlayer);
    }
  }


};
////////////////////////////////////////////////////////////////////////
// const step = 5;
const addScore = (maxScore) => {
  const score = document.querySelector('.score');
  score.innerHTML = Number(score.innerHTML) + Number(maxScore);

};

// const removeScore = () => {
//   const score = document.querySelector('.score');
//   if (Number(score.innerHTML) > 0) {
//     score.innerHTML = Number(score.innerHTML) - 1;
//   }
// };

////////////////////////////////////////////////////////////////////////

const addStyle = (btn, nameStyle, answerbtn, spanStyle) => {
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

  pushAnswerAdditionalInfo(stage, index, answer, answers);
    if (answer === birdsData[stage][index].name) {
      soundGoodAnswer();
      addStyle(answer, 'answer_good', answerbtn, 'span-good');
      addScore(maxScore);
      changeMainImage(stage, index);
      changeMainTitle(stage, index);
      // let maxScore = 5;
      if (stage < 5) {
        stage += 1;
        activateButton(stage);
      } else {
        

          setTimeout(() => {
              alert('You WIN!');
              const score = document.querySelector('.score');
              alert(score.innerHTML);
              saveResults (score.innerHTML);
              createMainResults();
          }, 3000);
      }
    } else {
      maxScore = maxScore - 1;
      console.log(maxScore);
      let num = 0;
      for (let i = 0; i < 6; i++) {
        if(answers[i].classList.contains('answer_good')){
          num = num + 1;
        }      
      }
      if(num === 0) {
          soundBadAnswer();
          addStyle(answer, 'answer_bad', answerbtn, 'span-bad');
          // removeScore();
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








// createMainPlay();

const createFooter = () => {
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
};
createFooter();

