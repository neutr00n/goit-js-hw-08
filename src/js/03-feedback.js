import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');

let formData = {};
const FORM_CURRENT_VALUE = 'feedback-form-state';

formRef.addEventListener('submit', handleFormSubmit);
formRef.addEventListener('input', throttle(handleFormInputValue, 500));

getFormDataFromStorage();

function handleFormSubmit(evt) {
  evt.preventDefault();

  const formLength = evt.currentTarget.elements.length - 1;

  if (Object.keys(formData).length !== formLength) {
    alert('Fill all fields');
    return;
  }

  evt.currentTarget.reset();

  localStorage.removeItem(FORM_CURRENT_VALUE);

  console.log(formData);
  formData = {};
}

function handleFormInputValue(evt) {
  formData[evt.target.name] = evt.target.value.trim();

  const stringifyFormData = JSON.stringify(formData);

  localStorage.setItem(FORM_CURRENT_VALUE, stringifyFormData);
}

function getFormDataFromStorage() {
  const savedMessage = localStorage.getItem(FORM_CURRENT_VALUE);

  if (savedMessage) {
    try {
      formData = JSON.parse(savedMessage);

      Object.entries(formData).forEach(
        ([name, value]) => (formRef.elements[name].value = value)
      );
    } catch (err) {
      console.log(err.message);
    }
  }
}
