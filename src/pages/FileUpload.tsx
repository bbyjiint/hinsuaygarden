import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Upload, Image, Video, File, Receipt, X, Eye } from 'lucide-react'
import { useState } from 'react'

type FileType = 'image' | 'video' | 'sketchup' | 'receipt'

interface UploadedFile {
  id: string
  name: string
  type: FileType
  url: string
  uploadedAt: string
}

// Mock data
const mockFiles: UploadedFile[] = [
  {
    id: '1',
    name: 'IMG_001.jpg',
    type: 'image',
    url: '#',
    uploadedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'VIDEO_001.mp4',
    type: 'video',
    url: '#',
    uploadedAt: '2024-01-16'
  }
]

const fileTypeConfig = {
  image: { label: 'รูปภาพ', icon: Image, color: 'blue' },
  video: { label: 'วิดีโอ', icon: Video, color: 'purple' },
  sketchup: { label: 'SketchUp', icon: File, color: 'green' },
  receipt: { label: 'สลิป', icon: Receipt, color: 'yellow' }
}

export default function FileUpload() {
  const { jobId } = useParams()
  const [files, setFiles] = useState<UploadedFile[]>(mockFiles)
  const [selectedType, setSelectedType] = useState<FileType>('image')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files
    if (uploadedFiles) {
      // Mock upload
      const newFiles: UploadedFile[] = Array.from(uploadedFiles).map((file: File, index: number) => ({
        id: `new-${Date.now()}-${index}`,
        name: file.name,
        type: selectedType,
        url: '#',
        uploadedAt: new Date().toISOString().split('T')[0]
      }))
      setFiles([...files, ...newFiles])
    }
  }

  const handleDelete = (fileId: string) => {
    setFiles(files.filter((f: UploadedFile) => f.id !== fileId))
  }

  const filesByType = files.reduce((acc: Record<FileType, UploadedFile[]>, file: UploadedFile) => {
    if (!acc[file.type]) acc[file.type] = []
    acc[file.type].push(file)
    return acc
  }, {} as Record<FileType, UploadedFile[]>)

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
          <h1 className="text-3xl font-bold text-gray-900">ไฟล์ / รูป / คลิป</h1>
          <p className="text-gray-600">จัดการไฟล์ทั้งหมดที่เกี่ยวข้องกับงาน</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">อัปโหลดไฟล์</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {Object.entries(fileTypeConfig).map(([type, config]) => {
            const Icon = config.icon
            const isSelected = selectedType === type
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type as FileType)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? `border-${config.color}-500 bg-${config.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon size={32} className={`mx-auto mb-2 ${
                  isSelected ? `text-${config.color}-600` : 'text-gray-400'
                }`} />
                <p className={`text-sm font-medium ${
                  isSelected ? `text-${config.color}-700` : 'text-gray-600'
                }`}>
                  {config.label}
                </p>
              </button>
            )
          })}
        </div>

        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="mb-3 text-gray-400" size={32} />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวาง
            </p>
            <p className="text-xs text-gray-500">
              รองรับ JPG, PNG, MP4, SKP, PDF
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {/* Files by Type */}
      <div className="space-y-6">
        {Object.entries(fileTypeConfig).map(([type, config]) => {
          const typeFiles = filesByType[type as FileType] || []
          if (typeFiles.length === 0) return null

          const Icon = config.icon
          return (
            <div key={type} className="card">
              <div className="flex items-center space-x-2 mb-4">
                <Icon size={20} className={`text-${config.color}-600`} />
                <h2 className="text-lg font-semibold text-gray-900">
                  {config.label} ({typeFiles.length})
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {typeFiles.map((file: UploadedFile) => (
                  <div key={file.id} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {file.type === 'image' ? (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <Image size={32} className="text-blue-600" />
                        </div>
                      ) : file.type === 'video' ? (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                          <Video size={32} className="text-purple-600" />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <File size={32} className="text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                      <button className="p-2 bg-white rounded-lg hover:bg-gray-50">
                        <Eye size={18} className="text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="p-2 bg-white rounded-lg hover:bg-gray-50"
                      >
                        <X size={18} className="text-red-600" />
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-600 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

