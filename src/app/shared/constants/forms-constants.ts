/* Form modes */
export const ADD_FORM_MODE = 'ADD';
export const EDIT_FORM_MODE = 'EDIT';
export const DELETE_FORM_MODE = 'DELETE';

/* Forms fields patterns */
export const IDENTITY_PATTERN =
  '^[a-zA-ZéèàçùïüâêôîùéÀÉÈÏÖ\\.]+(?:[ -][a-zA-ZéèàçùïüâêôîùéÀÉÈÏÖ\\.]+)*$';
export const LOGIN_PATTERN =
  '^([a-zßñçãáàâäéèêëíìîïõо́òôöúùûü]|[a-zßñçãáàâäéèêëíìîïõо́òôöúùûü]-[a-zßñçãáàâäéèêëíìîïõо́òôöúùûü])+\\.([a-zßñçãáàâäéèêëíìîïõо́òôöúùûü]|[a-zßñçãáàâäéèêëíìîïõо́òôöúùûü]-[a-zßñçãáàâäéèêëíìîïõо́òôöúùûü])+$';
export const PASSWORD_PATTERN =
  '^(?=(?:.*[0-9]){2,})(?=(?:.*[A-ZßÑÇÃÁÀÂÄÉÈÊËÍÌÎÏÕО́ÒÔÖÚÙÛÜ]){2,})(?=(?:.*[a-zßñçãáàâäéèêëíìîïõо́òôöúùûü]){2,})(?=(?:.*[\\[\\]§:*_`|"+(=)&¤<.>?€;!$£%@^#~/{}\\-]){2,}).{16,}$';
export const ICAO_IATA_CODE_PATTERN = '[A-Za-z]{3}';
export const N = '[A-Za-z]{3}';

/* Forms fields error types */
export const REQUIRED_ERROR = 'required';
export const MIN_LENGTH_ERROR = 'minlength';
export const MAX_LENGTH_ERROR = 'maxlength';
export const ONLY_WHITESPACE_ERROR = 'onlyWhitespaceValue';
export const PATTERN_ERROR = 'pattern';
export const NOT_IDENTICAL_PASSWORDS_ERROR = 'notIdenticalPasswords';
