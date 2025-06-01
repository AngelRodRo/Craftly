import { useAppDispatch, useAppSelector } from "@/app/hook";
import { setFilter } from "@/features/Services/servicesSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useSearchParams } from "react-router";

export default function Filters() {
  const categories = useAppSelector((state) => state.services.categories);
  const filter = useAppSelector((state) => state.services.filter);
  const dispatch = useAppDispatch();

  const [, setSearchParams] = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(key, value);
      return prev;
    });

    dispatch(setFilter({ ...filter, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Filters</h2>
      <Select onValueChange={(value) => handleFilterChange("category", value)}>
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
      <Select onValueChange={(value) => handleFilterChange("priceMin", value)}>
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
      <Select onValueChange={(value) => handleFilterChange("priceMax", value)}>
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
