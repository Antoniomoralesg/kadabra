export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    stock: number;
    description?: string;  // Haz que 'description' sea opcional
    category?: string;     // También puedes hacer que otras propiedades sean opcionales si no siempre están presentes
    rating?: {
      rate: number;
      count: number;
    };
  }
  