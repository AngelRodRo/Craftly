interface Filter {
  name: string | null;
  priceMin: number | null;
  priceMax: number | null;
  category: string[];
}

export type { Filter };
