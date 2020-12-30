export const actionTypes = {
  SET_WIDTH: 'SET_WIDTH',
  SET_HEIGHT: 'SET_HEIGHT',
  SET_IMAGE: 'SET_IMAGE',
  SET_IMAGE_STATUS: 'SET_IMAGE_STATUS',
  ZOOM_IN: 'ZOOM_IN',
  ZOOM_OUT: 'ZOOM_OUT',
};

export const setWidth = (width) => ({
  type: actionTypes.SET_WIDTH, payload: width,
});

export const setHeight = (height) => ({
  type: actionTypes.SET_HEIGHT, payload: height,
});

export const zoomIn = () => ({
  type: actionTypes.ZOOM_IN,
});

export const zoomOut = () => ({
  type: actionTypes.ZOOM_OUT,
});
