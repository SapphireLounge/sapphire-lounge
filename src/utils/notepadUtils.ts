export const addItemToNotepad = (name: string, price: string) => {
  const event = new CustomEvent('addToNotepad', {
    detail: { name, price }
  });
  window.dispatchEvent(event);
};
