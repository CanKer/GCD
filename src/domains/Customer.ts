import {GeoCoord} from './Haversine'

interface ICustomerClass {
  serialize(): ICustomer
}

export interface ICustomer extends GeoCoord {
  id: string;
  name: string
}

export class Customer implements ICustomerClass {
  private id
  private lat
  private long
  private name
  constructor(id: string, lat:number, long:number, name: string)  {
    this.id = id.trim()
    this.lat = lat
    this.long = long
    this.name = name.trim()
  }

  serialize(): ICustomer {
    return {
      id: this.id,
      lat: this.lat,
      long: this.long,
      name: this.name
    }
  }

  get coordinates(): GeoCoord {
    return {lat: this.lat, long: this.long}
  }

}
