
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { estimatedCost, apiUsageData, hourlyApiUsageData } from './data';

const ApiReport = () => {
  return (
    <section>
      <h2 className="text-lg font-bold text-custom-dark-text px-2 mb-2">API 리포트</h2>
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-xl">
          <h3 className="font-semibold text-custom-dark-text mb-1">예상 총 금액</h3>
          <p className="text-3xl font-bold text-custom-dark-text">
              {estimatedCost.amount.toLocaleString()}원
          </p>
          <p className="text-sm text-custom-light-text">{estimatedCost.period} 사용량 기준</p>
        </div>
        
        <div>
            <h3 className="font-semibold text-custom-dark-text mb-3 px-2">사용량 분석</h3>
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl">
                    <h4 className="font-bold text-custom-dark-text mb-4">API 사용량 (최근 7일)</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={apiUsageData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false}/>
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip formatter={(value: number) => value.toLocaleString()} />
                            <Line type="monotone" dataKey="calls" stroke="#82ca9d" strokeWidth={2} name="호출 수" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-4 rounded-xl">
                    <h4 className="font-bold text-custom-dark-text mb-4">시간대별 API 호출량</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={hourlyApiUsageData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="hour" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip formatter={(value: number) => `${value.toLocaleString()} calls`} />
                            <Bar dataKey="calls" fill="#8884d8" name="호출 수" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ApiReport;
