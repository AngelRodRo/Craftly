interface Filter {
  name: string | null;
  priceMin: number | null;
  priceMax: number | null;
  category: string[];
  page: number;
  limit: number;
}

export type { Filter };
