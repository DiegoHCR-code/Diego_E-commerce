export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface OrderItem {
    productId: string;
    quantity: number;
  }
  
  export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    createdAt: Date;
  }
  