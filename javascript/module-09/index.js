'use strict';

const clockface = document.querySelector('.js-time');
const startBtn = document.querySelector('.js-start');
const takeLapBtn = document.querySelector('.js-take-lap');
const resetBtn = document.querySelector('.js-reset');
const laps = document.querySelector('.js-laps');

class Timer {
  constructor({ onTick, toggleBtn }) {
    this.startTime = null;
    this.pauseTime = null;
    this.deltaTime = 0;
    this.lapTime = null;
    this.timerId = null;
    this.isTimerActive = false;
    this.onTick = onTick;
    this.toggleBtn = toggleBtn;
    resetBtn.disabled = true;
    takeLapBtn.disabled = true;
  }

  start() {
    resetBtn.disabled = false;
    takeLapBtn.disabled = false;
    if (!this.isTimerActive) {
      this.startTime = Date.now() - this.deltaTime;
      this.timerId = setInterval(() => {
        this.calcTime();
      }, 100);
    } else {
      this.stop();
    }
    this.isTimerActive = !this.isTimerActive;
    this.toggleBtn(this.isTimerActive);
  }

  stop() {
    clearTimeout(this.timerId);
  }

  takeLap() {
    let clockfaceNow = clockface.innerText;
    laps.innerHTML += `<li class="lap">${clockfaceNow}</li>`;
  }

  reset() {
    if (this.isTimerActive) {
      resetBtn.disabled = false;
    } else {
      resetBtn.disabled = true;
    }
    clearTimeout(this.timerId);
    this.onTick({
      min: 0,
      sec: 0,
      ms: 0,
    });
    this.isTimerActive = false;
    this.deltaTime = 0;
    resetBtn.disabled = true;
    takeLapBtn.disabled = true;
    this.toggleBtn(null);
    laps.innerHTML = null;
  }

  calcTime() {
    const currentTime = Date.now();
    this.deltaTime = currentTime - this.startTime;
    const time = new Date(this.deltaTime);
    const min = time.getMinutes();
    const sec = time.getSeconds();
    const ms = Number.parseInt(time.getMilliseconds() / 100);
    this.onTick({
      min: min,
      sec: sec,
      ms: ms,
    });
  }
}

const timer = new Timer({
  onTick: updateClockface,
  toggleBtn: toggleBtn,
});

startBtn.addEventListener('click', timer.start.bind(timer));
takeLapBtn.addEventListener('click', timer.takeLap.bind(timer));
resetBtn.addEventListener('click', timer.reset.bind(timer));

function updateClockface({ min, sec, ms }) {
  clockface.textContent = `${isLessTen(min)}:${isLessTen(sec)}.${ms}`;
}

function isLessTen(val) {
  return val < 10 ? '0' + val : val;
}

function toggleBtn(isActive) {
  startBtn.classList.toggle('active');
  const isBtnActive = startBtn.classList.contains('active');
  if (isBtnActive && isActive === true) {
    startBtn.textContent = 'Pause';
  } else if (!isBtnActive && isActive === false) {
    startBtn.textContent = 'Continue';
  } else {
    startBtn.textContent = 'Start';
    startBtn.classList.remove('active');
  }
}