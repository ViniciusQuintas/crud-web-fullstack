import { CustomerEntity } from '@/domain/CustomerEntity';
import { X } from 'lucide-react';

interface DeleteCustomerModalProps {
  customer: CustomerEntity;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteCustomerModal({ customer, onClose, onDelete }: DeleteCustomerModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button className="absolute top-4 right-3" onClick={onClose}>
          <X className="w-6 h-6 text-gray-600 hover:text-gray-800 duration-300" />
        </button>
        <h2 className="text-xl font-bold mb-4">Tem certeza que deseja excluir {customer.name}?</h2>
        <p className="mb-6">Essa ação não pode ser desfeita.</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded-lg mr-2 hover:bg-gray-500"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            onClick={onDelete}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
