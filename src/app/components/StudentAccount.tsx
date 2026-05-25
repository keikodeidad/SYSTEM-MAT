import { Card, CardContent, Typography, Button, Box, Chip, Divider, List, ListItem } from '@mui/material';
import { ArrowBack, Payment, AccountBalance, Person } from '@mui/icons-material';
import { motion } from 'motion/react';

interface Student {
  id: string;
  name: string;
  career: string;
  balance: number;
  status: 'active' | 'inactive';
}

interface PaymentHistory {
  id: string;
  date: string;
  concept: string;
  amount: number;
  paymentMethod: string;
}

interface StudentAccountProps {
  student: Student;
  onBack: () => void;
  onRegisterPayment: () => void;
}

const mockPaymentHistory: PaymentHistory[] = [
  { id: 'PAY001', date: '15/04/2026', concept: 'Mensualidad Abril', amount: 2500, paymentMethod: 'Efectivo' },
  { id: 'PAY002', date: '18/03/2026', concept: 'Mensualidad Marzo', amount: 2500, paymentMethod: 'Transferencia' },
  { id: 'PAY003', date: '12/02/2026', concept: 'Matrícula Semestre 2026-1', amount: 5000, paymentMethod: 'Efectivo' },
];

export function StudentAccount({ student, onBack, onRegisterPayment }: StudentAccountProps) {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <Box className="flex items-center gap-3 mb-6 pt-4">
          <Button
            onClick={onBack}
            startIcon={<ArrowBack />}
            sx={{
              color: '#64748b',
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Volver
          </Button>
        </Box>

        {/* Student Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card sx={{ borderRadius: 3, boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)', mb: 3 }}>
            <CardContent className="p-5">
              <Box className="flex items-start gap-3 mb-4">
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    backgroundColor: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Person sx={{ fontSize: 32, color: '#64748b' }} />
                </Box>
                <Box className="flex-1">
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {student.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    ID: {student.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {student.career}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Balance Section */}
              <Box className="mb-4">
                <Box className="flex items-center gap-2 mb-2">
                  <AccountBalance sx={{ color: '#64748b', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    Saldo Actual
                  </Typography>
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: student.balance >= 0 ? '#10b981' : '#ef4444',
                    mb: 2
                  }}
                >
                  ${Math.abs(student.balance).toFixed(2)}
                </Typography>
                <Chip
                  label={student.balance < 0 ? 'Pendiente de pago' : 'Al día'}
                  sx={{
                    backgroundColor: student.balance < 0 ? '#fee2e2' : '#dcfce7',
                    color: student.balance < 0 ? '#ef4444' : '#10b981',
                    fontWeight: 600
                  }}
                />
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<Payment />}
                onClick={onRegisterPayment}
                sx={{
                  borderRadius: 2,
                  padding: '12px',
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
                  }
                }}
              >
                Registrar Pago
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Historial de Pagos
          </Typography>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent className="p-0">
              <List>
                {mockPaymentHistory.map((payment, index) => (
                  <div key={payment.id}>
                    <ListItem sx={{ py: 2, px: 3 }}>
                      <Box className="w-full">
                        <Box className="flex justify-between items-start mb-1">
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {payment.concept}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {payment.date} • {payment.paymentMethod}
                            </Typography>
                          </Box>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#10b981' }}>
                            ${payment.amount.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                    {index < mockPaymentHistory.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Box>
  );
}
