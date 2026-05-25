import { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import { motion } from 'motion/react';

interface AdminLoginProps {
  onLogin: (username: string, password: string) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card
          className="shadow-xl"
          sx={{
            borderRadius: 3,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
          }}
        >
          <CardContent className="p-8">
            <Box className="text-center mb-8">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.3)'
                }}
              >
                <AdminPanelSettings sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h4" component="h1" className="mb-2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Sistema de Cobros
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Portal Administrativo - Instituto
              </Typography>
            </Box>

            <form onSubmit={handleSubmit} className="space-y-6">
              <TextField
                fullWidth
                label="Usuario Administrativo"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'white',
                  }
                }}
              />

              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'white',
                  }
                }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                size="large"
                sx={{
                  borderRadius: 2,
                  padding: '12px',
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(15, 23, 42, 0.4)',
                  }
                }}
              >
                Ingresar al Sistema
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
