import {Customer} from '../../src/domains/Customer';

export const customersMock = [
      { id: '1', lat: 52.1234567, long: 13.654321, name: 'Miguel'},
      { id: '2', lat: 53.1234567, long: 12.65432103, name: 'Arturo'},
      { id: '3', lat: 54.1234567, long: 11.65432104, name: 'Diego'},
      { id: '4', lat: 55.1234567, long: 10.65432105, name: 'Alfredo'},
      { id: '5', lat: 56.1234567, long: 9.654321, name: 'Norman'}
    ]

  export const customersCoordinatesMock = () => customersMock.map(({id, lat, long, name}) => new Customer(id,lat,long, name))
