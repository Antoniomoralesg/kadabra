export interface Product {
  id: number;
  title: string;
  price: number;
  uniqueId?: string; // Campo adicional para identificar instancias únicas
  image: string;
  stock: number;
  description?: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
}
