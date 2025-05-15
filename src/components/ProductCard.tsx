import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Info } from 'lucide-react';
import { Product } from '../types/Product';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <Link 
      to={`/menu/${product.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.featured && (
          <div className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Destaque
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-bold text-amber-900 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
          <span className="font-bold text-amber-700">
            {formatPrice(product.price)}
          </span>
        </div>
        
        <p className="text-amber-800 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {product.category === 'paes' && <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Pães</span>}
            {product.category === 'bolos' && <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">Bolos</span>}
            {product.category === 'doces' && <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Doces</span>}
            {product.category === 'salgados' && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Salgados</span>}
            {product.category === 'bebidas' && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Bebidas</span>}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full transition-colors"
              aria-label="Adicionar ao carrinho"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
            <Link
              to={`/menu/${product.id}`}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors"
              aria-label="Ver detalhes"
            >
              <Info className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;