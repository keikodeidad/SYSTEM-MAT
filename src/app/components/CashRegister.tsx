import { Card, CardContent, Typography, Button, Box, Divider, List, ListItem, Chip } from '@mui/material';
import { ArrowBack, Print, AttachMoney } from '@mui/icons-material';
import { motion } from 'motion/react';

interface Transaction {
  id: string;
  time: string;
  studentName: string;
  studentId: string;
  concept: string;
  amount: number;
  paymentMethod: string;
}

interface CashRegisterProps {
  onBack: () => void;
  cashierName: string;
  transactions: Transaction[];
  totalCash: number;
  totalCard: number;
  totalTransfer: number;
  total: number;
}

export function CashRegister({
  onBack,
  cashierName,
  transactions,
  totalCash,
  totalCard,
  totalTransfer,
  total
}: CashRegisterProps) {
  const handlePrintReport = () => {
    window.print();
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <Box className="flex items-center justify-between mb-6 pt-4">
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
          <Button
            onClick={handlePrintReport}
            startIcon={<Print />}
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              borderColor: '#cbd5e1',
              color: '#64748b'
            }}
          >
            Imprimir
          </Button>
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Reporte de Caja
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Cajero(a): {cashierName} • {new Date().toLocaleDateString('es-ES')}
        </Typography>

        {/* Summary Cards */}
        <Box className="grid grid-cols-2 gap-3 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent className="p-4">
                <Typography variant="body2" color="text.secondary" className="mb-1">
                  Efectivo
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981' }}>
                  ${totalCash.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent className="p-4">
                <Typography variant="body2" color="text.secondary" className="mb-1">
                  Tarjeta
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#3b82f6' }}>
                  ${totalCard.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent className="p-4">
                <Typography variant="body2" color="text.secondary" className="mb-1">
                  Transferencia
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                  ${totalTransfer.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)', backgroundColor: '#0f172a' }}>
              <CardContent className="p-4">
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                  ${total.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Transacciones del Día ({transactions.length})
          </Typography>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent className="p-0">
              {transactions.length > 0 ? (
                <List>
                  {transactions.map((transaction, index) => (
                    <div key={transaction.id}>
                      <ListItem sx={{ py: 2, px: 3 }}>
                        <Box className="w-full">
                          <Box className="flex justify-between items-start mb-2">
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {transaction.studentName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                ID: {transaction.studentId} • {transaction.time}
                              </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: '#10b981' }}>
                              ${transaction.amount.toFixed(2)}
                            </Typography>
                          </Box>
                          <Box className="flex items-center gap-2">
                            <Chip
                              label={transaction.concept}
                              size="small"
                              sx={{
                                backgroundColor: '#f1f5f9',
                                color: '#475569',
                                fontSize: '12px',
                                height: 24
                              }}
                            />
                            <Chip
                              label={transaction.paymentMethod}
                              size="small"
                              sx={{
                                backgroundColor: '#e0e7ff',
                                color: '#3730a3',
                                fontSize: '12px',
                                height: 24
                              }}
                            />
                          </Box>
                        </Box>
                      </ListItem>
                      {index < transactions.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              ) : (
                <Box className="p-8 text-center">
                  <AttachMoney sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    No hay transacciones registradas hoy
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Box>
  );
}
