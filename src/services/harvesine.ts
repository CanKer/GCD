import {Customer, ICustomer} from '../domains/Customer'
import {GeoCoord} from './../domains/Haversine'


export default class HarvesineService {
  private static earthRadiusInKilometers: number = 6371;
  private static Parloa: GeoCoord = {
    lat: 52.493252,
    long: 13.446082
  }

  private static toRadians(value: number): number {
    return value * Math.PI/180
  }

  private static formula(coordinates: GeoCoord): number  {
    let φ1 = this.toRadians(this.Parloa.lat);
    let φ2 = this.toRadians(coordinates.lat);
    let Δφ = this.toRadians(coordinates.lat - this.Parloa.lat);
    let Δλ = this.toRadians(coordinates.long - this.Parloa.long);
    // a = sin²(Δφ / 2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ / 2)
    let a = Math.pow(Math.sin(Δφ / 2), 2) +
            Math.cos(φ1) *
            Math.cos(φ2) *
            Math.pow(Math.sin(Δλ / 2), 2);
    // c = 2 ⋅ atan2(√a, √(1−a))
    return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  static getDistance(customerCoordinates: GeoCoord): number {
    let c = this.formula(customerCoordinates);
    // d = R ⋅ c
    const distance = this.earthRadiusInKilometers * c
    return Math.trunc(distance*100)/100
}

}
