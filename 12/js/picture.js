const avatarInput = document.querySelector('.ad-form__field');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const photoInput = document.querySelector('.ad-form__upload');
const photoPreview = document.querySelector('.ad-form__photo');

const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const isMatchTypeFile = (file, fileType) => {
  const fileName = file.name.toLowerCase();
  return fileType.some((it) => fileName.endsWith(it));
};

const onAvatarInput = () => {
  const file = avatarInput.files[0];
  const isValid = isMatchTypeFile(file, FILE_TYPES);

  if (isValid) {
    avatarPreview.src = URL.createObjectURL(file);
  }
};
avatarInput.addEventListener('change', onAvatarInput);

const onPhotoInput = () => {
  const file = photoInput.files[0];
  const isValid = isMatchTypeFile(file, FILE_TYPES);

  if (isValid) {
    const photoForPreview = document.createElement('img');

    photoForPreview.src = URL.createObjectURL(file);
    photoForPreview.width = 70;
    photoForPreview.height = 70;
    photoForPreview.alt = 'Фотография жилья';

    photoPreview.append(photoForPreview);
  }
};
photoInput.addEventListener('change', onPhotoInput);

const clearPictures = () => {
  avatarInput.src = DEFAULT_AVATAR;
};

export {clearPictures};
