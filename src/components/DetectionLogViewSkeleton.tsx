
import { Skeleton } from '@/components/ui/skeleton';

const DetectionLogViewSkeleton = () => {
  const types = ['공지 요청', '광고', '도배', '분쟁'];
  return (
    <div className="p-4 space-y-6 animate-pulse">
      <Skeleton className="h-10 w-full rounded-md" />
      <div className="space-y-6">
        {types.map(type => (
          <div key={type}>
            <Skeleton className="h-7 w-20 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-[68px] w-full rounded-xl" />
              <Skeleton className="h-[68px] w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetectionLogViewSkeleton;
