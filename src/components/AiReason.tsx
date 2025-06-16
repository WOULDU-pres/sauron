
import { Lightbulb } from 'lucide-react';

const AiReason = ({ reason }: { reason?: string }) => {
  if (!reason) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-3 mt-4 text-left">
      <div className="flex items-start gap-3">
        <Lightbulb className="h-5 w-5 flex-shrink-0 text-blue-500 mt-0.5" />
        <div>
          <h4 className="font-semibold text-sm">AI 분석 근거</h4>
          <p className="text-sm mt-1">{reason}</p>
        </div>
      </div>
    </div>
  );
};

export default AiReason;
