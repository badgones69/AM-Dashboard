import { getFormActionLabel } from '../commons/form-common';
import { getDeleteDialogMessage } from '../commons/dialog-common';

export function getUserFormTitle(): string {
  return "d'un utilisateur";
}

export function getRepeatedPasswordInputLabel(): string {
  return 'RÉPÉTER MOT DE PASSE';
}

export function getUserDeleteDialogMessage(): string {
  return `${getDeleteDialogMessage().replace('{}', 'cet utilisateur')}`;
}

export function getIdentityFieldsErrorMessage(): string {
  return 'identité invalide';
}

export function getLoginFieldFormatErrorMessage(): string {
  return 'format invalide (a.c, a-b.c, a.c-d, a-b.c-d)';
}

export function getPasswordFieldFormatErrorMessage(): string {
  return 'min. 16 (2 chiffres, symboles, majuscules et minuscules)';
}

export function getRepeatedPasswordFieldFormatErrorMessage(): string {
  return 'mots de passe différents';
}

export function getUserFormSuccessNotificationMessage(
  formMode: string,
): string {
  return `Votre utilisateur a bien été ${getFormActionLabel(formMode)} !`;
}
