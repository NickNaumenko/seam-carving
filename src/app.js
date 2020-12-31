import Header from './uiComponents/header';
import UploadMenu from './uiComponents/uploadMenu';
import ImageCanvas from './uiComponents/imageCanvas';

import ResizeDemo from './resizeDemo';
import Workspace from './uiComponents/workspace';
import { useSubscribe } from './store/store';
import loadImage from './helpers/loadImage';

class App {
  #workspace;

  #canvas;

  #header;

  #uploadMenu;

  #resizeDemo;

  #loaders = [];

  constructor() {
    this.#header = new Header();
    this.#uploadMenu = new UploadMenu();

    this.showWorkspace = this.showWorkspace.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  showWorkspace(img) {
    this.#uploadMenu.hide();
    this.#workspace = new Workspace();
    this.#canvas = new ImageCanvas(img);
    this.#resizeDemo = new ResizeDemo(this.#canvas);

    const subscribe = useSubscribe();
    const resize = ({ width, height }) => this.#resizeDemo.resize(width, height);
    subscribe(resize);

    this.#header.enable();
  }

  resetWorkspace() {
    this.#workspace.destroy();
    this.#canvas.destroy();
    this.#header.disable();
    this.#resizeDemo.terminate();
  }

  init() {
    this.#loaders = [...document.querySelectorAll('input[data-controls="upload-input"]')];
    this.#loaders.forEach((elem) => {
      elem.addEventListener('change', this.handleImageLoaded);
    });
  }

  async handleImageLoaded(e) {
    if (!e.target.files.length) {
      return;
    }
    if (this.#workspace) {
      this.resetWorkspace();
    }
    const img = await loadImage(e.target.files[0]);
    this.showWorkspace(img);
  }
}

export default new App();
