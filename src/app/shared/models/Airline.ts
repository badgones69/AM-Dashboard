import { Country } from './Country';

export class Airline {
  id!: string;
  icao!: string;
  name!: string;
  logo!: string;
  nationality!: Country;
}
