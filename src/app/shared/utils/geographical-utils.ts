import { COUNTRIES_FR } from '../constants/geographical-constants';
import { orderElementsByAlphabetical } from './common-utils';
import { capitalize } from './labels-utils';

export function getCountriesList() {
  return COUNTRIES_FR.filter((country) => country.flagCode !== 'eu');
}

export function getCountries() {
  let countriesList = getCountriesList();
  return orderElementsByAlphabetical(countriesList, 'fr');
}

export function getCountryById(countryId: number) {
  return getCountriesList().find((country) => country.id === countryId);
}

export function getCountryByName(countryName: string) {
  return getCountriesList().find(
    (country) => capitalize(country.name) === capitalize(countryName),
  );
}

export function getRegion(countryId: number, regionId: number) {
  return getCountryById(countryId)?.regions?.find(
    (region) => region.id === regionId,
  );
}
