interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { Service };
