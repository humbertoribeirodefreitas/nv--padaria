import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = id ? getProductById(id) : undefined;
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Produto não encontrado</h2>
        <p className="mb-8 text-gray-600">O produto que você está procurando não existe ou foi removido.</p>
        <button
          onClick={() => navigate('/menu')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar para o cardápio
        </button>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/menu')}
        className="inline-flex items-center space-x-2 text-amber-700 hover:text-amber-800 mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Voltar para o cardápio</span>
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-72 md:h-full object-cover"
            />
          </div>
          
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="flex items-center mb-2">
              <span className={`
                px-3 py-1 rounded-full text-xs font-semibold 
                ${product.category === 'paes' ? 'bg-amber-100 text-amber-800' : ''}
                ${product.category === 'bolos' ? 'bg-pink-100 text-pink-800' : ''}
                ${product.category === 'doces' ? 'bg-purple-100 text-purple-800' : ''}
                ${product.category === 'salgados' ? 'bg-blue-100 text-blue-800' : ''}
                ${product.category === 'bebidas' ? 'bg-green-100 text-green-800' : ''}
              `}>
                {product.category === 'paes' && 'Pães'}
                {product.category === 'bolos' && 'Bolos'}
                {product.category === 'doces' && 'Doces'}
                {product.category === 'salgados' && 'Salgados'}
                {product.category === 'bebidas' && 'Bebidas'}
              </span>
              
              {product.featured && (
                <span className="ml-2 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Destaque
                </span>
              )}
            </div>
            
            <h1 className="font-serif text-3xl font-bold text-amber-900 mb-4">{product.name}</h1>
            
            <p className="text-lg text-gray-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Ingredientes:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            {product.allergens && product.allergens.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Alergênicos:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map((allergen, index) => (
                    <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {product.nutritionalInfo && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-2">Informação Nutricional:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="bg-gray-100 p-2 rounded text-center">
                    <p className="text-sm text-gray-500">Calorias</p>
                    <p className="font-bold">{product.nutritionalInfo.calories} kcal</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded text-center">
                    <p className="text-sm text-gray-500">Proteínas</p>
                    <p className="font-bold">{product.nutritionalInfo.protein}g</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded text-center">
                    <p className="text-sm text-gray-500">Carboidratos</p>
                    <p className="font-bold">{product.nutritionalInfo.carbs}g</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded text-center">
                    <p className="text-sm text-gray-500">Gorduras</p>
                    <p className="font-bold">{product.nutritionalInfo.fat}g</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center mb-6">
              <div className="text-2xl font-bold text-amber-700">
                {formatPrice(product.price)}
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                
                <span className="font-medium text-lg w-8 text-center">{quantity}</span>
                
                <button
                  onClick={increaseQuantity}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;