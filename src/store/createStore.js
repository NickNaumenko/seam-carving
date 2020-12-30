export default function createStore(reducer, initialState) {
  let state = {};
  const listeners = [];

  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((fn) => {
      fn(state);
    });
  };
  const subscribe = (fn) => {
    listeners.push(fn);
  };
  const unsubscribe = (fn) => {
    const idx = listeners.indexOf(fn);
    if (idx !== -1) {
      listeners.splice(idx, 1);
    }
  };

  state = reducer(initialState, {});

  return {
    getState, dispatch, subscribe, unsubscribe,
  };
}
