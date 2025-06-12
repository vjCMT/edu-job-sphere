
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FileText, Calendar, MapPin, Clock, Eye, MessageSquare, Download, Search, Filter } from 'lucide-react';

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const applications = [
    {
      id: 1,
      jobTitle: 'Senior Mathematics Teacher',
      school: 'Delhi Public School, Vasant Kunj',
      location: 'New Delhi',
      appliedDate: '2024-01-15',
      status: 'Interview Scheduled',
      statusColor: 'bg-blue-100 text-blue-800',
      salary: '₹8,00,000 - ₹12,00,000',
      type: 'Full-time',
      interviewDate: '2024-01-25',
      interviewTime: '10:00 AM',
      notes: 'Interview scheduled for next week. Please bring original certificates.'
    },
    {
      id: 2,
      jobTitle: 'Physics Teacher',
      school: 'Modern School, Barakhamba Road',
      location: 'New Delhi',
      appliedDate: '2024-01-12',
      status: 'Under Review',
      statusColor: 'bg-yellow-100 text-yellow-800',
      salary: '₹6,00,000 - ₹9,00,000',
      type: 'Full-time',
      notes: 'Application is being reviewed by the recruitment team.'
    },
    {
      id: 3,
      jobTitle: 'Chemistry Teacher',
      school: 'St. Stephen\'s School',
      location: 'Chandigarh',
      appliedDate: '2024-01-10',
      status: 'Shortlisted',
      statusColor: 'bg-green-100 text-green-800',
      salary: '₹5,50,000 - ₹8,00,000',
      type: 'Full-time',
      notes: 'Congratulations! You have been shortlisted. HR will contact you soon.'
    },
    {
      id: 4,
      jobTitle: 'Mathematics Teacher',
      school: 'Kendriya Vidyalaya No. 2',
      location: 'Mumbai',
      appliedDate: '2024-01-08',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
      salary: '₹4,50,000 - ₹7,00,000',
      type: 'Full-time',
      notes: 'Thank you for your interest. We have selected another candidate.',
      feedback: 'Consider gaining more experience in digital teaching methods.'
    },
    {
      id: 5,
      jobTitle: 'Part-time Math Tutor',
      school: 'Bright Future Academy',
      location: 'Gurgaon',
      appliedDate: '2024-01-05',
      status: 'Applied',
      statusColor: 'bg-gray-100 text-gray-800',
      salary: '₹30,000 - ₹50,000',
      type: 'Part-time',
      notes: 'Application submitted successfully. Waiting for response.'
    }
  ];

  const getStatusStats = () => {
    const stats = {
      total: applications.length,
      applied: applications.filter(app => app.status === 'Applied').length,
      underReview: applications.filter(app => app.status === 'Under Review').length,
      shortlisted: applications.filter(app => app.status === 'Shortlisted').length,
      interview: applications.filter(app => app.status === 'Interview Scheduled').length,
      rejected: applications.filter(app => app.status === 'Rejected').length,
    };
    return stats;
  };

  const stats = getStatusStats();

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase().replace(' ', '-') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Applications</h1>
        <p className="text-muted-foreground">Track your job application status and progress</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.applied}</div>
            <div className="text-sm text-muted-foreground">Applied</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.underReview}</div>
            <div className="text-sm text-muted-foreground">Under Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.shortlisted}</div>
            <div className="text-sm text-muted-foreground">Shortlisted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.interview}</div>
            <div className="text-sm text-muted-foreground">Interviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by job title or school..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="under-review">Under Review</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{application.jobTitle}</h3>
                      <p className="text-muted-foreground">{application.school}</p>
                    </div>
                    <Badge className={application.statusColor}>
                      {application.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{application.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Applied: {application.appliedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{application.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💰 {application.salary}</span>
                    </div>
                  </div>

                  {application.interviewDate && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-3">
                      <div className="flex items-center gap-2 text-blue-800">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">Interview Scheduled</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Date: {application.interviewDate} at {application.interviewTime}
                      </p>
                    </div>
                  )}

                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm">{application.notes}</p>
                    {application.feedback && (
                      <div className="mt-2 p-2 bg-orange-50 rounded border border-orange-200">
                        <p className="text-sm text-orange-800">
                          <span className="font-medium">Feedback: </span>
                          {application.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message HR
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No applications found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'You haven\'t applied for any jobs yet'
              }
            </p>
            <Button>Browse Available Jobs</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Applications;
