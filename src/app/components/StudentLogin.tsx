import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, InputAdornment, IconButton, Chip } from '@mui/material';
import { ArrowBack, Visibility, VisibilityOff, Badge, Lock, Fingerprint } from '@mui/icons-material';
import { motion } from 'motion/react';
import { authenticateStudent, StudentAccount } from '../data/studentData';

interface StudentLoginProps {
  onBack: () => void;
  onLoginSuccess: (student: StudentAccount) => void;
}

export function StudentLogin({ onBack, onLoginSuccess }: StudentLoginProps) {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDniChange = (value: string) => {
    if (/^\d{0,8}$/.test(value)) {
      setDni(value);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dni.length !== 8) {
      setError('El DNI debe tener exactamente 8 dígitos.');
      return;
    }

    setLoading(true);
    // Simulate API call delay (future: RENIEC validation)
    await new Promise(r => setTimeout(r, 800));

    const student = authenticateStudent(dni, password);
    setLoading(false);

    if (student) {
      onLoginSuccess(student);
    } else {
      setError('DNI o contraseña incorrectos. Recuerda que tu contraseña es tu número de DNI.');
    }
  };

  const fillDemo = (demoDni: string) => {
    setDni(demoDni);
    setPassword(demoDni);
    setError('');
  };

  return (
    <Box
      className="min-h-screen flex flex-col"
      sx={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%)' }}
    >
      {/* Back button */}
      <Box className="p-4 pt-6">
        <Button
          onClick={onBack}
          startIcon={<ArrowBack />}
          sx={{ color: '#94a3b8', textTransform: 'none', fontWeight: 500 }}
        >
          Volver
        </Button>
      </Box>

      <Box className="flex-1 flex flex-col justify-center px-6 pb-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Box
            sx={{
              width: 72, height: 72, borderRadius: 3.5,
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mx: 'auto', mb: 3,
              boxShadow: '0 8px 32px rgba(16,185,129,0.4)',
            }}
          >
            <Fingerprint sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 800, mb: 0.5 }}>
            Portal del Estudiante
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            Ingresa con tu número de DNI
          </Typography>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 4,
              p: 3,
            }}
          >
            {/* DNI field */}
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block', mb: 1 }}>
                NÚMERO DE DNI
              </Typography>
              <TextField
                fullWidth
                placeholder="Ej: 73456891"
                value={dni}
                onChange={(e) => handleDniChange(e.target.value)}
                inputProps={{ maxLength: 8, inputMode: 'numeric' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Badge sx={{ color: '#60a5fa' }} />
                    </InputAdornment>
                  ),
                  endAdornment: dni.length > 0 && (
                    <InputAdornment position="end">
                      <Typography variant="caption" sx={{ color: dni.length === 8 ? '#10b981' : '#94a3b8' }}>
                        {dni.length}/8
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontFamily: 'monospace',
                    fontSize: '18px',
                    letterSpacing: '0.15em',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                  },
                  '& .MuiInputBase-input::placeholder': { color: '#475569', opacity: 1 },
                }}
              />
            </Box>

            {/* Password field */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block', mb: 1 }}>
                CONTRASEÑA
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Tu contraseña es tu DNI"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#60a5fa' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(p => !p)} edge="end" sx={{ color: '#64748b' }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                  },
                  '& .MuiInputBase-input::placeholder': { color: '#475569', opacity: 1 },
                }}
              />
              <Typography variant="caption" sx={{ color: '#475569', mt: 0.5, display: 'block' }}>
                Por defecto, tu contraseña es tu mismo número de DNI
              </Typography>
            </Box>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2, fontSize: '13px' }}>
                  {error}
                </Alert>
              </motion.div>
            )}

            {/* Submit */}
            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              disabled={loading || dni.length !== 8 || !password}
              sx={{
                borderRadius: 2.5,
                py: 1.75,
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 700,
                background: loading ? '#334155' : 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 4px 16px rgba(16,185,129,0.35)',
                '&:hover': { boxShadow: '0 6px 20px rgba(16,185,129,0.5)' },
                '&:disabled': { background: '#1e293b', color: '#475569' },
              }}
            >
              {loading ? 'Verificando identidad...' : 'Ingresar al Portal'}
            </Button>
          </Box>
        </motion.div>

        {/* RENIEC notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          <Box
            sx={{
              background: 'rgba(251,191,36,0.08)',
              border: '1px solid rgba(251,191,36,0.2)',
              borderRadius: 2.5,
              p: 2,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
            }}
          >
            <Box sx={{
              width: 8, height: 8, borderRadius: '50%',
              backgroundColor: '#fbbf24', mt: 0.5, flexShrink: 0,
            }} />
            <Box>
              <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 700, display: 'block' }}>
                Integración con RENIEC — En implementación
              </Typography>
              <Typography variant="caption" sx={{ color: '#78716c' }}>
                Próximamente la verificación de identidad se realizará directamente con la API de RENIEC del Perú para validar tu DNI en tiempo real.
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Demo quick access */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <Typography variant="caption" sx={{ color: '#475569', display: 'block', mb: 1.5 }}>
            Acceso rápido de demostración
          </Typography>
          <Box className="flex gap-2 justify-center flex-wrap">
            {[
              { dni: '73456891', label: 'Juan C. (Electrónica)' },
              { dni: '41238765', label: 'María E. (Agropecuaria)' },
              { dni: '68123490', label: 'Carlos A. (Mecánica)' },
            ].map(item => (
              <Chip
                key={item.dni}
                label={item.label}
                size="small"
                onClick={() => fillDemo(item.dni)}
                sx={{
                  backgroundColor: 'rgba(59,130,246,0.15)',
                  color: '#93c5fd',
                  border: '1px solid rgba(59,130,246,0.3)',
                  cursor: 'pointer',
                  fontSize: '11px',
                  '&:hover': { backgroundColor: 'rgba(59,130,246,0.25)' },
                }}
              />
            ))}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
