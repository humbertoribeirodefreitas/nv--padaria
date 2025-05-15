export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'paes' | 'bolos' | 'doces' | 'salgados' | 'bebidas';
  featured?: boolean;
  ingredients?: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  available: boolean;
}