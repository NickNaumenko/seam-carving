const loadImage = (file) => new Promise((res) => {
  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.addEventListener('load', () => {
    URL.revokeObjectURL(img.src);
    res(img);
  });
});

export default loadImage;
