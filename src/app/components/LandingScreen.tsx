import { Box, Typography, Button, Chip } from '@mui/material';
import { AdminPanelSettings, School, ArrowForward } from '@mui/icons-material';
import { motion } from 'motion/react';

interface LandingScreenProps {
  onAdminAccess: () => void;
  onStudentAccess: () => void;
}

export function LandingScreen({ onAdminAccess, onStudentAccess }: LandingScreenProps) {
  return (
    <Box
      className="min-h-screen flex flex-col"
      sx={{
        background: 'linear-gradient(160deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)',
      }}
    >
      {/* Top decoration */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <Box sx={{
          position: 'absolute', top: -120, right: -120,
          width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(99,102,241,0.15)',
        }} />
        <Box sx={{
          position: 'absolute', bottom: -80, left: -80,
          width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(16,185,129,0.1)',
        }} />
      </Box>

      <Box className="flex flex-col items-center justify-center flex-1 px-6 py-12 relative z-10">
        {/* Logo / Institute Name */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <Box
            sx={{
              width: 80, height: 80, borderRadius: 4,
              background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mx: 'auto', mb: 3,
              boxShadow: '0 12px 40px rgba(96,165,250,0.4)',
            }}
          >
            <School sx={{ fontSize: 44, color: 'white' }} />
          </Box>

          <Typography
            variant="h4"
            sx={{ color: 'white', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.2 }}
          >
            Instituto Técnico
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: '#93c5fd', fontWeight: 600, mb: 1.5 }}
          >
            Superior
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', letterSpacing: '0.05em' }}>
            SISTEMA DE GESTIÓN ACADÉMICA
          </Typography>
        </motion.div>

        {/* Access Cards */}
        <Box className="w-full max-w-sm space-y-4">
          {/* Student Portal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Box
              onClick={onStudentAccess}
              sx={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 3,
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.10))',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                },
              }}
            >
              <Box className="flex items-center justify-between">
                <Box className="flex items-center gap-3">
                  <Box
                    sx={{
                      width: 48, height: 48, borderRadius: 2.5,
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(16,185,129,0.4)',
                    }}
                  >
                    <School sx={{ color: 'white', fontSize: 26 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>
                      Portal del Estudiante
                    </Typography>
                    <Typography sx={{ color: '#94a3b8', fontSize: '12px' }}>
                      Accede con tu DNI
                    </Typography>
                  </Box>
                </Box>
                <ArrowForward sx={{ color: '#60a5fa', fontSize: 20 }} />
              </Box>
            </Box>
          </motion.div>

          {/* Admin Portal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <Box
              onClick={onAdminAccess}
              sx={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 3,
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                },
              }}
            >
              <Box className="flex items-center justify-between">
                <Box className="flex items-center gap-3">
                  <Box
                    sx={{
                      width: 48, height: 48, borderRadius: 2.5,
                      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                    }}
                  >
                    <AdminPanelSettings sx={{ color: 'white', fontSize: 26 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>
                      Acceso Administrativo
                    </Typography>
                    <Typography sx={{ color: '#94a3b8', fontSize: '12px' }}>
                      Personal del instituto
                    </Typography>
                  </Box>
                </Box>
                <ArrowForward sx={{ color: '#a5b4fc', fontSize: 20 }} />
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* Demo credentials hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1.5 }}>
            DNIs de demostración
          </Typography>
          <Box className="flex gap-2 justify-center flex-wrap">
            {['73456891', '41238765', '68123490'].map(dni => (
              <Chip
                key={dni}
                label={dni}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#94a3b8',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </Box>
          <Typography variant="caption" sx={{ color: '#475569', display: 'block', mt: 1 }}>
            La contraseña es el mismo DNI
          </Typography>
        </motion.div>
      </Box>

      {/* Footer */}
      <Box className="text-center pb-6 relative z-10">
        <Typography variant="caption" sx={{ color: '#334155' }}>
          Sistema integrado con API RENIEC — SUNAT © 2026
        </Typography>
      </Box>
    </Box>
  );
}
