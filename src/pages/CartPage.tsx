import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removido do carrinho`);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Carrinho esvaziado');
  };

  const cartTotal = getCartTotal();
  const deliveryFee = 5.00; // Fixed delivery fee
  const totalWithDelivery = cartTotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-3xl font-bold text-amber-900 mb-4">Seu Carrinho está Vazio</h2>
        <p className="mb-8 text-gray-600">Adicione alguns produtos deliciosos ao seu carrinho para continuar.</p>
        <Link
          to="/menu"
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-bold text-amber-900">Seu Carrinho</h1>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-800 font-medium flex items-center transition-colors"
        >
          <Trash2 className="h-5 w-5 mr-2" />
          Esvaziar Carrinho
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map(({ product, quantity }) => (
                    <li key={product.id} className="py-6 flex">
                      <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-base font-medium text-gray-900">
                              <Link to={`/menu/${product.id}`} className="hover:text-amber-600">
                                {product.name}
                              </Link>
                            </h3>
                            <p className="ml-4 text-base font-medium text-amber-700">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-1">{product.description}</p>
                        </div>

                        <div className="flex-1 flex items-end justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(product.id, quantity - 1)}
                              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                              disabled={quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            
                            <span className="font-medium text-gray-700">{quantity}</span>
                            
                            <button
                              onClick={() => handleQuantityChange(product.id, quantity + 1)}
                              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex items-center">
                            <p className="text-base font-medium text-gray-700 mr-4">
                              {formatPrice(product.price * quantity)}
                            </p>
                            <button
                              onClick={() => handleRemoveItem(product.id, product.name)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continuar Comprando
          </Link>
        </div>

        <div className="mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>
              
              <div className="flow-root">
                <dl className="divide-y divide-gray-200">
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-700">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">{formatPrice(cartTotal)}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-700">Taxa de Entrega</dt>
                    <dd className="text-sm font-medium text-gray-900">{formatPrice(deliveryFee)}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-amber-700">{formatPrice(totalWithDelivery)}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                >
                  Finalizar Pedido
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;