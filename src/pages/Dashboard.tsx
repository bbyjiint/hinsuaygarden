import { Link } from 'react-router-dom'
import { UserRole } from '../App'
import { 
  Calendar, 
  FileText, 
  Hammer, 
  Clock, 
  TrendingUp,
  AlertCircle,
  CheckCircle2
} from 'lucide-react'
import { Job, JobStatus } from '../types'

// Mock data
const mockJobs: Job[] = [
  {
    id: '1',
    code: 'JOB-2024-001',
    customer: { id: '1', name: 'คุณสมชาย ใจดี', phone: '081-234-5678' },
    status: 'measuring',
    createdAt: '2024-01-15',
    totalAmount: 150000
  },
  {
    id: '2',
    code: 'JOB-2024-002',
    customer: { id: '2', name: 'คุณสุดา รักงาน', phone: '082-345-6789' },
    status: 'quoting',
    createdAt: '2024-01-16',
    totalAmount: 200000
  },
  {
    id: '3',
    code: 'JOB-2024-003',
    customer: { id: '3', name: 'คุณประเสริฐ ดีงาม', phone: '083-456-7890' },
    status: 'in-progress',
    createdAt: '2024-01-10',
    totalAmount: 300000
  },
  {
    id: '4',
    code: 'JOB-2024-004',
    customer: { id: '4', name: 'คุณมาลี สวยงาม', phone: '084-567-8901' },
    status: 'pending-follow',
    createdAt: '2024-01-05',
    totalAmount: 180000
  }
]

const getStatusBadge = (status: JobStatus) => {
  const badges = {
    pending: { label: 'รอ', class: 'badge-gray' },
    measuring: { label: 'ต้องวัด', class: 'badge-yellow' },
    quoting: { label: 'ต้องออกใบเสนอราคา', class: 'badge-blue' },
    approved: { label: 'ลูกค้าตกลง', class: 'badge-green' },
    'in-progress': { label: 'กำลังทำ', class: 'badge-blue' },
    'pending-follow': { label: 'ค้างติดตาม', class: 'badge-red' },
    completed: { label: 'เสร็จ', class: 'badge-green' },
    cancelled: { label: 'ยกเลิก', class: 'badge-gray' }
  }
  return badges[status] || badges.pending
}

export default function Dashboard({ userRole }: { userRole: UserRole }) {
  const todayJobs = mockJobs.filter(job => 
    job.status === 'in-progress' || 
    (job.status === 'measuring' && job.createdAt === new Date().toISOString().split('T')[0])
  )
  
  const measuringJobs = mockJobs.filter(job => job.status === 'measuring')
  const quotingJobs = mockJobs.filter(job => job.status === 'quoting')
  const inProgressJobs = mockJobs.filter(job => job.status === 'in-progress')
  const pendingFollowJobs = mockJobs.filter(job => job.status === 'pending-follow')
  
  const totalRevenue = mockJobs
    .filter(job => job.status === 'completed' || job.status === 'in-progress')
    .reduce((sum, job) => sum + (job.totalAmount || 0), 0)

  const cards = [
    {
      title: 'งานวันนี้',
      count: todayJobs.length,
      icon: Calendar,
      color: 'blue',
      jobs: todayJobs
    },
    {
      title: 'งานต้องวัด',
      count: measuringJobs.length,
      icon: AlertCircle,
      color: 'yellow',
      jobs: measuringJobs
    },
    {
      title: 'งานต้องออกใบเสนอราคา',
      count: quotingJobs.length,
      icon: FileText,
      color: 'blue',
      jobs: quotingJobs
    },
    {
      title: 'งานกำลังทำ',
      count: inProgressJobs.length,
      icon: Hammer,
      color: 'green',
      jobs: inProgressJobs
    },
    {
      title: 'งานค้างติดตาม',
      count: pendingFollowJobs.length,
      icon: Clock,
      color: 'red',
      jobs: pendingFollowJobs
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">แดชบอร์ด</h1>
        <p className="text-gray-600">ภาพรวมงานทั้งหมด</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              to="/jobs"
              className="card hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.count}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${card.color}-50`}>
                  <Icon size={24} className={`text-${card.color}-600`} />
                </div>
              </div>
            </Link>
          )
        })}
        
        {/* Revenue Card */}
        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-gray-700 text-sm mb-1">ยอดรวม (ประมาณ)</p>
              <p className="text-3xl font-bold text-green-700">
                {totalRevenue.toLocaleString('th-TH')} ฿
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <TrendingUp size={24} className="text-green-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Jobs List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">งานล่าสุด</h2>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            ดูทั้งหมด →
          </Link>
        </div>
        
        <div className="space-y-3">
          {mockJobs.slice(0, 5).map((job) => {
            const statusBadge = getStatusBadge(job.status)
            return (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="font-medium text-gray-900">{job.code}</span>
                    <span className={`badge ${statusBadge.class}`}>
                      {statusBadge.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{job.customer.name}</p>
                </div>
                <div className="text-right">
                  {job.totalAmount && (
                    <p className="text-sm font-medium text-gray-900">
                      {job.totalAmount.toLocaleString('th-TH')} ฿
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(job.createdAt).toLocaleDateString('th-TH')}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      {userRole === 'admin' && (
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-3">การแจ้งเตือน</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2 text-yellow-700">
              <AlertCircle size={16} />
              <span>งาน JOB-2024-002 ต้องออกใบเสนอราคาภายใน 3 วัน</span>
            </div>
            <div className="flex items-center space-x-2 text-red-700">
              <AlertCircle size={16} />
              <span>งาน JOB-2024-004 ค้างติดตามลูกค้า 5 วัน</span>
            </div>
            <div className="flex items-center space-x-2 text-green-700">
              <CheckCircle2 size={16} />
              <span>งาน JOB-2024-003 รออัปโหลดรายงานประจำวัน</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

