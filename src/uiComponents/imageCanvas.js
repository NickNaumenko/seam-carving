import { setHeight, setWidth } from '../store/actions';
import { useDispatch, useSubscribe, useUnsubscribe } from '../store/store';

class ImageCanvas {
  #element;

  #ctx;

  constructor(img) {
    this.#element = document.getElementById('canvas');
    this.#ctx = this.#element.getContext('2d');

    const { naturalHeight: height, naturalWidth: width } = img;
    const dispatch = useDispatch();

    dispatch(setWidth(width));
    dispatch(setHeight(height));

    this.width = width;
    this.height = height;
    this.#element.hidden = false;
    this.#ctx.drawImage(img, 0, 0);

    this.handleZoom = this.handleZoom.bind(this);

    const subscribe = useSubscribe();
    subscribe(this.handleZoom);
  }

  get width() {
    return this.#element.width;
  }

  set width(value) {
    this.#element.width = value;
  }

  get height() {
    return this.#element.height;
  }

  set height(value) {
    this.#element.height = value;
  }

  get imageData() {
    const { width, height } = this;
    return this.#ctx.getImageData(0, 0, width, height);
  }

  putImageData(imageData) {
    const { width, height } = imageData;
    this.width = width;
    this.height = height;
    this.#ctx.putImageData(imageData, 0, 0);
  }

  transform(scaleX = 0, scaleY = scaleX, skewX = 0, skewY = 0, translateX = 0, translateY = 0) {
    this.#element.style.transform = `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`;
  }

  scale(value) {
    this.transform(value);
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.width, this.height);
  }

  handleZoom({ scale }) {
    this.scale(scale);
  }

  destroy() {
    this.clear();
    const unsubscribe = useUnsubscribe();
    unsubscribe(this.handleZoom);
    this.#element.hidden = true;
  }
}

export default ImageCanvas;
