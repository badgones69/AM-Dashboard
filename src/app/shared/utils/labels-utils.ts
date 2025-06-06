export function capitalize(word: string) {
  return word.toUpperCase();
}

export function capitaliseFirstLetter(word: string) {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}
