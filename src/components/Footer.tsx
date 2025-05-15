import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Clock } from 'lucide-react';
import BakeryLogo from './BakeryLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-amber-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BakeryLogo className="h-8 w-8 text-amber-100" />
              <span className="font-serif text-xl font-bold">Padaria Artesanal</span>
            </div>
            <p className="mb-4">Transformando ingredientes simples em momentos deliciosos desde 2020.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-amber-300 transition-colors">Início</Link></li>
              <li><Link to="/menu" className="hover:text-amber-300 transition-colors">Cardápio</Link></li>
              <li><Link to="/orders" className="hover:text-amber-300 transition-colors">Meus Pedidos</Link></li>
              <li><Link to="/contact" className="hover:text-amber-300 transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li><Link to="/menu?category=paes" className="hover:text-amber-300 transition-colors">Pães</Link></li>
              <li><Link to="/menu?category=bolos" className="hover:text-amber-300 transition-colors">Bolos</Link></li>
              <li><Link to="/menu?category=doces" className="hover:text-amber-300 transition-colors">Doces</Link></li>
              <li><Link to="/menu?category=salgados" className="hover:text-amber-300 transition-colors">Salgados</Link></li>
              <li><Link to="/menu?category=bebidas" className="hover:text-amber-300 transition-colors">Bebidas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Av. das Padarias, 123<br />São Paulo, SP</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>(11) 98765-4321</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Seg-Sex: 6h às 20h<br />Sáb-Dom: 7h às 18h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-amber-800">
          <p className="text-center">© {new Date().getFullYear()} Padaria Artesanal. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;