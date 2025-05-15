import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` 
          }}
        ></div>
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Sabor Artesanal <br />em Cada Pedaço
            </h1>
            <p className="text-xl mb-8 animate-fade-in animation-delay-300">
              Desde 2020 trazendo o melhor da panificação artesanal com ingredientes selecionados e receitas tradicionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-600">
              <Link
                to="/menu"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 flex items-center justify-center"
              >
                Ver Cardápio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-bold py-3 px-6 rounded-full transition-all"
              >
                Contato
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Nossa Padaria" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-amber-900">Nossa História</h2>
              <p className="text-lg text-amber-800 mb-6">
                Somos uma padaria familiar que começou com receitas passadas de geração em geração. Nossa paixão é transformar ingredientes simples em verdadeiras obras de arte culinárias.
              </p>
              <p className="text-lg text-amber-800 mb-8">
                Todos os dias, nossa equipe acorda bem cedo para garantir que cada cliente receba produtos fresquinhos, feitos com muito carinho e dedicação.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center text-amber-700 font-semibold hover:text-amber-600 transition-colors"
              >
                Conheça mais sobre nós
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-amber-900">Nossos Destaques</h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Conheça os produtos mais amados pelos nossos clientes. Preparados diariamente com ingredientes de primeira qualidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/menu" 
              className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
            >
              Ver Cardápio Completo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-amber-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-amber-900">O Que Nossos Clientes Dizem</h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              A opinião dos nossos clientes é muito importante para nós. Veja o que eles têm a dizer sobre nossos produtos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center text-amber-700 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-amber-900">{testimonial.name}</h4>
                    <p className="text-amber-700">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Faça Seu Pedido Agora</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experimente nossas delícias e tenha o sabor da nossa padaria no conforto da sua casa.
          </p>
          <Link 
            to="/menu" 
            className="bg-white text-amber-700 hover:bg-amber-100 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 inline-flex items-center"
          >
            Fazer Pedido
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

// Sample testimonials data
const testimonials = [
  {
    name: "Ana Silva",
    title: "Cliente Fiel",
    text: "Os pães são sempre fresquinhos e deliciosos. O pão de queijo então, é o melhor da cidade! Não consigo passar um dia sem visitar a padaria."
  },
  {
    name: "Carlos Oliveira",
    title: "Morador Local",
    text: "Moro no bairro há anos e essa padaria se tornou parte da minha rotina. Os produtos são de altíssima qualidade e o atendimento é sempre excelente."
  },
  {
    name: "Mariana Santos",
    title: "Confeiteira Amadora",
    text: "Como amante da confeitaria, posso dizer que os doces dessa padaria são excepcionais. O bolo de chocolate é simplesmente divino!"
  }
];

export default HomePage;