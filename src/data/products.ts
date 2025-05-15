import { Product } from '../types/Product';

export const products: Product[] = [
  {
    id: "1",
    name: "Pão Francês",
    description: "Pão francês tradicional, crocante por fora e macio por dentro. Feito com carinho todas as manhãs.",
    price: 0.50,
    image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "paes",
    featured: true,
    ingredients: ["farinha de trigo", "água", "fermento", "sal"],
    allergens: ["glúten"],
    nutritionalInfo: {
      calories: 140,
      protein: 4,
      carbs: 28,
      fat: 1
    },
    available: true
  },
  {
    id: "2",
    name: "Bolo de Chocolate",
    description: "Bolo de chocolate fofinho com cobertura de ganache. Uma explosão de sabor para os amantes de chocolate.",
    price: 35.90,
    image: "https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "bolos",
    featured: true,
    ingredients: ["farinha de trigo", "chocolate em pó", "ovos", "açúcar", "leite", "manteiga"],
    allergens: ["glúten", "leite", "ovos"],
    nutritionalInfo: {
      calories: 350,
      protein: 5,
      carbs: 45,
      fat: 18
    },
    available: true
  },
  {
    id: "3",
    name: "Croissant",
    description: "Croissant folhado e amanteigado. Perfeito para um café da manhã especial.",
    price: 4.90,
    image: "https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "paes",
    featured: false,
    ingredients: ["farinha de trigo", "manteiga", "açúcar", "fermento", "sal"],
    allergens: ["glúten", "leite"],
    nutritionalInfo: {
      calories: 240,
      protein: 5,
      carbs: 26,
      fat: 12
    },
    available: true
  },
  {
    id: "4",
    name: "Coxinha de Frango",
    description: "Coxinha crocante recheada com frango desfiado temperado. Um dos salgados mais queridos do Brasil.",
    price: 4.50,
    image: "https://images.pexels.com/photos/5779766/pexels-photo-5779766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "salgados",
    featured: true,
    ingredients: ["massa de batata", "farinha de trigo", "frango desfiado", "temperos"],
    allergens: ["glúten", "frango"],
    nutritionalInfo: {
      calories: 280,
      protein: 10,
      carbs: 30,
      fat: 14
    },
    available: true
  },
  {
    id: "5",
    name: "Pudim de Leite",
    description: "Pudim cremoso de leite condensado com calda de caramelo. Uma sobremesa clássica e irresistível.",
    price: 8.90,
    image: "https://images.pexels.com/photos/3186961/pexels-photo-3186961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "doces",
    featured: true,
    ingredients: ["leite condensado", "leite", "ovos", "açúcar"],
    allergens: ["leite", "ovos"],
    nutritionalInfo: {
      calories: 220,
      protein: 6,
      carbs: 35,
      fat: 8
    },
    available: true
  },
  {
    id: "6",
    name: "Café Expresso",
    description: "Café expresso forte e aromático. Perfeito para começar o dia com energia.",
    price: 3.50,
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "bebidas",
    featured: false,
    ingredients: ["café"],
    allergens: [],
    nutritionalInfo: {
      calories: 2,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    available: true
  },
  {
    id: "7",
    name: "Pão de Queijo",
    description: "Tradicional pão de queijo mineiro, quentinho e com muito queijo. Irresistível a qualquer hora do dia.",
    price: 2.50,
    image: "https://images.pexels.com/photos/11659236/pexels-photo-11659236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "paes",
    featured: true,
    ingredients: ["polvilho", "queijo", "óleo", "leite", "ovos"],
    allergens: ["leite", "ovos"],
    nutritionalInfo: {
      calories: 130,
      protein: 5,
      carbs: 15,
      fat: 7
    },
    available: true
  },
  {
    id: "8",
    name: "Brigadeiro Gourmet",
    description: "Brigadeiro artesanal feito com chocolate belga e finalizado com granulado especial.",
    price: 4.90,
    image: "https://images.pexels.com/photos/65475/chocolate-dark-coffee-confiserie-65475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "doces",
    featured: false,
    ingredients: ["leite condensado", "chocolate em pó", "manteiga", "granulado"],
    allergens: ["leite"],
    nutritionalInfo: {
      calories: 150,
      protein: 2,
      carbs: 25,
      fat: 6
    },
    available: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured === true);
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm)
  );
};