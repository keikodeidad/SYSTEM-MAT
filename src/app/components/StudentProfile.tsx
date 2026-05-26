import { Box, Typography, Card, CardContent, Chip, Avatar, Divider, Button } from '@mui/material';
import {
  Person, Badge, Email, Phone, Home, School, CalendarMonth,
  Verified, ErrorOutline, LogoutOutlined, Fingerprint,
} from '@mui/icons-material';
import { motion } from 'motion/react';
import { StudentAccount } from '../data/studentData';

interface StudentProfileProps {
  student: StudentAccount;
  onLogout: () => void;
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, py: 1.5 }}>
      <Box sx={{ color: '#94a3b8', mt: 0.1, flexShrink: 0 }}>{icon}</Box>
      <Box className="flex-1">
        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block' }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

export function StudentProfile({ student, onLogout }: StudentProfileProps) {
  const initials = student.firstName.split(' ').map(w => w[0]).slice(0, 2).join('');

  return (
    <Box>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #1e3a8a, #4f46e5)', pt: 5, pb: 7, px: 3, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
          <Avatar
            sx={{
              width: 80, height: 80, mx: 'auto', mb: 2,
              background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
              fontWeight: 900, fontSize: '28px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            {initials}
          </Avatar>
        </motion.div>

        <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '20px', mb: 0.5 }}>
          {student.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#bfdbfe', mb: 2 }}>
          DNI {student.dni}
        </Typography>
        <Box className="flex justify-center gap-2 flex-wrap">
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
          <Chip
            label={student.status === 'active' ? 'Activo' : 'Inactivo'}
            size="small"
            sx={{
              backgroundColor: student.status === 'active' ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)',
              color: student.status === 'active' ? '#6ee7b7' : '#fca5a5',
              fontWeight: 700, fontSize: '11px',
            }}
          />
        </Box>
      </Box>

      <Box sx={{ px: 2, mt: -3 }}>
        {/* RENIEC verification card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card
            sx={{
              borderRadius: 3, mb: 3,
              background: student.reniecVerified
                ? 'linear-gradient(135deg, #ecfdf5, #d1fae5)'
                : 'linear-gradient(135deg, #fffbeb, #fef3c7)',
              border: student.reniecVerified ? '1px solid #6ee7b7' : '1px solid #fde68a',
              boxShadow: student.reniecVerified
                ? '0 4px 16px rgba(16,185,129,0.15)'
                : '0 4px 16px rgba(251,191,36,0.15)',
            }}
          >
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Box className="flex items-center gap-2 mb-2">
                <Fingerprint sx={{ color: student.reniecVerified ? '#10b981' : '#d97706', fontSize: 22 }} />
                <Typography sx={{ fontWeight: 800, fontSize: '14px', color: student.reniecVerified ? '#065f46' : '#78350f' }}>
                  Verificación RENIEC
                </Typography>
                {student.reniecVerified ? (
                  <Verified sx={{ color: '#10b981', fontSize: 18, ml: 'auto' }} />
                ) : (
                  <ErrorOutline sx={{ color: '#d97706', fontSize: 18, ml: 'auto' }} />
                )}
              </Box>

              {student.reniecVerified && student.reniecData ? (
                <Box>
                  <Typography variant="caption" sx={{ color: '#065f46', display: 'block', mb: 1.5 }}>
                    Identidad verificada con Registro Nacional de Identificación y Estado Civil
                  </Typography>
                  <Box sx={{ backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 2, p: 1.5 }}>
                    <Box className="grid grid-cols-2 gap-y-1">
                      {[
                        ['Nombres', student.reniecData.nombres],
                        ['Ap. Paterno', student.reniecData.apellidoPaterno],
                        ['Ap. Materno', student.reniecData.apellidoMaterno],
                        ['Nacimiento', student.reniecData.fechaNacimiento],
                        ['Departamento', student.reniecData.departamento],
                        ['Distrito', student.reniecData.distrito],
                      ].map(([lbl, val]) => (
                        <Box key={lbl}>
                          <Typography sx={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700 }}>{lbl}</Typography>
                          <Typography sx={{ fontSize: '11px', color: '#0f172a', fontWeight: 600 }}>{val}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <Typography sx={{ fontSize: '9px', color: '#94a3b8' }}>
                        UBIGEO: {student.reniecData.ubigeo} · Fuente: API RENIEC (simulado)
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography variant="caption" sx={{ color: '#92400e', display: 'block', mb: 1.5, lineHeight: 1.5 }}>
                    Tu identidad no ha sido verificada. Presenta tu DNI original en Secretaría para completar el proceso.
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(251,191,36,0.15)', borderRadius: 1.5,
                      px: 1.5, py: 1, border: '1px dashed #fcd34d',
                    }}
                  >
                    <Typography sx={{ fontSize: '10px', color: '#78350f', fontWeight: 600 }}>
                      Integración con API RENIEC del Perú — En desarrollo
                    </Typography>
                    <Typography sx={{ fontSize: '10px', color: '#92400e', mt: 0.25 }}>
                      Próximamente la verificación será automática en tiempo real
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Personal info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent sx={{ p: 2.5, pb: '20px !important' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#64748b', mb: 1, letterSpacing: '0.05em' }}>
                DATOS PERSONALES
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <InfoRow icon={<Person sx={{ fontSize: 18 }} />} label="Nombre completo" value={student.name} />
              <Divider />
              <InfoRow icon={<Badge sx={{ fontSize: 18 }} />} label="DNI" value={student.dni} />
              <Divider />
              <InfoRow icon={<CalendarMonth sx={{ fontSize: 18 }} />} label="Fecha de nacimiento" value={student.birthDate} />
              <Divider />
              <InfoRow icon={<Email sx={{ fontSize: 18 }} />} label="Correo institucional" value={student.email} />
              <Divider />
              <InfoRow icon={<Phone sx={{ fontSize: 18 }} />} label="Teléfono" value={student.phone} />
              <Divider />
              <InfoRow icon={<Home sx={{ fontSize: 18 }} />} label="Dirección" value={student.address} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Academic info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent sx={{ p: 2.5, pb: '20px !important' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#64748b', mb: 1, letterSpacing: '0.05em' }}>
                DATOS ACADÉMICOS
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <InfoRow icon={<School sx={{ fontSize: 18 }} />} label="Carrera / Especialidad" value={student.career} />
              <Divider />
              <InfoRow icon={<School sx={{ fontSize: 18 }} />} label="Semestre actual" value={`${student.semester}° Semestre`} />
              <Divider />
              <InfoRow icon={<CalendarMonth sx={{ fontSize: 18 }} />} label="Fecha de matrícula" value={student.enrollmentDate} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<LogoutOutlined />}
            onClick={onLogout}
            sx={{
              borderRadius: 3, py: 1.75, mb: 4,
              textTransform: 'none', fontWeight: 700, fontSize: '15px',
              borderColor: '#e2e8f0', color: '#64748b',
              '&:hover': { borderColor: '#ef4444', color: '#ef4444', backgroundColor: '#fef2f2' },
            }}
          >
            Cerrar sesión
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}
