export interface Course {
  id: string;
  name: string;
  credits: number;
  mandatory: boolean;
}

export interface SemesterData {
  courses: Course[];
  capacity: number;
  enrolled: number;
}

const EF: Course = {
  id: 'ef',
  name: 'Experiencias Formativas',
  credits: 2,
  mandatory: true,
};

export const CAREERS = [
  'Arquitectura de Plataformas y Servicios TI',
  'Mecánica Industrial',
  'Electrónica',
  'Explotación Minera',
  'Agropecuaria',
] as const;

export type Career = typeof CAREERS[number];

// All semesters per career — 6 courses each, credits sum = 32
// EF = Experiencias Formativas (2 cr, mandatory)
export const COURSE_DATA: Record<Career, Record<number, SemesterData>> = {
  'Arquitectura de Plataformas y Servicios TI': {
    1: {
      capacity: 35, enrolled: 12,
      courses: [
        { id: 'apsti-1-1', name: 'Fundamentos de Redes', credits: 6, mandatory: false },
        { id: 'apsti-1-2', name: 'Sistemas Operativos I', credits: 6, mandatory: false },
        { id: 'apsti-1-3', name: 'Programación Básica', credits: 6, mandatory: false },
        { id: 'apsti-1-4', name: 'Matemáticas Aplicadas a TI', credits: 6, mandatory: false },
        { id: 'apsti-1-5', name: 'Introducción a Cloud Computing', credits: 6, mandatory: false },
        { ...EF, id: 'apsti-1-ef' },
      ],
    },
    2: {
      capacity: 35, enrolled: 18,
      courses: [
        { id: 'apsti-2-1', name: 'Redes Avanzadas', credits: 6, mandatory: false },
        { id: 'apsti-2-2', name: 'Sistemas Operativos II', credits: 6, mandatory: false },
        { id: 'apsti-2-3', name: 'Programación Orientada a Objetos', credits: 6, mandatory: false },
        { id: 'apsti-2-4', name: 'Bases de Datos', credits: 6, mandatory: false },
        { id: 'apsti-2-5', name: 'Virtualización y Contenedores', credits: 6, mandatory: false },
        { ...EF, id: 'apsti-2-ef' },
      ],
    },
    3: {
      capacity: 35, enrolled: 35,
      courses: [
        { id: 'apsti-3-1', name: 'Arquitectura de Microservicios', credits: 7, mandatory: false },
        { id: 'apsti-3-2', name: 'DevOps y CI/CD', credits: 7, mandatory: false },
        { id: 'apsti-3-3', name: 'Seguridad en la Nube', credits: 6, mandatory: false },
        { id: 'apsti-3-4', name: 'Gestión de Proyectos TI', credits: 5, mandatory: false },
        { id: 'apsti-3-5', name: 'Big Data Fundamentals', credits: 5, mandatory: false },
        { ...EF, id: 'apsti-3-ef' },
      ],
    },
    4: {
      capacity: 35, enrolled: 22,
      courses: [
        { id: 'apsti-4-1', name: 'Cloud Avanzado (AWS/Azure/GCP)', credits: 8, mandatory: false },
        { id: 'apsti-4-2', name: 'Automatización de Infraestructura', credits: 7, mandatory: false },
        { id: 'apsti-4-3', name: 'Monitoreo y Observabilidad', credits: 5, mandatory: false },
        { id: 'apsti-4-4', name: 'Arquitectura Serverless', credits: 6, mandatory: false },
        { id: 'apsti-4-5', name: 'Gestión de Incidentes TI', credits: 4, mandatory: false },
        { ...EF, id: 'apsti-4-ef' },
      ],
    },
    5: {
      capacity: 35, enrolled: 9,
      courses: [
        { id: 'apsti-5-1', name: 'Diseño de Plataformas Empresariales', credits: 8, mandatory: false },
        { id: 'apsti-5-2', name: 'Inteligencia Artificial en la Nube', credits: 8, mandatory: false },
        { id: 'apsti-5-3', name: 'Gobernanza de TI', credits: 5, mandatory: false },
        { id: 'apsti-5-4', name: 'Ciberseguridad Avanzada', credits: 5, mandatory: false },
        { id: 'apsti-5-5', name: 'Estrategia Digital', credits: 4, mandatory: false },
        { ...EF, id: 'apsti-5-ef' },
      ],
    },
    6: {
      capacity: 35, enrolled: 7,
      courses: [
        { id: 'apsti-6-1', name: 'Proyecto Integrador de Plataformas', credits: 10, mandatory: false },
        { id: 'apsti-6-2', name: 'Innovación y Transformación Digital', credits: 8, mandatory: false },
        { id: 'apsti-6-3', name: 'Auditoría de Sistemas', credits: 6, mandatory: false },
        { id: 'apsti-6-4', name: 'Liderazgo en TI', credits: 4, mandatory: false },
        { id: 'apsti-6-5', name: 'Emprendimiento Tecnológico', credits: 2, mandatory: false },
        { ...EF, id: 'apsti-6-ef' },
      ],
    },
  },

  'Mecánica Industrial': {
    1: {
      capacity: 35, enrolled: 20,
      courses: [
        { id: 'mi-1-1', name: 'Dibujo Técnico Industrial', credits: 6, mandatory: false },
        { id: 'mi-1-2', name: 'Mecánica de Sólidos I', credits: 6, mandatory: false },
        { id: 'mi-1-3', name: 'Materiales de Ingeniería', credits: 6, mandatory: false },
        { id: 'mi-1-4', name: 'Cálculo Diferencial', credits: 6, mandatory: false },
        { id: 'mi-1-5', name: 'Taller de Procesos Básicos', credits: 6, mandatory: false },
        { ...EF, id: 'mi-1-ef' },
      ],
    },
    2: {
      capacity: 35, enrolled: 15,
      courses: [
        { id: 'mi-2-1', name: 'Mecánica de Sólidos II', credits: 6, mandatory: false },
        { id: 'mi-2-2', name: 'Termodinámica I', credits: 6, mandatory: false },
        { id: 'mi-2-3', name: 'Procesos de Manufactura', credits: 6, mandatory: false },
        { id: 'mi-2-4', name: 'Cálculo Integral', credits: 6, mandatory: false },
        { id: 'mi-2-5', name: 'Metrología Industrial', credits: 6, mandatory: false },
        { ...EF, id: 'mi-2-ef' },
      ],
    },
    3: {
      capacity: 35, enrolled: 30,
      courses: [
        { id: 'mi-3-1', name: 'Termodinámica II', credits: 7, mandatory: false },
        { id: 'mi-3-2', name: 'Máquinas y Mecanismos', credits: 7, mandatory: false },
        { id: 'mi-3-3', name: 'Control de Calidad', credits: 6, mandatory: false },
        { id: 'mi-3-4', name: 'Hidráulica y Neumática', credits: 5, mandatory: false },
        { id: 'mi-3-5', name: 'Métodos Numéricos', credits: 5, mandatory: false },
        { ...EF, id: 'mi-3-ef' },
      ],
    },
    4: {
      capacity: 35, enrolled: 28,
      courses: [
        { id: 'mi-4-1', name: 'Mantenimiento Industrial', credits: 8, mandatory: false },
        { id: 'mi-4-2', name: 'Diseño de Elementos de Máquinas', credits: 7, mandatory: false },
        { id: 'mi-4-3', name: 'Manufactura Avanzada', credits: 6, mandatory: false },
        { id: 'mi-4-4', name: 'Automatización Industrial', credits: 5, mandatory: false },
        { id: 'mi-4-5', name: 'Gestión de la Producción', credits: 4, mandatory: false },
        { ...EF, id: 'mi-4-ef' },
      ],
    },
    5: {
      capacity: 35, enrolled: 11,
      courses: [
        { id: 'mi-5-1', name: 'Robótica Industrial', credits: 8, mandatory: false },
        { id: 'mi-5-2', name: 'Sistemas de Control', credits: 8, mandatory: false },
        { id: 'mi-5-3', name: 'Diseño de Plantas Industriales', credits: 5, mandatory: false },
        { id: 'mi-5-4', name: 'Energías Renovables Aplicadas', credits: 5, mandatory: false },
        { id: 'mi-5-5', name: 'Seguridad Industrial', credits: 4, mandatory: false },
        { ...EF, id: 'mi-5-ef' },
      ],
    },
    6: {
      capacity: 35, enrolled: 8,
      courses: [
        { id: 'mi-6-1', name: 'Proyecto de Automatización Industrial', credits: 10, mandatory: false },
        { id: 'mi-6-2', name: 'Mantenimiento Predictivo', credits: 8, mandatory: false },
        { id: 'mi-6-3', name: 'Gestión de Operaciones', credits: 6, mandatory: false },
        { id: 'mi-6-4', name: 'Innovación en Manufactura', credits: 4, mandatory: false },
        { id: 'mi-6-5', name: 'Emprendimiento Industrial', credits: 2, mandatory: false },
        { ...EF, id: 'mi-6-ef' },
      ],
    },
  },

  'Electrónica': {
    1: {
      capacity: 35, enrolled: 25,
      courses: [
        { id: 'el-1-1', name: 'Fundamentos de Electricidad', credits: 6, mandatory: false },
        { id: 'el-1-2', name: 'Matemáticas para Electrónica', credits: 6, mandatory: false },
        { id: 'el-1-3', name: 'Componentes Electrónicos', credits: 6, mandatory: false },
        { id: 'el-1-4', name: 'Laboratorio de Electrónica Básica', credits: 6, mandatory: false },
        { id: 'el-1-5', name: 'Introducción a Sistemas Digitales', credits: 6, mandatory: false },
        { ...EF, id: 'el-1-ef' },
      ],
    },
    2: {
      capacity: 35, enrolled: 35,
      courses: [
        { id: 'el-2-1', name: 'Circuitos Eléctricos I', credits: 6, mandatory: false },
        { id: 'el-2-2', name: 'Electrónica Analógica', credits: 6, mandatory: false },
        { id: 'el-2-3', name: 'Sistemas Digitales', credits: 6, mandatory: false },
        { id: 'el-2-4', name: 'Cálculo Diferencial', credits: 6, mandatory: false },
        { id: 'el-2-5', name: 'Señales y Sistemas', credits: 6, mandatory: false },
        { ...EF, id: 'el-2-ef' },
      ],
    },
    3: {
      capacity: 35, enrolled: 19,
      courses: [
        { id: 'el-3-1', name: 'Circuitos Eléctricos II', credits: 7, mandatory: false },
        { id: 'el-3-2', name: 'Electrónica de Potencia', credits: 7, mandatory: false },
        { id: 'el-3-3', name: 'Microcontroladores', credits: 6, mandatory: false },
        { id: 'el-3-4', name: 'Comunicaciones Digitales', credits: 5, mandatory: false },
        { id: 'el-3-5', name: 'Instrumentación Electrónica', credits: 5, mandatory: false },
        { ...EF, id: 'el-3-ef' },
      ],
    },
    4: {
      capacity: 35, enrolled: 14,
      courses: [
        { id: 'el-4-1', name: 'Diseño de PCB', credits: 8, mandatory: false },
        { id: 'el-4-2', name: 'Sistemas Embebidos', credits: 7, mandatory: false },
        { id: 'el-4-3', name: 'Procesamiento Digital de Señales', credits: 6, mandatory: false },
        { id: 'el-4-4', name: 'Automatización Electrónica', credits: 5, mandatory: false },
        { id: 'el-4-5', name: 'Robótica Básica', credits: 4, mandatory: false },
        { ...EF, id: 'el-4-ef' },
      ],
    },
    5: {
      capacity: 35, enrolled: 10,
      courses: [
        { id: 'el-5-1', name: 'Inteligencia Artificial para IoT', credits: 8, mandatory: false },
        { id: 'el-5-2', name: 'Sistemas de Control Electrónico', credits: 8, mandatory: false },
        { id: 'el-5-3', name: 'Redes de Comunicación Industrial', credits: 5, mandatory: false },
        { id: 'el-5-4', name: 'Electrónica en Energías Renovables', credits: 5, mandatory: false },
        { id: 'el-5-5', name: 'Diseño de Sistemas FPGA', credits: 4, mandatory: false },
        { ...EF, id: 'el-5-ef' },
      ],
    },
    6: {
      capacity: 35, enrolled: 6,
      courses: [
        { id: 'el-6-1', name: 'Proyecto Integrador de Electrónica', credits: 10, mandatory: false },
        { id: 'el-6-2', name: 'Telecomunicaciones Avanzadas', credits: 8, mandatory: false },
        { id: 'el-6-3', name: 'Domótica e IoT Industrial', credits: 6, mandatory: false },
        { id: 'el-6-4', name: 'Innovación Electrónica', credits: 4, mandatory: false },
        { id: 'el-6-5', name: 'Emprendimiento en Electrónica', credits: 2, mandatory: false },
        { ...EF, id: 'el-6-ef' },
      ],
    },
  },

  'Explotación Minera': {
    1: {
      capacity: 35, enrolled: 17,
      courses: [
        { id: 'em-1-1', name: 'Geología General', credits: 6, mandatory: false },
        { id: 'em-1-2', name: 'Topografía Minera', credits: 6, mandatory: false },
        { id: 'em-1-3', name: 'Mineralogía', credits: 6, mandatory: false },
        { id: 'em-1-4', name: 'Cálculo Diferencial', credits: 6, mandatory: false },
        { id: 'em-1-5', name: 'Introducción a la Minería', credits: 6, mandatory: false },
        { ...EF, id: 'em-1-ef' },
      ],
    },
    2: {
      capacity: 35, enrolled: 22,
      courses: [
        { id: 'em-2-1', name: 'Perforación y Voladura', credits: 6, mandatory: false },
        { id: 'em-2-2', name: 'Geomecánica', credits: 6, mandatory: false },
        { id: 'em-2-3', name: 'Hidrogeología', credits: 6, mandatory: false },
        { id: 'em-2-4', name: 'Ventilación de Minas', credits: 6, mandatory: false },
        { id: 'em-2-5', name: 'Mineralurgia', credits: 6, mandatory: false },
        { ...EF, id: 'em-2-ef' },
      ],
    },
    3: {
      capacity: 35, enrolled: 29,
      courses: [
        { id: 'em-3-1', name: 'Métodos de Explotación', credits: 7, mandatory: false },
        { id: 'em-3-2', name: 'Estabilidad de Taludes', credits: 7, mandatory: false },
        { id: 'em-3-3', name: 'Procesamiento de Minerales', credits: 6, mandatory: false },
        { id: 'em-3-4', name: 'Maquinaria Minera', credits: 5, mandatory: false },
        { id: 'em-3-5', name: 'Evaluación de Recursos Minerales', credits: 5, mandatory: false },
        { ...EF, id: 'em-3-ef' },
      ],
    },
    4: {
      capacity: 35, enrolled: 20,
      courses: [
        { id: 'em-4-1', name: 'Planificación Minera', credits: 8, mandatory: false },
        { id: 'em-4-2', name: 'Gestión Ambiental Minera', credits: 7, mandatory: false },
        { id: 'em-4-3', name: 'Diseño de Minas a Cielo Abierto', credits: 6, mandatory: false },
        { id: 'em-4-4', name: 'Seguridad Minera', credits: 5, mandatory: false },
        { id: 'em-4-5', name: 'Costos de Operación Minera', credits: 4, mandatory: false },
        { ...EF, id: 'em-4-ef' },
      ],
    },
    5: {
      capacity: 35, enrolled: 13,
      courses: [
        { id: 'em-5-1', name: 'Minería Subterránea Avanzada', credits: 8, mandatory: false },
        { id: 'em-5-2', name: 'Automatización en Minería', credits: 8, mandatory: false },
        { id: 'em-5-3', name: 'Geotecnia Avanzada', credits: 5, mandatory: false },
        { id: 'em-5-4', name: 'Gestión de Proyectos Mineros', credits: 5, mandatory: false },
        { id: 'em-5-5', name: 'Derecho Minero', credits: 4, mandatory: false },
        { ...EF, id: 'em-5-ef' },
      ],
    },
    6: {
      capacity: 35, enrolled: 5,
      courses: [
        { id: 'em-6-1', name: 'Proyecto Integrador Minero', credits: 10, mandatory: false },
        { id: 'em-6-2', name: 'Cierre y Rehabilitación de Minas', credits: 8, mandatory: false },
        { id: 'em-6-3', name: 'Minería Responsable y Sostenible', credits: 6, mandatory: false },
        { id: 'em-6-4', name: 'Emprendimiento Minero', credits: 4, mandatory: false },
        { id: 'em-6-5', name: 'Innovación en Explotación', credits: 2, mandatory: false },
        { ...EF, id: 'em-6-ef' },
      ],
    },
  },

  'Agropecuaria': {
    1: {
      capacity: 35, enrolled: 21,
      courses: [
        { id: 'ag-1-1', name: 'Biología Aplicada', credits: 6, mandatory: false },
        { id: 'ag-1-2', name: 'Química Agrícola', credits: 6, mandatory: false },
        { id: 'ag-1-3', name: 'Suelos y Fertilización', credits: 6, mandatory: false },
        { id: 'ag-1-4', name: 'Matemáticas Aplicadas', credits: 6, mandatory: false },
        { id: 'ag-1-5', name: 'Introducción a la Producción Agropecuaria', credits: 6, mandatory: false },
        { ...EF, id: 'ag-1-ef' },
      ],
    },
    2: {
      capacity: 35, enrolled: 16,
      courses: [
        { id: 'ag-2-1', name: 'Producción Agrícola I', credits: 8, mandatory: false },
        { id: 'ag-2-2', name: 'Producción Pecuaria I', credits: 6, mandatory: false },
        { id: 'ag-2-3', name: 'Fitopatología', credits: 5, mandatory: false },
        { id: 'ag-2-4', name: 'Riego y Drenaje', credits: 5, mandatory: false },
        { id: 'ag-2-5', name: 'Maquinaria Agrícola', credits: 6, mandatory: false },
        { ...EF, id: 'ag-2-ef' },
      ],
    },
    3: {
      capacity: 35, enrolled: 26,
      courses: [
        { id: 'ag-3-1', name: 'Producción Agrícola II', credits: 7, mandatory: false },
        { id: 'ag-3-2', name: 'Producción Pecuaria II', credits: 7, mandatory: false },
        { id: 'ag-3-3', name: 'Nutrición Animal', credits: 6, mandatory: false },
        { id: 'ag-3-4', name: 'Control de Plagas y Enfermedades', credits: 5, mandatory: false },
        { id: 'ag-3-5', name: 'Agroclimatología', credits: 5, mandatory: false },
        { ...EF, id: 'ag-3-ef' },
      ],
    },
    4: {
      capacity: 35, enrolled: 18,
      courses: [
        { id: 'ag-4-1', name: 'Biotecnología Agrícola', credits: 8, mandatory: false },
        { id: 'ag-4-2', name: 'Gestión de Granjas', credits: 7, mandatory: false },
        { id: 'ag-4-3', name: 'Sanidad Animal', credits: 6, mandatory: false },
        { id: 'ag-4-4', name: 'Comercialización Agropecuaria', credits: 5, mandatory: false },
        { id: 'ag-4-5', name: 'Agricultura de Precisión', credits: 4, mandatory: false },
        { ...EF, id: 'ag-4-ef' },
      ],
    },
    5: {
      capacity: 35, enrolled: 9,
      courses: [
        { id: 'ag-5-1', name: 'Agroecología', credits: 8, mandatory: false },
        { id: 'ag-5-2', name: 'Sistemas de Producción Integrada', credits: 8, mandatory: false },
        { id: 'ag-5-3', name: 'Gestión de Recursos Naturales', credits: 5, mandatory: false },
        { id: 'ag-5-4', name: 'Economía Agraria', credits: 5, mandatory: false },
        { id: 'ag-5-5', name: 'Buenas Prácticas Agrícolas', credits: 4, mandatory: false },
        { ...EF, id: 'ag-5-ef' },
      ],
    },
    6: {
      capacity: 35, enrolled: 4,
      courses: [
        { id: 'ag-6-1', name: 'Proyecto Integrador Agropecuario', credits: 10, mandatory: false },
        { id: 'ag-6-2', name: 'Agroindustria y Valor Agregado', credits: 8, mandatory: false },
        { id: 'ag-6-3', name: 'Desarrollo Rural', credits: 6, mandatory: false },
        { id: 'ag-6-4', name: 'Emprendimiento Agropecuario', credits: 4, mandatory: false },
        { id: 'ag-6-5', name: 'Innovación en Producción Animal', credits: 2, mandatory: false },
        { ...EF, id: 'ag-6-ef' },
      ],
    },
  },
};

export function getSemesterData(career: Career, semester: number): SemesterData | null {
  return COURSE_DATA[career]?.[semester] ?? null;
}

export function isSemesterFull(career: Career, semester: number): boolean {
  const data = getSemesterData(career, semester);
  if (!data) return false;
  return data.enrolled >= data.capacity;
}

export function getAvailableSlots(career: Career, semester: number): number {
  const data = getSemesterData(career, semester);
  if (!data) return 0;
  return Math.max(0, data.capacity - data.enrolled);
}
