
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Edit, Trash2, Check, X, Building, MapPin, Clock } from 'lucide-react';

const AdminJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'High School Mathematics Teacher',
      school: 'Lincoln High School',
      location: 'San Francisco, CA',
      salary: '$55,000 - $75,000',
      status: 'Pending',
      postedDate: '2024-01-15',
      applicants: 0,
      description: 'Seeking passionate math teacher for grades 9-12'
    },
    {
      id: 2,
      title: 'Elementary Science Teacher',
      school: 'Sunshine Elementary',
      location: 'Oakland, CA',
      salary: '$48,000 - $62,000',
      status: 'Approved',
      postedDate: '2024-01-10',
      applicants: 8,
      description: 'Join our innovative elementary science program'
    },
    {
      id: 3,
      title: 'English Literature Teacher',
      school: 'Riverside Middle School',
      location: 'Berkeley, CA',
      salary: '$52,000 - $68,000',
      status: 'Approved',
      postedDate: '2024-01-08',
      applicants: 15,
      description: 'Engage middle school students in literature'
    },
    {
      id: 4,
      title: 'Physical Education Teacher',
      school: 'Valley High School',
      location: 'San Jose, CA',
      salary: '$50,000 - $65,000',
      status: 'Rejected',
      postedDate: '2024-01-05',
      applicants: 0,
      description: 'PE teacher position with incomplete requirements'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (jobId: number) => {
    console.log('Approving job:', jobId);
  };

  const handleReject = (jobId: number) => {
    console.log('Rejecting job:', jobId);
  };

  const handleEdit = (jobId: number) => {
    console.log('Editing job:', jobId);
  };

  const handleDelete = (jobId: number) => {
    console.log('Deleting job:', jobId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Management</h1>
          <p className="text-muted-foreground">Approve, reject, create, update, or delete job postings</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create New Job
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title or school..."
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
                All ({jobs.length})
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pending ({jobs.filter(j => j.status === 'Pending').length})
              </Button>
              <Button
                variant={statusFilter === 'approved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('approved')}
              >
                Approved ({jobs.filter(j => j.status === 'Approved').length})
              </Button>
              <Button
                variant={statusFilter === 'rejected' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('rejected')}
              >
                Rejected ({jobs.filter(j => j.status === 'Rejected').length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{jobs.length}</div>
            <p className="text-sm text-muted-foreground">Total Jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {jobs.filter(j => j.status === 'Pending').length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {jobs.filter(j => j.status === 'Approved').length}
            </div>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {jobs.reduce((sum, job) => sum + job.applicants, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Applicants</p>
          </CardContent>
        </Card>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                    <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span>{job.school}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{job.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-green-600">{job.salary}</span>
                    <span className="text-muted-foreground">{job.applicants} applicants</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-6">
                  {job.status === 'Pending' && (
                    <>
                      <Button size="sm" onClick={() => handleApprove(job.id)}>
                        <Check className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleReject(job.id)}>
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleEdit(job.id)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(job.id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
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

export default AdminJobs;
