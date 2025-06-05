import { useEffect } from "react";
import { useSearchParams } from "react-router";

import { useAppDispatch, useAppSelector } from "@/app/hook";
import { setFilter } from "@/features/Services/servicesSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { DEFAULT_SERVICE_LIMIT } from "@/features/Services/constants/service";

export default function Filters() {
  const categories = useAppSelector((state) => state.services.categories);
  const filter = useAppSelector((state) => state.services.filter);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name") ?? "";
    const priceMin = searchParams.get("priceMin") ?? "";
    const priceMax = searchParams.get("priceMax") ?? "";
    const category = searchParams.get("category") ?? "all";
    const page = searchParams.get("page") ?? 1;
    const limit = searchParams.get("limit") ?? DEFAULT_SERVICE_LIMIT;

    dispatch(
      setFilter({
        ...filter,
        name,
        priceMin: priceMin ? Number(priceMin) : null,
        priceMax: priceMax ? Number(priceMax) : null,
        category: category.split(","),
        page: Number(page),
        limit: Number(limit),
      })
    );
  }, [searchParams, dispatch, setSearchParams]);

  const handleFilterChange = (key: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(key, value);
      return prev;
    });

    if (key === "category") {
      if (value === "all") {
        dispatch(setFilter({ ...filter, category: [] }));
      } else {
        dispatch(setFilter({ ...filter, category: [value] }));
      }
    } else {
      dispatch(setFilter({ ...filter, [key]: value }));
    }
  };

  return (
    <div className="flex flex-col gap-2 ">
      <h2 className="text-2xl font-bold">Filters</h2>
      <Select
        value={
          filter.category && filter.category.length > 0
            ? filter.category.join(",")
            : "all"
        }
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filter.priceMin === null ? "" : filter.priceMin.toString()}
        onValueChange={(value) => handleFilterChange("priceMin", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">0</SelectItem>
          <SelectItem value="100">100</SelectItem>
          <SelectItem value="200">200</SelectItem>
          <SelectItem value="300">300</SelectItem>
          <SelectItem value="400">400</SelectItem>
          <SelectItem value="500">500</SelectItem>
          <SelectItem value="600">600</SelectItem>
          <SelectItem value="700">700</SelectItem>
          <SelectItem value="800">800</SelectItem>
          <SelectItem value="900">900</SelectItem>
          <SelectItem value="1000">1000</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filter.priceMax === null ? "" : filter.priceMax.toString()}
        onValueChange={(value) => handleFilterChange("priceMax", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">0</SelectItem>
          <SelectItem value="100">100</SelectItem>
          <SelectItem value="200">200</SelectItem>
          <SelectItem value="300">300</SelectItem>
          <SelectItem value="400">400</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
