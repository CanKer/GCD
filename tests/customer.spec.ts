import CustomerService from '../src/services/customers'
import HarvesineService from '../src/services/harvesine'

import GetClosestCustomers from '../src/actions/getClosestCustomers'

import {Customer} from '../src/domains/Customer'
import {customersMock, customersCoordinatesMock} from './test_support/customerMock'

describe('Integration: ', () => {
  test('should show customers near than 100Km and ordered alphabeticaly ', () => {
    let customers = GetClosestCustomers.invoke()
    expect(customers.length).toBe(2)
    expect(customers[0].serialize().name).toBe('Arturo')
    expect(customers[1].serialize().name).toBe('Miguel')
  })
})

describe('Customer: ', () => {
  test('should do something: ', () => {
    const customers = CustomerService.getCustomersData()
    expect(customers.length).toBe(5)
    customers.forEach(customer => {
        expect(customer).toBeInstanceOf(Customer)
    });
  })
  test('should show customer near than 100Km: ', () => {
    const customers = CustomerService.getCustomersInRange(customersCoordinatesMock())
    expect(customers.length).toBe(2)
  })
  test('should order customers alphabeticaly ', () => {
    let customers = CustomerService.orderCustomers(customersCoordinatesMock())
    expect(customers[0].serialize().name).toBe('Alfredo')
    expect(customers[1].serialize().name).toBe('Arturo')
    expect(customers[2].serialize().name).toBe('Diego')
    expect(customers[3].serialize().name).toBe('Miguel')
    expect(customers[4].serialize().name).toBe('Norman')
  })
})

describe('Haversine: ', () => {
  test('should calculate distance in KM: ', () => {
    const customerCoordinates = { lat: 52.1234567, long: 13.7654321 }
    const distance = HarvesineService.getDistance(customerCoordinates)
    expect(distance).toBe(46.49)
  })
})
