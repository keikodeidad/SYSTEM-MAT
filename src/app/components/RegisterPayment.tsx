import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import { ArrowBack, Receipt, School, Warning, CheckCircle } from '@mui/icons-material';
import { motion } from 'motion/react';
import { CAREERS, Career, COURSE_DATA, Course, getSemesterData, isSemesterFull, getAvailableSlots } from '../data/coursesData';

interface Student {
  id: string;
  name: string;
  career: string;
  balance: number;
  status: 'active' | 'inactive';
}

interface RegisterPaymentProps {
  student: Student;
  onBack: () => void;
  onPaymentComplete: (paymentData: PaymentData) => void;
}

export interface PaymentData {
  concept: string;
  amount: number;
  paymentMethod: string;
  reference?: string;
  notes?: string;
  career?: string;
  semester?: number;
  selectedCourses?: Course[];
  totalCredits?: number;
}

const paymentConcepts = [
  'Matrícula',
  'Mensualidad',
  'Reinscripción',
  'Examen Extraordinario',
  'Certificado',
  'Constancia',
  'Credencial',
  'Otro',
];

const paymentMethods = [
  'Efectivo',
  'Tarjeta de Débito',
  'Tarjeta de Crédito',
  'Transferencia Bancaria',
];

const SEMESTERS = [1, 2, 3, 4, 5, 6];

export function RegisterPayment({ student, onBack, onPaymentComplete }: RegisterPaymentProps) {
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [reference, setReference] = useState('');
  const [notes, setNotes] = useState('');
  const [career, setCareer] = useState<Career | ''>('');
  const [semester, setSemester] = useState<number | ''>('');
  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<string>>(new Set());

  const isMatricula = concept === 'Matrícula';

  const semesterData = useMemo(() => {
    if (!career || !semester) return null;
    return getSemesterData(career as Career, semester as number);
  }, [career, semester]);

  const courses = semesterData?.courses ?? [];
  const optionalCourses = courses.filter(c => !c.mandatory);
  const mandatoryCourses = courses.filter(c => c.mandatory);

  const allOptionalSelected = optionalCourses.length > 0 &&
    optionalCourses.every(c => selectedCourseIds.has(c.id));

  const isFullEnrollment = allOptionalSelected;

  // When full enrollment, mandatory courses are auto-included
  const effectiveSelectedIds = useMemo(() => {
    const ids = new Set(selectedCourseIds);
    if (isFullEnrollment) {
      mandatoryCourses.forEach(c => ids.add(c.id));
    }
    return ids;
  }, [selectedCourseIds, isFullEnrollment, mandatoryCourses]);

  const selectedCourses = courses.filter(c => effectiveSelectedIds.has(c.id));
  const totalCredits = selectedCourses.reduce((sum, c) => sum + c.credits, 0);

  const full = career && semester ? isSemesterFull(career as Career, semester as number) : false;
  const slots = career && semester ? getAvailableSlots(career as Career, semester as number) : 0;

  const handleCareerChange = (value: Career) => {
    setCareer(value);
    setSemester('');
    setSelectedCourseIds(new Set());
  };

  const handleSemesterChange = (value: number) => {
    setSemester(value);
    setSelectedCourseIds(new Set());
  };

  const toggleCourse = (courseId: string, mandatory: boolean) => {
    if (mandatory) return; // mandatory ones toggle with full enrollment
    setSelectedCourseIds(prev => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (allOptionalSelected) {
      setSelectedCourseIds(new Set());
    } else {
      setSelectedCourseIds(new Set(optionalCourses.map(c => c.id)));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentData: PaymentData = {
      concept,
      amount: parseFloat(amount),
      paymentMethod,
      reference: reference || undefined,
      notes: notes || undefined,
      career: isMatricula && career ? career : undefined,
      semester: isMatricula && semester !== '' ? (semester as number) : undefined,
      selectedCourses: isMatricula ? selectedCourses : undefined,
      totalCredits: isMatricula ? totalCredits : undefined,
    };
    onPaymentComplete(paymentData);
  };

  const isValid =
    concept && amount && parseFloat(amount) > 0 && paymentMethod &&
    (!isMatricula || (career && semester !== '' && selectedCourses.length > 0 && !full));

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4 pb-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {/* Header */}
        <Box className="flex items-center gap-3 mb-6 pt-4">
          <Button
            onClick={onBack}
            startIcon={<ArrowBack />}
            sx={{ color: '#64748b', textTransform: 'none', fontWeight: 500 }}
          >
            Volver
          </Button>
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          Registrar Pago
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {student.name} • ID: {student.id}
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Concept */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <CardContent className="p-5 space-y-4">
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#475569', mb: 1 }}>
                Concepto y Monto
              </Typography>

              <FormControl fullWidth required>
                <InputLabel>Concepto de Pago</InputLabel>
                <Select
                  value={concept}
                  label="Concepto de Pago"
                  onChange={(e) => { setConcept(e.target.value); setSelectedCourseIds(new Set()); }}
                  sx={{ borderRadius: 2, backgroundColor: 'white' }}
                >
                  {paymentConcepts.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                required
                label="Monto"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                inputProps={{ min: 0, step: 0.01 }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'white' } }}
              />

              <FormControl fullWidth required>
                <InputLabel>Método de Pago</InputLabel>
                <Select
                  value={paymentMethod}
                  label="Método de Pago"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  sx={{ borderRadius: 2, backgroundColor: 'white' }}
                >
                  {paymentMethods.map(method => (
                    <MenuItem key={method} value={method}>{method}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Referencia / Número de Transacción"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                helperText="Opcional"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'white' } }}
              />

              <TextField
                fullWidth
                label="Notas"
                multiline
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                helperText="Opcional"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'white' } }}
              />
            </CardContent>
          </Card>

          {/* Matricula section */}
          {isMatricula && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Career + Semester selectors */}
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', mb: 3 }}>
                <CardContent className="p-5">
                  <Box className="flex items-center gap-2 mb-4">
                    <School sx={{ color: '#2563eb', fontSize: 20 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e3a8a' }}>
                      Datos de Matrícula
                    </Typography>
                  </Box>

                  <Box className="space-y-3">
                    <FormControl fullWidth required>
                      <InputLabel>Especialidad / Carrera</InputLabel>
                      <Select
                        value={career}
                        label="Especialidad / Carrera"
                        onChange={(e) => handleCareerChange(e.target.value as Career)}
                        sx={{ borderRadius: 2, backgroundColor: 'white' }}
                      >
                        {CAREERS.map(c => (
                          <MenuItem key={c} value={c}>{c}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth required disabled={!career}>
                      <InputLabel>Semestre a Cursar</InputLabel>
                      <Select
                        value={semester}
                        label="Semestre a Cursar"
                        onChange={(e) => handleSemesterChange(e.target.value as number)}
                        sx={{ borderRadius: 2, backgroundColor: 'white' }}
                      >
                        {SEMESTERS.map(s => {
                          const sd = career ? getSemesterData(career as Career, s) : null;
                          const isFull = sd ? sd.enrolled >= sd.capacity : false;
                          return (
                            <MenuItem key={s} value={s} disabled={isFull}>
                              <Box className="flex items-center justify-between w-full gap-4">
                                <span>{s}° Semestre</span>
                                {sd && (
                                  <Chip
                                    label={isFull ? 'LLENO' : `${sd.capacity - sd.enrolled} cupos`}
                                    size="small"
                                    sx={{
                                      fontSize: '11px',
                                      height: 20,
                                      backgroundColor: isFull ? '#fee2e2' : '#dcfce7',
                                      color: isFull ? '#dc2626' : '#16a34a',
                                      fontWeight: 600,
                                    }}
                                  />
                                )}
                              </Box>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </CardContent>
              </Card>

              {/* Capacity alert */}
              {career && semester !== '' && full && (
                <Alert severity="error" icon={<Warning />} sx={{ borderRadius: 2, mb: 3 }}>
                  <strong>Cupo lleno.</strong> No hay lugares disponibles en {career} — {semester}° Semestre. No se puede procesar la matrícula.
                </Alert>
              )}

              {/* Available slots info */}
              {career && semester !== '' && !full && semesterData && (
                <Alert
                  severity="info"
                  sx={{ borderRadius: 2, mb: 3, backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af' }}
                >
                  <strong>{slots} cupos disponibles</strong> de {semesterData.capacity} en {career} — {semester}° Semestre
                </Alert>
              )}

              {/* Course selection */}
              {career && semester !== '' && !full && courses.length > 0 && (
                <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <CardContent className="p-0">
                    {/* Header row */}
                    <Box
                      sx={{
                        px: 3, py: 2,
                        backgroundColor: '#f8fafc',
                        borderBottom: '1px solid #e2e8f0',
                        borderRadius: '12px 12px 0 0',
                      }}
                    >
                      <Box className="flex items-center justify-between">
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                          Selección de Cursos
                        </Typography>
                        <Button
                          size="small"
                          variant={allOptionalSelected ? 'contained' : 'outlined'}
                          onClick={toggleAll}
                          sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            fontSize: '12px',
                            fontWeight: 600,
                            ...(allOptionalSelected
                              ? { background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }
                              : { borderColor: '#3b82f6', color: '#2563eb' }),
                          }}
                        >
                          {allOptionalSelected ? 'Deseleccionar todo' : 'Semestre completo'}
                        </Button>
                      </Box>

                      {isFullEnrollment && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <Box
                            sx={{
                              mt: 1.5, px: 2, py: 1,
                              backgroundColor: '#fef3c7',
                              borderRadius: 1.5,
                              border: '1px solid #fcd34d',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <CheckCircle sx={{ fontSize: 16, color: '#d97706' }} />
                            <Typography variant="caption" sx={{ color: '#92400e', fontWeight: 600 }}>
                              Matrícula completa — Experiencias Formativas se incluye automáticamente
                            </Typography>
                          </Box>
                        </motion.div>
                      )}
                    </Box>

                    {/* Optional courses */}
                    <Box sx={{ px: 1, py: 1 }}>
                      {optionalCourses.map((course, idx) => {
                        const checked = selectedCourseIds.has(course.id);
                        return (
                          <motion.div
                            key={course.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.04 }}
                          >
                            <Box
                              onClick={() => toggleCourse(course.id, course.mandatory)}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                px: 2,
                                py: 1.25,
                                borderRadius: 2,
                                cursor: 'pointer',
                                backgroundColor: checked ? '#eff6ff' : 'transparent',
                                border: checked ? '1px solid #bfdbfe' : '1px solid transparent',
                                mb: 0.5,
                                transition: 'all 0.15s ease',
                                '&:hover': { backgroundColor: checked ? '#dbeafe' : '#f8fafc' },
                              }}
                            >
                              <Box className="flex items-center gap-2 flex-1 min-w-0">
                                <Checkbox
                                  checked={checked}
                                  size="small"
                                  sx={{
                                    p: 0,
                                    color: '#94a3b8',
                                    '&.Mui-checked': { color: '#2563eb' },
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: checked ? 600 : 400,
                                    color: checked ? '#1e3a8a' : '#334155',
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {course.name}
                                </Typography>
                              </Box>
                              <Chip
                                label={`${course.credits} cr`}
                                size="small"
                                sx={{
                                  ml: 2,
                                  flexShrink: 0,
                                  fontSize: '11px',
                                  height: 22,
                                  fontWeight: 700,
                                  backgroundColor: checked ? '#dbeafe' : '#f1f5f9',
                                  color: checked ? '#1d4ed8' : '#64748b',
                                }}
                              />
                            </Box>
                          </motion.div>
                        );
                      })}
                    </Box>

                    {/* Mandatory course — only shown when full enrollment */}
                    {isFullEnrollment && mandatoryCourses.map(course => (
                      <motion.div key={course.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Divider sx={{ mx: 3, my: 0.5 }} />
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 3, py: 1.5, mx: 1, mb: 1,
                            borderRadius: 2,
                            backgroundColor: '#fef9c3',
                            border: '1px solid #fde68a',
                          }}
                        >
                          <Box className="flex items-center gap-2">
                            <CheckCircle sx={{ fontSize: 18, color: '#d97706' }} />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: '#78350f' }}>
                                {course.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#92400e' }}>
                                Curso obligatorio — incluido automáticamente
                              </Typography>
                            </Box>
                          </Box>
                          <Chip
                            label={`${course.credits} cr`}
                            size="small"
                            sx={{
                              fontSize: '11px',
                              height: 22,
                              fontWeight: 700,
                              backgroundColor: '#fde68a',
                              color: '#78350f',
                            }}
                          />
                        </Box>
                      </motion.div>
                    ))}

                    {/* Credits summary */}
                    {selectedCourses.length > 0 && (
                      <Box
                        sx={{
                          mx: 2, mb: 2, mt: 1,
                          px: 3, py: 2,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
                        }}
                      >
                        <Box className="flex items-center justify-between">
                          <Box>
                            <Typography variant="caption" sx={{ color: '#93c5fd', fontWeight: 600 }}>
                              {selectedCourses.length} curso{selectedCourses.length !== 1 ? 's' : ''} seleccionado{selectedCourses.length !== 1 ? 's' : ''}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'white', fontWeight: 800, fontSize: '18px' }}>
                              {totalCredits} créditos
                            </Typography>
                          </Box>
                          <Box className="text-right">
                            <Typography variant="caption" sx={{ color: '#93c5fd' }}>
                              del semestre completo
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#bfdbfe', fontWeight: 600 }}>
                              32 créditos
                            </Typography>
                          </Box>
                        </Box>
                        {/* Credit bar */}
                        <Box sx={{ mt: 1.5, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.2)' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (totalCredits / 32) * 100)}%` }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            style={{
                              height: '100%',
                              borderRadius: 3,
                              background: 'linear-gradient(90deg, #60a5fa, #a5f3fc)',
                            }}
                          />
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {/* Submit */}
          <Box className="pt-2">
            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              disabled={!isValid}
              startIcon={<Receipt />}
              sx={{
                borderRadius: 2,
                padding: '14px',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                '&:hover': { boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)' },
                '&:disabled': { background: '#cbd5e1', color: '#94a3b8' },
              }}
            >
              Procesar Pago y Generar Recibo
            </Button>
          </Box>
        </form>
      </motion.div>
    </Box>
  );
}
