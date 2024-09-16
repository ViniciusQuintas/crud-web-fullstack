import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { RegisterCustomerController } from '../../adapters/customer/RegisterCustomerController';
import { CustomerRepository }  from '../../external/db/customer/CustomerRepository';
import { UpdateCustomerController } from '../../adapters/customer/UpdateCustomerController';
import { DeleteCustomerController } from '../../adapters/customer/DeleteCustomerController';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post('/customers', (req: Request, res: Response) => {
  const registerCustomerController = new RegisterCustomerController();
  registerCustomerController.handle(req, res);
});

app.get('/customers', async (req: Request, res: Response) => {
  const { cpf_cnpj } = req.query;

  try {
    const customerRepository = new CustomerRepository();

    if (cpf_cnpj) {
      const customer = await customerRepository.findByCpfCnpj(cpf_cnpj as string);
      if (!customer) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      return res.json(customer);
    }

    const customers = await customerRepository.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});


app.put('/customers/:id', (req: Request, res: Response) => {
  const updateCustomerController = new UpdateCustomerController();
  updateCustomerController.handle(req, res); // Chama o controlador de atualização
});

app.delete('/customers/:id', (req: Request, res: Response) => {
  const deleteCustomerController = new DeleteCustomerController();
  deleteCustomerController.handle(req, res);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});