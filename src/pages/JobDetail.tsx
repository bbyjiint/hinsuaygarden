import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  Calendar, 
  FileText, 
  DollarSign, 
  Upload, 
  MapPin,
  Phone,
  User,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react'
import { Job, JobStatus } from '../types'
import { useState } from 'react'

// Mock data
const mockJob: Job = {
  id: '1',
  code: 'JOB-2024-001',
  customer: {
    id: '1',
    name: 'คุณสมชาย ใจดี',
    phone: '081-234-5678',
    address: '123 ถ.สุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพฯ 10110'
  },
  status: 'measuring',
  createdAt: '2024-01-15',
  totalAmount: 150000,
  appointment: {
    id: '1',
    jobId: '1',
    date: '2024-01-20',
    time: '10:00',
    address: '123 ถ.สุขุมวิท กรุงเทพ',
    distance: 15,
    fee: 500
  },
  quotation: {
    id: '1',
    jobId: '1',
    status: 'not-created',
    amount: 150000
  },
  payments: [
    {
      id: '1',
      jobId: '1',
      phase: 1,
      amount: 30000,
      dueDate: '2024-01-25',
      status: 'pending'
    }
  ]
}

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

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'info' | 'appointment' | 'quotation' | 'payment' | 'files' | 'foreman'>('info')
  
  // In real app, fetch job by id
  const job = mockJob

  const tabs = [
    { id: 'info', label: 'ข้อมูลงาน', icon: User },
    { id: 'appointment', label: 'นัดวัดหน้างาน', icon: Calendar },
    { id: 'quotation', label: 'ใบเสนอราคา', icon: FileText },
    { id: 'payment', label: 'การเงิน', icon: DollarSign },
    { id: 'files', label: 'ไฟล์/รูป', icon: Upload },
    { id: 'foreman', label: 'รายงานหน้างาน', icon: CheckCircle2 }
  ]

  const statusBadge = getStatusBadge(job.status)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => navigate('/jobs')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{job.code}</h1>
            <span className={`badge ${statusBadge.class}`}>
              {statusBadge.label}
            </span>
          </div>
          <p className="text-gray-600">รายละเอียดงานและข้อมูลทั้งหมด</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-600 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">ข้อมูลลูกค้า</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <User className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">ชื่อลูกค้า</p>
                    <p className="font-medium text-gray-900">{job.customer.name}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">เบอร์โทร</p>
                    <p className="font-medium text-gray-900">{job.customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 md:col-span-2">
                  <MapPin className="text-gray-400 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">ที่อยู่</p>
                    <p className="font-medium text-gray-900">{job.customer.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">ข้อมูลงาน</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">รหัสงาน</p>
                  <p className="font-medium text-gray-900">{job.code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">วันที่สร้าง</p>
                  <p className="font-medium text-gray-900">
                    {new Date(job.createdAt).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                {job.totalAmount && (
                  <div>
                    <p className="text-sm text-gray-500">ยอดรวม (ประมาณ)</p>
                    <p className="font-medium text-gray-900 text-lg">
                      {job.totalAmount.toLocaleString('th-TH')} ฿
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointment' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">นัดวัดหน้างาน</h2>
              <Link
                to={`/appointment/${job.id}`}
                className="btn btn-primary"
              >
                จัดการนัดวัด
              </Link>
            </div>
            
            {job.appointment ? (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">วันที่</p>
                    <p className="font-medium text-gray-900">
                      {new Date(job.appointment.date).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">เวลา</p>
                    <p className="font-medium text-gray-900">{job.appointment.time}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">ที่อยู่</p>
                    <p className="font-medium text-gray-900">{job.appointment.address}</p>
                  </div>
                  {job.appointment.distance && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">ระยะทางจากโกดัง</p>
                      <p className="font-medium text-gray-900">{job.appointment.distance} km</p>
                    </div>
                  )}
                  {job.appointment.fee && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">ค่าวัดหน้างาน</p>
                      <p className="font-medium text-gray-900">{job.appointment.fee.toLocaleString('th-TH')} ฿</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="mx-auto mb-3 text-gray-400" size={48} />
                <p>ยังไม่มีการนัดวัดหน้างาน</p>
                <Link
                  to={`/appointment/${job.id}`}
                  className="btn btn-primary mt-4 inline-block"
                >
                  เพิ่มนัดวัด
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'quotation' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">ใบเสนอราคา</h2>
              <Link
                to={`/quotation/${job.id}`}
                className="btn btn-primary"
              >
                จัดการใบเสนอราคา
              </Link>
            </div>
            
            {job.quotation && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">สถานะ</p>
                  <span className={`badge ${
                    job.quotation.status === 'accepted' ? 'badge-green' :
                    job.quotation.status === 'rejected' ? 'badge-red' :
                    job.quotation.status === 'sent' ? 'badge-blue' :
                    'badge-gray'
                  }`}>
                    {job.quotation.status === 'accepted' ? 'ลูกค้าตอบรับ' :
                     job.quotation.status === 'rejected' ? 'ลูกค้าปฏิเสธ' :
                     job.quotation.status === 'sent' ? 'ส่งแล้ว' :
                     'ยังไม่ออก'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">ยอดเงิน</p>
                  <p className="font-medium text-gray-900 text-lg">
                    {job.quotation.amount.toLocaleString('th-TH')} ฿
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">รายรับ-รายจ่าย</h2>
              <Link
                to={`/payment/${job.id}`}
                className="btn btn-primary"
              >
                จัดการการเงิน
              </Link>
            </div>
            {/* Payment summary will be shown here */}
          </div>
        )}

        {activeTab === 'files' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">ไฟล์ / รูป / คลิป</h2>
              <Link
                to={`/files/${job.id}`}
                className="btn btn-primary"
              >
                อัปโหลดไฟล์
              </Link>
            </div>
            <p className="text-gray-600">แสดงไฟล์ทั้งหมดที่เกี่ยวข้องกับงานนี้</p>
          </div>
        )}

        {activeTab === 'foreman' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">รายงานหน้างาน</h2>
              <Link
                to={`/foreman/${job.id}`}
                className="btn btn-primary"
              >
                ดูรายงาน
              </Link>
            </div>
            <p className="text-gray-600">รายงานการทำงานจาก Foreman</p>
          </div>
        )}
      </div>
    </div>
  )
}

