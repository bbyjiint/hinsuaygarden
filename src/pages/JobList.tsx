import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Plus } from 'lucide-react'
import { Job, JobStatus } from '../types'

// Mock data
const mockJobs: Job[] = [
  {
    id: '1',
    code: 'JOB-2024-001',
    customer: { id: '1', name: 'คุณสมชาย ใจดี', phone: '081-234-5678', address: '123 ถ.สุขุมวิท กรุงเทพ' },
    status: 'measuring',
    createdAt: '2024-01-15',
    totalAmount: 150000
  },
  {
    id: '2',
    code: 'JOB-2024-002',
    customer: { id: '2', name: 'คุณสุดา รักงาน', phone: '082-345-6789', address: '456 ถ.พหลโยธิน กรุงเทพ' },
    status: 'quoting',
    createdAt: '2024-01-16',
    totalAmount: 200000
  },
  {
    id: '3',
    code: 'JOB-2024-003',
    customer: { id: '3', name: 'คุณประเสริฐ ดีงาม', phone: '083-456-7890', address: '789 ถ.รัชดาภิเษก กรุงเทพ' },
    status: 'in-progress',
    createdAt: '2024-01-10',
    totalAmount: 300000
  },
  {
    id: '4',
    code: 'JOB-2024-004',
    customer: { id: '4', name: 'คุณมาลี สวยงาม', phone: '084-567-8901', address: '321 ถ.สีลม กรุงเทพ' },
    status: 'pending-follow',
    createdAt: '2024-01-05',
    totalAmount: 180000
  },
  {
    id: '5',
    code: 'JOB-2024-005',
    customer: { id: '5', name: 'คุณวิชัย มั่นคง', phone: '085-678-9012', address: '654 ถ.เพชรบุรี กรุงเทพ' },
    status: 'completed',
    createdAt: '2023-12-20',
    totalAmount: 250000
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

export default function JobList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all')

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = 
      job.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.customer.phone.includes(searchQuery)
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const statusOptions: Array<JobStatus | 'all'> = [
    'all',
    'pending',
    'measuring',
    'quoting',
    'approved',
    'in-progress',
    'pending-follow',
    'completed'
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">รายการงาน</h1>
          <p className="text-gray-600">จัดการงานทั้งหมด</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>เพิ่มงานใหม่</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="ค้นหาด้วยรหัสงาน, ชื่อลูกค้า, เบอร์โทร..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as JobStatus | 'all')}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="pending">รอ</option>
              <option value="measuring">ต้องวัด</option>
              <option value="quoting">ต้องออกใบเสนอราคา</option>
              <option value="approved">ลูกค้าตกลง</option>
              <option value="in-progress">กำลังทำ</option>
              <option value="pending-follow">ค้างติดตาม</option>
              <option value="completed">เสร็จ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="card">
        <div className="space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>ไม่พบงานที่ค้นหา</p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const statusBadge = getStatusBadge(job.status)
              return (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-bold text-gray-900 text-lg">{job.code}</span>
                        <span className={`badge ${statusBadge.class}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-900 font-medium">{job.customer.name}</p>
                        <p className="text-sm text-gray-600">{job.customer.phone}</p>
                        {job.customer.address && (
                          <p className="text-sm text-gray-500">{job.customer.address}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      {job.totalAmount && (
                        <p className="text-lg font-bold text-gray-900 mb-1">
                          {job.totalAmount.toLocaleString('th-TH')} ฿
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        สร้างเมื่อ: {new Date(job.createdAt).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

