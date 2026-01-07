import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Clock, DollarSign, Save, Plus } from 'lucide-react'
import { useState } from 'react'

export default function Appointment() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    date: '2024-01-20',
    time: '10:00',
    address: '123 ถ.สุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพฯ 10110',
    distance: 15,
    fee: 500,
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle save
    alert('บันทึกสำเร็จ!')
    navigate(`/jobs/${jobId}`)
  }

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
          <h1 className="text-3xl font-bold text-gray-900">นัดวัดหน้างาน</h1>
          <p className="text-gray-600">จัดการนัดหมายและข้อมูลการวัดหน้างาน</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline mr-2" size={18} />
              วันนัด
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline mr-2" size={18} />
              เวลา
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline mr-2" size={18} />
              ที่อยู่หน้างาน
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              className="mt-2 text-sm text-blue-600 hover:text-blue-700"
            >
              + เปิดแผนที่
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ระยะทางจากโกดัง (km)
            </label>
            <input
              type="number"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="inline mr-2" size={18} />
              ค่าวัดหน้างาน (฿)
            </label>
            <input
              type="number"
              value={formData.fee}
              onChange={(e) => setFormData({ ...formData, fee: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              หมายเหตุ
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ข้อมูลเพิ่มเติม..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link
            to={`/jobs/${jobId}`}
            className="btn btn-secondary"
          >
            ยกเลิก
          </Link>
          <button
            type="submit"
            className="btn btn-primary flex items-center space-x-2"
          >
            <Save size={18} />
            <span>บันทึก + เพิ่มเข้า Calendar</span>
          </button>
        </div>
      </form>

      {/* Map Preview (Mock) */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">แผนที่</h2>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-2 text-gray-400" />
            <p>แผนที่แสดงตำแหน่งหน้างาน</p>
          </div>
        </div>
      </div>
    </div>
  )
}

