import { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, TextField, List, ListItem, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ArrowBack, Edit, Add, Settings } from '@mui/icons-material';
import { motion } from 'motion/react';

interface Fee {
  id: string;
  concept: string;
  amount: number;
  description: string;
}

interface FeesConfigurationProps {
  onBack: () => void;
}

const initialFees: Fee[] = [
  { id: '1', concept: 'Mensualidad', amount: 2500, description: 'Pago mensual regular' },
  { id: '2', concept: 'Matrícula', amount: 5000, description: 'Inscripción semestral' },
  { id: '3', concept: 'Reinscripción', amount: 2000, description: 'Renovación de matrícula' },
  { id: '4', concept: 'Examen Extraordinario', amount: 1500, description: 'Examen fuera de calendario' },
  { id: '5', concept: 'Certificado', amount: 500, description: 'Emisión de certificado' },
  { id: '6', concept: 'Constancia', amount: 300, description: 'Emisión de constancia' },
  { id: '7', concept: 'Credencial', amount: 200, description: 'Emisión o reposición de credencial' },
];

export function FeesConfiguration({ onBack }: FeesConfigurationProps) {
  const [fees, setFees] = useState<Fee[]>(initialFees);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<Fee | null>(null);
  const [formData, setFormData] = useState({ concept: '', amount: '', description: '' });

  const handleOpenDialog = (fee?: Fee) => {
    if (fee) {
      setEditingFee(fee);
      setFormData({ concept: fee.concept, amount: fee.amount.toString(), description: fee.description });
    } else {
      setEditingFee(null);
      setFormData({ concept: '', amount: '', description: '' });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingFee(null);
    setFormData({ concept: '', amount: '', description: '' });
  };

  const handleSave = () => {
    if (editingFee) {
      // Update existing fee
      setFees(fees.map(f => f.id === editingFee.id ? {
        ...f,
        concept: formData.concept,
        amount: parseFloat(formData.amount),
        description: formData.description
      } : f));
    } else {
      // Add new fee
      const newFee: Fee = {
        id: Date.now().toString(),
        concept: formData.concept,
        amount: parseFloat(formData.amount),
        description: formData.description
      };
      setFees([...fees, newFee]);
    }
    handleCloseDialog();
  };

  const isValid = formData.concept && formData.amount && parseFloat(formData.amount) > 0;

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <Box className="flex items-center justify-between mb-6 pt-4">
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
          <Button
            onClick={() => handleOpenDialog()}
            startIcon={<Add />}
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            }}
          >
            Nuevo
          </Button>
        </Box>

        <Box className="flex items-center gap-2 mb-4">
          <Settings sx={{ fontSize: 28, color: '#0f172a' }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Configuración de Tarifas
          </Typography>
        </Box>

        {/* Fees List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent className="p-0">
              <List>
                {fees.map((fee, index) => (
                  <div key={fee.id}>
                    <ListItem
                      sx={{ py: 2, px: 3 }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => handleOpenDialog(fee)}
                          sx={{ color: '#3b82f6' }}
                        >
                          <Edit />
                        </IconButton>
                      }
                    >
                      <Box className="flex-1">
                        <Box className="flex justify-between items-start mb-1">
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {fee.concept}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {fee.description}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981', mt: 1 }}>
                          ${fee.amount.toFixed(2)}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < fees.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit/Add Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ fontWeight: 700 }}>
            {editingFee ? 'Editar Tarifa' : 'Nueva Tarifa'}
          </DialogTitle>
          <DialogContent className="space-y-4">
            <TextField
              fullWidth
              label="Concepto"
              value={formData.concept}
              onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              fullWidth
              label="Monto"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              inputProps={{ min: 0, step: 0.01 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              fullWidth
              label="Descripción"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={2}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={handleCloseDialog}
              sx={{ textTransform: 'none', color: '#64748b' }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              disabled={!isValid}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              }}
            >
              {editingFee ? 'Guardar' : 'Crear'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Box>
  );
}
