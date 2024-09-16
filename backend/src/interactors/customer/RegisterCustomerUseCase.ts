import { CustomerEntity } from '../../domain/customer/CustomerEntity';
import { CustomerRepository } from '../../external/db/customer/CustomerRepository';

export class RegisterCustomerUseCase {
  private customerRepository: CustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  async execute(data: any): Promise<CustomerEntity> {
    const customer = new CustomerEntity(data);
    return this.customerRepository.save(customer);
  }
}