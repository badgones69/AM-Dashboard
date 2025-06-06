import packageJson from '../../../../../package.json';
import { Profile } from '../../models/Profile';
import { getProfiles } from '../../constants/profiles-constants';

export function formatAppReleaseDate(): string {
  const releaseDate = packageJson.releaseDate.split('-');
  return `${releaseDate[2]}/${releaseDate[1]}/${releaseDate[0]}`;
}

export function getProfilesValues(): Profile[] {
  return getProfiles('Administrateur', 'Gestionnaire', 'Consultant');
}
