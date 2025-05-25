import { useAppDispatch, useAppSelector } from "@/app/hook";
import { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchServices,
} from "@/features/Services/servicesSlice";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { Filter } from "@/features/Services/types";

export default function Home() {
  const dispatch = useAppDispatch();
  const services = useAppSelector((state) => state.services.services);
  const categories = useAppSelector((state) => state.services.categories);

  const [filter, setFilter] = useState<Filter>({
    name: "",
    price: {
      min: 0,
      max: 0,
    },
    category: [],
  });

  useEffect(() => {
    dispatch(fetchServices(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex justify-center gap-2">
        <Input type="text" placeholder="Search" className="w-1/2" />
        <Button>Search</Button>
      </div>
      <div className="flex gap-4 mx-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Filters</h2>
          <Select
            onValueChange={(value) =>
              setFilter({ ...filter, category: [value] })
            }
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
            onValueChange={(value) =>
              setFilter({
                ...filter,
                price: { min: Number(value), max: filter.price.max },
              })
            }
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
            onValueChange={(value) =>
              setFilter({
                ...filter,
                price: { min: filter.price.min, max: Number(value) },
              })
            }
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <img
                    src={service.image}
                    alt={service.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold">{service.name}</h3>
                  <p className="text-xs text-gray-500">{service.category}</p>
                  <p className="text-sm text-gray-500">{service.description}</p>
                  <p className="text-xl font-bold">S/. {service.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
