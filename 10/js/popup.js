const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const showSuccessMessage = () => {
  document.body.append(successMessage);

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successMessage.remove();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  document.addEventListener('keydown', onEscPress);
  successMessage.addEventListener('click', () => {
    successMessage.remove();
    document.removeEventListener('keydown', onEscPress);
  }, {once: true});
};

const showErrorMessage = () => {
  document.body.append(errorMessage);

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorMessage.remove();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  document.addEventListener('keydown', onEscPress);
  errorMessage.addEventListener('click', () => {
    errorMessage.remove();
    document.removeEventListener('keydown', onEscPress);
  }, {once: true});
  errorButton.addEventListener('mousedown', () => {
    errorMessage.remove();
    document.removeEventListener('keydown', onEscPress);
  }, {once: true});
};

export {showSuccessMessage, showErrorMessage};
