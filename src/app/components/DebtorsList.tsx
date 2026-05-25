import { Card, CardContent, Typography, Button, Box, List, ListItem, Chip, Divider, Avatar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { ArrowBack, Person, Warning } from '@mui/icons-material';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Student {
  id: string;
  name: string;
  career: string;
  balance: number;
  status: 'active' | 'inactive';
  semester: number;
  lastPayment: string;
}

interface DebtorsListProps {
  onBack: () => void;
  onSelectStudent: (student: Student) => void;
}

const mockDebtors: Student[] = [
  { id: '2026003', name: 'María Fernanda López Castro', career: 'Electrónica', balance: -3200, status: 'active', semester: 1, lastPayment: '15/03/2026' },
  { id: '2024023', name: 'Valeria Alejandra Navarro Ríos', career: 'Electrónica', balance: -2500, status: 'active', semester: 5, lastPayment: '20/02/2026' },
  { id: '2025047', name: 'Sofía Elena Herrera Cruz', career: 'Mecánica Industrial', balance: -2100, status: 'active', semester: 2, lastPayment: '10/03/2026' },
  { id: '2024079', name: 'Miguel Ángel Torres Pérez', career: 'Mecánica Industrial', balance: -1800, status: 'active', semester: 4, lastPayment: '05/04/2026' },
  { id: '2026001', name: 'Ana María González Pérez', career: 'Arquitectura de Plataformas y Servicios TI', balance: -1500, status: 'active', semester: 1, lastPayment: '18/04/2026' },
  { id: '2025012', name: 'Fernando Javier Morales Ruiz', career: 'Electrónica', balance: -1200, status: 'active', semester: 3, lastPayment: '25/03/2026' },
  { id: '2025014', name: 'Diego Alejandro Castillo Soto', career: 'Agropecuaria', balance: -900, status: 'active', semester: 3, lastPayment: '01/04/2026' },
  { id: '2025045', name: 'Laura Patricia Jiménez Vargas', career: 'Agropecuaria', balance: -800, status: 'active', semester: 2, lastPayment: '12/04/2026' },
  { id: '2023057', name: 'Ricardo Alfonso Delgado Ramos', career: 'Arquitectura de Plataformas y Servicios TI', balance: -700, status: 'active', semester: 6, lastPayment: '08/04/2026' },
];

export function DebtorsList({ onBack, onSelectStudent }: DebtorsListProps) {
  const [sortBy, setSortBy] = useState<'debt' | 'date'>('debt');

  const sortedDebtors = [...mockDebtors].sort((a, b) => {
    if (sortBy === 'debt') {
      return a.balance - b.balance;
    } else {
      return new Date(b.lastPayment.split('/').reverse().join('-')).getTime() -
             new Date(a.lastPayment.split('/').reverse().join('-')).getTime();
    }
  });

  const totalDebt = mockDebtors.reduce((sum, student) => sum + Math.abs(student.balance), 0);

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

        <Box className="flex items-center gap-2 mb-4">
          <Warning sx={{ fontSize: 28, color: '#ef4444' }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Lista de Deudores
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Box className="grid grid-cols-2 gap-3 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent className="p-4">
                <Typography variant="body2" color="text.secondary" className="mb-1">
                  Estudiantes
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#ef4444' }}>
                  {mockDebtors.length}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent className="p-4">
                <Typography variant="body2" color="text.secondary" className="mb-1">
                  Total Adeudado
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#ef4444' }}>
                  ${totalDebt.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Sort Control */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', mb: 3 }}>
          <CardContent className="p-4">
            <FormControl fullWidth size="small">
              <InputLabel>Ordenar por</InputLabel>
              <Select
                value={sortBy}
                label="Ordenar por"
                onChange={(e) => setSortBy(e.target.value as 'debt' | 'date')}
                sx={{
                  borderRadius: 2,
                  backgroundColor: 'white'
                }}
              >
                <MenuItem value="debt">Mayor Deuda</MenuItem>
                <MenuItem value="date">Último Pago</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Debtors List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent className="p-0">
              <List>
                {sortedDebtors.map((student, index) => (
                  <div key={student.id}>
                    <ListItem
                      sx={{
                        py: 2,
                        px: 3,
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#fef2f2'
                        }
                      }}
                      onClick={() => onSelectStudent(student)}
                    >
                      <Box className="flex items-start gap-3 w-full">
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: '#fee2e2',
                            color: '#ef4444'
                          }}
                        >
                          <Person />
                        </Avatar>
                        <Box className="flex-1">
                          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {student.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            ID: {student.id} • {student.semester}° Semestre
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Último pago: {student.lastPayment}
                          </Typography>
                        </Box>
                        <Box className="text-right">
                          <Chip
                            label={`$${Math.abs(student.balance).toFixed(2)}`}
                            sx={{
                              backgroundColor: '#fee2e2',
                              color: '#ef4444',
                              fontWeight: 700,
                              fontSize: '14px'
                            }}
                          />
                        </Box>
                      </Box>
                    </ListItem>
                    {index < sortedDebtors.length - 1 && <Divider />}
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
