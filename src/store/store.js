import { actionTypes } from './actions';
import createStore from './createStore';

const MAX_ZOOM = 5;
const MIN_ZOOM = 0.1;
const ZOOM_STEP = 0.1;

const initialState = {
  width: 0,
  height: 0,
  scale: 1,
  translateX: 0,
  translateY: 0,
};

const zoomIn = (state) => {
  const cur = state.scale;
  const scale = Math.max(Math.min(MAX_ZOOM, cur + ZOOM_STEP));
  return { ...state, scale: parseFloat(scale.toFixed(1)) };
};

const zoomOut = (state) => {
  const cur = state.scale;
  const scale = Math.min(Math.max(MIN_ZOOM, cur - ZOOM_STEP));
  return { ...state, scale: parseFloat(scale.toFixed(1)) };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_WIDTH:
      return { ...state, width: parseInt(action.payload, 10) };
    case actionTypes.SET_HEIGHT:
      return { ...state, height: parseInt(action.payload, 10) };
    case actionTypes.ZOOM_IN:
      return zoomIn(state);
    case actionTypes.ZOOM_OUT:
      return zoomOut(state);
    default:
      return state;
  }
};

export const store = createStore(reducer);

export const useDispatch = () => store.dispatch;
export const useSubscribe = () => store.subscribe;
export const useUnsubscribe = () => store.unsubscribe;
