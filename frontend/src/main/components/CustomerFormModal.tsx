'use client'
import { CustomerEntity } from '@/domain/CustomerEntity';
import CustomerForm from './CustomerForm';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface CustomerFormModalProps {
  onClose: () => void;
  onCustomerAdded: (customer: CustomerEntity) => void;
  onCustomerUpdated: (customer: CustomerEntity) => void;
  customer?: CustomerEntity | null;
  isEditing?: boolean;
}

export default function CustomerFormModal({ onClose, onCustomerAdded, onCustomerUpdated, customer, isEditing }: CustomerFormModalProps) {
  
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const modalElement = document.getElementById('customer-modal');
      if (modalElement && !modalElement.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div id="customer-modal" className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        
        <button className="absolute top-4 right-3" onClick={onClose}>
          <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
        </button>

        <h2 className="text-xl font-bold mb-4">
         {isEditing ? 'Editar Cliente' : customer ? 'Copiar Cliente' : 'Novo Cliente'}
        </h2>
        
        <CustomerForm onCustomerAdded={(customer) => {
          onCustomerAdded(customer);
          onClose();
        }} 
        initialData={customer}
        onCustomerUpdated={onCustomerUpdated}
        isEditing={isEditing}
        buttonLabel={isEditing ? 'Salvar' : customer ? 'Copiar' : 'Cadastrar'} />
      </div>
    </div>
  );
}
