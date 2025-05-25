interface Filter {
  name: string | null;
  price: {
    min?: number;
    max?: number;
  };
  category: string[];
}

export type { Filter };
