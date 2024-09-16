'use client'
import { useEffect, useState } from 'react';
import { CustomerService } from '@/interactors/CustomerService';
import { CustomerEntity } from '@/domain/CustomerEntity';
import CustomerList from '@/main/components/CustomerList';
import CustomerFormModal from '@/main/components/CustomerFormModal';
import DeleteCustomerModal from '@/main/components/DeleteCustomerModal';
import { UserPlus } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CustomerAdapter() {
  const [customers, setCustomers] = useState<CustomerEntity[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerEntity | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const customerService = new CustomerService();

  useEffect(() => {
    async function fetchData() {
      const data = await customerService.getCustomers();
      setCustomers(data);
    }
    fetchData();
  }, []);

  const handleCustomerAdded = (newCustomer: CustomerEntity) => {
    setCustomers([...customers, newCustomer]);
    toast.success('Cliente cadastrado com sucesso!');
    setShowModal(false)
  };
  
  const handleNewCustomer = () => {
    setSelectedCustomer(null);
    setIsEditing(false);
    setShowModal(true);
  };
  
  const handleCopyCustomer = (customer: CustomerEntity) => {
    setSelectedCustomer(customer);
    setIsEditing(false);
    setShowModal(true);
  };
  
  const handleEditCustomer = (customer: CustomerEntity) => {
    setSelectedCustomer(customer);
    setIsEditing(true); 
    setShowModal(true);
  };
  
  const handleCustomerUpdated = (updatedCustomer: CustomerEntity) => {
    setCustomers(customers.map((customer) => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    )); 
    toast.success('Cliente editado com sucesso!');
    setShowModal(false)
  };
  
  
  const handleDeleteCustomer = (customer: CustomerEntity) => {
    setSelectedCustomer(customer); 
    setShowDeleteModal(true); 
  };

  const handleCustomerDeleted = async (id: number) => {
    await customerService.deleteCustomer(id); 
    setCustomers(customers.filter((customer) => customer.id !== id)); 
    toast.success('Cliente excluído com sucesso!');
    setShowDeleteModal(false)
  };

  return (
    <div className="container mx-auto p-4">


      <button
        className="bg-gray-800 flex text-white py-2 px-4 rounded duration-200 mb-6"
        onClick={handleNewCustomer} 
      >
        <UserPlus className='mr-2 w-6 h-6' /> Novo cliente 
      </button>
      
      <h2 className="text-xl font-bold mb-4">Clientes Cadastrados</h2>
      <CustomerList customers={customers} onCopy={handleCopyCustomer} onEdit={handleEditCustomer} onDelete={handleDeleteCustomer} />

      {showModal && (
        <CustomerFormModal
          onClose={() => setShowModal(false)} 
          onCustomerAdded={handleCustomerAdded} 
          onCustomerUpdated={handleCustomerUpdated}
          customer={selectedCustomer}
          isEditing={isEditing}
        />
      )}
      
      {showDeleteModal && selectedCustomer && (
        <DeleteCustomerModal
          customer={selectedCustomer}
          onClose={() => setShowDeleteModal(false)}
          onDelete={() => handleCustomerDeleted(selectedCustomer.id!)} 
        />
      )}
      
      <ToastContainer position="top-left" />
    </div>
  );
}