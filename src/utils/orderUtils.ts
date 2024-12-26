export function addItemToNotepad(name: string, price: string) {
  window.dispatchEvent(new CustomEvent('addToNotepad', { detail: { name, price } }));
}
