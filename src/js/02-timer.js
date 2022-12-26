import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dataTime = document.querySelector('#datetime-picker');
const start = document.querySelector('[data-start]');
const displayDays = document.querySelector('[data-days]');
const displayHours = document.querySelector('[data-hours]');
const displayMinutes = document.querySelector('[data-minutes]');
const displaySeconds = document.querySelector('[data-seconds]');

let timerId = null;
let tickTime;
let tickTimeObject;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
  onChange(selectedDates) {
    if (new Date() > selectedDates[0]) {
      window.alert('Please choose a date in the future');
      start.disabled = true;
    } else {
      start.disabled = false;
      tickTime = selectedDates[0];
    }
  },
};

flatpickr(dataTime, options);

start.addEventListener('click', () => {
  timerId = setInterval(() => {
    if (Date.parse(tickTime) < Date.parse(new Date())) {
      start.removeEventListener('click', () => clearInterval(timerId));
      return;
    }
    console.log('more', Date.parse(tickTime) < Date.parse(new Date()));

    const tick = Date.parse(tickTime) - Date.parse(new Date());
    tickTimeObject = convertMs(tick);
    displayDays.textContent = tickTimeObject.days.toString().padStart(2, '0');
    displayHours.textContent = tickTimeObject.hours.toString().padStart(2, '0');
    displayMinutes.textContent = tickTimeObject.minutes
      .toString()
      .padStart(2, '0');
    displaySeconds.textContent = tickTimeObject.seconds
      .toString()
      .padStart(2, '0');
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
