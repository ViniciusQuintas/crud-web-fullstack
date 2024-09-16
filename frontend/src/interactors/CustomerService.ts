import { CustomerEntity } from '../domain/CustomerEntity';

export class CustomerService {
  private apiUrl = 'http://localhost:3000/customers';

  async createCustomer(customer: CustomerEntity): Promise<CustomerEntity> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    return response.json();
  }

  async getCustomers(): Promise<CustomerEntity[]> {
    const response = await fetch(this.apiUrl);
    return response.json();
  }
  
  async findByCpfCnpj(cpfCnpj: string): Promise<CustomerEntity | null> {
    const response = await fetch(`${this.apiUrl}?cpf_cnpj=${cpfCnpj}`);
    if (response.status === 404) {
      return null;
    }
    return response.json();
  }
  
  async updateCustomer(customer: CustomerEntity): Promise<void> {
    await fetch(`${this.apiUrl}/${customer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
  }
  
  async deleteCustomer(id: number): Promise<void> {
    await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}