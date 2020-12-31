function UploadMenu() {
  const element = document.getElementById('upload-menu');

  return {
    hide() {
      element.hidden = true;
    },
    show() {
      element.hidden = false;
    },
  };
}

export default UploadMenu;
