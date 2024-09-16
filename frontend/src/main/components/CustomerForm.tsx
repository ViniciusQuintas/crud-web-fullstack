'use client';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { CustomerEntity } from '@/domain/CustomerEntity';
import { CustomerService } from '@/interactors/CustomerService';

interface CustomerFormProps {
    onCustomerAdded: (customer: CustomerEntity) => void;
    onCustomerUpdated: (customer: CustomerEntity) => void;
    initialData?: CustomerEntity | null;
    buttonLabel?: string;
    isEditing?: boolean;
}

export default function CustomerForm({ onCustomerAdded, initialData, buttonLabel = 'Cadastrar', onCustomerUpdated, isEditing }: CustomerFormProps) {
    useEffect(() => {
        if (initialData) {
          setNewCustomer({
            name: initialData.name,
            cpf: initialData.cpf,
            address: initialData.address ?? '',
            phone: initialData.phone ?? ''
          });
        }
      }, [initialData]);
    
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        cpf: '',
        address: '',
        phone: ''
    });
    const [error, setError] = useState<string | null>(null);
    const customerService = new CustomerService();
    
    const validateCPF = (cpf: string): boolean => {
        cpf = cpf.replace(/\D/g, '');
      
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf))
          return false;
      
        let sum = 0;
        for (let i = 0; i < 9; i++)
          sum += Number(cpf.charAt(i)) * (10 - i);
        
        let remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== Number(cpf.charAt(9))) return false;
      
        sum = 0;
        for (let i = 0; i < 10; i++)
          sum += Number(cpf.charAt(i)) * (11 - i);
      
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        return remainder === Number(cpf.charAt(10));
      }
      
      const validateCNPJ = (cnpj: string): boolean => {
        cnpj = cnpj.replace(/\D/g, '');

        if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj))
            return false;

        let length = cnpj.length - 2;
        let numbers = cnpj.substring(0, length);
        const digits = cnpj.substring(length);
        let sum = 0;
        let pos = length - 7;

        for (let i = length; i >= 1; i--) {
            sum += Number(numbers.charAt(length - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== Number(digits.charAt(0))) return false;

        length++;
        numbers = cnpj.substring(0, length);
        sum = 0;
        pos = length - 7;

        for (let i = length; i >= 1; i--) {
            sum += Number(numbers.charAt(length - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        return result === Number(digits.charAt(1));
    };
 
    const formatCpfCnpj = (v: string) => {
        v = v.replace(/\D/g, "");

        if (v.length <= 11) {
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else {
            v = v.replace(/^(\d{2})(\d)/, "$1.$2");
            v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
            v = v.replace(/(\d{4})(\d)/, "$1-$2");
        }

        return v;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newCustomer.name || !newCustomer.cpf) {
            setError('Nome e CPF/CNPJ são obrigatórios!');
            return;
        }
        
        const cleanedCpfCnpj = newCustomer.cpf.replace(/\D/g, '');
        
        if (cleanedCpfCnpj.length === 11) {
            if (!validateCPF(cleanedCpfCnpj)) {
                setError('CPF inválido!');
                return;
            }
        } else if (cleanedCpfCnpj.length === 14) {
            if (!validateCNPJ(cleanedCpfCnpj)) {
                setError('CNPJ inválido!');
                return;
            }
        } else {
            setError('CPF ou CNPJ inválido!');
            return;
        }
        
        try {
            const cleanedCpf = newCustomer.cpf.replace(/\D/g, ''); 
            const cleanedPhone = newCustomer.phone.replace(/\D/g, '');

            const existingCustomer = await customerService.findByCpfCnpj(cleanedCpf);
            
            if (existingCustomer) {
                const confirmDuplicity = confirm('CPF/CNPJ já cadastrado. Deseja continuar assim mesmo?');
                if (!confirmDuplicity) {
                    return;
                }
            }

            const customerEntity = new CustomerEntity({
                ...newCustomer,
                cpf: cleanedCpf,
                phone: cleanedPhone,
                id: initialData?.id,
            });
            
            if (isEditing && initialData) {
                await customerService.updateCustomer(customerEntity);
                onCustomerUpdated(customerEntity);
              } else {
                const addedCustomer = await customerService.createCustomer(customerEntity);
                onCustomerAdded(addedCustomer);
              }

            setError(null);
            setNewCustomer({ name: '', cpf: '', address: '', phone: '' });
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Nome <span className='text-red-500'>*</span></label>
                <input
                    id="name"
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out invalid:focus:ring-red-500"
                    type="text"
                    placeholder="Digite o nome"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    required
                    pattern="[A-Za-zÀ-ÖØ-Ýà-öø-ÿ\s]+"
                    title="O nome não pode conter números"

                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="cpf">CPF/CNPJ <span className='text-red-500'>*</span></label>
                <input
                    id="cpf"
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out invalid:focus:ring-red-500"
                    placeholder="Digite o CPF/CNPJ"
                    value={formatCpfCnpj(newCustomer.cpf)}
                    onChange={(e) => setNewCustomer({ ...newCustomer, cpf: e.target.value })}
                    maxLength={18}
                    pattern="\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
                    title="O CPF deve ter 11 dígitos e o CNPJ deve ter 14 dígitos"
                    minLength={11}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">Telefone</label>
                <InputMask
                    mask="(99) 99999-9999"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                >
                    <input
                        id="phone"
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        placeholder="Digite o telefone"
                    />
                </InputMask>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="address">Endereço</label>
                <input
                    id="address"
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    type="text"
                    placeholder="Digite o endereço"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                />
            </div>

            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
            >
                {buttonLabel}
            </button>
        </form>
    );
}
