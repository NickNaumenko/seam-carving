import {
  setHeight, setWidth, zoomIn, zoomOut,
} from '../store/actions';
import { useDispatch, useSubscribe } from '../store/store';

function Header() {
  const element = document.querySelector('.header');
  const widthInput = element.querySelector('#width-input');
  const heightInput = element.querySelector('#height-input');
  const zoomInButton = element.querySelector('.zoom__button--in');
  const zoomOutButton = element.querySelector('.zoom__button--out');
  const zoom = element.querySelector('.zoom__count');

  const subscribe = useSubscribe();
  const dispatch = useDispatch();

  const renderWidth = (state) => {
    widthInput.value = state.width;
  };
  const renderHeight = (state) => {
    heightInput.value = state.height;
  };
  const renderZoom = (state) => {
    zoom.textContent = `${(state.scale * 100).toFixed(0)}%`;
  };

  subscribe(renderWidth);
  subscribe(renderHeight);
  subscribe(renderZoom);

  widthInput.addEventListener('change', (e) => dispatch(setWidth(e.target.value)));
  heightInput.addEventListener('change', (e) => dispatch(setHeight(e.target.value)));
  zoomInButton.addEventListener('click', () => dispatch(zoomIn()));
  zoomOutButton.addEventListener('click', () => dispatch(zoomOut()));
}

export default Header;
