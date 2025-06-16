
import { Icon } from 'lucide-react';

interface SummaryCardProps {
  icon: React.ElementType;
  title: string;
  count: number;
  color: string;
}

const SummaryCard = ({ icon: Icon, title, count, color }: SummaryCardProps) => {
  return (
    <div className={`p-4 rounded-2xl flex flex-col justify-between`} style={{ backgroundColor: color }}>
      <div className="flex justify-between items-start">
        <div className="bg-white/30 rounded-full p-2">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div>
        <p className="text-white font-semibold">{title}</p>
        <p className="text-white text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
