export type JobStatus = 
  | 'pending'      // รอ
  | 'measuring'    // ต้องวัด
  | 'quoting'      // ต้องออกใบเสนอราคา
  | 'approved'     // ลูกค้าตกลง
  | 'in-progress'  // กำลังทำ
  | 'pending-follow' // ค้างติดตาม
  | 'completed'    // เสร็จ
  | 'cancelled'    // ยกเลิก

export type PaymentStatus = 'paid' | 'pending' | 'overdue'

export type QuotationStatus = 
  | 'not-created'    // ยังไม่ออก
  | 'sent'           // ส่งแล้ว
  | 'accepted'       // ลูกค้าตอบรับ
  | 'rejected'       // ลูกค้าปฏิเสธ

export interface Customer {
  id: string
  name: string
  phone: string
  address?: string
}

export interface Appointment {
  id: string
  jobId: string
  date: string
  time: string
  address: string
  distance?: number // ระยะทางจากโกดัง (km)
  fee?: number      // ค่าวัดหน้างาน
  notes?: string
}

export interface Quotation {
  id: string
  jobId: string
  status: QuotationStatus
  amount: number
  fileUrl?: string
  sentDate?: string
  responseDate?: string
  notes?: string
}

export interface Payment {
  id: string
  jobId: string
  phase: number // 1-5
  amount: number
  dueDate: string
  paidDate?: string
  status: PaymentStatus
  slipUrl?: string
}

export interface Expense {
  id: string
  jobId: string
  description: string
  amount: number
  date: string
  category: string
  receiptUrl?: string
}

export interface DailyReport {
  id: string
  jobId: string
  date: string
  workDescription: string
  images: string[]
  expenses: Expense[]
}

export interface Job {
  id: string
  code: string
  customer: Customer
  status: JobStatus
  createdAt: string
  appointment?: Appointment
  quotation?: Quotation
  payments?: Payment[]
  totalAmount?: number
  expenses?: Expense[]
}

