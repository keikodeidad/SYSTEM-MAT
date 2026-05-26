import { Box, Typography, Card, CardContent, Chip, Avatar, Button, Divider } from '@mui/material';
import {
  AccountBalance, CalendarMonth, MenuBook, Warning,
  CheckCircle, Notifications, ArrowForward, LogoutOutlined,
} from '@mui/icons-material';
import { motion } from 'motion/react';
import { StudentAccount, COURSE_COLORS, DAYS } from '../data/studentData';

interface StudentHomeProps {
  student: StudentAccount;
  onNavigate: (tab: 'home' | 'schedule' | 'courses' | 'balance' | 'profile') => void;
  onLogout: () => void;
}

export function StudentHome({ student, onNavigate, onLogout }: StudentHomeProps) {
  const today = new Date().getDay(); // 0=Sun,1=Mon...6=Sat
  // Map JS day (Sun=0) to our day index (Mon=0...Sat=5)
  const todayIndex = today === 0 ? -1 : today - 1; // -1 = Sunday (no class)
  const todaySchedule = student.schedule.filter(s => s.day === todayIndex);
  const todayName = todayIndex >= 0 && todayIndex < 6 ? DAYS[todayIndex] : 'Domingo';
  const hasDebt = student.balance < 0;
  const overdueCount = student.payments.filter(p => p.status === 'overdue').length;
  const totalCredits = student.courses.reduce((s, c) => s + c.credits, 0);

  const initials = student.firstName
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('');

  return (
    <Box sx={{ pb: 2 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          pt: 5, pb: 6, px: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <Box sx={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <Box className="flex items-center justify-between relative z-10">
          <Box className="flex items-center gap-3">
            <Avatar
              sx={{
                width: 52, height: 52,
                background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                fontWeight: 800, fontSize: '18px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              {initials}
            </Avatar>
            <Box>
              <Typography variant="caption" sx={{ color: '#93c5fd', fontWeight: 600 }}>
                Bienvenido/a
              </Typography>
              <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '16px', lineHeight: 1.2 }}>
                {student.firstName}
              </Typography>
              <Typography variant="caption" sx={{ color: '#bfdbfe' }}>
                DNI {student.dni}
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={onLogout}
            sx={{ color: '#93c5fd', minWidth: 0, p: 1 }}
          >
            <LogoutOutlined />
          </Button>
        </Box>

        <Box className="flex gap-2 mt-3 relative z-10 flex-wrap">
          <Chip
            label={student.career}
            size="small"
            sx={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '11px' }}
          />
          <Chip
            label={`${student.semester}° Semestre`}
            size="small"
            sx={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '11px' }}
          />
        </Box>
      </Box>

      <Box sx={{ px: 2, mt: -3 }}>
        {/* Quick stats */}
        <Box className="grid grid-cols-3 gap-2 mb-4">
          {[
            {
              label: 'Saldo', value: hasDebt ? `-S/ ${Math.abs(student.balance).toLocaleString()}` : 'Al día',
              color: hasDebt ? '#ef4444' : '#10b981', bg: hasDebt ? '#fee2e2' : '#dcfce7',
              icon: <AccountBalance sx={{ fontSize: 18 }} />, onClick: () => onNavigate('balance'),
            },
            {
              label: 'Cursos', value: `${student.courses.length}`,
              color: '#3b82f6', bg: '#dbeafe',
              icon: <MenuBook sx={{ fontSize: 18 }} />, onClick: () => onNavigate('courses'),
            },
            {
              label: 'Créditos', value: `${totalCredits}`,
              color: '#8b5cf6', bg: '#ede9fe',
              icon: <CheckCircle sx={{ fontSize: 18 }} />, onClick: () => {},
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                onClick={stat.onClick}
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
                  transition: 'all 0.2s',
                }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ color: stat.color, mb: 0.5 }}>{stat.icon}</Box>
                  <Typography sx={{ fontWeight: 800, color: stat.color, fontSize: '16px', lineHeight: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>

        {/* Debt alert */}
        {hasDebt && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card
              onClick={() => onNavigate('balance')}
              sx={{
                borderRadius: 3, mb: 3,
                background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                border: '1px solid #fecaca',
                boxShadow: '0 4px 16px rgba(239,68,68,0.15)',
                cursor: 'pointer',
              }}
            >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-2">
                    <Warning sx={{ color: '#ef4444', fontSize: 22 }} />
                    <Box>
                      <Typography sx={{ color: '#b91c1c', fontWeight: 700, fontSize: '14px' }}>
                        {overdueCount} pago{overdueCount !== 1 ? 's' : ''} vencido{overdueCount !== 1 ? 's' : ''}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#dc2626' }}>
                        Total adeudado: S/ {Math.abs(student.balance).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowForward sx={{ color: '#ef4444', fontSize: 18 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Today's schedule */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent sx={{ p: 0 }}>
              <Box
                className="flex items-center justify-between px-3 py-2.5 cursor-pointer"
                onClick={() => onNavigate('schedule')}
              >
                <Box className="flex items-center gap-2">
                  <CalendarMonth sx={{ color: '#2563eb', fontSize: 20 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: '15px' }}>
                    Hoy — {todayName}
                  </Typography>
                </Box>
                <ArrowForward sx={{ color: '#94a3b8', fontSize: 16 }} />
              </Box>
              <Divider />
              {todaySchedule.length === 0 ? (
                <Box sx={{ px: 3, py: 2.5 }}>
                  <Typography variant="body2" sx={{ color: '#94a3b8', textAlign: 'center' }}>
                    {todayIndex === -1 ? 'Hoy es domingo — no hay clases' : 'No tienes clases programadas para hoy'}
                  </Typography>
                </Box>
              ) : (
                todaySchedule.map((item, idx) => (
                  <Box key={idx}>
                    <Box sx={{ px: 3, py: 2, display: 'flex', gap: 2.5, alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 4, height: 40, borderRadius: 2, flexShrink: 0,
                          backgroundColor: COURSE_COLORS[item.colorIndex],
                        }}
                      />
                      <Box className="flex-1 min-w-0">
                        <Typography sx={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }} noWrap>
                          {item.courseName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          {item.startTime} – {item.endTime} • {item.room}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8', flexShrink: 0 }}>
                        {item.credits} cr
                      </Typography>
                    </Box>
                    {idx < todaySchedule.length - 1 && <Divider sx={{ mx: 3 }} />}
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Announcements */}
        {student.announcements.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Box className="flex items-center gap-2 mb-2">
              <Notifications sx={{ color: '#64748b', fontSize: 18 }} />
              <Typography sx={{ fontWeight: 700, color: '#334155', fontSize: '14px' }}>
                Avisos
              </Typography>
            </Box>
            <Box className="space-y-2">
              {student.announcements.map(ann => {
                const colors = {
                  info: { bg: '#eff6ff', border: '#bfdbfe', icon: '#3b82f6', text: '#1e40af' },
                  warning: { bg: '#fffbeb', border: '#fde68a', icon: '#f59e0b', text: '#92400e' },
                  payment: { bg: '#fef2f2', border: '#fecaca', icon: '#ef4444', text: '#b91c1c' },
                };
                const c = colors[ann.type];
                return (
                  <Card key={ann.id} sx={{ borderRadius: 2.5, border: `1px solid ${c.border}`, backgroundColor: c.bg, boxShadow: 'none' }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '13px', color: c.text, mb: 0.5 }}>
                        {ann.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: c.text, opacity: 0.8, lineHeight: 1.4, display: 'block' }}>
                        {ann.body}
                      </Typography>
                      <Typography variant="caption" sx={{ color: c.icon, fontWeight: 600, mt: 0.5, display: 'block' }}>
                        {ann.date}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </motion.div>
        )}
      </Box>
    </Box>
  );
}
