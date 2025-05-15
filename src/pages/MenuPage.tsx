import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { products, getProductsByCategory, searchProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/Product';

const MenuPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'paes', name: 'Pães' },
    { id: 'bolos', name: 'Bolos' },
    { id: 'doces', name: 'Doces' },
    { id: 'salgados', name: 'Salgados' },
    { id: 'bebidas', name: 'Bebidas' },
  ];

  useEffect(() => {
    // Filter products based on search query and active category
    let filtered: Product[] = [];
    
    if (searchQuery) {
      filtered = searchProducts(searchQuery);
    } else if (activeCategory === 'all') {
      filtered = products;
    } else {
      filtered = getProductsByCategory(activeCategory);
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, activeCategory]);

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-amber-900 text-center">
          Nosso Cardápio
        </h1>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <div className="md:hidden">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Categoria</label>
                <div className="relative">
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent sm:text-sm rounded-lg"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Category Tabs */}
          <div className="hidden md:flex mt-8 border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Categorias">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    py-3 px-1 font-medium text-sm border-b-2 whitespace-nowrap
                    ${activeCategory === category.id 
                      ? 'border-amber-600 text-amber-700' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                  aria-current={activeCategory === category.id ? 'page' : undefined}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Nenhum produto encontrado.</p>
            <p className="mt-2 text-amber-700">
              Tente buscar com outros termos ou selecionar outra categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;