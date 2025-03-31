
import { useState } from "react";
import SidebarLayout from "../components/layouts/SidebarLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { useToast } from "../components/ui/use-toast";
import { students, teachers } from "../services/mockData";
import { Card } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const AdminPanel = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on search term
  const filteredStudents = students.filter(
    student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeachers = teachers.filter(
    teacher =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (userId: string, role: string) => {
    // In a real app, this would update the user's role in the database
    toast({
      title: "Role Updated",
      description: `User ${userId} role changed to ${role}`,
    });
  };

  return (
    <SidebarLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        
        <div className="mb-6">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Tabs defaultValue="students">
          <TabsList>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="add-user">Add User</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-4">
            <Card className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.class || "N/A"}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Edit Student",
                                description: `Editing ${student.name}`,
                              });
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Student Removed",
                                description: `${student.name} has been removed`,
                              });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="teachers" className="mt-4">
            <Card className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Class Teacher</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>{teacher.teacherId}</TableCell>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>{teacher.classTeacher || "N/A"}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Edit Teacher",
                                description: `Editing ${teacher.name}`,
                              });
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Teacher Removed",
                                description: `${teacher.name} has been removed`,
                              });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="add-user" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Student ID</label>
                    <Input placeholder="Enter Student ID" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="Enter Full Name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="Enter Email" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Class</label>
                      <Input placeholder="Enter Class" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Section</label>
                      <Input placeholder="Enter Section" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Age</label>
                      <Input type="number" placeholder="Enter Age" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Gender</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <Input placeholder="Enter Department" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Parent Contact</label>
                    <Input placeholder="Enter Parent Contact" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Address</label>
                    <Input placeholder="Enter Address" />
                  </div>
                  <Button 
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Student Added",
                        description: "New student has been added successfully",
                      });
                    }}
                  >
                    Add Student
                  </Button>
                </form>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Add New Teacher</h2>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Teacher ID</label>
                    <Input placeholder="Enter Teacher ID" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="Enter Full Name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="Enter Email" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Department</label>
                      <Input placeholder="Enter Department" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Class Teacher</label>
                      <Input placeholder="Class Teacher Of" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Age</label>
                      <Input type="number" placeholder="Enter Age" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Gender</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subjects</label>
                    <Input placeholder="Enter Subjects (comma separated)" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Contact Number</label>
                    <Input placeholder="Enter Contact Number" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Address</label>
                    <Input placeholder="Enter Address" />
                  </div>
                  <Button 
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Teacher Added",
                        description: "New teacher has been added successfully",
                      });
                    }}
                  >
                    Add Teacher
                  </Button>
                </form>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default AdminPanel;
