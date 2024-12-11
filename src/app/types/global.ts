type Post = {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  jobId?: string;
  analyticsId?: string;
  user: User;
  job?: Job;
  analytic?: Analytic;
};

type Analytic = {
  id: string;
  views: Number;
  likes: Number;
  commentsAmount: Number;
  shares: Number;
  saves: Number;
  score: Number;
  postId: string;
  post: Post[];
};

type Application = {
  id?: string;
  userId?: string;
  jobId?: string;
  companyId?: string;
  user?: User;
  job?: Job;
  company?: Company;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
};

type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  portifolio: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
  post: Post[];
  application: Application[];
  company: Company;
};

type Job = {
  id: string;
  title: string;
  description: string;
  available: Boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  post: Post[];
  application: Application[];
  company: Company;
  companyId: string;
};

type Company = {
  id: string;
  name: string;
  sector: string;
  employees: Number;
  rating: Number;
  job: Job[];
  application: Application[];
  user: User[];
};
