import { Card, CardContent, Typography, Button, Box, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { ArrowBack, TrendingUp, PieChart as PieChartIcon } from '@mui/icons-material';
import { motion } from 'motion/react';
import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportsScreenProps {
  onBack: () => void;
}

const monthlyData = [
  { month: 'Ene', ingresos: 45000, pagos: 32 },
  { month: 'Feb', ingresos: 52000, pagos: 38 },
  { month: 'Mar', ingresos: 48000, pagos: 35 },
  { month: 'Abr', ingresos: 61000, pagos: 42 },
  { month: 'May', ingresos: 58000, pagos: 40 },
];

const paymentMethodData = [
  { name: 'Efectivo', value: 45, amount: 28500 },
  { name: 'Tarjeta', value: 35, amount: 22100 },
  { name: 'Transferencia', value: 20, amount: 12600 },
];

const conceptData = [
  { concept: 'Mensualidad', cantidad: 85, monto: 212500 },
  { concept: 'Matrícula', cantidad: 24, monto: 120000 },
  { concept: 'Reinscripción', cantidad: 18, monto: 36000 },
  { concept: 'Examen Extra', cantidad: 12, monto: 18000 },
  { concept: 'Certificados', cantidad: 8, monto: 4000 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export function ReportsScreen({ onBack }: ReportsScreenProps) {
  const [period, setPeriod] = useState<'week' | 'month' | 'semester'>('month');

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
        </Box>

        <Box className="flex items-center gap-2 mb-4">
          <TrendingUp sx={{ fontSize: 28, color: '#0f172a' }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Reportes y Estadísticas
          </Typography>
        </Box>

        {/* Period Selector */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', mb: 3 }}>
          <CardContent className="p-4">
            <FormControl fullWidth size="small">
              <InputLabel>Periodo</InputLabel>
              <Select
                value={period}
                label="Periodo"
                onChange={(e) => setPeriod(e.target.value as 'week' | 'month' | 'semester')}
                sx={{
                  borderRadius: 2,
                  backgroundColor: 'white'
                }}
              >
                <MenuItem value="week">Esta Semana</MenuItem>
                <MenuItem value="month">Este Mes</MenuItem>
                <MenuItem value="semester">Este Semestre</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <Grid container spacing={2} className="mb-4">
          <Grid item xs={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <CardContent className="p-4">
                  <Typography variant="body2" color="text.secondary" className="mb-1">
                    Ingresos Totales
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#10b981' }}>
                    $58,000
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Mayo 2026
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <CardContent className="p-4">
                  <Typography variant="body2" color="text.secondary" className="mb-1">
                    Total Pagos
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#3b82f6' }}>
                    40
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Mayo 2026
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Monthly Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', mb: 3 }}>
            <CardContent className="p-5">
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Tendencia de Ingresos
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Methods Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', mb: 3 }}>
            <CardContent className="p-5">
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Métodos de Pago
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Concepts Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent className="p-5">
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Ingresos por Concepto
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={conceptData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="concept" stroke="#64748b" style={{ fontSize: '11px' }} angle={-15} textAnchor="end" height={60} />
                  <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="monto" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Box>
  );
}
