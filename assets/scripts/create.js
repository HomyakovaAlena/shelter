function create(
  element,
  newClass,
  parentElement,
  content = ""
) {
  const newElement = document.createElement(element);
  newElement.classList.add(newClass);
  if (content != "") {
    newElement.textContent = content;
  }
  parentElement.append(newElement);
  return newElement;
}

export { create };
