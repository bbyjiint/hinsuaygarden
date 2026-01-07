import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ClipboardList, Upload, DollarSign, CheckCircle2, Camera, FileText } from 'lucide-react'
import { useState } from 'react'

interface ChecklistItem {
  id: string
  task: string
  completed: boolean
}

interface DailyReport {
  id: string
  date: string
  description: string
  images: string[]
  expenses: Array<{
    id: string
    description: string
    amount: number
  }>
}

export default function ForemanView() {
  const { jobId } = useParams()
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', task: 'เตรียมอุปกรณ์', completed: true },
    { id: '2', task: 'วัดพื้นที่หน้างาน', completed: true },
    { id: '3', task: 'เตรียมพื้น', completed: false },
    { id: '4', task: 'เทคอนกรีต', completed: false },
    { id: '5', task: 'ตกแต่งพื้น', completed: false },
    { id: '6', task: 'ทำความสะอาด', completed: false }
  ])

  const [dailyReports] = useState<DailyReport[]>([
    {
      id: '1',
      date: '2024-01-20',
      description: 'เริ่มงานเตรียมพื้นที่ เตรียมอุปกรณ์',
      images: ['img1.jpg', 'img2.jpg'],
      expenses: [
        { id: '1', description: 'คอนกรีต', amount: 5000 },
        { id: '2', description: 'ทราย', amount: 2000 }
      ]
    }
  ])

  const toggleChecklist = (id: string) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const completedCount = checklist.filter(item => item.completed).length
  const progress = (completedCount / checklist.length) * 100

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
          <h1 className="text-3xl font-bold text-gray-900">รายงานหน้างาน (Foreman)</h1>
          <p className="text-gray-600">บันทึกการทำงานและรายจ่ายหน้างาน</p>
        </div>
      </div>

      {/* Checklist */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <ClipboardList className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Checklist งาน</h2>
          </div>
          <span className="text-sm text-gray-600">
            {completedCount}/{checklist.length} เสร็จแล้ว
          </span>
        </div>

        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          {checklist.map((item) => (
            <label
              key={item.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleChecklist(item.id)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {item.task}
              </span>
              {item.completed && (
                <CheckCircle2 size={20} className="text-green-600" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Daily Report */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="text-green-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">รายงานประจำวัน</h2>
          </div>
          <button className="btn btn-primary flex items-center space-x-2">
            <FileText size={18} />
            <span>เพิ่มรายงาน</span>
          </button>
        </div>

        <div className="space-y-4">
          {dailyReports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText size={48} className="mx-auto mb-3 text-gray-400" />
              <p>ยังไม่มีรายงานประจำวัน</p>
            </div>
          ) : (
            dailyReports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-900">
                    {new Date(report.date).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <p className="text-gray-700 mb-3">{report.description}</p>
                
                {report.images.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-2">รูปภาพ ({report.images.length})</p>
                    <div className="grid grid-cols-4 gap-2">
                      {report.images.map((img, idx) => (
                        <div key={idx} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera size={24} className="text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {report.expenses.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">รายจ่าย</p>
                    <div className="space-y-1">
                      {report.expenses.map((expense) => (
                        <div key={expense.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">{expense.description}</span>
                          <span className="text-gray-900 font-medium">
                            {expense.amount.toLocaleString('th-TH')} ฿
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          to={`/files/${jobId}`}
          className="card hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Camera size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">อัปโหลดรูปหน้างาน</p>
              <p className="text-sm text-gray-600">บันทึกความคืบหน้าด้วยรูปภาพ</p>
            </div>
          </div>
        </Link>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign size={24} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">บันทึกรายจ่าย</p>
              <p className="text-sm text-gray-600">เพิ่มรายการค่าใช้จ่ายหน้างาน</p>
            </div>
          </div>
          <button className="mt-4 btn btn-success w-full">
            เพิ่มรายจ่าย
          </button>
        </div>
      </div>
    </div>
  )
}

