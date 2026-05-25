import { Card, CardContent, Typography, Button, Box, Divider } from '@mui/material';
import { CheckCircle, Print, Home } from '@mui/icons-material';
import { motion } from 'motion/react';
import type { PaymentData } from './RegisterPayment';

interface Student {
  id: string;
  name: string;
  career: string;
  balance: number;
  status: 'active' | 'inactive';
}

interface PaymentReceiptProps {
  student: Student;
  payment: PaymentData;
  receiptNumber: string;
  timestamp: string;
  cashierName: string;
  onPrint: () => void;
  onNewPayment: () => void;
  onBackToDashboard: () => void;
}

export function PaymentReceipt({
  student,
  payment,
  receiptNumber,
  timestamp,
  cashierName,
  onPrint,
  onNewPayment,
  onBackToDashboard
}: PaymentReceiptProps) {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Success Message */}
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          <Box className="flex flex-col items-center justify-center gap-2 mb-6 pt-4">
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
              }}
            >
              <CheckCircle sx={{ color: '#10b981', fontSize: 48 }} />
            </Box>
            <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 600 }}>
              ¡Pago Registrado Exitosamente!
            </Typography>
          </Box>
        </motion.div>

        {/* Receipt Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            id="receipt"
            sx={{
              borderRadius: 3,
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              mb: 3,
              backgroundColor: 'white'
            }}
          >
            <CardContent className="p-6">
              {/* Header */}
              <Box className="text-center mb-6">
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  INSTITUTO DE EDUCACIÓN
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Recibo de Pago Oficial
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Receipt Details */}
              <Box className="space-y-3 mb-4">
                <Box className="flex justify-between">
                  <Typography variant="body2" color="text.secondary">
                    No. Recibo:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {receiptNumber}
                  </Typography>
                </Box>

                <Box className="flex justify-between">
                  <Typography variant="body2" color="text.secondary">
                    Fecha y Hora:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {timestamp}
                  </Typography>
                </Box>

                <Box className="flex justify-between">
                  <Typography variant="body2" color="text.secondary">
                    Cajero(a):
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {cashierName}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Student Info */}
              <Box className="mb-4">
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  Datos del Estudiante
                </Typography>
                <Box className="space-y-1">
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {student.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {student.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {student.career}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Payment Info */}
              <Box className="mb-4">
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  Detalle del Pago
                </Typography>
                <Box className="space-y-2">
                  <Box className="flex justify-between">
                    <Typography variant="body2">Concepto:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {payment.concept}
                    </Typography>
                  </Box>

                  {/* Matricula details */}
                  {payment.concept === 'Matrícula' && payment.career && (
                    <>
                      <Box className="flex justify-between">
                        <Typography variant="body2">Especialidad:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>
                          {payment.career}
                        </Typography>
                      </Box>
                      <Box className="flex justify-between">
                        <Typography variant="body2">Semestre:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {payment.semester}° Semestre
                        </Typography>
                      </Box>
                      {payment.selectedCourses && payment.selectedCourses.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Cursos inscritos:
                          </Typography>
                          <Box
                            sx={{
                              backgroundColor: '#f8fafc',
                              borderRadius: 1.5,
                              border: '1px solid #e2e8f0',
                              overflow: 'hidden',
                            }}
                          >
                            {payment.selectedCourses.map((course, idx) => (
                              <Box
                                key={course.id}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  px: 2,
                                  py: 0.75,
                                  borderBottom: idx < payment.selectedCourses!.length - 1 ? '1px solid #e2e8f0' : 'none',
                                  backgroundColor: course.mandatory ? '#fef9c3' : 'transparent',
                                }}
                              >
                                <Typography variant="caption" sx={{ color: course.mandatory ? '#78350f' : '#334155', fontWeight: course.mandatory ? 700 : 400 }}>
                                  {course.name}{course.mandatory ? ' *' : ''}
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', ml: 2, flexShrink: 0 }}>
                                  {course.credits} cr
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                          <Box className="flex justify-between mt-1 px-1">
                            <Typography variant="caption" color="text.secondary">
                              * Curso obligatorio
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#1e3a8a' }}>
                              Total: {payment.totalCredits} créditos
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </>
                  )}

                  <Box className="flex justify-between">
                    <Typography variant="body2">Método de Pago:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {payment.paymentMethod}
                    </Typography>
                  </Box>
                  {payment.reference && (
                    <Box className="flex justify-between">
                      <Typography variant="body2">Referencia:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {payment.reference}
                      </Typography>
                    </Box>
                  )}
                  {payment.notes && (
                    <Box>
                      <Typography variant="body2" className="mb-1">Notas:</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px' }}>
                        {payment.notes}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Total */}
              <Box className="flex justify-between items-center mb-2">
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  TOTAL PAGADO:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#10b981' }}>
                  ${payment.amount.toFixed(2)}
                </Typography>
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 4 }}>
                Este documento es un comprobante oficial de pago
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<Print />}
            onClick={onPrint}
            sx={{
              borderRadius: 2,
              padding: '14px',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
              }
            }}
          >
            Imprimir Recibo
          </Button>

          <Box className="grid grid-cols-2 gap-3">
            <Button
              variant="outlined"
              size="large"
              onClick={onNewPayment}
              sx={{
                borderRadius: 2,
                padding: '12px',
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 600,
                borderColor: '#cbd5e1',
                color: '#64748b',
                '&:hover': {
                  borderColor: '#94a3b8',
                  backgroundColor: '#f8fafc'
                }
              }}
            >
              Nuevo Pago
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Home />}
              onClick={onBackToDashboard}
              sx={{
                borderRadius: 2,
                padding: '12px',
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 600,
                borderColor: '#cbd5e1',
                color: '#64748b',
                '&:hover': {
                  borderColor: '#94a3b8',
                  backgroundColor: '#f8fafc'
                }
              }}
            >
              Inicio
            </Button>
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
}
