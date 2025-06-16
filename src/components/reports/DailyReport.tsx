
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dailyData } from './data';
import { Skeleton } from '@/components/ui/skeleton';

const DailyReport = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section>
        <h2 className="text-lg font-bold text-custom-dark-text px-2 mb-2">일일 리포트</h2>
        <div className="bg-white p-4 rounded-xl animate-pulse">
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-bold text-custom-dark-text px-2 mb-2">일일 리포트</h2>
      <div className="bg-white p-4 rounded-xl">
        <h3 className="font-bold text-custom-dark-text mb-4">일일 이상 메시지 현황</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="광고" fill="#F39091" name="광고" radius={[4, 4, 0, 0]} />
            <Bar dataKey="도배" fill="#FAB491" name="도배" radius={[4, 4, 0, 0]} />
            <Bar dataKey="분쟁" fill="#C4B5E8" name="분쟁" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default DailyReport;
