const form = document.querySelector('form');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const currentForm = event.currentTarget;

  let delay = +currentForm.delay.value;
  const step = +currentForm.step.value;
  const amount = +currentForm.amount.value;

  for (let idx = 1; idx <= amount; idx++) {
    createPromise(idx, delay)
      .then(result => console.log('recivedPromise:  ', result))
      .catch(error => console.log('error:           ', error));
    delay += step;
  }
});
