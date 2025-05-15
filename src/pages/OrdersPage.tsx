import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShoppingBag, Package, Check, X, ArrowRight } from 'lucide-react';
import { Order, OrderStatus } from '../types/Order';

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "ORD123456",
    customerId: "1",
    items: [
      {
        product: {
          id: "1",
          name: "Pão Francês",
          description: "Pão francês tradicional",
          price: 0.50,
          image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          category: "paes",
          available: true
        },
        quantity: 10,
        price: 0.50
      },
      {
        product: {
          id: "4",
          name: "Coxinha de Frango",
          description: "Coxinha crocante recheada com frango desfiado temperado",
          price: 4.50,
          image: "https://images.pexels.com/photos/5779766/pexels-photo-5779766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          category: "salgados",
          available: true
        },
        quantity: 2,
        price: 4.50
      }
    ],
    total: 14.00,
    status: "ready",
    paymentMethod: "pix",
    paymentStatus: "paid",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
    deliveryAddress: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 101",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01001-000"
    }
  },
  {
    id: "ORD123455",
    customerId: "1",
    items: [
      {
        product: {
          id: "2",
          name: "Bolo de Chocolate",
          description: "Bolo de chocolate fofinho com cobertura de ganache",
          price: 35.90,
          image: "https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          category: "bolos",
          available: true
        },
        quantity: 1,
        price: 35.90
      }
    ],
    total: 35.90,
    status: "delivered",
    paymentMethod: "credit",
    paymentStatus: "paid",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30).toISOString(), // 2 days ago + 30 minutes
    deliveryAddress: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 101",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01001-000"
    }
  },
  {
    id: "ORD123454",
    customerId: "1",
    items: [
      {
        product: {
          id: "7",
          name: "Pão de Queijo",
          description: "Tradicional pão de queijo mineiro",
          price: 2.50,
          image: "https://images.pexels.com/photos/11659236/pexels-photo-11659236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          category: "paes",
          available: true
        },
        quantity: 6,
        price: 2.50
      },
      {
        product: {
          id: "6",
          name: "Café Expresso",
          description: "Café expresso forte e aromático",
          price: 3.50,
          image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          category: "bebidas",
          available: true
        },
        quantity: 1,
        price: 3.50
      }
    ],
    total: 18.50,
    status: "pending",
    paymentMethod: "pix",
    paymentStatus: "pending",
    pixCode: "00020126580014BR.GOV.BCB.PIX0136a629532e-7693-4846-b028-f142113bd8f15204000053039865802BR5913Padaria Art6009SAO PAULO62070503***63041D3D",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    deliveryAddress: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 101",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01001-000"
    }
  }
];

const OrdersPage: React.FC = () => {
  const [orders] = useState<Order[]>(mockOrders);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Aguardando Pagamento';
      case 'paid':
        return 'Pago';
      case 'preparing':
        return 'Preparando';
      case 'ready':
        return 'Pronto para Entrega';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'paid':
        return <Check className="h-5 w-5 text-amber-500" />;
      case 'preparing':
        return <ShoppingBag className="h-5 w-5 text-amber-500" />;
      case 'ready':
        return <Package className="h-5 w-5 text-green-500" />;
      case 'delivered':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-amber-100 text-amber-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'pix':
        return 'PIX';
      case 'credit':
        return 'Cartão de Crédito';
      case 'debit':
        return 'Cartão de Débito';
      case 'cash':
        return 'Dinheiro';
      default:
        return method;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-amber-900 mb-8">Meus Pedidos</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <ShoppingBag className="h-16 w-16 mx-auto text-amber-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Nenhum pedido encontrado</h2>
          <p className="text-gray-600 mb-6">Você ainda não fez nenhum pedido em nossa padaria.</p>
          <Link
            to="/menu"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Explorar Cardápio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Pedido #{order.id}</h3>
                    <p className="text-gray-600">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Itens do Pedido</h4>
                  <ul className="divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <li key={index} className="py-4 flex justify-between">
                        <div className="flex">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-16 w-16 rounded-md object-cover"
                          />
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">{item.product.name}</p>
                            <p className="text-gray-600">
                              {item.quantity} x {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-amber-700">
                            {formatPrice(item.quantity * item.price)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Detalhes do Pedido</h4>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <dt className="text-gray-600">Pagamento:</dt>
                      <dd className="text-gray-900">{getPaymentMethodText(order.paymentMethod)}</dd>
                      <dt className="text-gray-600">Status de Pagamento:</dt>
                      <dd className="text-gray-900">
                        {order.paymentStatus === 'paid' ? 'Pago' : 'Pendente'}
                      </dd>
                      <dt className="text-gray-600">Total:</dt>
                      <dd className="text-gray-900 font-medium">{formatPrice(order.total)}</dd>
                    </dl>
                  </div>

                  {order.deliveryAddress && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Endereço de Entrega</h4>
                      <address className="text-sm text-gray-600 not-italic">
                        {order.deliveryAddress.street}, {order.deliveryAddress.number}
                        {order.deliveryAddress.complement && `, ${order.deliveryAddress.complement}`}<br />
                        {order.deliveryAddress.neighborhood}<br />
                        {order.deliveryAddress.city} - {order.deliveryAddress.state}<br />
                        CEP: {order.deliveryAddress.zipCode}
                      </address>
                    </div>
                  )}
                </div>

                {order.status === 'pending' && order.paymentStatus === 'pending' && order.paymentMethod === 'pix' && (
                  <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-amber-800 mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Aguardando Pagamento
                    </h4>
                    <p className="text-sm text-amber-700 mb-3">
                      Seu pedido está esperando a confirmação do pagamento via PIX. Você pode realizar o pagamento escaneando o QR Code ou copiando a chave PIX.
                    </p>
                    <button
                      className="text-sm text-amber-800 bg-amber-200 hover:bg-amber-300 px-4 py-2 rounded-lg transition-colors inline-flex items-center"
                      onClick={() => {
                        navigator.clipboard.writeText(order.pixCode || "");
                        alert("Chave PIX copiada!");
                      }}
                    >
                      Copiar Chave PIX
                    </button>
                  </div>
                )}

                {order.status === 'ready' && (
                  <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      Pedido Pronto para Entrega/Retirada
                    </h4>
                    <p className="text-sm text-green-700">
                      Seu pedido está pronto! Se escolheu delivery, nosso entregador está a caminho. Se escolheu retirada, pode buscar na loja.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-end">
                  {order.status === 'delivered' && (
                    <Link
                      to="/menu"
                      className="inline-flex items-center px-4 py-2 border border-amber-600 rounded-md shadow-sm text-sm font-medium text-amber-600 bg-white hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                      Pedir Novamente
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;