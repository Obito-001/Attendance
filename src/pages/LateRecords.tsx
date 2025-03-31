
import { useState, useEffect } from "react";
import { lateRecords, students } from "../services/mockData";
import SidebarLayout from "../components/layouts/SidebarLayout";
import { Card } from "../components/ui/card";

interface LateRecordWithStudent {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  date: string;
  checkInTime: string;
}

const LateRecords = () => {
  const [records, setRecords] = useState<LateRecordWithStudent[]>([]);

  useEffect(() => {
    // Combine late records with student information
    const enrichedRecords = lateRecords.map(record => {
      const student = students.find(s => s.studentId === record.studentId);
      return {
        ...record,
        studentName: student ? student.name : "Unknown Student",
        department: student ? student.department : "Unknown"
      };
    });
    
    setRecords(enrichedRecords);
  }, []);

  return (
    <SidebarLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Late Records</h1>
          <span className="text-amber-500 font-medium flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Total Late Records: {records.length}
          </span>
        </div>

        <div className="space-y-4">
          {records.map((record) => (
            <Card key={record.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{record.studentName}</h3>
                  <p className="text-gray-600">Student ID: {record.studentId}</p>
                  <p className="text-gray-600">Course: {record.department}</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                  <span className="text-amber-500 font-medium flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Late Arrival
                  </span>
                  
                  <div className="grid grid-cols-2 gap-x-8 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{record.date}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Check-in Time</p>
                      <p className="font-medium">{record.checkInTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {records.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-gray-500">No late records found.</p>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default LateRecords;
