import { Box, Typography, Card, CardContent, Chip, Divider } from '@mui/material';
import { AccountBalance, CheckCircle, Warning, Schedule, Receipt } from '@mui/icons-material';
import { motion } from 'motion/react';
import { StudentAccount, PaymentRecord } from '../data/studentData';

interface StudentBalanceProps {
  student: StudentAccount;
}

function StatusIcon({ status }: { status: PaymentRecord['status'] }) {
  if (status === 'paid') return <CheckCircle sx={{ color: '#10b981', fontSize: 20 }} />;
  if (status === 'overdue') return <Warning sx={{ color: '#ef4444', fontSize: 20 }} />;
  return <Schedule sx={{ color: '#f59e0b', fontSize: 20 }} />;
}

const statusLabel: Record<PaymentRecord['status'], { label: string; bg: string; color: string }> = {
  paid: { label: 'Pagado', bg: '#dcfce7', color: '#16a34a' },
  pending: { label: 'Pendiente', bg: '#fef3c7', color: '#d97706' },
  overdue: { label: 'Vencido', bg: '#fee2e2', color: '#dc2626' },
};

export function StudentBalance({ student }: StudentBalanceProps) {
  const hasDebt = student.balance < 0;
  const paidTotal = student.payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const overdueTotal = student.payments.filter(p => p.status === 'overdue').reduce((s, p) => s + p.amount, 0);
  const overdueCount = student.payments.filter(p => p.status === 'overdue').length;

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          background: hasDebt
            ? 'linear-gradient(135deg, #7f1d1d, #dc2626)'
            : 'linear-gradient(135deg, #064e3b, #10b981)',
          pt: 5, pb: 5, px: 3,
          position: 'relative', overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <Box className="flex items-center gap-2 mb-4">
          <AccountBalance sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 22 }} />
          <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '20px' }}>
            Estado de Cuenta
          </Typography>
        </Box>

        {/* Balance card */}
        <Box sx={{ backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 3, p: 2.5 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
            {hasDebt ? 'TOTAL ADEUDADO' : 'ESTADO'}
          </Typography>
          <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '36px', letterSpacing: '-1px', lineHeight: 1.1 }}>
            {hasDebt ? `S/ ${Math.abs(student.balance).toLocaleString()}` : 'Al día ✓'}
          </Typography>
          {hasDebt && (
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {overdueCount} pago{overdueCount !== 1 ? 's' : ''} vencido{overdueCount !== 1 ? 's' : ''} — acércate a caja
            </Typography>
          )}
        </Box>

        {/* Quick stats */}
        <Box className="grid grid-cols-2 gap-2 mt-3">
          <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, p: 1.5 }}>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>
              S/ {paidTotal.toLocaleString()}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Total pagado</Typography>
          </Box>
          <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, p: 1.5 }}>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>
              {student.payments.filter(p => p.status === 'paid').length}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Pagos realizados</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: 2, pt: 3 }}>
        {/* Overdue warning */}
        {hasDebt && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card sx={{ borderRadius: 3, background: '#fef2f2', border: '1px solid #fecaca', mb: 3, boxShadow: 'none' }}>
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Typography sx={{ color: '#b91c1c', fontWeight: 700, fontSize: '14px', mb: 0.5 }}>
                  Acción requerida
                </Typography>
                <Typography variant="caption" sx={{ color: '#dc2626', lineHeight: 1.5, display: 'block' }}>
                  Tienes pagos vencidos. Regulariza tu situación en caja para evitar restricciones en exámenes o constancias.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Payment history */}
        <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#64748b', mb: 2, letterSpacing: '0.05em' }}>
          HISTORIAL DE PAGOS
        </Typography>

        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {student.payments.map((payment, idx) => {
            const st = statusLabel[payment.status];
            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.07 }}
              >
                <Box>
                  <Box sx={{ px: 3, py: 2.5, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ mt: 0.25, flexShrink: 0 }}>
                      <StatusIcon status={payment.status} />
                    </Box>
                    <Box className="flex-1 min-w-0">
                      <Typography sx={{ fontWeight: 600, fontSize: '13px', color: '#0f172a', mb: 0.5, lineHeight: 1.3 }}>
                        {payment.concept}
                      </Typography>
                      <Box className="flex items-center gap-2 flex-wrap">
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                          {payment.date}
                        </Typography>
                        {payment.receiptNumber && (
                          <Box className="flex items-center gap-0.5">
                            <Receipt sx={{ fontSize: 10, color: '#94a3b8' }} />
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '10px' }}>
                              {payment.receiptNumber}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box className="text-right flex-shrink-0">
                      <Typography sx={{
                        fontWeight: 800, fontSize: '14px',
                        color: payment.status === 'overdue' ? '#dc2626' : payment.status === 'paid' ? '#16a34a' : '#d97706',
                      }}>
                        S/ {payment.amount.toLocaleString()}
                      </Typography>
                      <Chip
                        label={st.label}
                        size="small"
                        sx={{ backgroundColor: st.bg, color: st.color, fontWeight: 700, fontSize: '10px', height: 18, mt: 0.5 }}
                      />
                    </Box>
                  </Box>
                  {idx < student.payments.length - 1 && <Divider sx={{ mx: 3 }} />}
                </Box>
              </motion.div>
            );
          })}
        </Card>

        {/* Payment info */}
        <Card sx={{ borderRadius: 3, background: '#f8fafc', border: '1px solid #e2e8f0', mt: 3, boxShadow: 'none', mb: 3 }}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#475569', mb: 1 }}>
              Información de pagos
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', lineHeight: 1.6 }}>
              • Los pagos se realizan en caja del instituto{'\n'}
              • Métodos: Efectivo, tarjeta débito/crédito, transferencia{'\n'}
              • Horario de caja: Lunes a Viernes 8:00 a.m. – 1:00 p.m.{'\n'}
              • Ante dudas, comunícate con Tesorería
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
