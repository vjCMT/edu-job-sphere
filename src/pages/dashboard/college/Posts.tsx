
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Edit, Trash2, Eye, Users, Calendar, DollarSign } from 'lucide-react';

const CollegePosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const jobPosts = [
    {
      id: 1,
      title: 'High School Mathematics Teacher',
      department: 'Mathematics',
      status: 'Active',
      applicants: 12,
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      salary: '$55,000 - $75,000',
      location: 'Main Campus',
      views: 145
    },
    {
      id: 2,
      title: 'Elementary Science Teacher',
      department: 'Science',
      status: 'Pending',
      applicants: 0,
      postedDate: '2024-01-20',
      deadline: '2024-02-20',
      salary: '$48,000 - $62,000',
      location: 'Elementary Wing',
      views: 67
    },
    {
      id: 3,
      title: 'English Literature Teacher',
      department: 'English',
      status: 'Closed',
      applicants: 28,
      postedDate: '2023-12-10',
      deadline: '2024-01-10',
      salary: '$52,000 - $68,000',
      location: 'Liberal Arts Building',
      views: 289
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPosts = jobPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (postId: number) => {
    console.log('Editing post:', postId);
  };

  const handleDelete = (postId: number) => {
    console.log('Deleting post:', postId);
  };

  const handleView = (postId: number) => {
    console.log('Viewing post:', postId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Job Posts</h1>
          <p className="text-muted-foreground">View and manage your published job listings</p>
        </div>
        <Button>
          <Edit className="w-4 h-4 mr-2" />
          New Job Post
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search job posts..."
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
                All ({jobPosts.length})
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
              >
                Active ({jobPosts.filter(p => p.status === 'Active').length})
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pending ({jobPosts.filter(p => p.status === 'Pending').length})
              </Button>
              <Button
                variant={statusFilter === 'closed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('closed')}
              >
                Closed ({jobPosts.filter(p => p.status === 'Closed').length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{jobPosts.length}</div>
            <p className="text-sm text-muted-foreground">Total Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {jobPosts.filter(p => p.status === 'Active').length}
            </div>
            <p className="text-sm text-muted-foreground">Active Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {jobPosts.reduce((sum, post) => sum + post.applicants, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {jobPosts.reduce((sum, post) => sum + post.views, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </CardContent>
        </Card>
      </div>

      {/* Job Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{post.title}</h3>
                    <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{post.applicants} applicants</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>{post.views} views</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {new Date(post.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>{post.salary}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span><strong>Department:</strong> {post.department}</span>
                    <span><strong>Location:</strong> {post.location}</span>
                    <span><strong>Posted:</strong> {new Date(post.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-6">
                  <Button variant="outline" size="sm" onClick={() => handleView(post.id)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(post.id)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
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

export default CollegePosts;
