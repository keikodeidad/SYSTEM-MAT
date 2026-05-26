import { Box, Typography, Card, CardContent, Chip, LinearProgress } from '@mui/material';
import { MenuBook, Room, Person, Star } from '@mui/icons-material';
import { motion } from 'motion/react';
import { StudentAccount, COURSE_COLORS } from '../data/studentData';

interface StudentCoursesProps {
  student: StudentAccount;
}

export function StudentCourses({ student }: StudentCoursesProps) {
  const totalCredits = student.courses.reduce((s, c) => s + c.credits, 0);
  const maxCredits = 32;
  const optional = student.courses.filter(c => !c.mandatory);
  const mandatory = student.courses.filter(c => c.mandatory);

  // Sessions per course (count from schedule)
  const sessionsPerCourse = (courseId: string) => {
    const name = student.courses.find(c => c.id === courseId)?.name ?? '';
    return student.schedule.filter(s => s.courseName === name).length;
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', pt: 5, pb: 4, px: 3 }}>
        <Box className="flex items-center gap-2 mb-1">
          <MenuBook sx={{ color: '#60a5fa', fontSize: 22 }} />
          <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '20px' }}>
            Mis Cursos
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
          {student.career} — {student.semester}° Semestre
        </Typography>

        {/* Credits progress */}
        <Box sx={{ mt: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, p: 2 }}>
          <Box className="flex justify-between mb-1">
            <Typography variant="caption" sx={{ color: '#bfdbfe', fontWeight: 600 }}>
              Créditos inscritos
            </Typography>
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 800 }}>
              {totalCredits} / {maxCredits}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(totalCredits / maxCredits) * 100}
            sx={{
              height: 8, borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.2)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
                borderRadius: 4,
              },
            }}
          />
          <Box className="flex justify-between mt-1">
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              {student.courses.length} cursos
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              {Math.round((totalCredits / maxCredits) * 100)}% del semestre
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: 2, pt: 3 }}>
        {/* Optional courses */}
        <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#64748b', mb: 2, letterSpacing: '0.05em' }}>
          CURSOS ELECTIVOS
        </Typography>
        <Box className="space-y-3 mb-5">
          {optional.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ width: 5, backgroundColor: COURSE_COLORS[course.colorIndex], flexShrink: 0 }} />
                  <CardContent sx={{ p: 2.5, flex: 1, '&:last-child': { pb: 2.5 } }}>
                    <Box className="flex items-start justify-between gap-2 mb-2">
                      <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', lineHeight: 1.3 }}>
                        {course.name}
                      </Typography>
                      <Chip
                        label={`${course.credits} cr`}
                        size="small"
                        sx={{
                          backgroundColor: `${COURSE_COLORS[course.colorIndex]}15`,
                          color: COURSE_COLORS[course.colorIndex],
                          fontWeight: 800, fontSize: '12px', height: 22, flexShrink: 0,
                        }}
                      />
                    </Box>

                    <Box className="space-y-1.5">
                      <Box className="flex items-center gap-1.5">
                        <Person sx={{ fontSize: 14, color: '#94a3b8' }} />
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          {course.teacher}
                        </Typography>
                      </Box>
                      <Box className="flex items-center gap-1.5">
                        <Room sx={{ fontSize: 14, color: '#94a3b8' }} />
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                          {course.room}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid #f1f5f9', display: 'flex', gap: 1 }}>
                      <Chip
                        label={`${sessionsPerCourse(course.id)} sesiones/sem`}
                        size="small"
                        sx={{ backgroundColor: '#f1f5f9', color: '#64748b', fontSize: '11px', height: 20 }}
                      />
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </motion.div>
          ))}
        </Box>

        {/* Mandatory courses */}
        <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#64748b', mb: 2, letterSpacing: '0.05em' }}>
          CURSOS OBLIGATORIOS
        </Typography>
        <Box className="space-y-3 mb-6">
          {mandatory.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (optional.length + idx) * 0.07 }}
            >
              <Card
                sx={{
                  borderRadius: 3, overflow: 'hidden',
                  background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                  border: '1px solid #fde68a',
                  boxShadow: '0 4px 12px rgba(251,191,36,0.15)',
                }}
              >
                <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                  <Box className="flex items-start justify-between gap-2 mb-2">
                    <Box className="flex items-center gap-1.5">
                      <Star sx={{ color: '#d97706', fontSize: 18 }} />
                      <Typography sx={{ fontWeight: 800, fontSize: '14px', color: '#78350f' }}>
                        {course.name}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${course.credits} cr`}
                      size="small"
                      sx={{ backgroundColor: '#fde68a', color: '#78350f', fontWeight: 800, fontSize: '12px', height: 22 }}
                    />
                  </Box>
                  <Box className="space-y-1.5">
                    <Box className="flex items-center gap-1.5">
                      <Person sx={{ fontSize: 14, color: '#d97706' }} />
                      <Typography variant="caption" sx={{ color: '#92400e' }}>{course.teacher}</Typography>
                    </Box>
                    <Box className="flex items-center gap-1.5">
                      <Room sx={{ fontSize: 14, color: '#d97706' }} />
                      <Typography variant="caption" sx={{ color: '#92400e', fontWeight: 600 }}>{course.room}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid #fde68a' }}>
                    <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 700 }}>
                      Curso obligatorio — incluido automáticamente en matrícula completa
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
