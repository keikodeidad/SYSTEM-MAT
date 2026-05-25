import { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, TextField, List, ListItem, ListItemButton, ListItemText, Chip, Divider } from '@mui/material';
import { ArrowBack, Search, Person } from '@mui/icons-material';
import { motion } from 'motion/react';

interface Student {
  id: string;
  name: string;
  career: string;
  balance: number;
  status: 'active' | 'inactive';
}

interface SearchStudentProps {
  onBack: () => void;
  onSelectStudent: (student: Student) => void;
}

const mockStudents: Student[] = [
  { id: '2024001', name: 'Ana María González Pérez', career: 'Arquitectura de Plataformas y Servicios TI', balance: -1500, status: 'active' },
  { id: '2024002', name: 'Carlos Andrés Ramírez Torres', career: 'Mecánica Industrial', balance: 0, status: 'active' },
  { id: '2024003', name: 'María Fernanda López Castro', career: 'Electrónica', balance: -3200, status: 'active' },
  { id: '2023045', name: 'José Luis Martínez Silva', career: 'Explotación Minera', balance: 500, status: 'active' },
  { id: '2023067', name: 'Laura Patricia Jiménez Vargas', career: 'Agropecuaria', balance: -800, status: 'active' },
];

export function SearchStudent({ onBack, onSelectStudent }: SearchStudentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const results = mockStudents.filter(student =>
        student.id.includes(searchTerm) ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(results);
      setHasSearched(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
          Buscar Estudiante
        </Typography>

        {/* Search Box */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', mb: 4 }}>
          <CardContent className="p-5">
            <Box className="flex gap-2">
              <TextField
                fullWidth
                placeholder="ID o nombre del estudiante..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'white',
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  minWidth: 100,
                  borderRadius: 2,
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                }}
              >
                <Search />
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Results */}
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent className="p-0">
                {filteredStudents.length > 0 ? (
                  <>
                    <Box className="p-4">
                      <Typography variant="body2" color="text.secondary">
                        {filteredStudents.length} resultado{filteredStudents.length !== 1 ? 's' : ''} encontrado{filteredStudents.length !== 1 ? 's' : ''}
                      </Typography>
                    </Box>
                    <Divider />
                    <List>
                      {filteredStudents.map((student, index) => (
                        <div key={student.id}>
                          <ListItemButton
                            onClick={() => onSelectStudent(student)}
                            sx={{
                              py: 2,
                              '&:hover': {
                                backgroundColor: '#f1f5f9'
                              }
                            }}
                          >
                            <Box className="flex items-start gap-3 w-full">
                              <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: 2,
                                  backgroundColor: '#e2e8f0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}
                              >
                                <Person sx={{ color: '#64748b' }} />
                              </Box>
                              <Box className="flex-1">
                                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                  {student.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  ID: {student.id} • {student.career}
                                </Typography>
                                <Chip
                                  label={student.balance < 0 ? `Debe: $${Math.abs(student.balance).toFixed(2)}` : `A favor: $${student.balance.toFixed(2)}`}
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
                          </ListItemButton>
                          {index < filteredStudents.length - 1 && <Divider />}
                        </div>
                      ))}
                    </List>
                  </>
                ) : (
                  <Box className="p-8 text-center">
                    <Typography variant="body1" color="text.secondary">
                      No se encontraron resultados para "{searchTerm}"
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </Box>
  );
}
