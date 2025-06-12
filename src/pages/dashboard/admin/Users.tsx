
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Search, Filter, Eye, Ban, CheckCircle, XCircle, Users, GraduationCap, UserCheck, Calendar, MapPin, Mail, Phone, Star, Activity } from 'lucide-react';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543210',
      role: 'employee',
      status: 'active',
      joinDate: '2023-08-15',
      lastActive: '2024-01-18',
      location: 'New Delhi',
      verified: true,
      profileCompletion: 95,
      applications: 8,
      interviews: 3,
      experience: '5 years',
      education: 'M.Ed Mathematics',
      skills: ['Mathematics', 'Physics', 'Digital Teaching'],
      achievements: ['Teacher of the Year 2022', '95% student pass rate']
    },
    {
      id: 2,
      name: 'Delhi Public School',
      email: 'hr@dpschool.edu.in',
      phone: '+91 11-26182000',
      role: 'college',
      status: 'active',
      joinDate: '2023-06-20',
      lastActive: '2024-01-18',
      location: 'New Delhi',
      verified: true,
      profileCompletion: 100,
      jobsPosted: 15,
      activeJobs: 5,
      applicationsReceived: 245,
      establishedYear: '1949',
      affiliation: 'CBSE',
      studentsCount: '2500+',
      departments: ['Primary', 'Secondary', 'Senior Secondary']
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 9876543211',
      role: 'employee',
      status: 'active',
      joinDate: '2023-09-10',
      lastActive: '2024-01-17',
      location: 'Mumbai',
      verified: true,
      profileCompletion: 88,
      applications: 12,
      interviews: 5,
      experience: '8 years',
      education: 'M.Sc Physics, IIT Delhi',
      skills: ['Physics', 'Research', 'Lab Management'],
      achievements: ['Published 3 research papers', 'Science Fair Winner Coach']
    },
    {
      id: 4,
      name: 'Modern School',
      email: 'careers@modernschool.net',
      phone: '+91 11-23385516',
      role: 'college',
      status: 'pending',
      joinDate: '2024-01-10',
      lastActive: '2024-01-15',
      location: 'New Delhi',
      verified: false,
      profileCompletion: 65,
      jobsPosted: 3,
      activeJobs: 2,
      applicationsReceived: 45,
      establishedYear: '1920',
      affiliation: 'CBSE',
      studentsCount: '1800+',
      departments: ['Primary', 'Secondary']
    },
    {
      id: 5,
      name: 'Admin User',
      email: 'admin@teacherconnect.com',
      phone: '+91 9876543215',
      role: 'admin',
      status: 'active',
      joinDate: '2023-01-01',
      lastActive: '2024-01-18',
      location: 'New Delhi',
      verified: true,
      profileCompletion: 100,
      actionsPerformed: 1250,
      jobsApproved: 85,
      jobsRejected: 12,
      usersManaged: 500,
      permissions: ['Full Access', 'User Management', 'Content Moderation', 'System Settings']
    },
    {
      id: 6,
      name: 'Anjali Gupta',
      email: 'anjali.gupta@email.com',
      phone: '+91 9876543212',
      role: 'employee',
      status: 'suspended',
      joinDate: '2023-07-25',
      lastActive: '2024-01-10',
      location: 'Bangalore',
      verified: true,
      profileCompletion: 82,
      applications: 6,
      interviews: 1,
      experience: '6 years',
      education: 'M.Sc Chemistry, JNU',
      skills: ['Chemistry', 'Lab Safety', 'Environmental Science'],
      suspensionReason: 'Inappropriate communication with employer'
    }
  ];

  const getRoleStats = () => {
    const stats = {
      total: users.length,
      employees: users.filter(user => user.role === 'employee').length,
      colleges: users.filter(user => user.role === 'college').length,
      admins: users.filter(user => user.role === 'admin').length,
      active: users.filter(user => user.status === 'active').length,
      pending: users.filter(user => user.status === 'pending').length,
      suspended: users.filter(user => user.status === 'suspended').length,
    };
    return stats;
  };

  const stats = getRoleStats();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role) => {
    switch (role) {
      case 'employee':
        return <User className="w-4 h-4" />;
      case 'college':
        return <GraduationCap className="w-4 h-4" />;
      case 'admin':
        return <UserCheck className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'employee':
        return 'bg-blue-100 text-blue-800';
      case 'college':
        return 'bg-green-100 text-green-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage all platform users across different roles</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.employees}</div>
            <div className="text-sm text-muted-foreground">Teachers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.colleges}</div>
            <div className="text-sm text-muted-foreground">Colleges</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.admins}</div>
            <div className="text-sm text-muted-foreground">Admins</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
            <div className="text-sm text-muted-foreground">Suspended</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full lg:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="employee">Teachers</SelectItem>
            <SelectItem value="college">Colleges</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={`/avatars/${user.name.toLowerCase().replace(' ', '-')}.jpg`} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{user.name}</h3>
                          <p className="text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getRoleColor(user.role)}>
                            {getRoleIcon(user.role)}
                            <span className="ml-1 capitalize">{user.role}</span>
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {user.status === 'pending' && <Activity className="w-3 h-3 mr-1" />}
                            {user.status === 'suspended' && <Ban className="w-3 h-3 mr-1" />}
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{user.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{user.location}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Joined: {user.joinDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            <span>Last active: {user.lastActive}</span>
                          </div>
                        </div>
                      </div>

                      {/* Role-specific stats */}
                      {user.role === 'employee' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-semibold text-blue-800">{user.applications}</div>
                            <div className="text-blue-600">Applications</div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="font-semibold text-green-800">{user.interviews}</div>
                            <div className="text-green-600">Interviews</div>
                          </div>
                          <div className="text-center p-2 bg-purple-50 rounded">
                            <div className="font-semibold text-purple-800">{user.experience}</div>
                            <div className="text-purple-600">Experience</div>
                          </div>
                          <div className="text-center p-2 bg-orange-50 rounded">
                            <div className="font-semibold text-orange-800">{user.profileCompletion}%</div>
                            <div className="text-orange-600">Profile</div>
                          </div>
                        </div>
                      )}

                      {user.role === 'college' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-semibold text-blue-800">{user.jobsPosted}</div>
                            <div className="text-blue-600">Jobs Posted</div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="font-semibold text-green-800">{user.activeJobs}</div>
                            <div className="text-green-600">Active Jobs</div>
                          </div>
                          <div className="text-center p-2 bg-purple-50 rounded">
                            <div className="font-semibold text-purple-800">{user.applicationsReceived}</div>
                            <div className="text-purple-600">Applications</div>
                          </div>
                          <div className="text-center p-2 bg-orange-50 rounded">
                            <div className="font-semibold text-orange-800">{user.studentsCount}</div>
                            <div className="text-orange-600">Students</div>
                          </div>
                        </div>
                      )}

                      {user.role === 'admin' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-semibold text-blue-800">{user.actionsPerformed}</div>
                            <div className="text-blue-600">Actions</div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="font-semibold text-green-800">{user.jobsApproved}</div>
                            <div className="text-green-600">Jobs Approved</div>
                          </div>
                          <div className="text-center p-2 bg-red-50 rounded">
                            <div className="font-semibold text-red-800">{user.jobsRejected}</div>
                            <div className="text-red-600">Jobs Rejected</div>
                          </div>
                          <div className="text-center p-2 bg-purple-50 rounded">
                            <div className="font-semibold text-purple-800">{user.usersManaged}</div>
                            <div className="text-purple-600">Users Managed</div>
                          </div>
                        </div>
                      )}

                      {/* Suspension notice */}
                      {user.suspensionReason && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-2 text-red-800 mb-1">
                            <Ban className="w-4 h-4" />
                            <span className="font-medium">Account Suspended</span>
                          </div>
                          <p className="text-sm text-red-700">{user.suspensionReason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:min-w-[180px]">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>User Profile: {user.name}</DialogTitle>
                        <DialogDescription>
                          Detailed information about this user
                        </DialogDescription>
                      </DialogHeader>
                      {/* User profile details would go here */}
                      <div className="p-4">
                        <p>Detailed user profile information would be displayed here...</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {user.status === 'pending' && (
                    <>
                      <Button variant="default" size="sm" className="w-full">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm" className="w-full">
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                  
                  {user.status === 'active' && (
                    <Button variant="destructive" size="sm" className="w-full">
                      <Ban className="w-4 h-4 mr-2" />
                      Suspend
                    </Button>
                  )}
                  
                  {user.status === 'suspended' && (
                    <Button variant="default" size="sm" className="w-full">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Reactivate
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No users found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UsersPage;
