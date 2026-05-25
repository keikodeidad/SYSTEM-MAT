import { Card, CardContent, Typography, Button, Box, Avatar, Grid } from '@mui/material';
import { Search, Payment, Assessment, AccountBalance, ExitToApp, Person, School, Warning, TrendingUp, Settings } from '@mui/icons-material';
import { motion } from 'motion/react';

interface AdminDashboardProps {
  adminName: string;
  onSearchStudent: () => void;
  onRegisterPayment: () => void;
  onViewCashRegister: () => void;
  onViewSemesters: () => void;
  onViewDebtors: () => void;
  onViewReports: () => void;
  onViewFeeConfig: () => void;
  onLogout: () => void;
  dailyTotal: number;
  todayPayments: number;
}

export function AdminDashboard({
  adminName,
  onSearchStudent,
  onRegisterPayment,
  onViewCashRegister,
  onViewSemesters,
  onViewDebtors,
  onViewReports,
  onViewFeeConfig,
  onLogout,
  dailyTotal,
  todayPayments
}: AdminDashboardProps) {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <Box className="flex items-center justify-between mb-6 pt-4">
          <Box className="flex items-center gap-3">
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#0f172a',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.3)'
              }}
            >
              <Person />
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Cajero(a)
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {adminName}
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={onLogout}
            startIcon={<ExitToApp />}
            sx={{
              color: '#64748b',
              textTransform: 'none'
            }}
          >
            Salir
          </Button>
        </Box>

        {/* Daily Summary Cards */}
        <Grid container spacing={2} className="mb-6">
          <Grid item xs={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <CardContent className="p-4">
                  <Typography variant="body2" color="text.secondary" className="mb-1">
                    Total Hoy
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#10b981' }}>
                    ${dailyTotal.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <CardContent className="p-4">
                  <Typography variant="body2" color="text.secondary" className="mb-1">
                    Pagos Hoy
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#3b82f6' }}>
                    {todayPayments}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Main Actions */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Operaciones Principales
        </Typography>

        <Box className="space-y-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              onClick={onRegisterPayment}
              sx={{
                borderRadius: 3,
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 8px 28px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent className="p-5">
                <Box className="flex items-center gap-4">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <Payment sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Registrar Pago
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Procesar cobro de estudiante
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card
              onClick={onSearchStudent}
              sx={{
                borderRadius: 3,
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 8px 28px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent className="p-5">
                <Box className="flex items-center gap-4">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    <Search sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Buscar Estudiante
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Consultar estado de cuenta
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card
              onClick={onViewCashRegister}
              sx={{
                borderRadius: 3,
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 8px 28px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent className="p-5">
                <Box className="flex items-center gap-4">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                    }}
                  >
                    <Assessment sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Reporte de Caja
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ver movimientos del día
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Additional Sections */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Gestión y Consultas
        </Typography>

        <Box className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card
              onClick={onViewSemesters}
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
                height: '100%',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent className="p-4">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  <School sx={{ fontSize: 22, color: 'white' }} />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Por Semestre
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Ver estudiantes
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Card
              onClick={onViewDebtors}
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
                height: '100%',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent className="p-4">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                  }}
                >
                  <Warning sx={{ fontSize: 22, color: 'white' }} />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Deudores
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Lista completa
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card
              onClick={onViewReports}
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
                height: '100%',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent className="p-4">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'
                  }}
                >
                  <TrendingUp sx={{ fontSize: 22, color: 'white' }} />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Reportes
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Estadísticas
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <Card
              onClick={onViewFeeConfig}
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
                height: '100%',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent className="p-4">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    boxShadow: '0 4px 12px rgba(100, 116, 139, 0.3)'
                  }}
                >
                  <Settings sx={{ fontSize: 22, color: 'white' }} />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Tarifas
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Configuración
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
}
