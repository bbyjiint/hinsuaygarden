import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, FileText, Upload, Send, CheckCircle2, XCircle, Clock, Phone } from 'lucide-react'
import { useState } from 'react'
import { QuotationStatus } from '../types'

const statusConfig = {
  'not-created': { label: 'ยังไม่ออก', icon: Clock, class: 'badge-gray', color: 'gray' },
  'sent': { label: 'ส่งแล้ว', icon: Send, class: 'badge-blue', color: 'blue' },
  'accepted': { label: 'ลูกค้าตอบรับ', icon: CheckCircle2, class: 'badge-green', color: 'green' },
  'rejected': { label: 'ลูกค้าปฏิเสธ', icon: XCircle, class: 'badge-red', color: 'red' }
}

export default function Quotation() {
  const { jobId } = useParams()
  const [status, setStatus] = useState<QuotationStatus>('not-created')
  const [amount, setAmount] = useState(150000)
  const [notes, setNotes] = useState('')

  const config = statusConfig[status]
  const StatusIcon = config.icon

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
          <h1 className="text-3xl font-bold text-gray-900">ใบเสนอราคา</h1>
          <p className="text-gray-600">จัดการใบเสนอราคาและสถานะการตอบรับ</p>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">สถานะใบเสนอราคา</h2>
          <div className="flex items-center space-x-2">
            <StatusIcon size={20} className={`text-${config.color}-600`} />
            <span className={`badge ${config.class}`}>
              {config.label}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              สถานะ
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as QuotationStatus)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="not-created">ยังไม่ออก</option>
              <option value="sent">ส่งแล้ว</option>
              <option value="accepted">ลูกค้าตอบรับ</option>
              <option value="rejected">ลูกค้าปฏิเสธ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ยอดเงิน (฿)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
            <p className="mt-1 text-sm text-gray-500">
              {amount.toLocaleString('th-TH')} บาท
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            อัปโหลดไฟล์ใบเสนอราคา
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="mb-3 text-gray-400" size={32} />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวาง
              </p>
              <p className="text-xs text-gray-500">PDF, JPG, PNG</p>
            </div>
            <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หมายเหตุ
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="บันทึกข้อมูลเพิ่มเติม..."
          />
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link
            to={`/jobs/${jobId}`}
            className="btn btn-secondary"
          >
            ยกเลิก
          </Link>
          {status === 'sent' && (
            <button className="btn bg-yellow-600 hover:bg-yellow-700 text-white flex items-center space-x-2">
              <Phone size={18} />
              <span>ติดตามลูกค้า</span>
            </button>
          )}
          <button className="btn btn-primary">
            บันทึก
          </button>
        </div>
      </div>

      {/* Timeline */}
      {status !== 'not-created' && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">ประวัติ</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">ส่งใบเสนอราคา</p>
                <p className="text-sm text-gray-500">15 มกราคม 2024, 10:30</p>
              </div>
            </div>
            {status === 'accepted' && (
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-600 mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">ลูกค้าตอบรับ</p>
                  <p className="text-sm text-gray-500">16 มกราคม 2024, 14:20</p>
                </div>
              </div>
            )}
            {status === 'rejected' && (
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-red-600 mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">ลูกค้าปฏิเสธ</p>
                  <p className="text-sm text-gray-500">16 มกราคม 2024, 14:20</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

