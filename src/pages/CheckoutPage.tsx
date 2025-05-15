import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { QrCode, CreditCard, Wallet, Truck, Store, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

type DeliveryMethod = 'delivery' | 'pickup';
type PaymentMethod = 'pix' | 'credit' | 'debit' | 'cash';

interface CheckoutForm {
  name: string;
  phone: string;
  email: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  notes?: string;
}

const initialFormState: CheckoutForm = {
  name: '',
  phone: '',
  email: '',
  address: {
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
  },
  notes: '',
};

const CheckoutPage: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<CheckoutForm>(initialFormState);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const cartTotal = getCartTotal();
  const deliveryFee = deliveryMethod === 'delivery' ? 5.00 : 0;
  const totalWithDelivery = cartTotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm({
        ...form,
        [parent]: {
          ...form[parent as keyof CheckoutForm],
          [child]: value
        }
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    // Basic validation
    if (!form.name || !form.phone || !form.email) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }

    if (deliveryMethod === 'delivery') {
      if (!form.address?.street || !form.address?.number || 
          !form.address?.neighborhood || !form.address?.city || 
          !form.address?.state || !form.address?.zipCode) {
        toast.error("Por favor, preencha todos os campos do endereço.");
        return false;
      }
    }

    if (!termsAccepted) {
      toast.error("Você precisa aceitar os termos e condições.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      const orderId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      
      // Clear cart and navigate to success page
      clearCart();
      toast.success("Pedido realizado com sucesso!");
      
      // Generate fake PIX code if payment method is PIX
      if (paymentMethod === 'pix') {
        setStep(2);
      } else {
        navigate('/orders');
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/cart')}
        className="inline-flex items-center space-x-2 text-amber-700 hover:text-amber-800 mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Voltar para o carrinho</span>
      </button>

      <div className="md:grid md:grid-cols-3 md:gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {step === 1 ? (
              <div className="p-6">
                <h2 className="font-serif text-2xl font-bold text-amber-900 mb-6">Finalizar Pedido</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Completo*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Telefone*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Método de Entrega</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          deliveryMethod === 'delivery'
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setDeliveryMethod('delivery')}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full border ${
                            deliveryMethod === 'delivery' ? 'border-amber-500' : 'border-gray-400'
                          } flex items-center justify-center`}>
                            {deliveryMethod === 'delivery' && <div className="w-3 h-3 rounded-full bg-amber-500"></div>}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Truck className="h-5 w-5 mr-2" />
                            <span>Entrega</span>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 pl-8">Entrega em até 45 minutos</p>
                      </div>
                      
                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          deliveryMethod === 'pickup'
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setDeliveryMethod('pickup')}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full border ${
                            deliveryMethod === 'pickup' ? 'border-amber-500' : 'border-gray-400'
                          } flex items-center justify-center`}>
                            {deliveryMethod === 'pickup' && <div className="w-3 h-3 rounded-full bg-amber-500"></div>}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Store className="h-5 w-5 mr-2" />
                            <span>Retirada</span>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 pl-8">Retire na loja em 20 minutos</p>
                      </div>
                    </div>
                  </div>

                  {deliveryMethod === 'delivery' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Endereço de Entrega</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-1">
                            Rua*
                          </label>
                          <input
                            type="text"
                            id="address.street"
                            name="address.street"
                            value={form.address?.street}
                            onChange={handleInputChange}
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            required={deliveryMethod === 'delivery'}
                          />
                        </div>
                        <div>
                          <label htmlFor="address.number" className="block text-sm font-medium text-gray-700 mb-1">
                            Número*
                          </label>
                          <input
                            type="text"
                            id="address.number"
                            name="address.number"
                            value={form.address?.number}
                            onChange={handleInputChange}
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            required={deliveryMethod === 'delivery'}
                          />
                        </div>
                        <div>
                          <label htmlFor="address.complement" className="block text-sm font-medium text-gray-700 mb-1">
                            Complemento
                          </label>
                          <input
                            type="text"
                            id="address.complement"
                            name="address.complement"
                            value={form.address?.complement}
                            onChange={handleInputChange}
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="address.neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                            Bairro*
                          </label>
                          <input
                            type="text"
                            id="address.neighborhood"
                            name="address.neighborhood"
                            value={form.address?.neighborhood}
                            onChange={handleInputChange}
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            required={deliveryMethod === 'delivery'}
                          />
                        </div>
                        <div>
                          <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            CEP*
                          </label>
                          <input
                            type="text"
                            id="address.zipCode"
                            name="address.zipCode"
                            value={form.address?.zipCode}
                            onChange={handleInputChange}
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            required={deliveryMethod === 'delivery'}
                          />
                        </div>
                        <div>
                          <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">
                            Cidade*
                          </label>
                          <input
                            type="text"
                            id="address.city"
                            name="address.city"
                            value={form.address?.city}
                            onChange={handleInputChange}
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            required={deliveryMethod === 'delivery'}
                          />
                        </div>
                        <div>
                          <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-1">
                            Estado*
                          </label>
                          <select
                            id="address.state"
                            name="address.state"
                            value={form.address?.state}
                            onChange={handleInputChange}
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            required={deliveryMethod === 'delivery'}
                          >
                            <option value="">Selecione...</option>
                            {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Método de Pagamento</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'pix'
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setPaymentMethod('pix')}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full border ${
                            paymentMethod === 'pix' ? 'border-amber-500' : 'border-gray-400'
                          } flex items-center justify-center`}>
                            {paymentMethod === 'pix' && <div className="w-3 h-3 rounded-full bg-amber-500"></div>}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <QrCode className="h-5 w-5 mr-2" />
                            <span>PIX</span>
                          </div>
                        </div>
                      </div>
                      
                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'credit'
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setPaymentMethod('credit')}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full border ${
                            paymentMethod === 'credit' ? 'border-amber-500' : 'border-gray-400'
                          } flex items-center justify-center`}>
                            {paymentMethod === 'credit' && <div className="w-3 h-3 rounded-full bg-amber-500"></div>}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <CreditCard className="h-5 w-5 mr-2" />
                            <span>Cartão de Crédito</span>
                          </div>
                        </div>
                      </div>
                      
                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'debit'
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setPaymentMethod('debit')}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full border ${
                            paymentMethod === 'debit' ? 'border-amber-500' : 'border-gray-400'
                          } flex items-center justify-center`}>
                            {paymentMethod === 'debit' && <div className="w-3 h-3 rounded-full bg-amber-500"></div>}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <CreditCard className="h-5 w-5 mr-2" />
                            <span>Cartão de Débito</span>
                          </div>
                        </div>
                      </div>
                      
                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'cash'
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setPaymentMethod('cash')}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full border ${
                            paymentMethod === 'cash' ? 'border-amber-500' : 'border-gray-400'
                          } flex items-center justify-center`}>
                            {paymentMethod === 'cash' && <div className="w-3 h-3 rounded-full bg-amber-500"></div>}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Wallet className="h-5 w-5 mr-2" />
                            <span>Dinheiro</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {paymentMethod === 'cash' && (
                      <div className="mt-4">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                          Precisa de troco? Informe abaixo:
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={form.notes}
                          onChange={handleInputChange}
                          rows={2}
                          className="block w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Ex: Preciso de troco para R$ 50,00"
                        ></textarea>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Concordo com os <a href="#" className="text-amber-600 hover:text-amber-800">termos e condições</a> e <a href="#" className="text-amber-600 hover:text-amber-800">política de privacidade</a>
                      </span>
                    </label>
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-colors ${
                        isLoading ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? 'Processando...' : 'Finalizar Pedido'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-6 text-center">
                <h2 className="font-serif text-2xl font-bold text-amber-900 mb-6">Pagamento via PIX</h2>
                
                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                  <div className="mb-4">
                    <QrCode className="h-32 w-32 mx-auto text-amber-800" />
                  </div>
                  <p className="text-gray-700 mb-4">
                    Escaneie o QR Code acima com o app do seu banco ou copie a chave PIX abaixo:
                  </p>
                  <div className="relative mb-4">
                    <input
                      type="text"
                      value="00020126580014BR.GOV.BCB.PIX0136a629532e-7693-4846-b028-f142113bd8f15204000053039865802BR5913Padaria Art6009SAO PAULO62070503***63041D3D"
                      readOnly
                      className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600 pr-24"
                    />
                    <button 
                      className="absolute right-1 top-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm"
                      onClick={() => {
                        navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136a629532e-7693-4846-b028-f142113bd8f15204000053039865802BR5913Padaria Art6009SAO PAULO62070503***63041D3D");
                        toast.success("Chave PIX copiada!");
                      }}
                    >
                      Copiar
                    </button>
                  </div>
                </div>
                
                <div className="mb-6 text-left">
                  <h3 className="font-semibold text-gray-800 mb-2">Instruções:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Abra o aplicativo do seu banco</li>
                    <li>Escolha a opção de pagamento via PIX</li>
                    <li>Escaneie o QR Code ou cole a chave PIX</li>
                    <li>Confira os dados do pagamento</li>
                    <li>Confirme a transação</li>
                  </ol>
                </div>
                
                <p className="text-amber-700 mb-6">
                  Após a confirmação do pagamento, seu pedido será processado automaticamente.
                </p>
                
                <div className="flex justify-center">
                  <button
                    onClick={() => navigate('/orders')}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                  >
                    Acompanhar Meu Pedido
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 md:mt-0">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>
              
              <div className="max-h-80 overflow-y-auto mb-4">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map(({ product, quantity }) => (
                    <li key={product.id} className="py-3 flex justify-between">
                      <div className="flex">
                        <span className="font-medium text-gray-700">{quantity}x</span>
                        <span className="ml-2 text-gray-700">{product.name}</span>
                      </div>
                      <span className="text-amber-700 font-medium">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <dl className="divide-y divide-gray-200">
                  <div className="py-2 flex justify-between">
                    <dt className="text-sm font-medium text-gray-700">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">{formatPrice(cartTotal)}</dd>
                  </div>
                  <div className="py-2 flex justify-between">
                    <dt className="text-sm font-medium text-gray-700">Taxa de Entrega</dt>
                    <dd className="text-sm font-medium text-gray-900">{formatPrice(deliveryFee)}</dd>
                  </div>
                  <div className="py-2 flex justify-between">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-amber-700">{formatPrice(totalWithDelivery)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;