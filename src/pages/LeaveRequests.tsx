
import { useState, useEffect } from "react";
import { leaveRequests, students, updateLeaveRequestStatus } from "../services/mockData";
import SidebarLayout from "../components/layouts/SidebarLayout";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

interface LeaveRequestWithStudent {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  reviewedBy?: string;
  reviewDate?: string;
}

const LeaveRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<LeaveRequestWithStudent[]>([]);

  useEffect(() => {
    // Combine leave requests with student information
    const enrichedRequests = leaveRequests.map(request => {
      const student = students.find(s => s.studentId === request.studentId);
      return {
        ...request,
        studentName: student ? student.name : "Unknown Student",
        department: student ? student.department : "Unknown"
      };
    });
    
    setRequests(enrichedRequests);
  }, []);

  const handleApprove = (id: string) => {
    try {
      if (!user?.name) throw new Error("User not found");
      
      const updated = updateLeaveRequestStatus(id, "approved", user.name);
      
      // Update the state
      setRequests(prev => 
        prev.map(req => 
          req.id === id 
            ? { ...req, status: "approved", reviewedBy: user.name, reviewDate: new Date().toISOString().split('T')[0] } 
            : req
        )
      );
      
      toast.success("Leave request approved");
    } catch (error) {
      toast.error("Failed to approve request");
    }
  };

  const handleReject = (id: string) => {
    try {
      if (!user?.name) throw new Error("User not found");
      
      const updated = updateLeaveRequestStatus(id, "rejected", user.name);
      
      // Update the state
      setRequests(prev => 
        prev.map(req => 
          req.id === id 
            ? { ...req, status: "rejected", reviewedBy: user.name, reviewDate: new Date().toISOString().split('T')[0] } 
            : req
        )
      );
      
      toast.success("Leave request rejected");
    } catch (error) {
      toast.error("Failed to reject request");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case "approved":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Approved</span>;
      case "rejected":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <SidebarLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Leave Requests</h1>

        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold mr-2">{request.studentName}</h3>
                    {getStatusBadge(request.status)}
                  </div>
                  <p className="text-gray-600">Student ID: {request.studentId}</p>
                  <p className="text-gray-600">Course: {request.department}</p>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <svg className="w-5 h-5 text-gray-400 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span className="font-medium">Leave Period</span>
                      <p className="ml-6">{request.fromDate} to {request.toDate}</p>
                    </div>
                    
                    <div>
                      <svg className="w-5 h-5 text-gray-400 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="font-medium">Submitted</span>
                      <p className="ml-6">{request.submittedDate}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-500 font-medium">Reason</p>
                    <p>{request.reason}</p>
                  </div>
                  
                  {request.reviewedBy && (
                    <div className="mt-4 text-sm text-gray-600">
                      {request.status === "approved" ? "Approved" : "Rejected"} by {request.reviewedBy} on {request.reviewDate}
                    </div>
                  )}
                </div>
                
                {request.status === "pending" && user?.role === "teacher" && (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="bg-green-500 hover:bg-green-600 text-white border-0"
                      onClick={() => handleApprove(request.id)}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="outline"
                      className="bg-red-500 hover:bg-red-600 text-white border-0"
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}

          {requests.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-gray-500">No leave requests found.</p>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default LeaveRequests;
