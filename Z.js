// eslint-disable-next-line
function Z () {
  let store;
  const rootRender = [];
  let activeElement;

  function tree (input, node) {
    if (typeof input === 'function') {
      const result = input({}, store);
      return result;
    }
    if (input instanceof Array) {
      if (node.childNodes.length !== input.length) {
        return input.forEach((item, index) => {
          const newItem = tree(item, document.createDocumentFragment());
          node.append(newItem);
          // this is somewhat hacky
          if (document.activeElement.isEqualNode(node.childNodes[index])) {
            activeElement = newItem;
          }
        });
      }
      return input.forEach((item, index) => {
        const oldItem = node.childNodes[index];
        const newItem = tree(item, oldItem);
        node.replaceChild(newItem, oldItem);
      });
    }
    return input;
  }

  function build (app, node) {
    return function () {
      tree(app, node);
    };
  }

  function createEl (tag, attributes, textFn) {
    const el = document.createElement(tag);
    if (attributes) {
      Object.keys(attributes).forEach((attribute) => {
        let computedAttribute = attributes[attribute];
        if (attribute === 'style') {
          computedAttribute = Object.keys(computedAttribute).map(key => `${key}:${computedAttribute[key]};`).join('');
        }
        el[attribute] = computedAttribute;
      });
    }
    const result = textFn ? textFn(store.getState()) : '';
    if (typeof result === 'string') {
      el.append(document.createTextNode(result));
    } else {
      build(result, el, store)();
    }
    return el;
  }

  function renderAll() {
    rootRender.map(fragment => fragment());
    // this is somewhat hacky
    if (activeElement) {
      activeElement.focus();
      activeElement = null;
    }
  }

  function render (app, node, createdStore) {
    store = createdStore;
    rootRender.push(build(app, node, store));
    renderAll();
  }

  function makeStore (initial) {
    const state = initial || {};

    function dispatch (key, value) {
      state[key] = value;
      renderAll();
    }

    function getState () {
      return state;
    }

    return {
      dispatch,
      getState,
    };
  }

  return {
    createEl,
    makeStore,
    render,
    tree,
  };
}
