export function getStoredItem(storedItemName: string): any {
  return sessionStorage.getItem(storedItemName);
}

export function removeStoredItem(storedItemName: string): void {
  sessionStorage.removeItem(storedItemName);
}
