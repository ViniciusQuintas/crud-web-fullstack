import { Request, Response } from 'express';
import { CustomerRepository } from '../../external/db/customer/CustomerRepository';
import { CustomerEntity } from '../../domain/customer/CustomerEntity';

export class UpdateCustomerController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, cpf, address, phone } = req.body;

    const customerRepository = new CustomerRepository();

    try {
      const customer = new CustomerEntity({ id: Number(id), name, cpf, address, phone });
      await customerRepository.update(customer);
      res.status(200).json({ message: 'Cliente atualizado com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
