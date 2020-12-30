import SeamCarver from './src/seamCarver';

const eventTypes = {
  INIT: 'INIT',
  RESIZE: 'RESIZE',
  RESIZED_IMAGE: 'RESIZED_IMAGE',
  FIND_SEAM_REQUEST: 'FIND_SEAM_REQUEST',
  FIND_SEAM_SUCCESS: 'FIND_SEAM_SUCCESS',
  REMOVE_SEAM_REQUEST: 'REMOVE_SEAM_REQUEST',
  REMOVE_SEAM_SUCCESS: 'REMOVE_SEAM_SUCCESS',
};

let seamCarver;

const initSeamCarver = (imageData) => {
  seamCarver = new SeamCarver(imageData);
};

const resize = ({ width: w }) => {
  const { width } = seamCarver.imageData;
  const removeCols = width - w;

  for (let i = 0; i < removeCols; i++) {
    const seam = seamCarver.findVerticalSeam();
    postMessage({ type: eventTypes.FIND_SEAM_SUCCESS, payload: seam });
    const imageData = seamCarver.removeVerticalSeam(seam);
    postMessage({ type: eventTypes.REMOVE_SEAM_SUCCESS, payload: imageData });
  }
};

const eventHandlers = {
  [eventTypes.INIT]: initSeamCarver,
  [eventTypes.RESIZE]: resize,
};

const onMessage = ({ data }) => {
  const { type, payload } = data;
  const handler = eventHandlers[type];
  if (typeof handler !== 'function') {
    throw new TypeError('Not supported event');
  }

  handler(payload);
};

onmessage = onMessage;
