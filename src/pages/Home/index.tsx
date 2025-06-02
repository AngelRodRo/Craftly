import { useAppDispatch, useAppSelector } from "@/app/hook";
import { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchServices,
} from "@/features/Services/servicesSlice";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import Filters from "./Filters";
import ServiceCard from "@/features/Services/components/ServiceCard";

//TODO: add pagination
//TODO: add loading state
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
      <div className="flex md:flex-row flex-col gap-4 mx-8">
        <Filters />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
