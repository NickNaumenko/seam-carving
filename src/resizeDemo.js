import Worker from '../seam-carver.worker';
import { eventTypes } from './constants';
import Picture from './picture';

const WHITE_COLOR = 16777215;

class ResizeDemo {
  #worker;

  #imageCanvas;

  #picture;

  constructor(imageCanvas) {
    this.#worker = new Worker();
    this.#imageCanvas = imageCanvas;
    const { imageData } = imageCanvas;
    this.#picture = new Picture(imageData);

    this.onMessage = this.onMessage.bind(this);
    this.#worker.addEventListener('message', this.onMessage);

    this.#worker.postMessage({ type: eventTypes.INIT, payload: imageData });
  }

  resize(width, height) {
    this.#worker.postMessage({
      type: eventTypes.RESIZE, payload: { width, height },
    });
  }

  showVerticalSeam(seam) {
    for (let i = 0; i < seam.length; i++) {
      this.#picture.setRGB(i, seam[i], WHITE_COLOR);
    }
    this.render();
  }

  onMessage(e) {
    const { type, payload } = e.data;

    switch (type) {
      case eventTypes.FIND_SEAM_SUCCESS:
        this.showVerticalSeam(payload);
        break;
      case eventTypes.REMOVE_SEAM_SUCCESS:
        this.#picture = new Picture(payload);
        this.render();
        break;
      default:
        break;
    }
  }

  render() {
    const { imageData } = this.#picture;
    this.#imageCanvas.putImageData(imageData);
  }
}

export default ResizeDemo;
