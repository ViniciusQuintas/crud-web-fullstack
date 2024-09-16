export class CustomerEntity {
  public id?: number;
  public name: string;
  public cpf: string;
  public address?: string;
  public phone?: string;

  constructor(data: any) {
    if (!data.name || !data.cpf) {
      throw new Error('Dado inválido');
    }
    this.id = data.id;
    this.name = data.name;
    this.cpf = data.cpf;
    this.address = data.address;
    this.phone = data.phone;
  }
}