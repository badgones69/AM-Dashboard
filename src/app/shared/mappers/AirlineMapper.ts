import { Airline } from '../models/Airline';
import { getCountryById } from '../utils/geographical-utils';

export class AirlineMapper {
  public airlineFromDB(airlineFromDB: any): Airline {
    return {
      id: airlineFromDB.airlineID,
      icao: airlineFromDB.airlineICAO,
      name: airlineFromDB.airlineName,
      logo: airlineFromDB.airlineLogo,
      nationality: getCountryById(airlineFromDB.airlineNationality),
    } as Airline;
  }

  public airlineToDB(airlineToDB: any): any {
    return {
      airlineID: airlineToDB.id,
      airlineICAO: airlineToDB.icao,
      airlineName: airlineToDB.name,
      airlineLogo: airlineToDB.logo,
      airlineNationality: airlineToDB.nationality,
    };
  }
}
