const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');

let timerId = null;

stop.disabled = !timerId;
start.addEventListener('click', () => {
  timerId = setInterval(
    () => (document.body.style.background = getRandomHexColor()),
    1000
  );
  start.disabled = !!timerId;
  stop.disabled = !start.disabled;
});

stop.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  start.disabled = !!timerId;
  stop.disabled = !stop.disabled;
});

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
