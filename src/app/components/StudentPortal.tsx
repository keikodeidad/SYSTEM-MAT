import { useState } from 'react';
import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, CalendarMonth, MenuBook, AccountBalance, Person } from '@mui/icons-material';
import { StudentAccount } from '../data/studentData';
import { StudentHome } from './StudentHome';
import { StudentSchedule } from './StudentSchedule';
import { StudentCourses } from './StudentCourses';
import { StudentBalance } from './StudentBalance';
import { StudentProfile } from './StudentProfile';

type Tab = 'home' | 'schedule' | 'courses' | 'balance' | 'profile';

interface StudentPortalProps {
  student: StudentAccount;
  onLogout: () => void;
}

const tabs: { value: Tab; label: string; icon: React.ReactNode }[] = [
  { value: 'home', label: 'Inicio', icon: <Home /> },
  { value: 'schedule', label: 'Horario', icon: <CalendarMonth /> },
  { value: 'courses', label: 'Cursos', icon: <MenuBook /> },
  { value: 'balance', label: 'Pagos', icon: <AccountBalance /> },
  { value: 'profile', label: 'Perfil', icon: <Person /> },
];

export function StudentPortal({ student, onLogout }: StudentPortalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Main content — padded bottom for nav bar */}
      <Box className="flex-1 overflow-y-auto" sx={{ pb: '72px' }}>
        {activeTab === 'home' && (
          <StudentHome
            student={student}
            onNavigate={(tab: Tab) => setActiveTab(tab)}
            onLogout={onLogout}
          />
        )}
        {activeTab === 'schedule' && <StudentSchedule student={student} />}
        {activeTab === 'courses' && <StudentCourses student={student} />}
        {activeTab === 'balance' && <StudentBalance student={student} />}
        {activeTab === 'profile' && <StudentProfile student={student} onLogout={onLogout} />}
      </Box>

      {/* Bottom Navigation */}
      <Paper
        elevation={0}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid #e2e8f0',
          zIndex: 100,
        }}
      >
        <BottomNavigation
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{
            backgroundColor: 'white',
            height: 64,
            '& .MuiBottomNavigationAction-root': {
              color: '#94a3b8',
              minWidth: 0,
              '&.Mui-selected': {
                color: '#2563eb',
              },
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '10px',
              fontWeight: 600,
            },
          }}
        >
          {tabs.map(tab => (
            <BottomNavigationAction
              key={tab.value}
              value={tab.value}
              label={tab.label}
              icon={tab.icon}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
