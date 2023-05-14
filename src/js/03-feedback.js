import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const feedbackKey = 'feedback-form-state';

const savedData = JSON.parse(localStorage.getItem(feedbackKey));
if (savedData) {
  emailInput.value = savedData.email;
  messageInput.value = savedData.message;
}

const saveData = throttle(() => {
  const data = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(feedbackKey, JSON.stringify(data));
}, 500);

emailInput.addEventListener('input', saveData);
messageInput.addEventListener('input', saveData);

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(data);
  localStorage.removeItem(feedbackKey);
  emailInput.value = '';
  messageInput.value = '';
});
