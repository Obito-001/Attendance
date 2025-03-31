
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getStudentAttendance } from "../services/mockData";
import SidebarLayout from "../components/layouts/SidebarLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { format, parseISO, isToday, isYesterday, subDays } from "date-fns";

const StudentAttendance = () => {
  const { user } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      // Get the student ID from the current user
      // In a real app, we would look up the student ID based on the user ID
      const studentId = user.id === "s1" ? "STU001" : "STU004"; // Just for demo
      
      // Get the student's attendance records
      const records = getStudentAttendance(studentId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending
        .slice(0, 30); // Get only last 30 days
      
      setAttendanceRecords(records);
    }
  }, [user]);

  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "d MMM yyyy");
  };

  return (
    <SidebarLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">My Attendance</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check-in Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceRecords.length > 0 ? (
                attendanceRecords.map((record) => (
                  <TableRow key={record.date}>
                    <TableCell>{formatDisplayDate(record.date)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.present
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {record.present ? "Present" : "Absent"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {record.checkInTime || "Not recorded"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No attendance records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default StudentAttendance;
