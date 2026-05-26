export interface ScheduleItem {
  day: number; // 0=Lun 1=Mar 2=Mié 3=Jue 4=Vie 5=Sáb
  startTime: string;
  endTime: string;
  courseName: string;
  shortName: string;
  room: string;
  teacher: string;
  credits: number;
  colorIndex: number;
  mandatory?: boolean;
}

export interface PaymentRecord {
  id: string;
  date: string;
  concept: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  receiptNumber?: string;
}

export interface EnrolledCourse {
  id: string;
  name: string;
  credits: number;
  teacher: string;
  room: string;
  mandatory: boolean;
  colorIndex: number;
}

export interface StudentAccount {
  dni: string;
  name: string;
  firstName: string;
  lastName: string;
  career: string;
  semester: number;
  balance: number; // negative = owes
  enrollmentDate: string;
  status: 'active' | 'inactive';
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  // RENIEC mock data (future integration)
  reniecVerified: boolean;
  reniecData?: {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: string;
    departamento: string;
    provincia: string;
    distrito: string;
    ubigeo: string;
  };
  courses: EnrolledCourse[];
  schedule: ScheduleItem[];
  payments: PaymentRecord[];
  announcements: { id: string; title: string; body: string; date: string; type: 'info' | 'warning' | 'payment' }[];
}

// Time blocks used in the schedule
export const TIME_BLOCKS = [
  { slot: 1, start: '8:20', end: '10:00' },
  { slot: 2, start: '10:20', end: '12:00' },
  { slot: 3, start: '12:20', end: '13:10' },
] as const;

export const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'] as const;

// -------------------------------------------------------------------
// MOCK STUDENT ACCOUNTS  — password = DNI (8 digits)
// -------------------------------------------------------------------

const STUDENTS: Record<string, StudentAccount> = {
  '73456891': {
    dni: '73456891',
    name: 'Juan Carlos Pérez López',
    firstName: 'Juan Carlos',
    lastName: 'Pérez López',
    career: 'Electrónica',
    semester: 3,
    balance: -1800,
    enrollmentDate: '10/01/2026',
    status: 'active',
    email: 'jperez@estudiante.edu.pe',
    phone: '987 654 321',
    address: 'Jr. Los Pinos 342, Urb. San Carlos',
    birthDate: '14/03/2004',
    reniecVerified: true,
    reniecData: {
      nombres: 'JUAN CARLOS',
      apellidoPaterno: 'PÉREZ',
      apellidoMaterno: 'LÓPEZ',
      fechaNacimiento: '14/03/2004',
      departamento: 'LIMA',
      provincia: 'LIMA',
      distrito: 'SAN JUAN DE LURIGANCHO',
      ubigeo: '150132',
    },
    courses: [
      { id: 'el-3-1', name: 'Circuitos Eléctricos II', credits: 7, teacher: 'Ing. Roberto Sánchez C.', room: 'Aula 201', mandatory: false, colorIndex: 0 },
      { id: 'el-3-2', name: 'Electrónica de Potencia', credits: 7, teacher: 'Ing. Carmen Vásquez T.', room: 'Lab. E-1', mandatory: false, colorIndex: 1 },
      { id: 'el-3-3', name: 'Microcontroladores', credits: 6, teacher: 'Ing. Luis Mendoza A.', room: 'Lab. E-2', mandatory: false, colorIndex: 2 },
      { id: 'el-3-4', name: 'Comunicaciones Digitales', credits: 5, teacher: 'Ing. Ana Torres R.', room: 'Aula 202', mandatory: false, colorIndex: 3 },
      { id: 'el-3-5', name: 'Instrumentación Electrónica', credits: 5, teacher: 'Ing. Jorge Ríos M.', room: 'Lab. E-3', mandatory: false, colorIndex: 4 },
      { id: 'el-3-ef', name: 'Experiencias Formativas', credits: 2, teacher: 'Lic. Patricia Flores V.', room: 'Aula 101', mandatory: true, colorIndex: 5 },
    ],
    schedule: [
      // Lunes
      { day: 0, startTime: '8:20', endTime: '10:00', courseName: 'Circuitos Eléctricos II', shortName: 'Circ. Eléc. II', room: 'Aula 201', teacher: 'Ing. Roberto Sánchez C.', credits: 7, colorIndex: 0 },
      { day: 0, startTime: '10:20', endTime: '12:00', courseName: 'Microcontroladores', shortName: 'Microcontrol.', room: 'Lab. E-2', teacher: 'Ing. Luis Mendoza A.', credits: 6, colorIndex: 2 },
      { day: 0, startTime: '12:20', endTime: '13:10', courseName: 'Experiencias Formativas', shortName: 'Exp. Formativas', room: 'Aula 101', teacher: 'Lic. Patricia Flores V.', credits: 2, colorIndex: 5, mandatory: true },
      // Martes
      { day: 1, startTime: '8:20', endTime: '10:00', courseName: 'Electrónica de Potencia', shortName: 'Elec. Potencia', room: 'Lab. E-1', teacher: 'Ing. Carmen Vásquez T.', credits: 7, colorIndex: 1 },
      { day: 1, startTime: '10:20', endTime: '12:00', courseName: 'Comunicaciones Digitales', shortName: 'Com. Digitales', room: 'Aula 202', teacher: 'Ing. Ana Torres R.', credits: 5, colorIndex: 3 },
      // Miércoles
      { day: 2, startTime: '8:20', endTime: '10:00', courseName: 'Circuitos Eléctricos II', shortName: 'Circ. Eléc. II', room: 'Aula 201', teacher: 'Ing. Roberto Sánchez C.', credits: 7, colorIndex: 0 },
      { day: 2, startTime: '10:20', endTime: '12:00', courseName: 'Instrumentación Electrónica', shortName: 'Instr. Electrónica', room: 'Lab. E-3', teacher: 'Ing. Jorge Ríos M.', credits: 5, colorIndex: 4 },
      // Jueves
      { day: 3, startTime: '8:20', endTime: '10:00', courseName: 'Electrónica de Potencia', shortName: 'Elec. Potencia', room: 'Lab. E-1', teacher: 'Ing. Carmen Vásquez T.', credits: 7, colorIndex: 1 },
      { day: 3, startTime: '10:20', endTime: '12:00', courseName: 'Comunicaciones Digitales', shortName: 'Com. Digitales', room: 'Aula 202', teacher: 'Ing. Ana Torres R.', credits: 5, colorIndex: 3 },
      // Viernes
      { day: 4, startTime: '8:20', endTime: '10:00', courseName: 'Microcontroladores', shortName: 'Microcontrol.', room: 'Lab. E-2', teacher: 'Ing. Luis Mendoza A.', credits: 6, colorIndex: 2 },
      { day: 4, startTime: '10:20', endTime: '12:00', courseName: 'Instrumentación Electrónica', shortName: 'Instr. Electrónica', room: 'Lab. E-3', teacher: 'Ing. Jorge Ríos M.', credits: 5, colorIndex: 4 },
    ],
    payments: [
      { id: 'P001', date: '10/01/2026', concept: 'Matrícula — Electrónica 3° Semestre', amount: 5000, status: 'paid', receiptNumber: 'REC-2026-000001' },
      { id: 'P002', date: '05/02/2026', concept: 'Mensualidad Febrero', amount: 2500, status: 'paid', receiptNumber: 'REC-2026-000045' },
      { id: 'P003', date: '05/03/2026', concept: 'Mensualidad Marzo', amount: 2500, status: 'paid', receiptNumber: 'REC-2026-000112' },
      { id: 'P004', date: '05/04/2026', concept: 'Mensualidad Abril', amount: 900, status: 'overdue' },
      { id: 'P005', date: '05/05/2026', concept: 'Mensualidad Mayo', amount: 900, status: 'overdue' },
    ],
    announcements: [
      { id: 'A1', title: 'Pago pendiente', body: 'Tienes 2 mensualidades vencidas. Acércate a caja para regularizar tu situación.', date: '20/05/2026', type: 'payment' },
      { id: 'A2', title: 'Exámenes parciales', body: 'Los exámenes parciales se realizarán del 02 al 06 de Junio. Consulta el aula asignada.', date: '18/05/2026', type: 'info' },
    ],
  },

  '41238765': {
    dni: '41238765',
    name: 'María Elena González Ríos',
    firstName: 'María Elena',
    lastName: 'González Ríos',
    career: 'Agropecuaria',
    semester: 2,
    balance: 0,
    enrollmentDate: '12/01/2026',
    status: 'active',
    email: 'mgonzalez@estudiante.edu.pe',
    phone: '954 321 678',
    address: 'Av. Los Girasoles 891, Urb. Villa María',
    birthDate: '22/07/2005',
    reniecVerified: true,
    reniecData: {
      nombres: 'MARÍA ELENA',
      apellidoPaterno: 'GONZÁLEZ',
      apellidoMaterno: 'RÍOS',
      fechaNacimiento: '22/07/2005',
      departamento: 'LIMA',
      provincia: 'LIMA',
      distrito: 'ATE',
      ubigeo: '150103',
    },
    courses: [
      { id: 'ag-2-1', name: 'Producción Agrícola I', credits: 8, teacher: 'Ing. Mónica Huanca P.', room: 'Aula 301', mandatory: false, colorIndex: 0 },
      { id: 'ag-2-2', name: 'Producción Pecuaria I', credits: 6, teacher: 'M.V. César Quispe A.', room: 'Lab. Agro-1', mandatory: false, colorIndex: 1 },
      { id: 'ag-2-3', name: 'Fitopatología', credits: 5, teacher: 'Ing. Rosa Cárdenas L.', room: 'Lab. Agro-2', mandatory: false, colorIndex: 2 },
      { id: 'ag-2-4', name: 'Riego y Drenaje', credits: 5, teacher: 'Ing. Álvaro Salas M.', room: 'Aula 302', mandatory: false, colorIndex: 3 },
      { id: 'ag-2-5', name: 'Maquinaria Agrícola', credits: 6, teacher: 'Ing. Diego Paredes C.', room: 'Taller Agro', mandatory: false, colorIndex: 4 },
      { id: 'ag-2-ef', name: 'Experiencias Formativas', credits: 2, teacher: 'Lic. Silvia Morales V.', room: 'Aula 101', mandatory: true, colorIndex: 5 },
    ],
    schedule: [
      // Lunes
      { day: 0, startTime: '8:20', endTime: '10:00', courseName: 'Producción Agrícola I', shortName: 'Prod. Agrícola I', room: 'Aula 301', teacher: 'Ing. Mónica Huanca P.', credits: 8, colorIndex: 0 },
      { day: 0, startTime: '10:20', endTime: '12:00', courseName: 'Maquinaria Agrícola', shortName: 'Maquinaria Agr.', room: 'Taller Agro', teacher: 'Ing. Diego Paredes C.', credits: 6, colorIndex: 4 },
      // Martes
      { day: 1, startTime: '8:20', endTime: '10:00', courseName: 'Producción Pecuaria I', shortName: 'Prod. Pecuaria I', room: 'Lab. Agro-1', teacher: 'M.V. César Quispe A.', credits: 6, colorIndex: 1 },
      { day: 1, startTime: '10:20', endTime: '12:00', courseName: 'Fitopatología', shortName: 'Fitopatología', room: 'Lab. Agro-2', teacher: 'Ing. Rosa Cárdenas L.', credits: 5, colorIndex: 2 },
      { day: 1, startTime: '12:20', endTime: '13:10', courseName: 'Experiencias Formativas', shortName: 'Exp. Formativas', room: 'Aula 101', teacher: 'Lic. Silvia Morales V.', credits: 2, colorIndex: 5, mandatory: true },
      // Miércoles
      { day: 2, startTime: '8:20', endTime: '10:00', courseName: 'Producción Agrícola I', shortName: 'Prod. Agrícola I', room: 'Aula 301', teacher: 'Ing. Mónica Huanca P.', credits: 8, colorIndex: 0 },
      { day: 2, startTime: '10:20', endTime: '12:00', courseName: 'Riego y Drenaje', shortName: 'Riego y Drenaje', room: 'Aula 302', teacher: 'Ing. Álvaro Salas M.', credits: 5, colorIndex: 3 },
      // Jueves
      { day: 3, startTime: '8:20', endTime: '10:00', courseName: 'Producción Pecuaria I', shortName: 'Prod. Pecuaria I', room: 'Lab. Agro-1', teacher: 'M.V. César Quispe A.', credits: 6, colorIndex: 1 },
      { day: 3, startTime: '10:20', endTime: '12:00', courseName: 'Fitopatología', shortName: 'Fitopatología', room: 'Lab. Agro-2', teacher: 'Ing. Rosa Cárdenas L.', credits: 5, colorIndex: 2 },
      // Viernes
      { day: 4, startTime: '8:20', endTime: '10:00', courseName: 'Maquinaria Agrícola', shortName: 'Maquinaria Agr.', room: 'Taller Agro', teacher: 'Ing. Diego Paredes C.', credits: 6, colorIndex: 4 },
      { day: 4, startTime: '10:20', endTime: '12:00', courseName: 'Riego y Drenaje', shortName: 'Riego y Drenaje', room: 'Aula 302', teacher: 'Ing. Álvaro Salas M.', credits: 5, colorIndex: 3 },
    ],
    payments: [
      { id: 'P001', date: '12/01/2026', concept: 'Matrícula — Agropecuaria 2° Semestre', amount: 4500, status: 'paid', receiptNumber: 'REC-2026-000003' },
      { id: 'P002', date: '08/02/2026', concept: 'Mensualidad Febrero', amount: 2200, status: 'paid', receiptNumber: 'REC-2026-000067' },
      { id: 'P003', date: '07/03/2026', concept: 'Mensualidad Marzo', amount: 2200, status: 'paid', receiptNumber: 'REC-2026-000128' },
      { id: 'P004', date: '05/04/2026', concept: 'Mensualidad Abril', amount: 2200, status: 'paid', receiptNumber: 'REC-2026-000189' },
      { id: 'P005', date: '08/05/2026', concept: 'Mensualidad Mayo', amount: 2200, status: 'paid', receiptNumber: 'REC-2026-000234' },
    ],
    announcements: [
      { id: 'A1', title: 'Visita de campo programada', body: 'El día Jueves 29 de Mayo se realizará una visita técnica a la Granja Modelo de Lurín. Presentarse a las 7:30 a.m.', date: '22/05/2026', type: 'info' },
      { id: 'A2', title: 'Entrega de trabajos', body: 'Recuerda entregar el informe de Fitopatología antes del Viernes 30 de Mayo.', date: '19/05/2026', type: 'warning' },
    ],
  },

  '68123490': {
    dni: '68123490',
    name: 'Carlos Andrés Ramírez Torres',
    firstName: 'Carlos Andrés',
    lastName: 'Ramírez Torres',
    career: 'Mecánica Industrial',
    semester: 1,
    balance: -2700,
    enrollmentDate: '15/01/2026',
    status: 'active',
    email: 'cramirez@estudiante.edu.pe',
    phone: '963 258 741',
    address: 'Calle Las Magnolias 56, Urb. El Pinar',
    birthDate: '05/11/2006',
    reniecVerified: false, // pending verification
    courses: [
      { id: 'mi-1-1', name: 'Dibujo Técnico Industrial', credits: 6, teacher: 'Ing. Fernando Espinoza G.', room: 'Aula 401', mandatory: false, colorIndex: 0 },
      { id: 'mi-1-2', name: 'Mecánica de Sólidos I', credits: 6, teacher: 'Ing. Patricia Castro V.', room: 'Aula 402', mandatory: false, colorIndex: 1 },
      { id: 'mi-1-3', name: 'Materiales de Ingeniería', credits: 6, teacher: 'Ing. Alejandro Ruiz B.', room: 'Lab. M-1', mandatory: false, colorIndex: 2 },
      { id: 'mi-1-4', name: 'Cálculo Diferencial', credits: 6, teacher: 'Lic. Daniela Núñez P.', room: 'Aula 403', mandatory: false, colorIndex: 3 },
      { id: 'mi-1-5', name: 'Taller de Procesos Básicos', credits: 6, teacher: 'Tec. Héctor Salinas C.', room: 'Taller M-1', mandatory: false, colorIndex: 4 },
      { id: 'mi-1-ef', name: 'Experiencias Formativas', credits: 2, teacher: 'Lic. Gloria Mendívil R.', room: 'Aula 101', mandatory: true, colorIndex: 5 },
    ],
    schedule: [
      // Lunes
      { day: 0, startTime: '8:20', endTime: '10:00', courseName: 'Dibujo Técnico Industrial', shortName: 'Dibujo Técnico', room: 'Aula 401', teacher: 'Ing. Fernando Espinoza G.', credits: 6, colorIndex: 0 },
      { day: 0, startTime: '10:20', endTime: '12:00', courseName: 'Cálculo Diferencial', shortName: 'Cálculo Dif.', room: 'Aula 403', teacher: 'Lic. Daniela Núñez P.', credits: 6, colorIndex: 3 },
      { day: 0, startTime: '12:20', endTime: '13:10', courseName: 'Experiencias Formativas', shortName: 'Exp. Formativas', room: 'Aula 101', teacher: 'Lic. Gloria Mendívil R.', credits: 2, colorIndex: 5, mandatory: true },
      // Martes
      { day: 1, startTime: '8:20', endTime: '10:00', courseName: 'Mecánica de Sólidos I', shortName: 'Mec. Sólidos I', room: 'Aula 402', teacher: 'Ing. Patricia Castro V.', credits: 6, colorIndex: 1 },
      { day: 1, startTime: '10:20', endTime: '12:00', courseName: 'Materiales de Ingeniería', shortName: 'Materiales Ing.', room: 'Lab. M-1', teacher: 'Ing. Alejandro Ruiz B.', credits: 6, colorIndex: 2 },
      // Miércoles
      { day: 2, startTime: '8:20', endTime: '10:00', courseName: 'Dibujo Técnico Industrial', shortName: 'Dibujo Técnico', room: 'Aula 401', teacher: 'Ing. Fernando Espinoza G.', credits: 6, colorIndex: 0 },
      { day: 2, startTime: '10:20', endTime: '12:00', courseName: 'Taller de Procesos Básicos', shortName: 'Taller Procesos', room: 'Taller M-1', teacher: 'Tec. Héctor Salinas C.', credits: 6, colorIndex: 4 },
      // Jueves
      { day: 3, startTime: '8:20', endTime: '10:00', courseName: 'Mecánica de Sólidos I', shortName: 'Mec. Sólidos I', room: 'Aula 402', teacher: 'Ing. Patricia Castro V.', credits: 6, colorIndex: 1 },
      { day: 3, startTime: '10:20', endTime: '12:00', courseName: 'Cálculo Diferencial', shortName: 'Cálculo Dif.', room: 'Aula 403', teacher: 'Lic. Daniela Núñez P.', credits: 6, colorIndex: 3 },
      // Viernes
      { day: 4, startTime: '8:20', endTime: '10:00', courseName: 'Materiales de Ingeniería', shortName: 'Materiales Ing.', room: 'Lab. M-1', teacher: 'Ing. Alejandro Ruiz B.', credits: 6, colorIndex: 2 },
      { day: 4, startTime: '10:20', endTime: '12:00', courseName: 'Taller de Procesos Básicos', shortName: 'Taller Procesos', room: 'Taller M-1', teacher: 'Tec. Héctor Salinas C.', credits: 6, colorIndex: 4 },
    ],
    payments: [
      { id: 'P001', date: '15/01/2026', concept: 'Matrícula — Mecánica Industrial 1° Semestre', amount: 4800, status: 'paid', receiptNumber: 'REC-2026-000008' },
      { id: 'P002', date: '20/02/2026', concept: 'Mensualidad Febrero', amount: 900, status: 'paid', receiptNumber: 'REC-2026-000089' },
      { id: 'P003', date: '05/03/2026', concept: 'Mensualidad Marzo', amount: 900, status: 'overdue' },
      { id: 'P004', date: '05/04/2026', concept: 'Mensualidad Abril', amount: 900, status: 'overdue' },
      { id: 'P005', date: '05/05/2026', concept: 'Mensualidad Mayo', amount: 900, status: 'overdue' },
    ],
    announcements: [
      { id: 'A1', title: 'Deuda vencida — Acción requerida', body: 'Tienes 3 mensualidades vencidas. Tu acceso a exámenes puede ser restringido. Acércate a caja a la brevedad.', date: '21/05/2026', type: 'payment' },
      { id: 'A2', title: 'Verificación de identidad pendiente', body: 'Tu identidad aún no ha sido verificada con RENIEC. Por favor presenta tu DNI original en Secretaría.', date: '16/01/2026', type: 'warning' },
    ],
  },
};

export function authenticateStudent(dni: string, password: string): StudentAccount | null {
  if (dni.length !== 8 || !/^\d{8}$/.test(dni)) return null;
  if (password !== dni) return null;
  return STUDENTS[dni] ?? null;
}

export function getStudentByDni(dni: string): StudentAccount | null {
  return STUDENTS[dni] ?? null;
}

export const COURSE_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#f97316', // orange (Experiencias Formativas)
] as const;
