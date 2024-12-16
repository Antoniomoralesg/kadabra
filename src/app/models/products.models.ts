export interface Product {
  id: number;
  title: string;
  price: number;
  uniqueId?: string;
  image: string;
  stock: number;
  quantity?: number;
  description?: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
}
