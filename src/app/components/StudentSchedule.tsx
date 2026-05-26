import { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, Tabs, Tab } from '@mui/material';
import { CalendarMonth, Room, Person } from '@mui/icons-material';
import { motion } from 'motion/react';
import { StudentAccount, DAYS, TIME_BLOCKS, COURSE_COLORS } from '../data/studentData';

interface StudentScheduleProps {
  student: StudentAccount;
}

export function StudentSchedule({ student }: StudentScheduleProps) {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 0 : today - 1; // default to Monday if Sunday
  const [selectedDay, setSelectedDay] = useState(Math.min(todayIndex, 5));

  const daySchedule = student.schedule.filter(s => s.day === selectedDay);
  const totalClassesWeek = student.schedule.length;
  const uniqueDays = new Set(student.schedule.map(s => s.day)).size;

  // Weekly grid: for each time slot, find the course on each day
  const getSlotCourse = (day: number, startTime: string) =>
    student.schedule.find(s => s.day === day && s.startTime === startTime);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', pt: 5, pb: 4, px: 3 }}>
        <Box className="flex items-center gap-2 mb-1">
          <CalendarMonth sx={{ color: '#60a5fa', fontSize: 22 }} />
          <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '20px' }}>
            Mi Horario
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
          {student.career} • {student.semester}° Semestre
        </Typography>
        <Box className="flex gap-3 mt-3">
          <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, px: 2, py: 1 }}>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>{totalClassesWeek}</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>sesiones/sem</Typography>
          </Box>
          <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, px: 2, py: 1 }}>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>{uniqueDays}</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>días/sem</Typography>
          </Box>
          <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, px: 2, py: 1 }}>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>8:20</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>inicio</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: 2, pt: 3 }}>
        {/* Weekly overview grid */}
        <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#475569', mb: 2 }}>
          VISTA SEMANAL
        </Typography>

        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', mb: 4, overflow: 'hidden' }}>
          {/* Day headers */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '52px repeat(6, 1fr)', borderBottom: '1px solid #e2e8f0' }}>
            <Box sx={{ p: 1, backgroundColor: '#f8fafc' }} />
            {DAYS.map((day, i) => (
              <Box
                key={day}
                onClick={() => setSelectedDay(i)}
                sx={{
                  p: 0.75, textAlign: 'center', cursor: 'pointer',
                  backgroundColor: selectedDay === i ? '#eff6ff' : '#f8fafc',
                  borderLeft: '1px solid #e2e8f0',
                  transition: 'background 0.15s',
                }}
              >
                <Typography sx={{
                  fontSize: '10px', fontWeight: 700,
                  color: selectedDay === i ? '#2563eb' : '#94a3b8',
                }}>
                  {day.slice(0, 3).toUpperCase()}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Time slots */}
          {TIME_BLOCKS.map(block => (
            <Box
              key={block.slot}
              sx={{ display: 'grid', gridTemplateColumns: '52px repeat(6, 1fr)', borderBottom: '1px solid #f1f5f9' }}
            >
              {/* Time label */}
              <Box sx={{ p: 1, backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700 }}>{block.start}</Typography>
                <Typography sx={{ fontSize: '8px', color: '#cbd5e1' }}>–</Typography>
                <Typography sx={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700 }}>{block.end}</Typography>
              </Box>

              {/* Course cells */}
              {DAYS.map((_, dayIdx) => {
                const course = getSlotCourse(dayIdx, block.start);
                return (
                  <Box
                    key={dayIdx}
                    onClick={() => setSelectedDay(dayIdx)}
                    sx={{
                      borderLeft: '1px solid #e2e8f0',
                      p: 0.5,
                      minHeight: 48,
                      cursor: 'pointer',
                      backgroundColor: selectedDay === dayIdx ? 'rgba(239,246,255,0.5)' : 'white',
                    }}
                  >
                    {course && (
                      <Box
                        sx={{
                          height: '100%',
                          minHeight: 40,
                          borderRadius: 1,
                          backgroundColor: `${COURSE_COLORS[course.colorIndex]}18`,
                          borderLeft: `3px solid ${COURSE_COLORS[course.colorIndex]}`,
                          p: 0.5,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Typography sx={{
                          fontSize: '9px', fontWeight: 700,
                          color: COURSE_COLORS[course.colorIndex],
                          lineHeight: 1.2,
                        }}>
                          {course.shortName}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          ))}

          {/* Break indicator */}
          <Box sx={{ px: 2, py: 1, backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>
              Recreo: 10:00–10:20 · Almuerzo: 12:00–12:20
            </Typography>
          </Box>
        </Card>

        {/* Day detail */}
        <Box className="flex items-center justify-between mb-3">
          <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#475569' }}>
            {DAYS[selectedDay].toUpperCase()}
          </Typography>
          <Chip
            label={`${daySchedule.length} clase${daySchedule.length !== 1 ? 's' : ''}`}
            size="small"
            sx={{ backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: 700, fontSize: '11px' }}
          />
        </Box>

        {daySchedule.length === 0 ? (
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                No hay clases programadas para {DAYS[selectedDay]}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box className="space-y-3">
            {daySchedule.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.07 }}
              >
                <Card sx={{ borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                  <Box sx={{ display: 'flex' }}>
                    {/* Color strip */}
                    <Box sx={{ width: 5, backgroundColor: COURSE_COLORS[item.colorIndex], flexShrink: 0 }} />
                    <CardContent sx={{ p: 2.5, flex: 1, '&:last-child': { pb: 2.5 } }}>
                      <Box className="flex items-start justify-between gap-2 mb-2">
                        <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', lineHeight: 1.3 }}>
                          {item.courseName}
                        </Typography>
                        {item.mandatory && (
                          <Chip
                            label="Obligatorio"
                            size="small"
                            sx={{ backgroundColor: '#fef3c7', color: '#d97706', fontWeight: 700, fontSize: '10px', height: 20, flexShrink: 0 }}
                          />
                        )}
                      </Box>

                      <Box
                        sx={{
                          display: 'inline-flex', alignItems: 'center', gap: 1,
                          backgroundColor: `${COURSE_COLORS[item.colorIndex]}12`,
                          borderRadius: 1.5, px: 1.5, py: 0.5, mb: 2,
                        }}
                      >
                        <Typography sx={{ fontSize: '13px', fontWeight: 800, color: COURSE_COLORS[item.colorIndex] }}>
                          {item.startTime}
                        </Typography>
                        <Typography sx={{ color: '#94a3b8', fontSize: '12px' }}>→</Typography>
                        <Typography sx={{ fontSize: '13px', fontWeight: 800, color: COURSE_COLORS[item.colorIndex] }}>
                          {item.endTime}
                        </Typography>
                      </Box>

                      <Box className="space-y-1">
                        <Box className="flex items-center gap-1.5">
                          <Room sx={{ fontSize: 14, color: '#94a3b8' }} />
                          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                            {item.room}
                          </Typography>
                        </Box>
                        <Box className="flex items-center gap-1.5">
                          <Person sx={{ fontSize: 14, color: '#94a3b8' }} />
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            {item.teacher}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid #f1f5f9' }}>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                          {item.credits} crédito{item.credits !== 1 ? 's' : ''}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
