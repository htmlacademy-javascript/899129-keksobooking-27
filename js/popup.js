const successMessageElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessageElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButtonElement = errorMessageElement.querySelector('.error__button');

const showSuccessMessage = () => {
  document.body.append(successMessageElement);

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successMessageElement.remove();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  document.addEventListener('keydown', onEscPress);
  successMessageElement.addEventListener('click', () => {
    successMessageElement.remove();
    document.removeEventListener('keydown', onEscPress);
  }, {once: true});
};

const showErrorMessage = () => {
  document.body.append(errorMessageElement);

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorMessageElement.remove();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  document.addEventListener('keydown', onEscPress);
  errorMessageElement.addEventListener('click', () => {
    errorMessageElement.remove();
    document.removeEventListener('keydown', onEscPress);
  }, {once: true});
  errorButtonElement.addEventListener('mousedown', () => {
    errorMessageElement.remove();
    document.removeEventListener('keydown', onEscPress);
  }, {once: true});
};

export {showSuccessMessage, showErrorMessage};
