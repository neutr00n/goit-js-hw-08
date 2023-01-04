import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[type=email]'),
  message: document.querySelector('textarea[name=message]'),
};

const storageData = {};

const FORM_CURRENT_VALUE = 'feedback-form-state';

refs.form.addEventListener('submit', handleFormSubmit);
refs.form.addEventListener('input', throttle(handleFormInputValue, 500));

getStorageData();

function handleFormSubmit(evt) {
  evt.preventDefault();

  const formElements = evt.currentTarget.elements;
  const email = formElements.email.value.trim();
  const message = formElements.message.value.trim();

  const formData = {
    email,
    message,
  };

  evt.currentTarget.reset();
  localStorage.removeItem(FORM_CURRENT_VALUE);
  console.log(formData);
}

function handleFormInputValue(evt) {
  storageData[evt.target.name] = evt.target.value;

  const stringifyStorageData = JSON.stringify(storageData);

  localStorage.setItem(FORM_CURRENT_VALUE, stringifyStorageData);
}

function getStorageData() {
  const savedMessage = localStorage.getItem(FORM_CURRENT_VALUE);
  try {
    const parsedSavedMessage = JSON.parse(savedMessage);

    if (parsedSavedMessage) {
      if (parsedSavedMessage.email) {
        refs.email.value = parsedSavedMessage.email;
      }

      if (parsedSavedMessage.message) {
        refs.message.value = parsedSavedMessage.message;
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}
