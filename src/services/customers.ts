import {Customer, ICustomer} from '../domains/Customer'
import HarvesineService from './harvesine'
import {readFileSync} from 'fs'
import path from 'path'


export default class CustomerService {
    static getCustomersData():Customer[] {
        const customersData = readFileSync(path.resolve(__dirname, '../customers.txt'), 'utf8')
        const customers = this.splitCustomers(customersData)
        return customers
    }
    private static splitCustomers(customersData:string): Customer[] {
      const length = customersData.length
      const customers = []
      let init = 0
      for (let i = 0; i < length; i++) {
          if(customersData[i] === '\n') {
            const row = customersData.substring(init, i).replace(/\n/g, '')
            const customer: Customer = this.setCustomerObject(row)
            if(Number.isNaN(customer.coordinates.lat) || Number.isNaN(customer.coordinates.long)) {
              console.log(`Avoiding customer number: ${customer.serialize().id} because has incorret data`)
            } else customers.push(this.setCustomerObject(row))
            init = i
          }

      }
      return customers
    }

    private static setCustomerObject(rowCustomer:string): Customer {
      const [id, lat, long, name] = rowCustomer.split(",")
      const customer = new Customer(id, Number(lat), Number(long), name)
      return customer
    }

    static getCustomersInRange(customers: Customer[]): Customer[] {
      return customers.filter(customer => (HarvesineService.getDistance(customer.coordinates) <= 100))
    }

    static orderCustomers(customers: Customer[]): Customer[] {
      return customers.sort((a, b) => a.serialize().name.localeCompare(b.serialize().name))
    }
}
