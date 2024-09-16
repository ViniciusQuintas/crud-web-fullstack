import { CustomerEntity } from '@/domain/CustomerEntity';
import { Copy, Pencil, Trash2  } from 'lucide-react';

interface CustomerListProps {
  customers: CustomerEntity[];
  onCopy: (customer: CustomerEntity) => void;
  onEdit: (customer: CustomerEntity) => void;
  onDelete: (customer: CustomerEntity) => void;
}

export default function CustomerList({ customers, onCopy, onEdit, onDelete  }: CustomerListProps) {
  const formatCpfCnpj = (cpf: string): string => {
    if (cpf.length === 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const formatPhone = (phone: string): string => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md border-collapse">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="py-3 border-b border-gray-300">Código</th>
            <th className="py-3 border-b border-gray-300">Nome</th>
            <th className="py-3 border-b border-gray-300">CPF/CNPJ</th>
            <th className="py-3 border-b border-gray-300">Telefone</th>
            <th className="py-3 border-b border-gray-300">Endereço</th>
            <th className="py-3 border-b border-gray-300">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm text-center">
          {!customers.length || customers.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500 text-base">Nenhum cliente cadastrado</td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-800 transition duration-300 hover:text-white">
                <td className="py-3 border-b border-gray-300">{customer.id ?? ''}</td>
                <td className="py-3 border-b border-gray-300">{customer.name}</td>
                <td className="py-3 border-b border-gray-300">{formatCpfCnpj(customer.cpf)}</td>
                <td className="py-3 border-b border-gray-300">{formatPhone(customer.phone ?? '')}</td>
                <td className="py-3 border-b border-gray-300">{customer.address ?? ''}</td>
                <td className="py-3 border-b border-gray-300">
                  <button
                    className="text-blue-500 mx-3"
                    onClick={() => onCopy(customer)}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button className="text-yellow-600 mx-3" onClick={() => onEdit(customer)}>
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button className="text-red-500 mx-3" onClick={() => onDelete(customer)}>
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
