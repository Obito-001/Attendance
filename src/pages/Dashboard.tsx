
import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import SidebarLayout from "../components/layouts/SidebarLayout";
import { 
  getDashboardSummary, 
  departments, 
  getLeaveRequestStatusCounts 
} from "../services/mockData";
import { Users, Calendar, FileText } from "lucide-react";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalStudents: 0,
    averageAttendance: "0",
    lateArrivals: 0,
    pendingLeaveRequests: 0,
  });
  
  const [leaveStatus, setLeaveStatus] = useState({
    pending: 0,
    approved: 0,
    rejected: 0
  });

  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric"
  });

  useEffect(() => {
    // Fetch dashboard summary data
    const data = getDashboardSummary();
    setSummary(data);
    
    // Fetch leave request stats
    const statusCounts = getLeaveRequestStatusCounts();
    setLeaveStatus(statusCounts);
  }, []);

  return (
    <SidebarLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <span className="text-gray-500">{currentDate}</span>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Students */}
          <Card className="p-6 flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <h3 className="text-2xl font-bold">{summary.totalStudents}</h3>
            </div>
          </Card>

          {/* Average Attendance */}
          <Card className="p-6 flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Average Attendance</p>
              <h3 className="text-2xl font-bold">{summary.averageAttendance}%</h3>
            </div>
          </Card>

          {/* Late Arrivals */}
          <Card className="p-6 flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Late Arrivals (This Week)</p>
              <h3 className="text-2xl font-bold">{summary.lateArrivals}</h3>
            </div>
          </Card>

          {/* Pending Leave Requests */}
          <Card className="p-6 flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Leave Requests</p>
              <h3 className="text-2xl font-bold">{summary.pendingLeaveRequests}</h3>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance by Department */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Attendance by Department</h2>
            <div className="space-y-4">
              {departments.map((dept) => (
                <div key={dept.id} className="space-y-1">
                  <div className="flex justify-between">
                    <span>{dept.name}</span>
                    <span className="font-medium">{dept.attendanceRate.toFixed(1)}%</span>
                  </div>
                  <Progress
                    value={dept.attendanceRate}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Leave Request Status */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Leave Request Status</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Pending</span>
                  </div>
                  <span className="text-2xl font-bold">{leaveStatus.pending}</span>
                </div>
                <div className="h-1 w-full bg-yellow-200">
                  <div className="h-1 bg-yellow-500" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Approved</span>
                  </div>
                  <span className="text-2xl font-bold">{leaveStatus.approved}</span>
                </div>
                <div className="h-1 w-full bg-green-200">
                  <div className="h-1 bg-green-500" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Rejected</span>
                  </div>
                  <span className="text-2xl font-bold">{leaveStatus.rejected}</span>
                </div>
                <div className="h-1 w-full bg-red-200">
                  <div className="h-1 bg-red-500" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Dashboard;
