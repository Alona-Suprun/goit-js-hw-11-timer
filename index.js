const clock = document.querySelector('#timer-1');
const days = document.querySelector('[data-value="days"]');
const hours = document.querySelector('[data-value="hours"]');
const mins = document.querySelector('[data-value="mins"]');
const secs = document.querySelector('[data-value="secs"]');

class CountdownTimer {
  constructor({ targetDate }) {
    this.intervalID = null;
    this.targetDate = targetDate;
    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.timeChange(time);
  }

  timeChange({ days, hours, mins, secs }) {
    clock.textContent = `${days}:${hours}:${mins}:${secs}`;
  }

  timeCount() {
    const currentTime = Date.now();
    const time = this.targetDate - currentTime;
    const numbers = this.getTimeComponents(time);
    this.timeChange(numbers);

    if (time < 0) {
      clearInterval(this.intervalID);
      this.init();
      clock.textContent = 'Happy Birthday to ME';
      return;
    }
  }
  startTimer() {
    this.timeCount();
    this.intervalID = setInterval(() => {
      this.timeCount();
    }, 1000);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 07, 2021'),
});

timer.startTimer();
