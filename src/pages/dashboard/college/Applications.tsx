
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, Download, CheckCircle, XCircle, Clock, User } from 'lucide-react';

const CollegeApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const applications = [
    {
      id: 1,
      jobTitle: 'High School Mathematics Teacher',
      applicantName: 'Sarah Johnson',
      applicantEmail: 'sarah.johnson@email.com',
      experience: '8 years',
      education: 'M.Ed. Mathematics Education',
      appliedDate: '2024-01-16',
      status: 'Under Review',
      resumeUrl: '#',
      coverLetter: 'I am passionate about mathematics education...',
      qualifications: ['California Teaching Credential', 'Common Core Mathematics']
    },
    {
      id: 2,
      jobTitle: 'High School Mathematics Teacher',
      applicantName: 'Michael Chen',
      applicantEmail: 'michael.chen@email.com',
      experience: '5 years',
      education: 'B.S. Mathematics, M.Ed. Secondary Education',
      appliedDate: '2024-01-18',
      status: 'Shortlisted',
      resumeUrl: '#',
      coverLetter: 'With 5 years of teaching experience...',
      qualifications: ['Teaching License', 'Advanced Mathematics Certification']
    },
    {
      id: 3,
      jobTitle: 'Elementary Science Teacher',
      applicantName: 'Emily Rodriguez',
      applicantEmail: 'emily.rodriguez@email.com',
      experience: '3 years',
      education: 'B.S. Biology, Elementary Teaching Credential',
      appliedDate: '2024-01-20',
      status: 'New',
      resumeUrl: '#',
      coverLetter: 'I am excited to bring hands-on science learning...',
      qualifications: ['Elementary Teaching Credential', 'STEM Certification']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shortlisted':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase().replace(' ', '') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (appId: number, newStatus: string) => {
    console.log(`Changing application ${appId} status to ${newStatus}`);
  };

  const handleViewResume = (resumeUrl: string) => {
    console.log('Viewing resume:', resumeUrl);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Applications</h1>
        <p className="text-muted-foreground">Review and manage job applications</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by applicant name or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All ({applications.length})
              </Button>
              <Button
                variant={statusFilter === 'new' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('new')}
              >
                New ({applications.filter(a => a.status === 'New').length})
              </Button>
              <Button
                variant={statusFilter === 'underreview' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('underreview')}
              >
                Under Review ({applications.filter(a => a.status === 'Under Review').length})
              </Button>
              <Button
                variant={statusFilter === 'shortlisted' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('shortlisted')}
              >
                Shortlisted ({applications.filter(a => a.status === 'Shortlisted').length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{applications.length}</div>
            <p className="text-sm text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {applications.filter(a => a.status === 'New').length}
            </div>
            <p className="text-sm text-muted-foreground">New Applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {applications.filter(a => a.status === 'Shortlisted').length}
            </div>
            <p className="text-sm text-muted-foreground">Shortlisted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {applications.filter(a => a.status === 'Under Review').length}
            </div>
            <p className="text-sm text-muted-foreground">Under Review</p>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{application.applicantName}</h3>
                      <p className="text-sm text-muted-foreground">{application.applicantEmail}</p>
                    </div>
                    <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="font-medium text-foreground">Applied for: {application.jobTitle}</h4>
                    <p className="text-sm text-muted-foreground">Applied on {new Date(application.appliedDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm"><strong>Experience:</strong> {application.experience}</p>
                      <p className="text-sm"><strong>Education:</strong> {application.education}</p>
                    </div>
                    <div>
                      <p className="text-sm"><strong>Qualifications:</strong></p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {application.qualifications.map((qual, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{qual}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-sm"><strong>Cover Letter:</strong></p>
                    <p className="text-sm text-muted-foreground mt-1">{application.coverLetter}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-6">
                  <Button variant="outline" size="sm" onClick={() => handleViewResume(application.resumeUrl)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Resume
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleViewResume(application.resumeUrl)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  
                  {application.status !== 'Shortlisted' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleStatusChange(application.id, 'Shortlisted')}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Shortlist
                    </Button>
                  )}
                  
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleStatusChange(application.id, 'Rejected')}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CollegeApplications;
