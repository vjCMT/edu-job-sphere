
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, MessageCircle, FileText, CheckCircle, User, Mail, Phone } from 'lucide-react';

const CollegeShortlist = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const shortlistedCandidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      jobTitle: 'High School Mathematics Teacher',
      experience: '8 years',
      education: 'M.Ed. Mathematics Education, Stanford University',
      qualifications: ['California Teaching Credential', 'Common Core Mathematics', 'Special Education'],
      interviewDate: '2024-02-01',
      interviewTime: '10:00 AM',
      interviewStatus: 'Scheduled',
      notes: 'Excellent teaching portfolio, strong recommendations'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      jobTitle: 'High School Mathematics Teacher',
      experience: '5 years',
      education: 'B.S. Mathematics, M.Ed. Secondary Education',
      qualifications: ['Teaching License', 'Advanced Mathematics Certification'],
      interviewDate: '2024-02-02',
      interviewTime: '2:00 PM',
      interviewStatus: 'Pending',
      notes: 'Strong technical background, good student feedback'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      jobTitle: 'Elementary Science Teacher',
      experience: '3 years',
      education: 'B.S. Biology, Elementary Teaching Credential',
      qualifications: ['Elementary Teaching Credential', 'STEM Certification'],
      interviewDate: '2024-02-03',
      interviewTime: '11:00 AM',
      interviewStatus: 'Completed',
      notes: 'Great enthusiasm for hands-on learning, creative lesson plans'
    }
  ];

  const getInterviewStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCandidates = shortlistedCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScheduleInterview = (candidateId: number) => {
    console.log('Scheduling interview for candidate:', candidateId);
  };

  const handleSendMessage = (candidateId: number) => {
    console.log('Sending message to candidate:', candidateId);
  };

  const handleHire = (candidateId: number) => {
    console.log('Hiring candidate:', candidateId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Shortlisted Candidates</h1>
        <p className="text-muted-foreground">Manage interviews and hiring decisions for shortlisted candidates</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search shortlisted candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{shortlistedCandidates.length}</div>
            <p className="text-sm text-muted-foreground">Shortlisted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {shortlistedCandidates.filter(c => c.interviewStatus === 'Scheduled').length}
            </div>
            <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {shortlistedCandidates.filter(c => c.interviewStatus === 'Completed').length}
            </div>
            <p className="text-sm text-muted-foreground">Interviews Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {shortlistedCandidates.filter(c => c.interviewStatus === 'Pending').length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Action</p>
          </CardContent>
        </Card>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{candidate.name}</h3>
                      <p className="text-sm text-muted-foreground">Applied for: {candidate.jobTitle}</p>
                    </div>
                    <Badge className={getInterviewStatusColor(candidate.interviewStatus)}>
                      {candidate.interviewStatus}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{candidate.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{candidate.phone}</span>
                      </div>
                      <p className="text-sm"><strong>Experience:</strong> {candidate.experience}</p>
                      <p className="text-sm"><strong>Education:</strong> {candidate.education}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Qualifications:</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {candidate.qualifications.map((qual, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{qual}</Badge>
                        ))}
                      </div>
                      
                      {candidate.interviewDate && (
                        <div className="bg-muted/30 rounded-lg p-3">
                          <p className="text-sm font-medium">Interview Details:</p>
                          <p className="text-sm">Date: {new Date(candidate.interviewDate).toLocaleDateString()}</p>
                          <p className="text-sm">Time: {candidate.interviewTime}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-sm font-medium">Notes:</p>
                    <p className="text-sm text-muted-foreground">{candidate.notes}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-6">
                  {candidate.interviewStatus === 'Pending' && (
                    <Button size="sm" onClick={() => handleScheduleInterview(candidate.id)}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Interview
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" onClick={() => handleSendMessage(candidate.id)}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  
                  {candidate.interviewStatus === 'Completed' && (
                    <Button size="sm" onClick={() => handleHire(candidate.id)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Hire Candidate
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    View Profile
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

export default CollegeShortlist;
