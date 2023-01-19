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

const title = document.createElement('h1');
title.className = 'title';
title.innerHTML = 'SongBird';
headerTop.appendChild(title);

const scoreBox = document.createElement('div');
scoreBox.className = 'score__box';
headerTop.appendChild(scoreBox);
scoreBox.innerHTML = '<h2>Score:</h2><h2 class="score">0</h2>';

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

const createAudio = (stage) => {
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
for (let i = 0; i < birdsData[0].length; i += 1) {
  const btn = document.createElement('button');
  btn.className = 'answer__option';
  btn.innerHTML = birdsData[0][i].name;
  answers.appendChild(btn);
}
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

const changeAudio = (stage) => {
  const audio = document.querySelector('#audio');
  audio.setAttribute('src', birdsData[stage][1].audio);
};

const changeBtnAnswers = (stage) => {
  const answers = document.querySelectorAll('.answer__option');
  console.log(answers);
  for (let i = 0; i < answers.length; i += 1) {
    answers[i].innerHTML = birdsData[stage][i].name;
  }
};
changeBtnAnswers(stage);

const addEventBtn = (stage) => {
  const answers = document.querySelectorAll('.answer__option');
  for (let i = 0; i < answers.length; i += 1) {
    const ararat = () => {
      checkAnswer(stage, answers[i].innerHTML);
    };
    answers[i].addEventListener('click', ararat, { once: true });
  }
};
addEventBtn(stage);

const removeLisenBtn = () => {
  const answers = document.querySelectorAll('.answer__option');
  for (let i = 0; i < answers.length; i += 1) {
    const ararat = () => {
      checkAnswer(stage, answers[i].innerHTML);
    };
    answers[i].removeEventListener('click', ararat);
  }
};

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
    addClassActiveTopics(stage);
    createBtnAnswers(stage);
    addEventBtn(stage);
    changeAudio(stage);
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
disabledButton();

const pushAnswerAdditionalInfo = (stage) => {
  const answer = document.querySelector('.answer');
  answer.innerHTML = birdsData[stage][0].description;
  const answerTitle = document.querySelector('.bird__title');
  answerTitle.innerHTML = birdsData[stage][0].name;
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

const checkAnswer = (stage, answer) => {
  if (answer === birdsData[stage][0].name) {
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
    removeScore();
  }
};

const createBtnAnswers = (stage) => {
  const answers = document.querySelector('.answers');
  answers.innerHTML = '';
  for (let i = 0; i < birdsData[0].length; i++) {
    const btn = document.createElement('button');
    btn.className = 'answer__option';
    btn.innerHTML = birdsData[stage][i].name;
    answers.appendChild(btn);
  }
};
