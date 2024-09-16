import { Request, Response } from 'express';
import { CustomerRepository } from '../../external/db/customer/CustomerRepository';

export class DeleteCustomerController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const customerRepository = new CustomerRepository();

    try {
      await customerRepository.delete(Number(id));
      res.status(200).json({ message: 'Cliente deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
