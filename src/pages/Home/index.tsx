import { useAppDispatch, useAppSelector } from "@/app/hook";
import { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchServices,
  setFilter,
} from "@/features/Services/servicesSlice";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import Filters from "./Filters";

export default function Home() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const services = useAppSelector((state) => state.services.services);
  const filter = useAppSelector((state) => state.services.filter);

  useEffect(() => {
    dispatch(fetchServices(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex justify-center gap-2">
        <Input
          type="text"
          placeholder="Search"
          className="w-1/2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          disabled={!search}
          className="cursor-pointer"
          onClick={() => dispatch(fetchServices({ ...filter, name: search }))}
        >
          Search
        </Button>
      </div>
      <div className="flex gap-4 mx-8">
        <Filters />
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
