
import * as React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const EmptyState = ({ icon: Icon, title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-custom-dark-text">{title}</h3>
      <p className="text-sm text-custom-light-text mt-1">{description}</p>
    </div>
  );
};

export default EmptyState;
