import { useState } from 'react';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { SearchStudent } from './components/SearchStudent';
import { StudentAccount as StudentAccountScreen } from './components/StudentAccount';
import { RegisterPayment, PaymentData } from './components/RegisterPayment';
import { PaymentReceipt } from './components/PaymentReceipt';
import { CashRegister } from './components/CashRegister';
import { SemesterList } from './components/SemesterList';
import { DebtorsList } from './components/DebtorsList';
import { ReportsScreen } from './components/ReportsScreen';
import { FeesConfiguration } from './components/FeesConfiguration';
// Student portal
import { LandingScreen } from './components/LandingScreen';
import { StudentLogin } from './components/StudentLogin';
import { StudentPortal } from './components/StudentPortal';
import { StudentAccount as StudentAccountData } from './data/studentData';

type Screen =
  | 'landing'
  | 'adminLogin'
  | 'dashboard'
  | 'search'
  | 'studentAccount'
  | 'registerPayment'
  | 'receipt'
  | 'cashRegister'
  | 'semesters'
  | 'debtors'
  | 'reports'
  | 'fees'
  | 'studentLogin'
  | 'studentPortal';

interface AdminStudent {
  id: string;
  name: string;
  career: string;
  balance: number;
  status: 'active' | 'inactive';
}

interface Transaction {
  id: string;
  time: string;
  studentName: string;
  studentId: string;
  concept: string;
  amount: number;
  paymentMethod: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [adminName, setAdminName] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<AdminStudent | null>(null);
  const [currentPayment, setCurrentPayment] = useState<PaymentData | null>(null);
  const [receiptNumber, setReceiptNumber] = useState('');
  const [receiptTimestamp, setReceiptTimestamp] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dailyTotal, setDailyTotal] = useState(0);
  // Student portal
  const [loggedStudent, setLoggedStudent] = useState<StudentAccountData | null>(null);

  // ── Landing ──────────────────────────────────────────────────────────────
  const handleGoToAdminLogin = () => setCurrentScreen('adminLogin');
  const handleGoToStudentLogin = () => setCurrentScreen('studentLogin');

  // ── Admin auth ────────────────────────────────────────────────────────────
  const handleLogin = (username: string, password: string) => {
    if (username && password) {
      setAdminName(username);
      setCurrentScreen('dashboard');
    }
  };

  const handleLogout = () => {
    setAdminName('');
    setSelectedStudent(null);
    setCurrentScreen('landing');
  };

  // ── Student auth ──────────────────────────────────────────────────────────
  const handleStudentLoginSuccess = (student: StudentAccountData) => {
    setLoggedStudent(student);
    setCurrentScreen('studentPortal');
  };

  const handleStudentLogout = () => {
    setLoggedStudent(null);
    setCurrentScreen('landing');
  };

  // ── Admin navigation ──────────────────────────────────────────────────────
  const handleSearchStudent = () => setCurrentScreen('search');
  const handleSelectStudent = (student: AdminStudent) => {
    setSelectedStudent(student);
    setCurrentScreen('studentAccount');
  };
  const handleRegisterPaymentFromSearch = () => setCurrentScreen('registerPayment');
  const handleRegisterPaymentFromDashboard = () => setCurrentScreen('search');

  const handlePaymentComplete = (paymentData: PaymentData) => {
    const receiptNum = `REC-${new Date().getFullYear()}-${String(transactions.length + 1).padStart(6, '0')}`;
    setReceiptNumber(receiptNum);

    const now = new Date();
    const timestamp = `${now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    setReceiptTimestamp(timestamp);
    setCurrentPayment(paymentData);

    const newTransaction: Transaction = {
      id: receiptNum,
      time: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      studentName: selectedStudent!.name,
      studentId: selectedStudent!.id,
      concept: paymentData.concept,
      amount: paymentData.amount,
      paymentMethod: paymentData.paymentMethod,
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setDailyTotal(prev => prev + paymentData.amount);

    if (selectedStudent) {
      setSelectedStudent(prev => ({ ...prev!, balance: prev!.balance + paymentData.amount }));
    }
    setCurrentScreen('receipt');
  };

  const handlePrintReceipt = () => window.print();
  const handleNewPayment = () => setCurrentScreen('search');
  const handleBackToDashboard = () => {
    setSelectedStudent(null);
    setCurrentPayment(null);
    setCurrentScreen('dashboard');
  };

  const getTotalByMethod = (method: string): number =>
    transactions.filter(t => t.paymentMethod === method).reduce((s, t) => s + t.amount, 0);

  return (
    <div className="size-full">
      {currentScreen === 'landing' && (
        <LandingScreen onAdminAccess={handleGoToAdminLogin} onStudentAccess={handleGoToStudentLogin} />
      )}

      {currentScreen === 'studentLogin' && (
        <StudentLogin onBack={() => setCurrentScreen('landing')} onLoginSuccess={handleStudentLoginSuccess} />
      )}

      {currentScreen === 'studentPortal' && loggedStudent && (
        <StudentPortal student={loggedStudent} onLogout={handleStudentLogout} />
      )}

      {currentScreen === 'adminLogin' && (
        <AdminLogin onLogin={handleLogin} onBack={() => setCurrentScreen('landing')} />
      )}

      {currentScreen === 'dashboard' && (
        <AdminDashboard
          adminName={adminName}
          onSearchStudent={handleSearchStudent}
          onRegisterPayment={handleRegisterPaymentFromDashboard}
          onViewCashRegister={() => setCurrentScreen('cashRegister')}
          onViewSemesters={() => setCurrentScreen('semesters')}
          onViewDebtors={() => setCurrentScreen('debtors')}
          onViewReports={() => setCurrentScreen('reports')}
          onViewFeeConfig={() => setCurrentScreen('fees')}
          onLogout={handleLogout}
          dailyTotal={dailyTotal}
          todayPayments={transactions.length}
        />
      )}

      {currentScreen === 'search' && (
        <SearchStudent onBack={handleBackToDashboard} onSelectStudent={handleSelectStudent} />
      )}

      {currentScreen === 'studentAccount' && selectedStudent && (
        <StudentAccountScreen
          student={selectedStudent}
          onBack={() => setCurrentScreen('search')}
          onRegisterPayment={handleRegisterPaymentFromSearch}
        />
      )}

      {currentScreen === 'registerPayment' && selectedStudent && (
        <RegisterPayment
          student={selectedStudent}
          onBack={() => setCurrentScreen('studentAccount')}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {currentScreen === 'receipt' && selectedStudent && currentPayment && (
        <PaymentReceipt
          student={selectedStudent}
          payment={currentPayment}
          receiptNumber={receiptNumber}
          timestamp={receiptTimestamp}
          cashierName={adminName}
          onPrint={handlePrintReceipt}
          onNewPayment={handleNewPayment}
          onBackToDashboard={handleBackToDashboard}
        />
      )}

      {currentScreen === 'cashRegister' && (
        <CashRegister
          onBack={handleBackToDashboard}
          cashierName={adminName}
          transactions={transactions}
          totalCash={getTotalByMethod('Efectivo')}
          totalCard={getTotalByMethod('Tarjeta de Débito') + getTotalByMethod('Tarjeta de Crédito')}
          totalTransfer={getTotalByMethod('Transferencia Bancaria')}
          total={dailyTotal}
        />
      )}

      {currentScreen === 'semesters' && (
        <SemesterList onBack={handleBackToDashboard} onSelectStudent={handleSelectStudent} />
      )}

      {currentScreen === 'debtors' && (
        <DebtorsList onBack={handleBackToDashboard} onSelectStudent={handleSelectStudent} />
      )}

      {currentScreen === 'reports' && <ReportsScreen onBack={handleBackToDashboard} />}

      {currentScreen === 'fees' && <FeesConfiguration onBack={handleBackToDashboard} />}
    </div>
  );
}
