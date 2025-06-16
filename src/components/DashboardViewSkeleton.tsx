
import { Skeleton } from "@/components/ui/skeleton";

const DashboardViewSkeleton = () => {
  return (
    <div className="p-4 space-y-6 animate-pulse">
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
      
      <div>
        <Skeleton className="h-7 w-32 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-[76px] w-full rounded-xl" />
          <Skeleton className="h-[76px] w-full rounded-xl" />
        </div>
      </div>
      
      <div>
        <Skeleton className="h-7 w-40 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-[68px] w-full rounded-xl" />
          <Skeleton className="h-[68px] w-full rounded-xl" />
          <Skeleton className="h-[68px] w-full rounded-xl" />
        </div>
        <Skeleton className="h-10 w-full mt-3 rounded-lg" />
      </div>

      <div>
        <Skeleton className="h-7 w-48 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-[68px] w-full rounded-xl" />
          <Skeleton className="h-[68px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default DashboardViewSkeleton;
