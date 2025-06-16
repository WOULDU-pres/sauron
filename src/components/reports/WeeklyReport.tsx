
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { weeklyMessageData, messageTypeData, COLORS } from './data';

const WeeklyReport = () => {
  return (
    <section>
      <h2 className="text-lg font-bold text-custom-dark-text px-2 mb-2">주간 리포트</h2>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl">
          <h3 className="font-bold text-custom-dark-text mb-4">주간 이상 메시지 현황</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyMessageData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false}/>
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="messages" stroke="#8884d8" strokeWidth={2} name="이상 메시지 수" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <h3 className="font-bold text-custom-dark-text mb-4">이상 메시지 유형별 분포 (최근 30일)</h3>
          <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                  <Pie
                      data={messageTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                      {messageTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconSize={10} />
              </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default WeeklyReport;
