function UploadMenu() {
  const element = document.getElementById('upload-menu');

  const inputEl = element.querySelector('#upload-input');
  const listeners = [];

  const loadImage = (file) => new Promise((res) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.addEventListener('load', () => {
      URL.revokeObjectURL(img.src);
      res(img);
    });
  });

  inputEl.addEventListener('change', async (e) => {
    const img = await loadImage(e.target.files[0]);
    listeners.forEach((fn) => fn(img));
  });

  return {
    get element() {
      return element;
    },
    onLoad(fn) {
      listeners.push(fn);
    },
    hide() {
      element.hidden = true;
    },
    show() {
      element.hidden = false;
    },
  };
}

export default UploadMenu;
