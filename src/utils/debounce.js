function debounce(fun) {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fun.apply(context, args);
    }, 300);
  };
}

export { debounce };
