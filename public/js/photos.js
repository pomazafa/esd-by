window.onload = () => {
  if (window.File && window.FileList && window.FileReader) {
    const filesTempInput = document.getElementById('photo-temp');
    filesTempInput.addEventListener('change', event => {
      const filesInput = document.getElementById('photos');
      const filesArray = toArray(event.target.files).concat(toArray(filesInput.files));

      let list = new DataTransfer();
      filesArray.forEach(f => {
        list.items.add(f);
      });
      filesInput.files = list.files;

      const output = document.getElementById('photos-preview');

      const file = event.target.files[0];
      if (!file.type.match('image')) {
        return;
      }

      const picReader = new FileReader();
      picReader.addEventListener('load', event => {

        const picFile = event.target;
        const div = document.createElement('div');

        const image = document.createElement('img');
        image.className = 'thumbnail';
        image.src = picFile.result;
        image.title = file.name;
        div.insertBefore(image, null);

        const imageDescription = document.createElement('input');
        imageDescription.type = 'text';
        imageDescription.maxLength = 255;
        imageDescription.name = `photo-${filesInput.files.length - 1}`;
        div.insertBefore(imageDescription, null);

        output.insertBefore(div, null);
      });

      picReader.readAsDataURL(file);
    });
  } else {
    console.error('Your browser does not support File API');
  }
};

const toArray = fileList => {
  return Array.prototype.slice.call(fileList);
};

