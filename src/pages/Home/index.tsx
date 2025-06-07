import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  fetchCategories,
  fetchServices,
  setFilter,
} from "@/features/Services/servicesSlice";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import ServiceCard from "@/features/Services/components/ServiceCard";

import Filters from "./Filters";
import Pagination from "./Pagination";
import ServiceCardSkeleton from "@/features/Services/components/ServiceCardSkeleton";
import { DEFAULT_SERVICE_LIMIT } from "@/features/Services/constants/service";

export default function Home() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { services, filter, totalPages, loading } = useAppSelector((state) => ({
    services: state.services.services,
    filter: state.services.filter,
    totalPages: state.services.totalPages,
    loading: state.services.loading,
  }));

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
  }, []);

  useEffect(() => {
    setSearchParams((prev) => {
      if (filter.name !== "" && filter.name !== null) {
        prev.set("name", filter.name);
      }
      if (filter.priceMin !== null) {
        prev.set("priceMin", filter.priceMin.toString());
      }
      if (filter.priceMax !== null) {
        prev.set("priceMax", filter.priceMax.toString());
      }
      if (filter.category.length > 0 && filter.category[0] !== "all") {
        prev.set("category", filter.category.join(","));
      }

      prev.set("page", filter.page.toString());
      if (filter.limit !== DEFAULT_SERVICE_LIMIT) {
        prev.set("limit", filter.limit.toString());
      }
      return prev;
    });
  }, [filter, setSearchParams]);

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
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {!loading
              ? services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))
              : Array.from({ length: 12 }).map((_, index) => (
                  <ServiceCardSkeleton key={index} />
                ))}
          </div>
          {!loading && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={filter.page}
              onPageChange={(page) => dispatch(setFilter({ ...filter, page }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
