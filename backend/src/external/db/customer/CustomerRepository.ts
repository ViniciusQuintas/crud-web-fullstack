import { CustomerEntity } from '../../../domain/customer/CustomerEntity';
import { getConnection } from '../db';

interface QueryResult {
  ID: number; 
}

export class CustomerRepository {
  async save(customer: CustomerEntity): Promise<CustomerEntity> {
    const db = await getConnection();

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO customers (name, cpf_cnpj, address, phone)
                     VALUES (?, ?, ?, ?) RETURNING id`;
      
      db.query(query, [customer.name, customer.cpf, customer.address, customer.phone], (err, result: QueryResult | any) => {
        db.detach();

        if (err) {
          return reject(err);
        }
        
        if (result && result.ID) {
          customer.id = result.ID;
          resolve(customer);
        } else {
          reject(new Error('Falha ao obter o ID do cliente inserido'));
        }
      });
    });
  }
  
  async findAll(): Promise<CustomerEntity[]> {
    const db = await getConnection();

    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM customers`;
      
      db.query(query, [], (err, result) => {
        db.detach();

        if (err) {
          return reject(err);
        }

        const customers = result.map((row: any) => {
          return new CustomerEntity({
            id: row.ID,
            name: row.NAME,
            cpf: row.CPF_CNPJ,
            address: row.ADDRESS,
            phone: row.PHONE
          });
        });
        resolve(customers);
      });
    });
  }
  
  async findByCpfCnpj(cpfCnpj: string): Promise<CustomerEntity | null> {
    const db = await getConnection();

    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM customers WHERE cpf_cnpj = ?`;
      
      db.query(query, [cpfCnpj], (err, result) => {
        db.detach();

        if (err || result.length === 0) {
          return resolve(null);
        }

        const row = result[0];
        const customer = new CustomerEntity({
          id: row.ID,
          name: row.NAME,
          cpf: row.CPF_CNPJ,
          address: row.ADDRESS,
          phone: row.PHONE
        });

        resolve(customer);
      });
    });
  }
  
  async update(customer: CustomerEntity): Promise<void> {
    const db = await getConnection();

    return new Promise((resolve, reject) => {
      const query = `UPDATE customers SET name = ?, cpf_cnpj = ?, address = ?, phone = ? WHERE id = ?`;

      db.query(query, [customer.name, customer.cpf, customer.address, customer.phone, customer.id], (err) => {
        db.detach();

        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  }
  
  async delete(id: number): Promise<void> {
    const db = await getConnection();

    return new Promise((resolve, reject) => {
      const query = `DELETE FROM customers WHERE id = ?`;

      db.query(query, [id], (err) => {
        db.detach();

        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  }
}