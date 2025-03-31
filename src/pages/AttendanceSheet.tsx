
import { useState, useEffect } from "react";
import { students } from "../services/mockData";
import { useAuth } from "../contexts/AuthContext";
import SidebarLayout from "../components/layouts/SidebarLayout";
import { Checkbox } from "../components/ui/checkbox";
import { toast } from "sonner";
import { Button } from "../components/ui/button";

const AttendanceSheet = () => {
  // Get current date
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  
  // Get user role
  const { user } = useAuth();
  const isStudent = user?.role === "student";
  
  // Generate dates for attendance headers - show 20 days
  const [attendanceDates, setAttendanceDates] = useState<string[]>([]);
  
  // Attendance records state
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, Record<string, boolean>>>({});
  
  useEffect(() => {
    // Generate dates for column headers - current and previous 19 days
    const dates = Array.from({ length: 20 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();
    
    setAttendanceDates(dates);
    
    // Initialize attendance records for all students
    const initialRecords: Record<string, Record<string, boolean>> = {};
    students.forEach(student => {
      initialRecords[student.studentId] = {};
      dates.forEach(date => {
        // Randomly set some attendance for demo
        initialRecords[student.studentId][date] = Math.random() > 0.1;
      });
    });
    
    setAttendanceRecords(initialRecords);
  }, []);

  // Handle attendance change
  const handleAttendanceChange = (studentId: string, date: string, value: boolean) => {
    if (isStudent) {
      toast.error("Students cannot modify attendance records");
      return;
    }
    
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [date]: value
      }
    }));
    
    // Show toast notification
    toast.success(`Attendance ${value ? 'marked' : 'unmarked'} for ${students.find(s => s.studentId === studentId)?.name}`);
  };

  // Save attendance records
  const saveAttendance = () => {
    if (isStudent) {
      toast.error("Students cannot modify attendance records");
      return;
    }
    
    // In a real application, this would send the data to the backend
    console.log("Saving attendance records:", attendanceRecords);
    toast.success("Attendance records saved successfully!");
  };

  return (
    <SidebarLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Attendance Sheet</h1>
          {!isStudent && (
            <Button onClick={saveAttendance}>Save Attendance</Button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  ID
                </th>
                {attendanceDates.map((date, index) => (
                  <th 
                    key={date} 
                    className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {index + 1}
                  </th>
                ))}
              </tr>
              <tr className="text-center text-xs text-gray-500 bg-gray-50">
                <td colSpan={2}></td>
                {attendanceDates.map(date => (
                  <td key={`am-${date}`} className="px-1">
                    <div className="flex justify-center gap-2">
                      <span>AM</span>
                      <span>PM</span>
                    </div>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map(student => (
                <tr key={student.studentId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.studentId}
                  </td>
                  {attendanceDates.map(date => (
                    <td key={`${student.studentId}-${date}`} className="px-1 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Checkbox 
                          checked={attendanceRecords[student.studentId]?.[date]} 
                          onCheckedChange={(checked) => 
                            handleAttendanceChange(student.studentId, date, checked === true)
                          }
                          disabled={isStudent}
                        />
                        <Checkbox 
                          checked={attendanceRecords[student.studentId]?.[date]} 
                          onCheckedChange={(checked) => 
                            handleAttendanceChange(student.studentId, date, checked === true)
                          }
                          disabled={isStudent}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {isStudent && (
          <div className="mt-4 bg-yellow-50 p-4 rounded-md text-yellow-800 text-sm">
            Note: As a student, you can only view attendance records. Please contact your teacher for any corrections.
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default AttendanceSheet;
