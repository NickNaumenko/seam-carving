class Picture {
  #imageData;

  constructor(imageData) {
    const data = imageData.data.slice();
    const { width, height } = imageData;
    this.#imageData = new ImageData(data, width, height);
  }

  get imageData() {
    return this.#imageData;
  }

  get width() {
    return this.#imageData.width;
  }

  get height() {
    return this.#imageData.height;
  }

  get data() {
    return this.#imageData.data;
  }

  getRGB(row, col) {
    const { data, width } = this;
    const idx = (row * width + col) << 2;
    const result = (data[idx] << 16) + (data[idx + 1] << 8) + (data[idx + 2] << 0);
    return result;
  }

  setRGB(row, col, rgb) {
    const { width, data } = this;
    const redIdx = (row * width + col) << 2;
    data[redIdx] = (rgb >> 16) & 0xFF;
    data[redIdx + 1] = (rgb >> 8) & 0xFF;
    data[redIdx + 2] = (rgb >> 0) & 0xFF;
  }
}

export default Picture;
