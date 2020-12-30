import { zoomIn, zoomOut } from '../store/actions';
import { useDispatch, useUnsubscribe } from '../store/store';

const dispatch = useDispatch();

class Workspace {
  #element;

  constructor() {
    this.#element = document.getElementById('workspace');

    this.#element.addEventListener('wheel', Workspace.zoom);
  }

  destroy() {
    this.#element.removeEventListener('wheel', Workspace.zoom);
    const unsubscribe = useUnsubscribe();
    unsubscribe(Workspace.zoom);
  }

  static zoom(e) {
    if (e.deltaY < 0) {
      dispatch(zoomIn());
    } else {
      dispatch(zoomOut());
    }
  }
}

export default Workspace;
