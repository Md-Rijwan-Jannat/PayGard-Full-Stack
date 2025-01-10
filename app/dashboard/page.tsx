// 'use client'

// import { useState, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import PaymentForm from '@/components/PaymentForm'
// import PaymentList from '@/components/PaymentList'
// import DocumentUpload from '@/components/DocumentUpload'
// import DocumentList from '@/components/DocumentList'

// export default function Dashboard() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const [payments, setPayments] = useState([])
//   const [documents, setDocuments] = useState([])

//   useEffect(() => {
//     if (status === 'una

// uthenticated') {
//       router.push('/auth/signin')
//     } else {
//       fetchPayments()
//       fetchDocuments()
//     }
//   }, [status, router])

//   const fetchPayments = async () => {
//     const res = await fetch('/api/payments')
//     const data = await res.json()
//     setPayments(data)
//   }

//   const fetchDocuments = async () => {
//     const res = await fetch('/api/documents')
//     const data = await res.json()
//     setDocuments(data)
//   }

//   if (status === 'loading') {
//     return <div>Loading...</div>
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       {session?.user.role === 'admin' ? (
//         <AdminDashboard payments={payments} documents={documents} />
//       ) : (
//         <UserDashboard
//           payments={payments}
//           documents={documents}
//           onPaymentCreated={fetchPayments}
//           onDocumentUploaded={fetchDocuments}
//         />
//       )}
//     </div>
//   )
// }

// function AdminDashboard({ payments, documents }) {
//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-2">Payments</h2>
//       <PaymentList payments={payments} isAdmin={true} />
//       <h2 className="text-xl font-bold mt-4 mb-2">Documents</h2>
//       <DocumentList documents={documents} isAdmin={true} />
//     </div>
//   )
// }

// function UserDashboard({ payments, documents, onPaymentCreated, onDocumentUploaded }) {
//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-2">Create Payment</h2>
//       <PaymentForm onPaymentCreated={onPaymentCreated} />
//       <h2 className="text-xl font-bold mt-4 mb-2">Your Payments</h2>
//       <PaymentList payments={payments} isAdmin={false} />
//       <h2 className="text-xl font-bold mt-4 mb-2">Upload Document</h2>
//       <DocumentUpload onDocumentUploaded={onDocumentUploaded} />
//       <h2 className="text-xl font-bold mt-4 mb-2">Your Documents</h2>
//       <DocumentList documents={documents} isAdmin={false} />
//     </div>
//   )
// }
