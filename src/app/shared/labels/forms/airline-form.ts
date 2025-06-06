import { getFormActionLabel } from '../commons/form-common';

export function getAirlineFormTitle(): string {
  return 'de la compagnie';
}

export function getIcaoCodeInputLabel(): string {
  return 'ICAO';
}

export function getNameInputLabel(): string {
  return 'NOM';
}

export function getLogoInputLabel(): string {
  return 'Logo';
}

export function getCountryInputLabel(): string {
  return 'NATIONALITÉ';
}

export function getAirlineFormSuccessNotificationMessage(
  formMode: string,
): string {
  return `Votre compagnie a bien été ${getFormActionLabel(formMode)} !`;
}
