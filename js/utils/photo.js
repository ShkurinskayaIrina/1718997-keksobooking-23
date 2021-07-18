const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const photoNew = document.createElement('img');

const addPhoto = function (fileChooser,preview) {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (fileChooser.name==='avatar'){
        preview.src = reader.result;
      } else {
        photoNew.src=reader.result;
        photoNew.style.width=`${70}px`;
        photoNew.style.height=`${70}px`;
        preview.appendChild(photoNew);
      }
    });
    reader.readAsDataURL(file);
  }
};

export {addPhoto};
