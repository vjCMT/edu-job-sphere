
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, Calendar, MapPin, Clock, Eye, MessageSquare, Download, Search, Filter, User, Star, CheckCircle, XCircle, Phone, Mail } from 'lucide-react';

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');

  const applications = [
    {
      id: 1,
      candidateName: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543210',
      jobTitle: 'Senior Mathematics Teacher',
      appliedDate: '2024-01-15',
      status: 'New',
      statusColor: 'bg-blue-100 text-blue-800',
      experience: '5 years',
      education: 'M.Ed Mathematics, Delhi University',
      currentSalary: '₹6,00,000',
      expectedSalary: '₹8,00,000',
      location: 'New Delhi',
      skills: ['Mathematics', 'Algebra', 'Calculus', 'Digital Teaching'],
      rating: 4.5,
      resumeUrl: '/resume/priya-sharma.pdf',
      coverLetter: 'I am passionate about mathematics education and have been teaching for 5 years...',
      achievements: ['Teacher of the Year 2022', '95% student pass rate', 'Mathematics Olympiad Coach']
    },
    {
      id: 2,
      candidateName: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 9876543211',
      jobTitle: 'Physics Teacher',
      appliedDate: '2024-01-14',
      status: 'Under Review',
      statusColor: 'bg-yellow-100 text-yellow-800',
      experience: '8 years',
      education: 'M.Sc Physics, IIT Delhi',
      currentSalary: '₹7,50,000',
      expectedSalary: '₹9,00,000',
      location: 'New Delhi',
      skills: ['Physics', 'Laboratory Management', 'Research', 'Science Clubs'],
      rating: 4.8,
      resumeUrl: '/resume/rajesh-kumar.pdf',
      coverLetter: 'With 8 years of experience in physics education, I have developed innovative teaching methods...',
      achievements: ['Published 3 research papers', 'Science Fair Winner Coach', 'Lab Innovation Award']
    },
    {
      id: 3,
      candidateName: 'Anjali Gupta',
      email: 'anjali.gupta@email.com',
      phone: '+91 9876543212',
      jobTitle: 'Chemistry Teacher',
      appliedDate: '2024-01-13',
      status: 'Shortlisted',
      statusColor: 'bg-green-100 text-green-800',
      experience: '6 years',
      education: 'M.Sc Chemistry, JNU',
      currentSalary: '₹5,50,000',
      expectedSalary: '₹7,00,000',
      location: 'New Delhi',
      skills: ['Chemistry', 'Organic Chemistry', 'Lab Safety', 'Environmental Science'],
      rating: 4.6,
      resumeUrl: '/resume/anjali-gupta.pdf',
      coverLetter: 'I am excited about the opportunity to teach chemistry at your esteemed institution...',
      achievements: ['Best Chemistry Teacher Award', 'Green Chemistry Project Lead', 'Student Mentoring Excellence']
    },
    {
      id: 4,
      candidateName: 'Mohammed Ali',
      email: 'mohammed.ali@email.com',
      phone: '+91 9876543213',
      jobTitle: 'Mathematics Teacher',
      appliedDate: '2024-01-12',
      status: 'Interview Scheduled',
      statusColor: 'bg-purple-100 text-purple-800',
      experience: '4 years',
      education: 'B.Ed Mathematics, AMU',
      currentSalary: '₹4,50,000',
      expectedSalary: '₹6,00,000',
      location: 'New Delhi',
      skills: ['Mathematics', 'Problem Solving', 'Math Competitions', 'Technology Integration'],
      rating: 4.3,
      resumeUrl: '/resume/mohammed-ali.pdf',
      coverLetter: 'Mathematics has always been my passion, and I believe in making it accessible to all students...',
      achievements: ['Math Competition Coach', 'Digital Learning Pioneer', 'Student Progress Improvement 30%'],
      interviewDate: '2024-01-20',
      interviewTime: '2:00 PM'
    },
    {
      id: 5,
      candidateName: 'Sunita Verma',
      email: 'sunita.verma@email.com',
      phone: '+91 9876543214',
      jobTitle: 'English Teacher',
      appliedDate: '2024-01-11',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
      experience: '3 years',
      education: 'M.A English Literature, DU',
      currentSalary: '₹4,00,000',
      expectedSalary: '₹5,50,000',
      location: 'New Delhi',
      skills: ['English Literature', 'Creative Writing', 'Grammar', 'Public Speaking'],
      rating: 4.1,
      resumeUrl: '/resume/sunita-verma.pdf',
      coverLetter: 'I am passionate about English literature and enjoy helping students develop their language skills...',
      achievements: ['Drama Club Coordinator', 'Poetry Competition Judge', 'Creative Writing Workshop'],
      rejectionReason: 'We found a candidate with more experience in CBSE curriculum'
    }
  ];

  const jobs = [
    'Senior Mathematics Teacher',
    'Physics Teacher', 
    'Chemistry Teacher',
    'Mathematics Teacher',
    'English Teacher'
  ];

  const getStatusStats = () => {
    const stats = {
      total: applications.length,
      new: applications.filter(app => app.status === 'New').length,
      underReview: applications.filter(app => app.status === 'Under Review').length,
      shortlisted: applications.filter(app => app.status === 'Shortlisted').length,
      interview: applications.filter(app => app.status === 'Interview Scheduled').length,
      rejected: applications.filter(app => app.status === 'Rejected').length,
    };
    return stats;
  };

  const stats = getStatusStats();

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase().replace(' ', '-') === statusFilter;
    const matchesJob = jobFilter === 'all' || app.jobTitle === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <p className="text-muted-foreground">Review and manage candidate applications for your job postings</p>
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
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            <div className="text-sm text-muted-foreground">New</div>
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
            <div className="text-2xl font-bold text-purple-600">{stats.interview}</div>
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
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by candidate name, email, or job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full lg:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="under-review">Under Review</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={jobFilter} onValueChange={setJobFilter}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Filter by job" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            {jobs.map(job => (
              <SelectItem key={job} value={job}>{job}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Candidate Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={`/avatars/${application.candidateName.toLowerCase().replace(' ', '-')}.jpg`} />
                      <AvatarFallback>
                        {application.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{application.candidateName}</h3>
                          <p className="text-muted-foreground">{application.jobTitle}</p>
                        </div>
                        <Badge className={application.statusColor}>
                          {application.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span>{application.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>{application.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{application.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Applied: {application.appliedDate}</span>
                        </div>
                      </div>

                      {/* Experience and Education */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-medium text-sm mb-1">Experience & Education</h5>
                          <p className="text-sm text-muted-foreground">{application.experience} experience</p>
                          <p className="text-sm text-muted-foreground">{application.education}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-1">Salary Expectations</h5>
                          <p className="text-sm text-muted-foreground">Current: {application.currentSalary}</p>
                          <p className="text-sm text-muted-foreground">Expected: {application.expectedSalary}</p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-4">
                        <h5 className="font-medium text-sm mb-2">Skills</h5>
                        <div className="flex flex-wrap gap-2">
                          {application.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h5 className="font-medium text-sm mb-2">Key Achievements</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {application.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Star className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Interview Info */}
                      {application.interviewDate && (
                        <div className="bg-purple-50 p-3 rounded-lg mb-3">
                          <div className="flex items-center gap-2 text-purple-800">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">Interview Scheduled</span>
                          </div>
                          <p className="text-sm text-purple-700">
                            Date: {application.interviewDate} at {application.interviewTime}
                          </p>
                        </div>
                      )}

                      {/* Rejection Reason */}
                      {application.rejectionReason && (
                        <div className="bg-red-50 p-3 rounded-lg mb-3">
                          <div className="flex items-center gap-2 text-red-800">
                            <XCircle className="w-4 h-4" />
                            <span className="font-medium">Rejection Reason</span>
                          </div>
                          <p className="text-sm text-red-700">{application.rejectionReason}</p>
                        </div>
                      )}

                      {/* Cover Letter Preview */}
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h5 className="font-medium text-sm mb-2">Cover Letter</h5>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {application.coverLetter}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:min-w-[200px]">
                  <div className="text-center mb-2">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{application.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Candidate Rating</p>
                  </div>
                  
                  <Button size="sm" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  
                  {application.status === 'New' && (
                    <>
                      <Button variant="default" size="sm" className="w-full mt-2">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Shortlist
                      </Button>
                      <Button variant="destructive" size="sm" className="w-full">
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                  
                  {application.status === 'Shortlisted' && (
                    <Button variant="default" size="sm" className="w-full mt-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Interview
                    </Button>
                  )}
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
              {searchTerm || statusFilter !== 'all' || jobFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No candidates have applied for your job postings yet'
              }
            </p>
            <Button>Post New Job</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Applications;
