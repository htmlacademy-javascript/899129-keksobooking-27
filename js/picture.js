const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarInputElement = document.querySelector('.ad-form__field input');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoInputElement = document.querySelector('.ad-form__upload input');
const photoPreviewElement = document.querySelector('.ad-form__photo');
const photoForPreviewElement = document.createElement('img');

const isMatchTypeFile = (file, fileType) => {
  const fileName = file.name.toLowerCase();
  return fileType.some((it) => fileName.endsWith(it));
};

const onAvatarInput = (evt) => {
  const file = evt.target.files[0];
  const isValid = isMatchTypeFile(file, FILE_TYPES);

  if (isValid) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
};
avatarInputElement.addEventListener('change', onAvatarInput);

const onPhotoInput = () => {
  const file = photoInputElement.files[0];
  const isValid = isMatchTypeFile(file, FILE_TYPES);

  if (isValid) {
    photoForPreviewElement.src = URL.createObjectURL(file);
    photoForPreviewElement.width = 70;
    photoForPreviewElement.height = 70;
    photoForPreviewElement.alt = 'Фотография жилья';

    photoPreviewElement.append(photoForPreviewElement);
  }
};
photoInputElement.addEventListener('change', onPhotoInput);

const clearPictures = () => {
  avatarPreviewElement.src = DEFAULT_AVATAR;

  if (photoForPreviewElement.parentNode) {
    photoForPreviewElement.parentNode.removeChild(photoForPreviewElement);
  }
};

export {clearPictures};
