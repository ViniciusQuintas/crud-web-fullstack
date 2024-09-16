import { Request, Response } from 'express';
import { RegisterCustomerUseCase } from '../../interactors/customer/RegisterCustomerUseCase';

export class RegisterCustomerController {
  private registerCustomerUseCase: RegisterCustomerUseCase;

  constructor() {
    this.registerCustomerUseCase = new RegisterCustomerUseCase();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.registerCustomerUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}