import CustomerService from './../services/customers'
import {Customer} from './../domains/Customer'
export default class GetClosestCustomers {
  static invoke(): Customer[]  {
    const allCustomersData: Customer[] = CustomerService.getCustomersData()
    const customersInRange = CustomerService.getCustomersInRange(allCustomersData)
    return CustomerService.orderCustomers(customersInRange)
  }
}
