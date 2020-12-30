/* eslint-disable no-new */
import Header from './uiComponents/header';
import UploadMenu from './uiComponents/uploadMenu';
import ImageCanvas from './uiComponents/imageCanvas';

import ResizeDemo from './resizeDemo';
import Workspace from './uiComponents/workspace';
import { useSubscribe } from './store/store';

new Header();
const uploadMenu = new UploadMenu();

const onImageLoad = (img) => {
  uploadMenu.hide();
  new Workspace();
  const imageCanvas = new ImageCanvas(img);

  const resizeDemo = new ResizeDemo(imageCanvas);

  const resize = ({ width, height }) => resizeDemo.resize(width, height);
  const subscribe = useSubscribe();
  subscribe(resize);
};

uploadMenu.onLoad(onImageLoad);
