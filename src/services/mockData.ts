// Define types for our data models
export interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  department: string;
  class?: string;
  section?: string;
  age?: number;
  gender?: string;
  parentContact?: string;
  address?: string;
}

export interface Teacher {
  id: string;
  name: string;
  teacherId: string;
  email: string;
  department: string;
  subjects?: string[];
  classTeacher?: string;
  age?: number;
  gender?: string;
  contactNumber?: string;
  address?: string;
}

export interface Attendance {
  date: string;
  studentId: string;
  present: boolean;
  checkInTime?: string;
}

export interface LateRecord {
  id: string;
  studentId: string;
  date: string;
  checkInTime: string;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  reviewedBy?: string;
  reviewDate?: string;
}

export interface Department {
  id: string;
  name: string;
  attendanceRate: number;
}

// Mock teachers data
export const teachers: Teacher[] = [
  {
    id: "t1",
    name: "Harikanth",
    teacherId: "TCH001",
    email: "harikanth@example.com",
    department: "Computer Science",
    subjects: ["Data Structures", "Algorithms"],
    classTeacher: "CS-A",
    age: 35,
    gender: "Male",
    contactNumber: "9876543210",
    address: "123 Faculty Housing, Chennai"
  },
  {
    id: "t2",
    name: "Vimala",
    teacherId: "TCH002",
    email: "vimala@example.com",
    department: "Data Science",
    subjects: ["Data Mining", "Machine Learning"],
    classTeacher: "DS-B",
    age: 42,
    gender: "Female",
    contactNumber: "9876543211",
    address: "456 Faculty Housing, Chennai"
  },
];

// Mock Students Data with additional fields
export const students: Student[] = [
  {
    id: "1",
    name: "Barani",
    studentId: "STU001",
    email: "barani@gmail.com",
    department: "Computer Science",
    class: "CS-A",
    section: "A",
    age: 20,
    gender: "Male",
    parentContact: "9876543212",
    address: "789 Student Hostel, Chennai"
  },
  {
    id: "2",
    name: "Deepak",
    studentId: "STU002",
    email: "deepak@gmail.com",
    department: "Data Science",
    class: "DS-B",
    section: "B",
    age: 21,
    gender: "Male",
    parentContact: "9876543213",
    address: "101 Student Hostel, Chennai"
  },
  {
    id: "3",
    name: "Arul Mani",
    studentId: "STU003",
    email: "arulmani@gmail.com",
    department: "Computer Science",
    class: "CS-A",
    section: "A",
    age: 19,
    gender: "Male",
    parentContact: "9876543214",
    address: "202 Student Hostel, Chennai"
  },
  {
    id: "4",
    name: "Sai",
    studentId: "STU004",
    email: "sai@gmail.com",
    department: "Software Engineering",
    class: "SE-C",
    section: "C",
    age: 20,
    gender: "Female",
    parentContact: "9876543215",
    address: "303 Student Hostel, Chennai"
  },
];

// Mock Attendance Data
export const attendanceData: Attendance[] = [
  // Generate some random attendance data for each student
  ...Array(30).fill(null).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return students.map(student => ({
      date: date.toISOString().split('T')[0],
      studentId: student.studentId,
      present: Math.random() > 0.1, // 90% attendance rate
      checkInTime: Math.random() > 0.2 ? `0${Math.floor(Math.random() * 2 + 8)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
    }));
  }).flat(),
];

// Mock Late Records
export const lateRecords: LateRecord[] = [
  {
    id: "lr1",
    studentId: "STU001",
    date: "2024-02-02",
    checkInTime: "09:30",
  },
  {
    id: "lr2",
    studentId: "STU001",
    date: "2024-02-05",
    checkInTime: "09:45",
  },
  {
    id: "lr3",
    studentId: "STU004",
    date: "2024-02-05",
    checkInTime: "09:20",
  },
  {
    id: "lr4",
    studentId: "STU000", // Unknown student for demo
    date: "2024-02-06",
    checkInTime: "09:15",
  },
];

// Mock Leave Requests
export const leaveRequests: LeaveRequest[] = [
  {
    id: "leave1",
    studentId: "STU001",
    fromDate: "2024-02-15",
    toDate: "2024-02-16",
    reason: "Family event",
    status: "pending",
    submittedDate: "2024-02-10",
  },
  {
    id: "leave2",
    studentId: "STU002",
    fromDate: "2024-02-20",
    toDate: "2024-02-21",
    reason: "Medical appointment",
    status: "approved",
    submittedDate: "2024-02-12",
    reviewedBy: "Harikanth",
    reviewDate: "2024-02-13",
  },
];

// Mock Department Data with Attendance Rates
export const departments: Department[] = [
  {
    id: "dept1",
    name: "Computer Science",
    attendanceRate: 94.2,
  },
  {
    id: "dept2",
    name: "Data Science",
    attendanceRate: 91.8,
  },
  {
    id: "dept3",
    name: "Software Engineering",
    attendanceRate: 93.5,
  },
];

// Helper functions to work with the mock data

// Get student by ID
export const getStudentById = (id: string): Student | undefined => {
  return students.find(student => student.studentId === id);
};

// Get attendance rate for a student
export const getAttendanceRate = (studentId: string): number => {
  const studentAttendance = attendanceData.filter(record => record.studentId === studentId);
  if (studentAttendance.length === 0) return 0;
  
  const present = studentAttendance.filter(record => record.present).length;
  return (present / studentAttendance.length) * 100;
};

// Get attendance rate for the entire system
export const getTotalAttendanceRate = (): number => {
  if (attendanceData.length === 0) return 0;
  
  const present = attendanceData.filter(record => record.present).length;
  return (present / attendanceData.length) * 100;
};

// Get late records count
export const getLateRecordsCount = (): number => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);
  
  return lateRecords.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate >= weekAgo && recordDate <= today;
  }).length;
};

// Get pending leave requests count
export const getPendingLeaveRequestsCount = (): number => {
  return leaveRequests.filter(request => request.status === "pending").length;
};

// Update leave request status
export const updateLeaveRequestStatus = (
  id: string, 
  status: "approved" | "rejected", 
  reviewedBy: string
): LeaveRequest => {
  const index = leaveRequests.findIndex(request => request.id === id);
  if (index === -1) throw new Error("Leave request not found");
  
  leaveRequests[index] = {
    ...leaveRequests[index],
    status,
    reviewedBy,
    reviewDate: new Date().toISOString().split('T')[0],
  };
  
  return leaveRequests[index];
};

// Dashboard summary data
export const getDashboardSummary = () => {
  return {
    totalStudents: students.length,
    averageAttendance: getTotalAttendanceRate().toFixed(1),
    lateArrivals: getLateRecordsCount(),
    pendingLeaveRequests: getPendingLeaveRequestsCount(),
  };
};

// Get leave request status counts
export const getLeaveRequestStatusCounts = () => {
  const pending = leaveRequests.filter(req => req.status === "pending").length;
  const approved = leaveRequests.filter(req => req.status === "approved").length;
  const rejected = leaveRequests.filter(req => req.status === "rejected").length;
  
  return { pending, approved, rejected };
};

// Get teacher by ID
export const getTeacherById = (id: string): Teacher | undefined => {
  return teachers.find(teacher => teacher.teacherId === id);
};

// Get attendance for a specific student
export const getStudentAttendance = (studentId: string): Attendance[] => {
  return attendanceData.filter(record => record.studentId === studentId);
};

// Admin functions
export const updateUserRole = (userId: string, newRole: "student" | "teacher" | "admin"): boolean => {
  // In a real app, this would update the user's role in the database
  console.log(`Updated user ${userId} to role ${newRole}`);
  return true;
};

export const addNewStudent = (student: Omit<Student, 'id'>): Student => {
  const newStudent = {
    ...student,
    id: `s${Date.now()}`,
  };
  students.push(newStudent);
  return newStudent;
};

export const addNewTeacher = (teacher: Omit<Teacher, 'id'>): Teacher => {
  const newTeacher = {
    ...teacher,
    id: `t${Date.now()}`,
  };
  teachers.push(newTeacher);
  return newTeacher;
};

export const updateAttendanceRecord = (studentId: string, date: string, present: boolean): boolean => {
  const index = attendanceData.findIndex(
    record => record.studentId === studentId && record.date === date
  );
  
  if (index === -1) {
    // Create new record if doesn't exist
    attendanceData.push({
      date,
      studentId,
      present,
      checkInTime: present ? new Date().toTimeString().slice(0, 5) : undefined,
    });
  } else {
    // Update existing record
    attendanceData[index].present = present;
    attendanceData[index].checkInTime = present ? new Date().toTimeString().slice(0, 5) : undefined;
  }
  
  return true;
};
