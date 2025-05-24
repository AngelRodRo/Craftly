interface Filter {
  name: string;
  price: {
    min: number;
    max: number;
  };
  category: string[];
}

export type { Filter };
