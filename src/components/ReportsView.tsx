
import DailyReport from './reports/DailyReport';
import WeeklyReport from './reports/WeeklyReport';
import ApiReport from './reports/ApiReport';

const ReportsView = () => {
  return (
    <div className="p-4 space-y-8">
      <DailyReport />
      <WeeklyReport />
      <ApiReport />
    </div>
  );
};

export default ReportsView;
