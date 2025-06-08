import { useId } from "react";
import { CardContent } from "@/shared/components/ui/card";
import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ServiceCardSkeleton() {
  const id = useId();
  return (
    <Card key={id} data-testid="service-card-skeleton">
      <CardContent className="grid grid-cols-2 gap-4 items-center">
        <Skeleton className="w-full h-full rounded-lg" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-7 w-1/3" />
        </div>
        <Skeleton className="w-full h-10" />
      </CardContent>
    </Card>
  );
}
