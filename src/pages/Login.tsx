import { useNavigate } from 'react-router-dom'
import { UserRole } from '../App'
import { Briefcase, User, Building2 } from 'lucide-react'

interface LoginProps {
  onLogin: (role: UserRole) => void
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate()

  const handleLogin = (role: UserRole) => {
    onLogin(role)
    navigate('/')
  }
  const roles = [
    {
      id: 'admin' as UserRole,
      name: 'ผู้ดูแลระบบ (Admin)',
      icon: User,
      description: 'จัดการงานทั้งหมด ลงข้อมูลลูกค้า ออกใบเสนอราคา',
      color: 'blue'
    },
    {
      id: 'foreman' as UserRole,
      name: 'หัวหน้างาน (Foreman)',
      icon: Briefcase,
      description: 'บันทึกงานหน้างาน อัปโหลดรูป ใส่รายจ่าย',
      color: 'green'
    },
    {
      id: 'owner' as UserRole,
      name: 'เจ้าของ (Owner)',
      icon: Building2,
      description: 'ดู Dashboard และรายงานสรุป',
      color: 'purple'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ระบบจัดการงานรับเหมาพื้นสวน
          </h1>
          <p className="text-gray-600">
            เลือกบทบาทเพื่อเข้าใช้งาน
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon
            const colorClasses = {
              blue: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50',
              green: 'border-green-200 hover:border-green-400 hover:bg-green-50',
              purple: 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
            }[role.color]

            return (
              <button
                key={role.id}
                onClick={() => handleLogin(role.id)}
                className={`card ${colorClasses} cursor-pointer transition-all hover:shadow-lg text-left group`}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={32} className={`text-${role.color}-600`} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {role.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {role.description}
                </p>
              </button>
            )
          })}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>💡 แต่ละบทบาทจะเห็นข้อมูลและหน้าที่แตกต่างกัน</p>
        </div>
      </div>
    </div>
  )
}

