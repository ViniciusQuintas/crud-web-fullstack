import CustomerAdapter from '@/adapters/CustomerAdapter';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Sistema de Gerenciamento</h1>
      <CustomerAdapter />
    </div>
  );
}