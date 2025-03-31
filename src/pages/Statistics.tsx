
import { useState, useEffect } from "react";
import { getDashboardSummary, departments } from "../services/mockData";
import SidebarLayout from "../components/layouts/SidebarLayout";
import { Card } from "../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Statistics = () => {
  const [summary, setSummary] = useState({
    totalStudents: 0,
    averageAttendance: "0",
    lateArrivals: 0,
    pendingLeaveRequests: 0,
  });

  // Mock data for attendance over time
  const [attendanceOverTime, setAttendanceOverTime] = useState<any[]>([]);

  useEffect(() => {
    // Get dashboard summary
    const data = getDashboardSummary();
    setSummary(data);

    // Generate mock attendance data
    const mockAttendanceData = [
      { month: "Jan", attendance: 91 },
      { month: "Feb", attendance: 94 },
      { month: "Mar", attendance: 89 },
      { month: "Apr", attendance: 92 },
      { month: "May", attendance: 95 },
      { month: "Jun", attendance: 93 },
    ];
    setAttendanceOverTime(mockAttendanceData);
  }, []);

  // Prepare data for pie chart
  const departmentData = departments.map(dept => ({
    name: dept.name,
    value: dept.attendanceRate
  }));

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <SidebarLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Statistics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance Rate by Department */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Attendance Rate by Department</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departments.map(dept => ({
                    name: dept.name,
                    rate: dept.attendanceRate
                  }))}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                    height={80}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="rate" name="Attendance Rate" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Department Distribution */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Department Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Monthly Attendance Trend */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Monthly Attendance Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={attendanceOverTime}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="attendance" name="Attendance Rate" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Total Students</h3>
            <p className="text-3xl font-bold text-blue-600">{summary.totalStudents}</p>
          </Card>
          
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Average Attendance</h3>
            <p className="text-3xl font-bold text-green-600">{summary.averageAttendance}%</p>
          </Card>
          
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Late Arrivals (Week)</h3>
            <p className="text-3xl font-bold text-amber-600">{summary.lateArrivals}</p>
          </Card>
          
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Pending Leave Requests</h3>
            <p className="text-3xl font-bold text-purple-600">{summary.pendingLeaveRequests}</p>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Statistics;
