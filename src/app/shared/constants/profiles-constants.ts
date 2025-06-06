import { Profile } from '../models/Profile';

export function getProfiles(
  administratorLabel: string,
  managerLabel: string,
  visitorLabel: string,
): Profile[] {
  return [
    { id: 1, name: administratorLabel },
    { id: 2, name: managerLabel },
    { id: 3, name: visitorLabel },
  ];
}
