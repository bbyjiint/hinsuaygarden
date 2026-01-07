import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, DollarSign, Receipt, CheckCircle2, Clock, XCircle, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { PaymentStatus } from '../types'

const statusConfig = {
  paid: { label: 'จ่ายแล้ว', icon: CheckCircle2, class: 'badge-green', color: 'green' },
  pending: { label: 'รอจ่าย', icon: Clock, class: 'badge-yellow', color: 'yellow' },
  overdue: { label: 'เลยกำหนด', icon: XCircle, class: 'badge-red', color: 'red' }
}

interface PaymentPhase {
  id: string
  phase: number
  amount: number
  dueDate: string
  paidDate?: string
  status: PaymentStatus
  slipUrl?: string
}

// Mock data - 5 phases
const mockPayments: PaymentPhase[] = [
  {
    id: '1',
    phase: 1,
    amount: 30000,
    dueDate: '2024-01-25',
    status: 'pending'
  },
  {
    id: '2',
    phase: 2,
    amount: 40000,
    dueDate: '2024-02-10',
    status: 'pending'
  },
  {
    id: '3',
    phase: 3,
    amount: 40000,
    dueDate: '2024-02-25',
    status: 'pending'
  },
  {
    id: '4',
    phase: 4,
    amount: 30000,
    dueDate: '2024-03-10',
    status: 'pending'
  },
  {
    id: '5',
    phase: 5,
    amount: 10000,
    dueDate: '2024-03-25',
    status: 'pending'
  }
]

export default function Payment() {
  const { jobId } = useParams()
  const [payments, setPayments] = useState<PaymentPhase[]>(mockPayments)

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0)
  const paidAmount = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = totalAmount - paidAmount

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Link
          to={`/jobs/${jobId}`}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">การเงิน</h1>
          <p className="text-gray-600">จัดการรายรับ-รายจ่าย 5 งวด</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">ยอดรวมทั้งหมด</p>
              <p className="text-2xl font-bold text-blue-700">
                {totalAmount.toLocaleString('th-TH')} ฿
              </p>
            </div>
            <DollarSign size={32} className="text-blue-600" />
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">รับแล้ว</p>
              <p className="text-2xl font-bold text-green-700">
                {paidAmount.toLocaleString('th-TH')} ฿
              </p>
            </div>
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
        </div>

        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">รอรับ</p>
              <p className="text-2xl font-bold text-yellow-700">
                {pendingAmount.toLocaleString('th-TH')} ฿
              </p>
            </div>
            <Clock size={32} className="text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Payment Phases */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">รายการจ่ายเงิน (5 งวด)</h2>
        
        <div className="space-y-4">
          {payments.map((payment) => {
            const config = statusConfig[payment.status]
            const StatusIcon = config.icon

            return (
              <div
                key={payment.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-700 font-bold">{payment.phase}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">งวดที่ {payment.phase}</p>
                      <p className="text-sm text-gray-600">
                        กำหนดจ่าย: {new Date(payment.dueDate).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      {payment.paidDate && (
                        <p className="text-sm text-green-600">
                          จ่ายแล้ว: {new Date(payment.paidDate).toLocaleDateString('th-TH')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {payment.amount.toLocaleString('th-TH')} ฿
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <StatusIcon size={16} className={`text-${config.color}-600`} />
                        <span className={`badge ${config.class} text-xs`}>
                          {config.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {payment.slipUrl ? (
                        <a
                          href={payment.slipUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Receipt size={20} />
                        </a>
                      ) : (
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                          <Receipt size={20} />
                        </button>
                      )}
                      {payment.status === 'pending' && (
                        <button className="btn btn-primary text-sm">
                          บันทึกการจ่าย
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">ความคืบหน้าการรับเงิน</h3>
          <span className="text-sm text-gray-600">
            {Math.round((paidAmount / totalAmount) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-600 h-4 rounded-full transition-all"
            style={{ width: `${(paidAmount / totalAmount) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

