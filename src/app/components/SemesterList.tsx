import { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Tabs, Tab, List, ListItem, Chip, Divider, Avatar } from '@mui/material';
import { ArrowBack, Person, School } from '@mui/icons-material';
import { motion } from 'motion/react';

interface Student {
  id: string;
  name: string;
  career: string;
  balance: number;
  status: 'active' | 'inactive';
  semester: number;
}

interface SemesterListProps {
  onBack: () => void;
  onSelectStudent: (student: Student) => void;
}

const mockStudentsBySemester: Record<number, Student[]> = {
  1: [
    { id: '2026001', name: 'Ana María González Pérez', career: 'Arquitectura de Plataformas y Servicios TI', balance: -1500, status: 'active', semester: 1 },
    { id: '2026002', name: 'Carlos Andrés Ramírez Torres', career: 'Mecánica Industrial', balance: 0, status: 'active', semester: 1 },
    { id: '2026003', name: 'María Fernanda López Castro', career: 'Electrónica', balance: -3200, status: 'active', semester: 1 },
    { id: '2026004', name: 'Jorge Luis Martínez Silva', career: 'Explotación Minera', balance: 500, status: 'active', semester: 1 },
  ],
  2: [
    { id: '2025045', name: 'Laura Patricia Jiménez Vargas', career: 'Agropecuaria', balance: -800, status: 'active', semester: 2 },
    { id: '2025046', name: 'Roberto Carlos Díaz Mora', career: 'Arquitectura de Plataformas y Servicios TI', balance: 0, status: 'active', semester: 2 },
    { id: '2025047', name: 'Sofía Elena Herrera Cruz', career: 'Mecánica Industrial', balance: -2100, status: 'active', semester: 2 },
  ],
  3: [
    { id: '2025012', name: 'Fernando Javier Morales Ruiz', career: 'Electrónica', balance: -1200, status: 'active', semester: 3 },
    { id: '2025013', name: 'Patricia Isabel Romero Vega', career: 'Explotación Minera', balance: 1000, status: 'active', semester: 3 },
    { id: '2025014', name: 'Diego Alejandro Castillo Soto', career: 'Agropecuaria', balance: -900, status: 'active', semester: 3 },
  ],
  4: [
    { id: '2024078', name: 'Gabriela Fernanda Ortiz Luna', career: 'Arquitectura de Plataformas y Servicios TI', balance: 0, status: 'active', semester: 4 },
    { id: '2024079', name: 'Miguel Ángel Torres Pérez', career: 'Mecánica Industrial', balance: -1800, status: 'active', semester: 4 },
  ],
  5: [
    { id: '2024023', name: 'Valeria Alejandra Navarro Ríos', career: 'Electrónica', balance: -2500, status: 'active', semester: 5 },
    { id: '2024024', name: 'Andrés Felipe Guzmán Flores', career: 'Explotación Minera', balance: 300, status: 'active', semester: 5 },
  ],
  6: [
    { id: '2023056', name: 'Carolina Beatriz Medina Campos', career: 'Agropecuaria', balance: 0, status: 'active', semester: 6 },
    { id: '2023057', name: 'Ricardo Alfonso Delgado Ramos', career: 'Arquitectura de Plataformas y Servicios TI', balance: -700, status: 'active', semester: 6 },
  ],
};

export function SemesterList({ onBack, onSelectStudent }: SemesterListProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const currentSemester = selectedTab + 1;
  const students = mockStudentsBySemester[currentSemester] || [];
  const totalStudents = students.length;
  const studentsWithDebt = students.filter(s => s.balance < 0).length;

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
          <School sx={{ fontSize: 28, color: '#0f172a' }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Estudiantes por Semestre
          </Typography>
        </Box>

        {/* Semester Tabs */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', mb: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                minWidth: 100
              }
            }}
          >
            <Tab label="1° Semestre" />
            <Tab label="2° Semestre" />
            <Tab label="3° Semestre" />
            <Tab label="4° Semestre" />
            <Tab label="5° Semestre" />
            <Tab label="6° Semestre" />
          </Tabs>
        </Card>

        {/* Statistics */}
        <Box className="grid grid-cols-2 gap-3 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent className="p-4">
                <Typography variant="body2" color="text.secondary" className="mb-1">
                  Total Estudiantes
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#3b82f6' }}>
                  {totalStudents}
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
                  Con Adeudo
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#ef4444' }}>
                  {studentsWithDebt}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Students List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent className="p-0">
              {students.length > 0 ? (
                <List>
                  {students.map((student, index) => (
                    <div key={student.id}>
                      <ListItem
                        sx={{
                          py: 2,
                          px: 3,
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#f8fafc'
                          }
                        }}
                        onClick={() => onSelectStudent(student)}
                      >
                        <Box className="flex items-start gap-3 w-full">
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              bgcolor: '#e2e8f0',
                              color: '#64748b'
                            }}
                          >
                            <Person />
                          </Avatar>
                          <Box className="flex-1">
                            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {student.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              ID: {student.id}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {student.career}
                            </Typography>
                          </Box>
                          <Box className="text-right">
                            <Chip
                              label={student.balance < 0 ? `$${Math.abs(student.balance).toFixed(2)}` : 'Al día'}
                              size="small"
                              sx={{
                                backgroundColor: student.balance < 0 ? '#fee2e2' : '#dcfce7',
                                color: student.balance < 0 ? '#ef4444' : '#10b981',
                                fontWeight: 600,
                                fontSize: '12px'
                              }}
                            />
                          </Box>
                        </Box>
                      </ListItem>
                      {index < students.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              ) : (
                <Box className="p-8 text-center">
                  <Typography variant="body1" color="text.secondary">
                    No hay estudiantes registrados en este semestre
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
