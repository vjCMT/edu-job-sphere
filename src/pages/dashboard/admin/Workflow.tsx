
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Check, X, Clock, Calendar, FileText, AlertCircle } from 'lucide-react';

const AdminWorkflow = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const workflowItems = [
    {
      id: 1,
      type: 'Interview Schedule',
      candidateName: 'Sarah Johnson',
      collegeName: 'Lincoln High School',
      jobTitle: 'High School Mathematics Teacher',
      scheduledDate: '2024-02-01',
      scheduledTime: '10:00 AM',
      status: 'Pending Approval',
      submittedDate: '2024-01-28',
      details: 'College has scheduled an interview and is requesting admin approval'
    },
    {
      id: 2,
      type: 'Offer Letter',
      candidateName: 'Michael Chen',
      collegeName: 'Riverside Middle School',
      jobTitle: 'English Literature Teacher',
      offerAmount: '$62,000',
      status: 'Pending Review',
      submittedDate: '2024-01-29',
      details: 'Offer letter submitted for final approval before sending to candidate'
    },
    {
      id: 3,
      type: 'Interview Schedule',
      candidateName: 'Emily Rodriguez',
      collegeName: 'Sunshine Elementary',
      jobTitle: 'Elementary Science Teacher',
      scheduledDate: '2024-02-03',
      scheduledTime: '11:00 AM',
      status: 'Approved',
      submittedDate: '2024-01-27',
      approvedDate: '2024-01-28',
      details: 'Interview schedule approved and candidate notified'
    },
    {
      id: 4,
      type: 'Offer Letter',
      candidateName: 'David Kim',
      collegeName: 'Valley High School',
      jobTitle: 'Physical Education Teacher',
      offerAmount: '$58,000',
      status: 'Rejected',
      submittedDate: '2024-01-26',
      rejectedDate: '2024-01-27',
      rejectionReason: 'Salary offered below minimum standards',
      details: 'Offer rejected due to compensation below district guidelines'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Approval':
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Interview Schedule':
        return <Calendar className="w-5 h-5" />;
      case 'Offer Letter':
        return <FileText className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const filteredItems = workflowItems.filter(item => {
    const matchesSearch = item.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase().replace(' ', '') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (itemId: number) => {
    console.log('Approving workflow item:', itemId);
  };

  const handleReject = (itemId: number) => {
    console.log('Rejecting workflow item:', itemId);
  };

  const handleViewDetails = (itemId: number) => {
    console.log('Viewing details for item:', itemId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Workflow Management</h1>
        <p className="text-muted-foreground">Review and approve interview schedules and offer letters</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by candidate, college, or job title..."
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
                All ({workflowItems.length})
              </Button>
              <Button
                variant={statusFilter === 'pendingapproval' || statusFilter === 'pendingreview' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pending ({workflowItems.filter(i => i.status.includes('Pending')).length})
              </Button>
              <Button
                variant={statusFilter === 'approved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('approved')}
              >
                Approved ({workflowItems.filter(i => i.status === 'Approved').length})
              </Button>
              <Button
                variant={statusFilter === 'rejected' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('rejected')}
              >
                Rejected ({workflowItems.filter(i => i.status === 'Rejected').length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{workflowItems.length}</div>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {workflowItems.filter(i => i.status.includes('Pending')).length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {workflowItems.filter(i => i.status === 'Approved').length}
            </div>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {workflowItems.filter(i => i.type === 'Interview Schedule').length}
            </div>
            <p className="text-sm text-muted-foreground">Interview Schedules</p>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{item.type}</h3>
                      <p className="text-sm text-muted-foreground">
                        Submitted by {item.collegeName} on {new Date(item.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm"><strong>Candidate:</strong> {item.candidateName}</p>
                      <p className="text-sm"><strong>Position:</strong> {item.jobTitle}</p>
                      <p className="text-sm"><strong>College:</strong> {item.collegeName}</p>
                    </div>
                    
                    <div>
                      {item.type === 'Interview Schedule' && (
                        <>
                          <p className="text-sm"><strong>Date:</strong> {new Date(item.scheduledDate).toLocaleDateString()}</p>
                          <p className="text-sm"><strong>Time:</strong> {item.scheduledTime}</p>
                        </>
                      )}
                      {item.type === 'Offer Letter' && (
                        <p className="text-sm"><strong>Offer Amount:</strong> {item.offerAmount}</p>
                      )}
                      {item.approvedDate && (
                        <p className="text-sm"><strong>Approved:</strong> {new Date(item.approvedDate).toLocaleDateString()}</p>
                      )}
                      {item.rejectedDate && (
                        <p className="text-sm"><strong>Rejected:</strong> {new Date(item.rejectedDate).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                    {item.rejectionReason && (
                      <p className="text-sm text-red-600 mt-2"><strong>Rejection Reason:</strong> {item.rejectionReason}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-6">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(item.id)}>
                    <FileText className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  
                  {item.status.includes('Pending') && (
                    <>
                      <Button size="sm" onClick={() => handleApprove(item.id)}>
                        <Check className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleReject(item.id)}>
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminWorkflow;
