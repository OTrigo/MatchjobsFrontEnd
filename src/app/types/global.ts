type Post = {
  id: String;
  title: String;
  description: String;
  videoUrl?: String;
  createdAt: Date;
  updatedAt: Date;
  userId: String;
  jobId?: String;
  analyticsId?: String;
  user: User;
  job?: Job;
  analytic?: Analytic;
};

type Analytic = {
  id: String;
  views: Number;
  likes: Number;
  commentsAmount: Number;
  shares: Number;
  saves: Number;
  score: Number;
  postId: String;
  post: Post[];
};

type Application = {
  id?: String;
  userId?: String;
  jobId?: String;
  companyId?: String;
  user?: User;
  job?: Job;
  company?: Company;
  createdAt?: Date;
  updatedAt?: Date;
  status?: String;
};

type User = {
  id: String;
  email: String;
  password: String;
  name: String;
  role: String;
  portifolio: String;
  address: String;
  createdAt: Date;
  updatedAt: Date;
  companyId: String;
  post: Post[];
  application: Application[];
  company: Company;
};

type Job = {
  id: String;
  title: String;
  description: String;
  available: Boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: String;
  post: Post[];
  application: Application[];
  company: Company;
  companyId: String;
};

type Company = {
  id: String;
  name: String;
  sector: String;
  employees: Number;
  rating: Number;
  job: Job[];
  application: Application[];
  user: User[];
};
