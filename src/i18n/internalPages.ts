import type { Language, SpecialtyKey } from "./translations";

type LinkItem = {
  label: string;
  href: string;
};

type InternalPage = {
  seoTitle: string;
  seoDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  overviewTitle: string;
  overview: string;
  whenTitle: string;
  when: string[];
  urgentTitle?: string;
  urgent?: string;
  evaluateTitle: string;
  evaluate: string;
  evaluatePoints?: string[];
  bringTitle: string;
  bringIntro: string;
  bring: string[];
  nextTitle: string;
  nextIntro?: string;
  next: string[];
  pathwayTitle?: string;
  pathway?: string[];
  relatedTitle: string;
  related: LinkItem[];
  faqTitle: string;
  faq: Array<[string, string]>;
  cta: string;
};

type SpecialtiesHub = {
  seoTitle: string;
  seoDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  selectorTitle: string;
  selectorIntro: string;
  unsureTitle: string;
  unsureBody: string;
};

type AboutInternal = {
  seoTitle: string;
  seoDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  clinicalTitle: string;
  clinicalBody: string;
  philosophyTitle: string;
  philosophyBody: string;
  areasTitle: string;
  areas: LinkItem[];
  expectTitle: string;
  expect: string[];
  credentialsTitle: string;
  credentialsBody: string;
  cta: string;
};

type InternalCopy = {
  common: {
    overview: string;
    when: string;
    evaluate: string;
    bring: string;
    next: string;
    urgent: string;
    related: string;
    faq: string;
    pathway: string;
    assistant: string;
  };
  specialtiesHub: SpecialtiesHub;
  pages: Record<SpecialtyKey, InternalPage>;
  about: AboutInternal;
};

export const internalPages: Record<Language, InternalCopy> = {
  es: {
    common: {
      overview: "Orientación general",
      when: "Cuándo consultar",
      evaluate: "Qué puede evaluar el médico",
      bring: "Qué traer a la consulta",
      next: "Posibles próximos pasos",
      urgent: "Cuándo buscar atención urgente",
      related: "Páginas relacionadas",
      faq: "Preguntas frecuentes",
      pathway: "Ruta del paciente",
      assistant: "Hablar con el asistente",
    },
    specialtiesHub: {
      seoTitle: "Especialidades Urológicas en Panamá | UroPanama",
      seoDescription:
        "Especialidades urológicas en Panamá: próstata, cálculos renales, uro-oncología, endourología, cirugía laparoscópica, salud masculina y segunda opinión.",
      title: "Especialidades urológicas",
      subtitle:
        "Atención especializada para condiciones de próstata, riñón, vías urinarias y salud masculina.",
      intro:
        "Cada paciente requiere una evaluación individual. Esta página ofrece una orientación general sobre las principales áreas de atención y cuándo puede ser recomendable solicitar una consulta.",
      selectorTitle: "Seleccione el área que desea conocer",
      selectorIntro:
        "Explore las rutas de atención más frecuentes y encuentre la página que mejor corresponde a su motivo de consulta.",
      unsureTitle: "¿No está seguro qué necesita?",
      unsureBody:
        "Si no sabe exactamente qué tipo de consulta necesita, puede solicitar orientación inicial. El equipo puede ayudarle a coordinar la cita adecuada según el motivo de consulta.",
    },
    about: {
      seoTitle:
        "Dr. Carlos A. Brugiati | Urología, Uro-oncología y Mínima Invasión",
      seoDescription:
        "Conozca el enfoque clínico del Dr. Carlos A. Brugiati en urología, uro-oncología, endourología y cirugía mínimamente invasiva en Panamá.",
      title: "Dr. Carlos A. Brugiati",
      subtitle:
        "Urología, uro-oncología, endourología y cirugía mínimamente invasiva.",
      intro:
        "Atención especializada para pacientes que buscan claridad diagnóstica, orientación médica responsable y opciones de manejo ajustadas a cada caso.",
      clinicalTitle: "Enfoque clínico especializado",
      clinicalBody:
        "El Dr. Carlos A. Brugiati cuenta con más de 10 años de experiencia clínica y quirúrgica. Su práctica se enfoca en patologías urológicas complejas, uro-oncología, endourología, HoLEP, cirugía robótica, laparoscopía avanzada y mínima invasión.",
      philosophyTitle: "Claridad médica para tomar mejores decisiones",
      philosophyBody:
        "La consulta debe ayudar al paciente a entender su condición, sus estudios y los próximos pasos posibles. La comunicación clara, la privacidad y el seguimiento responsable forman parte del proceso de atención.",
      areasTitle: "Áreas de atención",
      areas: [
        { label: "Próstata", href: "/prostata" },
        { label: "Cálculos renales", href: "/calculos-renales" },
        { label: "Uro-oncología", href: "/uro-oncologia" },
        { label: "Endourología", href: "/endourologia" },
        { label: "Cirugía laparoscópica", href: "/cirugia-laparoscopica" },
        { label: "Salud masculina", href: "/salud-masculina" },
      ],
      expectTitle: "Qué puede esperar el paciente",
      expect: [
        "Escucha del motivo de consulta y antecedentes relevantes.",
        "Revisión de estudios disponibles cuando corresponda.",
        "Explicación clara de hallazgos y posibles próximos pasos.",
        "Plan de evaluación o manejo según cada caso.",
        "Seguimiento médico cuando sea necesario.",
      ],
      credentialsTitle: "Formación, membresías y experiencia",
      credentialsBody:
        "Información profesional detallada a confirmar antes de publicación. No se deben publicar credenciales, membresías o cargos sin verificación documental.",
      cta: "Agendar consulta",
    },
    pages: {
      calculosRenales: {
        seoTitle:
          "Cálculos renales en Panamá | Evaluación urológica especializada",
        seoDescription:
          "Evaluación de cálculos renales en Panamá: síntomas, estudios, opciones según tamaño y ubicación, ureteroscopía, láser y seguimiento.",
        title: "Cálculos renales",
        subtitle:
          "Evaluación y manejo de piedras en los riñones o vías urinarias.",
        intro:
          "Una página educativa para entender síntomas, estudios y opciones de manejo según cada caso.",
        overviewTitle: "¿Qué son los cálculos renales?",
        overview:
          "Los cálculos renales son formaciones sólidas que pueden aparecer en los riñones o desplazarse hacia las vías urinarias. Pueden causar dolor, molestias al orinar, sangre en la orina o infecciones. La evaluación médica permite conocer tamaño, ubicación y características del cálculo para definir próximos pasos.",
        whenTitle: "Síntomas frecuentes",
        when: [
          "Dolor intenso en espalda baja o costado.",
          "Dolor que puede irradiarse hacia la pelvis.",
          "Sangre en la orina.",
          "Ardor o molestias al orinar.",
          "Náuseas o urgencia urinaria.",
          "Fiebre o escalofríos en algunos casos.",
        ],
        urgentTitle: "Cuándo buscar atención urgente",
        urgent:
          "Si presenta fiebre, dolor intenso persistente, vómitos, debilidad marcada o dificultad para orinar, busque atención médica urgente.",
        evaluateTitle: "Cómo se evalúan",
        evaluate:
          "La evaluación puede incluir historia clínica, síntomas, análisis de orina, laboratorios, ultrasonido, tomografía y revisión de estudios previos.",
        evaluatePoints: [
          "Ubicación probable del cálculo y relación con el dolor.",
          "Tamaño, número y características visibles en imágenes.",
          "Datos de infección, obstrucción o compromiso de función renal.",
          "Tratamientos previos y evolución desde el inicio de síntomas.",
        ],
        bringTitle: "Qué traer a la consulta",
        bringIntro:
          "Si los tiene disponibles, lleve información que ayude a entender el episodio y estudios previos.",
        bring: [
          "Estudios de imagen.",
          "Laboratorios o análisis de orina.",
          "Medicamentos actuales.",
          "Informes médicos previos.",
          "Fecha de inicio de síntomas.",
          "Preguntas principales.",
        ],
        nextTitle: "Opciones según cada caso",
        nextIntro:
          "El manejo depende del tamaño, ubicación, síntomas y características del cálculo. No todos los pacientes requieren cirugía.",
        next: [
          "Observación y seguimiento.",
          "Manejo médico según valoración.",
          "Ureteroscopía.",
          "Láser para cálculos.",
          "Nefrolitotomía percutánea.",
        ],
        pathwayTitle: "Ruta habitual de evaluación",
        pathway: [
          "Dolor o sospecha",
          "Evaluación médica",
          "Estudios",
          "Plan según tamaño y ubicación",
          "Seguimiento",
        ],
        relatedTitle: "Procedimientos y páginas relacionadas",
        related: [
          { label: "Ureteroscopía", href: "/ureteroscopia" },
          { label: "Endourología", href: "/endourologia" },
          { label: "Agendar cita", href: "/agendar-cita" },
        ],
        faqTitle: "Preguntas frecuentes sobre cálculos renales",
        faq: [
          ["¿Todos los cálculos necesitan cirugía?", "No necesariamente. El manejo depende del tamaño, ubicación, síntomas y condición general del paciente."],
          ["¿Cuándo debo ir a urgencias?", "Busque atención urgente si presenta fiebre, dolor intenso persistente, vómitos, debilidad marcada o dificultad para orinar."],
          ["¿Qué estudios se suelen revisar?", "Pueden revisarse análisis de orina, laboratorios, ultrasonido, tomografía e informes previos."],
          ["¿Qué es la ureteroscopía?", "Es un procedimiento que permite evaluar o tratar ciertas condiciones del uréter, incluyendo algunos casos de cálculos."],
          ["¿Qué debo llevar a la consulta?", "Lleve estudios de imagen, laboratorios, medicamentos actuales, informes previos y preguntas principales."],
          ["¿Puede volver a aparecer un cálculo?", "Puede ocurrir en algunas personas. El seguimiento permite revisar factores de riesgo y orientación preventiva según el caso."],
        ],
        cta: "Agendar evaluación por cálculos renales",
      },
      prostata: {
        seoTitle: "Evaluación de próstata en Panamá | Dr. Carlos Brugiati",
        seoDescription:
          "Evaluación prostática en Panamá: síntomas urinarios, PSA elevado, crecimiento prostático, biopsia y seguimiento preventivo.",
        title: "Próstata",
        subtitle:
          "Evaluación de síntomas prostáticos, PSA elevado, crecimiento prostático y condiciones relacionadas con la próstata.",
        intro:
          "Una consulta privada y ordenada para comprender síntomas, estudios y próximos pasos según cada caso.",
        overviewTitle: "Evaluación prostática",
        overview:
          "La evaluación prostática puede ayudar a ordenar síntomas urinarios, antecedentes, PSA, estudios disponibles y dudas sobre crecimiento prostático o sospecha de enfermedad prostática.",
        whenTitle: "¿Cuándo consultar?",
        when: [
          "Dificultad al orinar o chorro débil.",
          "Levantarse muchas veces en la noche.",
          "Sensación de vaciado incompleto.",
          "PSA elevado o cambios en laboratorios.",
          "Antecedentes familiares.",
          "Seguimiento preventivo.",
        ],
        evaluateTitle: "Qué puede incluir la evaluación",
        evaluate:
          "Puede incluir historia clínica, revisión de síntomas, laboratorios, estudios de imagen o indicaciones adicionales según cada caso.",
        evaluatePoints: [
          "Patrón de síntomas urinarios y tiempo de evolución.",
          "Resultados de PSA y cambios frente a estudios anteriores.",
          "Antecedentes familiares o hallazgos que requieran seguimiento.",
          "Necesidad de imagen, control, biopsia u otra evaluación.",
        ],
        bringTitle: "Qué traer",
        bringIntro:
          "La información previa ayuda a interpretar mejor los síntomas y estudios.",
        bring: [
          "Resultados de PSA.",
          "Laboratorios recientes.",
          "Estudios de imagen.",
          "Informes médicos previos.",
          "Lista de medicamentos.",
          "Preguntas principales.",
        ],
        nextTitle: "Temas que pueden revisarse",
        next: [
          "PSA elevado: no significa automáticamente cáncer, pero puede requerir valoración.",
          "Crecimiento prostático y síntomas urinarios.",
          "Biopsia de próstata si los hallazgos lo justifican.",
          "Seguimiento preventivo o especializado.",
        ],
        relatedTitle: "Páginas relacionadas",
        related: [
          { label: "Uro-oncología", href: "/uro-oncologia" },
          { label: "Segunda opinión", href: "/segunda-opinion" },
          { label: "Salud masculina", href: "/salud-masculina" },
        ],
        faqTitle: "Preguntas frecuentes sobre próstata",
        faq: [
          ["¿Cuándo debo revisar la próstata?", "Depende de edad, síntomas, antecedentes y estudios. La consulta permite definir orientación individual."],
          ["¿Qué significa PSA elevado?", "Un PSA elevado no significa automáticamente cáncer, pero puede requerir valoración médica y seguimiento."],
          ["¿Todos los síntomas urinarios son por próstata?", "No siempre. Los síntomas urinarios pueden tener distintas causas y requieren evaluación."],
          ["¿Cuándo puede indicarse una biopsia?", "Puede considerarse según hallazgos clínicos, laboratorios, imágenes o valoración médica."],
          ["¿Qué debo llevar a la consulta?", "Lleve PSA, laboratorios, imágenes, informes previos y medicamentos actuales si los tiene."],
        ],
        cta: "Agendar evaluación prostática",
      },
      uroOncologia: {
        seoTitle: "Uro-oncología en Panamá | Evaluación especializada",
        seoDescription:
          "Evaluación uro-oncológica especializada en Panamá para sospechas, diagnósticos, estudios alterados, seguimiento y segunda opinión.",
        title: "Uro-oncología",
        subtitle:
          "Evaluación especializada de sospechas, diagnósticos o seguimiento relacionado con cáncer urológico.",
        intro:
          "Una página para pacientes que necesitan revisar estudios, entender un diagnóstico o solicitar una segunda opinión especializada.",
        overviewTitle: "¿Qué es la uro-oncología?",
        overview:
          "La uro-oncología se enfoca en condiciones oncológicas del sistema urológico, como próstata, riñón, vejiga, testículo y otros órganos según cada caso.",
        whenTitle: "Cuándo solicitar evaluación",
        when: [
          "Estudios alterados o sospecha clínica.",
          "PSA elevado.",
          "Sangre en la orina.",
          "Diagnóstico previo.",
          "Recomendación quirúrgica.",
          "Necesidad de segunda opinión.",
        ],
        evaluateTitle: "Revisión de estudios",
        evaluate:
          "La consulta puede incluir revisión de imágenes, laboratorios, biopsias, informes médicos previos y tratamientos anteriores.",
        evaluatePoints: [
          "Órgano urológico involucrado y motivo de sospecha o diagnóstico.",
          "Coherencia entre imágenes, biopsia, laboratorios e informes.",
          "Tratamientos previos o recomendaciones recibidas.",
          "Próximos pasos posibles según la información disponible.",
        ],
        bringTitle: "Qué traer",
        bringIntro:
          "Los documentos previos son especialmente importantes para una evaluación uro-oncológica.",
        bring: [
          "Informes médicos.",
          "Imágenes y reportes.",
          "Laboratorios.",
          "Biopsias si existen.",
          "Tratamientos anteriores.",
          "Preguntas principales.",
        ],
        nextTitle: "Claridad antes de decidir",
        next: [
          "Revisar la información disponible.",
          "Entender el diagnóstico o sospecha.",
          "Definir si faltan estudios.",
          "Conversar opciones de manejo según valoración.",
          "Solicitar segunda opinión si corresponde.",
        ],
        relatedTitle: "Páginas relacionadas",
        related: [
          { label: "Segunda opinión", href: "/segunda-opinion" },
          { label: "Próstata", href: "/prostata" },
          { label: "Cirugía laparoscópica", href: "/cirugia-laparoscopica" },
        ],
        faqTitle: "Preguntas frecuentes sobre uro-oncología",
        faq: [
          ["¿Cuándo pedir una evaluación uro-oncológica?", "Cuando existen estudios alterados, sospecha, diagnóstico previo o necesidad de revisar opciones."],
          ["¿Qué estudios debo llevar?", "Lleve imágenes, laboratorios, biopsias, informes médicos y tratamientos previos si los tiene."],
          ["¿Puedo solicitar una segunda opinión?", "Sí. La segunda opinión puede ayudar a entender mejor estudios y recomendaciones previas."],
          ["¿La consulta define si necesito cirugía?", "No necesariamente. El médico revisa el caso y determina si faltan estudios o qué opciones corresponden."],
          ["¿Qué pasa si tengo un diagnóstico previo?", "Puede revisarse la documentación disponible para orientar próximos pasos según evaluación médica."],
        ],
        cta: "Solicitar evaluación uro-oncológica",
      },
      segundaOpinion: {
        seoTitle:
          "Segunda opinión urológica en Panamá | Dr. Carlos Brugiati",
        seoDescription:
          "Segunda opinión urológica en Panamá para revisar estudios, diagnósticos previos o recomendaciones quirúrgicas antes de decidir.",
        title: "Segunda opinión urológica",
        subtitle:
          "Revisión de estudios, diagnósticos previos o recomendaciones quirúrgicas antes de tomar una decisión médica.",
        intro:
          "Una ruta de alto valor para pacientes que desean entender mejor su caso antes de decidir próximos pasos.",
        overviewTitle: "¿Cuándo pedir una segunda opinión?",
        overview:
          "Una segunda opinión puede ayudarle a revisar un diagnóstico reciente, estudios difíciles de entender, resultados alterados o una recomendación quirúrgica previa.",
        whenTitle: "Motivos frecuentes",
        when: [
          "Diagnóstico reciente.",
          "Cirugía propuesta.",
          "Dudas sobre opciones de tratamiento.",
          "Estudios difíciles de entender.",
          "Resultados alterados.",
          "Deseo de confirmar próximos pasos.",
        ],
        evaluateTitle: "Qué se revisa",
        evaluate:
          "Pueden revisarse informes médicos, estudios de imagen, laboratorios, biopsias, medicamentos actuales y recomendaciones previas.",
        evaluatePoints: [
          "Qué diagnóstico o recomendación desea revisar.",
          "Qué estudios respaldan la recomendación previa.",
          "Qué dudas permanecen antes de tomar una decisión.",
          "Qué información adicional podría hacer falta para orientar el caso.",
        ],
        bringTitle: "Qué traer",
        bringIntro:
          "Mientras más organizada esté la información, más clara puede ser la revisión.",
        bring: [
          "Estudios de imagen.",
          "Informe médico.",
          "Laboratorios.",
          "Biopsia si existe.",
          "Lista de medicamentos.",
          "Preguntas principales.",
        ],
        nextTitle: "Qué puede esperar",
        next: [
          "Revisión de la información disponible.",
          "Preguntas clínicas relevantes.",
          "Explicación de hallazgos y dudas.",
          "Orientación sobre lo que puede corresponder según evaluación.",
        ],
        urgentTitle: "Nota importante",
        urgent:
          "Una segunda opinión no reemplaza atención de urgencia y no garantiza un tratamiento específico.",
        relatedTitle: "Páginas relacionadas",
        related: [
          { label: "Uro-oncología", href: "/uro-oncologia" },
          { label: "Próstata", href: "/prostata" },
          { label: "Cálculos renales", href: "/calculos-renales" },
          { label: "Agendar cita", href: "/agendar-cita" },
        ],
        faqTitle: "Preguntas frecuentes sobre segunda opinión",
        faq: [
          ["¿Necesito tener todos mis estudios?", "No siempre, pero es recomendable llevar todo lo disponible para una revisión más completa."],
          ["¿Puedo pedir segunda opinión si ya me recomendaron cirugía?", "Sí. Puede revisar la recomendación y entender mejor las opciones antes de decidir."],
          ["¿La consulta cambia mi diagnóstico?", "No se puede prometer. La consulta revisa información disponible y orienta próximos pasos según evaluación."],
          ["¿Puedo enviar documentos antes?", "En una versión final del sistema se puede habilitar carga segura de documentos. Por ahora puede coordinar qué traer."],
          ["¿Qué debo preparar?", "Prepare estudios, informes, medicamentos actuales y una lista de preguntas principales."],
        ],
        cta: "Solicitar segunda opinión",
      },
      endourologia: {
        seoTitle:
          "Endourología en Panamá | Procedimientos mínimamente invasivos",
        seoDescription:
          "Endourología en Panamá: procedimientos mínimamente invasivos para vías urinarias, cálculos, obstrucciones, ureteroscopía y cistoscopía.",
        title: "Endourología",
        subtitle:
          "Procedimientos mínimamente invasivos para evaluar o tratar condiciones de las vías urinarias.",
        intro:
          "La endourología es un campo de procedimientos; no es un procedimiento único.",
        overviewTitle: "¿Qué es la endourología?",
        overview:
          "La endourología utiliza instrumentos especializados para evaluar o tratar condiciones de las vías urinarias con abordajes mínimamente invasivos en casos seleccionados.",
        whenTitle: "Cuándo puede ser útil",
        when: [
          "Cálculos urinarios.",
          "Obstrucciones.",
          "Evaluación de vías urinarias.",
          "Condiciones determinadas por estudios.",
        ],
        evaluateTitle: "Cómo se define si corresponde",
        evaluate:
          "El médico revisa síntomas, imágenes, laboratorios y condición general para determinar si un procedimiento endourológico corresponde.",
        evaluatePoints: [
          "Si el problema corresponde a una vía endoscópica o requiere otra ruta.",
          "Tamaño, ubicación y complejidad de cálculos u obstrucciones.",
          "Riesgos asociados a infección, obstrucción o estudios alterados.",
          "Qué procedimiento específico podría discutirse si corresponde.",
        ],
        bringTitle: "Qué traer",
        bringIntro: "Los estudios disponibles ayudan a definir el tipo de evaluación.",
        bring: [
          "Tomografía o ultrasonido.",
          "Análisis de orina.",
          "Laboratorios.",
          "Informes previos.",
          "Medicamentos actuales.",
        ],
        nextTitle: "Procedimientos relacionados",
        next: [
          "Ureteroscopía.",
          "Láser para cálculos.",
          "Cistoscopía.",
          "Nefrolitotomía percutánea.",
        ],
        pathwayTitle: "Endourología vs. ureteroscopía",
        pathway: [
          "Endourología: campo amplio",
          "Ureteroscopía: procedimiento específico",
          "Indicación según estudios",
          "Plan según valoración",
        ],
        relatedTitle: "Páginas relacionadas",
        related: [
          { label: "Ureteroscopía", href: "/ureteroscopia" },
          { label: "Cálculos renales", href: "/calculos-renales" },
          { label: "Agendar cita", href: "/agendar-cita" },
        ],
        faqTitle: "Preguntas frecuentes sobre endourología",
        faq: [
          ["¿La endourología es una cirugía específica?", "No. Es un campo de procedimientos mínimamente invasivos; la ureteroscopía es un ejemplo."],
          ["¿Siempre se necesita un procedimiento?", "No. Primero se requiere evaluación médica para determinar si corresponde."],
          ["¿Se usa para cálculos?", "Puede usarse en determinados casos de cálculos según tamaño, ubicación y síntomas."],
          ["¿Qué estudios debo llevar?", "Imágenes, análisis de orina, laboratorios e informes previos si los tiene."],
          ["¿Qué ocurre después?", "El seguimiento depende del procedimiento, hallazgos y evolución de cada paciente."],
        ],
        cta: "Conocer procedimientos endourológicos",
      },
      ureteroscopia: {
        seoTitle:
          "Ureteroscopía en Panamá | Procedimiento urológico especializado",
        seoDescription:
          "Ureteroscopía en Panamá para evaluar o tratar cálculos y condiciones del uréter según valoración médica.",
        title: "Ureteroscopía",
        subtitle:
          "Procedimiento mínimamente invasivo para evaluar o tratar cálculos y condiciones del uréter.",
        intro:
          "Un procedimiento específico dentro de la endourología que puede indicarse en casos seleccionados.",
        overviewTitle: "¿Qué es la ureteroscopía?",
        overview:
          "La ureteroscopía permite al especialista acceder al uréter y al sistema urinario mediante instrumentos especializados. Puede utilizarse para evaluar o tratar cálculos u otras condiciones según ubicación, tamaño y características.",
        whenTitle: "Cuándo puede indicarse",
        when: [
          "Cálculos ubicados en el uréter.",
          "Dolor asociado a obstrucción urinaria.",
          "Alteraciones de vías urinarias que requieren evaluación.",
          "Necesidad de observar o tratar un área específica según criterio médico.",
        ],
        evaluateTitle: "Relación con cálculos renales",
        evaluate:
          "Puede utilizarse en determinados casos de cálculos, especialmente cuando están ubicados en el uréter o cuando la evaluación médica lo considera adecuado.",
        evaluatePoints: [
          "Ubicación del cálculo o alteración en el uréter.",
          "Grado de obstrucción, dolor o cambios en estudios.",
          "Necesidad de láser u otros instrumentos durante el procedimiento.",
          "Preparación, indicaciones y seguimiento si llega a indicarse.",
        ],
        bringTitle: "Preparación general",
        bringIntro:
          "La preparación depende del caso clínico y de las indicaciones del médico.",
        bring: [
          "Estudios de imagen.",
          "Laboratorios.",
          "Medicamentos actuales.",
          "Alergias conocidas.",
          "Informes previos.",
        ],
        nextTitle: "Qué esperar después",
        next: [
          "Indicaciones posteriores según procedimiento realizado.",
          "Seguimiento para revisar evolución.",
          "Recomendaciones sobre medicamentos o actividad según cada caso.",
          "Consulta de control cuando corresponda.",
        ],
        relatedTitle: "Páginas relacionadas",
        related: [
          { label: "Cálculos renales", href: "/calculos-renales" },
          { label: "Endourología", href: "/endourologia" },
          { label: "Agendar cita", href: "/agendar-cita" },
        ],
        faqTitle: "Preguntas frecuentes sobre ureteroscopía",
        faq: [
          ["¿La ureteroscopía siempre requiere hospitalización?", "Depende del caso, del procedimiento realizado y de la condición del paciente."],
          ["¿Se usa para cálculos renales?", "Puede utilizarse en determinados casos, especialmente si están en el uréter."],
          ["¿Necesito estudios antes?", "Es posible que se requieran imágenes, laboratorios u otros exámenes antes de definir el manejo."],
          ["¿Sustituye la consulta?", "No. Primero se requiere evaluación médica para determinar si corresponde."],
          ["¿Qué debo llevar?", "Lleve imágenes, laboratorios, medicamentos actuales e informes previos si los tiene."],
        ],
        cta: "Consultar sobre ureteroscopía",
      },
      cirugiaLaparoscopica: {
        seoTitle:
          "Cirugía laparoscópica urológica en Panamá | Dr. Carlos Brugiati",
        seoDescription:
          "Cirugía laparoscópica urológica en Panamá: orientación sobre técnicas mínimamente invasivas en casos seleccionados.",
        title: "Cirugía laparoscópica",
        subtitle:
          "Técnicas quirúrgicas mínimamente invasivas utilizadas en determinados casos urológicos.",
        intro:
          "Una página para entender cuándo puede considerarse un abordaje laparoscópico, qué información se revisa y cómo preparar una conversación médica clara antes de decidir.",
        overviewTitle: "¿Qué es la cirugía laparoscópica?",
        overview:
          "La cirugía laparoscópica utiliza pequeñas incisiones e instrumentos especializados para abordar determinados casos urológicos con una técnica de mínima invasión. Puede formar parte del manejo de ciertas condiciones renales, oncológicas o reconstructivas, pero su indicación depende del diagnóstico, los estudios disponibles, la condición general del paciente y la valoración médica.",
        whenTitle: "Cuándo puede considerarse",
        when: [
          "Condiciones renales seleccionadas que requieren valoración quirúrgica.",
          "Hallazgos en imágenes que necesitan una revisión especializada.",
          "Recomendación quirúrgica previa que desea comprender mejor.",
          "Necesidad de revisar si existe una alternativa mínimamente invasiva.",
          "Dudas antes de aceptar una cirugía propuesta.",
          "Seguimiento de una condición urológica compleja.",
        ],
        evaluateTitle: "Qué estudios se revisan",
        evaluate:
          "La consulta suele centrarse en ordenar la información disponible: motivo de consulta, evolución de síntomas, estudios de imagen, laboratorios, informes previos, diagnóstico recibido, antecedentes relevantes, medicamentos y condición general. Con esa información, el médico puede explicar qué hallazgos son importantes, qué datos faltan y si una opción quirúrgica merece discutirse según el caso.",
        evaluatePoints: [
          "Motivo de la recomendación quirúrgica y objetivos del procedimiento.",
          "Hallazgos relevantes en imágenes, laboratorios e informes.",
          "Alternativas razonables o estudios pendientes antes de decidir.",
          "Preparación, riesgos generales y seguimiento si la cirugía corresponde.",
        ],
        bringTitle: "Qué traer",
        bringIntro:
          "Para una revisión quirúrgica seria, es útil traer documentos organizados y, si es posible, los estudios en formato digital o con sus reportes completos.",
        bring: [
          "Tomografía, resonancia, ultrasonido u otras imágenes disponibles.",
          "Reportes escritos de los estudios de imagen.",
          "Laboratorios recientes y análisis de orina si existen.",
          "Informe diagnóstico o resumen médico previo.",
          "Recomendaciones quirúrgicas recibidas.",
          "Lista de medicamentos actuales y alergias conocidas.",
          "Preguntas principales que desea resolver.",
        ],
        nextTitle: "Qué se conversa en consulta",
        nextIntro:
          "La consulta no busca apresurar una decisión. El objetivo es explicar el escenario clínico, revisar alternativas razonables y definir si hacen falta estudios adicionales antes de avanzar.",
        next: [
          "Si realmente corresponde considerar cirugía en este momento.",
          "Qué objetivos tendría el procedimiento si llegara a indicarse.",
          "Qué alternativas pueden existir según diagnóstico y estudios.",
          "Qué información falta antes de tomar una decisión responsable.",
          "Qué riesgos generales, preparación y seguimiento deben conversarse.",
          "Cómo se organizaría el control posterior según cada caso.",
        ],
        relatedTitle: "Páginas relacionadas",
        related: [
          { label: "Uro-oncología", href: "/uro-oncologia" },
          { label: "Segunda opinión", href: "/segunda-opinion" },
          { label: "Cálculos renales", href: "/calculos-renales" },
        ],
        faqTitle: "Preguntas frecuentes sobre cirugía laparoscópica",
        faq: [
          ["¿Siempre se necesita cirugía?", "No. Una consulta quirúrgica no significa que la cirugía sea necesaria. La indicación depende del diagnóstico, los estudios, los síntomas, la condición general del paciente y la valoración médica."],
          ["¿Cómo se define si corresponde un abordaje laparoscópico?", "El médico revisa imágenes, laboratorios, antecedentes, diagnóstico previo, objetivos del manejo y posibles alternativas. Con esa información puede explicar si el abordaje laparoscópico tiene sentido o si se requieren otros pasos antes."],
          ["¿Qué estudios debo llevar?", "Si los tiene, lleve tomografía, resonancia, ultrasonido, reportes escritos, laboratorios, informes médicos previos, lista de medicamentos y cualquier recomendación quirúrgica recibida. Los estudios ayudan a evitar decisiones basadas en información incompleta."],
          ["¿La cirugía laparoscópica es lo mismo que cirugía robótica?", "No necesariamente. Ambas pueden ser técnicas mínimamente invasivas, pero utilizan equipos y formas de trabajo distintas. La opción adecuada depende del caso, la disponibilidad y la valoración médica."],
          ["¿Qué se explica antes de decidir?", "Deben explicarse los hallazgos relevantes, por qué se considera una opción quirúrgica, qué alternativas pueden existir, qué preparación sería necesaria, riesgos generales y cómo se organizaría el seguimiento."],
          ["¿Puedo pedir una segunda opinión si ya me recomendaron cirugía?", "Sí. Una segunda opinión puede ayudar a revisar los estudios, comprender la recomendación previa y aclarar dudas antes de tomar una decisión médica. No garantiza que la recomendación cambie."],
          ["¿La recuperación es siempre rápida?", "No se debe prometer una recuperación específica. La evolución depende del procedimiento, la condición del paciente, los hallazgos, el manejo posterior y las indicaciones médicas."],
          ["¿Qué pasa si faltan estudios?", "Si la información disponible no es suficiente, el médico puede recomendar estudios adicionales antes de definir próximos pasos. Esto ayuda a que la decisión sea más clara y responsable."],
        ],
        cta: "Solicitar orientación quirúrgica",
      },
      saludMasculina: {
        seoTitle: "Salud urológica masculina en Panamá | Consulta privada",
        seoDescription:
          "Consulta privada de salud urológica masculina en Panamá: función sexual, fertilidad, síntomas urinarios y prevención.",
        title: "Salud urológica masculina",
        subtitle:
          "Evaluación médica de función sexual, fertilidad, síntomas urinarios y prevención.",
        intro:
          "Una consulta privada, discreta y respetuosa para hablar de temas que afectan bienestar y calidad de vida.",
        overviewTitle: "Motivos frecuentes",
        overview:
          "La salud urológica masculina incluye función sexual, fertilidad masculina, síntomas urinarios, dolor o molestias y prevención urológica.",
        whenTitle: "Cuándo consultar",
        when: [
          "Cambios en función sexual.",
          "Dudas sobre fertilidad masculina.",
          "Síntomas urinarios.",
          "Dolor o molestias.",
          "Prevención urológica.",
        ],
        evaluateTitle: "Qué puede evaluarse",
        evaluate:
          "Puede revisarse historia clínica, síntomas, medicamentos, laboratorios y estudios según cada caso.",
        evaluatePoints: [
          "Síntomas urinarios, sexuales o de fertilidad que desea conversar.",
          "Medicamentos, antecedentes y factores que pueden influir.",
          "Necesidad de laboratorios o estudios complementarios.",
          "Plan de seguimiento privado y respetuoso según valoración.",
        ],
        bringTitle: "Qué traer",
        bringIntro:
          "La consulta puede ser más clara si trae información relevante disponible.",
        bring: [
          "Medicamentos actuales.",
          "Estudios previos.",
          "Preguntas principales.",
          "Antecedentes relevantes.",
        ],
        nextTitle: "Consulta privada y respetuosa",
        next: [
          "Conversación sin juicio.",
          "Revisión ordenada de síntomas.",
          "Orientación sobre estudios si corresponden.",
          "Seguimiento según valoración médica.",
        ],
        relatedTitle: "Páginas relacionadas",
        related: [
          { label: "Próstata", href: "/prostata" },
          { label: "Segunda opinión", href: "/segunda-opinion" },
          { label: "Agendar cita", href: "/agendar-cita" },
        ],
        faqTitle: "Preguntas frecuentes sobre salud masculina",
        faq: [
          ["¿Cuándo consultar por salud masculina?", "Cuando existan cambios en función sexual, fertilidad, síntomas urinarios, dolor o dudas preventivas."],
          ["¿La consulta es privada?", "Sí. La privacidad y discreción forman parte esencial de la atención."],
          ["¿Qué información debo llevar?", "Medicamentos actuales, estudios previos, antecedentes y preguntas principales."],
          ["¿Se pueden tratar temas de función sexual?", "Sí. Pueden conversarse de forma médica, privada y respetuosa."],
          ["¿También se evalúan síntomas urinarios?", "Sí. Los síntomas urinarios forman parte de la evaluación urológica masculina."],
        ],
        cta: "Agendar consulta privada",
      },
    },
  },
  en: {
    common: {
      overview: "General guidance",
      when: "When to consult",
      evaluate: "What the doctor may evaluate",
      bring: "What to bring",
      next: "Possible next steps",
      urgent: "When to seek urgent care",
      related: "Related pages",
      faq: "Frequently asked questions",
      pathway: "Patient pathway",
      assistant: "Talk to the assistant",
    },
    specialtiesHub: {
      seoTitle: "Urology Specialties in Panama | UroPanama",
      seoDescription:
        "Urology specialties in Panama: prostate, kidney stones, uro-oncology, endourology, laparoscopic surgery, men's health, and second opinion.",
      title: "Urology specialties",
      subtitle:
        "Specialized care for prostate, kidney, urinary tract, and men's health conditions.",
      intro:
        "Each patient requires individual evaluation. This page offers general guidance on the main areas of care and when it may be appropriate to request a visit.",
      selectorTitle: "Select the area you want to explore",
      selectorIntro:
        "Explore the most common care pathways and find the page that best matches your reason for consultation.",
      unsureTitle: "Not sure what you need?",
      unsureBody:
        "If you are not sure what type of visit you need, you can request initial guidance. The team can help coordinate the right appointment based on your concern.",
    },
    about: {
      seoTitle:
        "Dr. Carlos A. Brugiati | Urology, Uro-oncology and Minimally Invasive Surgery",
      seoDescription:
        "Learn about Dr. Carlos A. Brugiati's clinical focus in urology, uro-oncology, endourology, and minimally invasive surgery in Panama.",
      title: "Dr. Carlos A. Brugiati",
      subtitle:
        "Urology, uro-oncology, endourology, and minimally invasive surgery.",
      intro:
        "Specialized care for patients seeking diagnostic clarity, responsible medical guidance, and management options tailored to each case.",
      clinicalTitle: "Specialized clinical focus",
      clinicalBody:
        "Dr. Carlos A. Brugiati has more than 10 years of clinical and surgical experience. His practice focuses on complex urologic conditions, uro-oncology, endourology, HoLEP, robotic surgery, advanced laparoscopy, and minimally invasive care.",
      philosophyTitle: "Medical clarity for better decisions",
      philosophyBody:
        "The visit should help patients understand their condition, studies, and possible next steps. Clear communication, privacy, and responsible follow-up are part of the care process.",
      areasTitle: "Areas of care",
      areas: [
        { label: "Prostate", href: "/prostata" },
        { label: "Kidney stones", href: "/calculos-renales" },
        { label: "Uro-oncology", href: "/uro-oncologia" },
        { label: "Endourology", href: "/endourologia" },
        { label: "Laparoscopic surgery", href: "/cirugia-laparoscopica" },
        { label: "Men's health", href: "/salud-masculina" },
      ],
      expectTitle: "What patients can expect",
      expect: [
        "Listening to the main concern and relevant history.",
        "Review of available studies when appropriate.",
        "Clear explanation of findings and possible next steps.",
        "Evaluation or management plan according to each case.",
        "Medical follow-up when needed.",
      ],
      credentialsTitle: "Training, memberships, and experience",
      credentialsBody:
        "Detailed professional information to be confirmed before publication. Credentials, memberships, or roles should not be published without documentation.",
      cta: "Book visit",
    },
    pages: {
      calculosRenales: {
        seoTitle: "Kidney stones in Panama | Specialized urology evaluation",
        seoDescription:
          "Kidney stone evaluation in Panama: symptoms, studies, options by size and location, ureteroscopy, laser, and follow-up.",
        title: "Kidney stones",
        subtitle: "Evaluation and management of stones in the kidneys or urinary tract.",
        intro: "An educational page to understand symptoms, studies, and options according to each case.",
        overviewTitle: "What are kidney stones?",
        overview: "Kidney stones are solid formations that may appear in the kidneys or move into the urinary tract. They can cause pain, urinary discomfort, blood in urine, or infections. Medical evaluation helps determine size, location, and stone characteristics before next steps are defined.",
        whenTitle: "Common symptoms",
        when: ["Severe lower back or side pain.", "Pain that may radiate toward the pelvis.", "Blood in urine.", "Burning or discomfort when urinating.", "Nausea or urinary urgency.", "Fever or chills in some cases."],
        urgentTitle: "When to seek urgent care",
        urgent: "If you have fever, persistent severe pain, vomiting, marked weakness, or difficulty urinating, seek urgent medical care.",
        evaluateTitle: "How they are evaluated",
        evaluate: "Evaluation may include medical history, symptoms, urine analysis, labs, ultrasound, CT scan, and review of prior studies.",
        bringTitle: "What to bring",
        bringIntro: "If available, bring information that helps clarify the episode and prior studies.",
        bring: ["Imaging studies.", "Labs or urine tests.", "Current medications.", "Previous medical reports.", "Date symptoms began.", "Main questions."],
        nextTitle: "Options according to each case",
        nextIntro: "Management depends on stone size, location, symptoms, and characteristics. Not every patient needs surgery.",
        next: ["Observation and follow-up.", "Medical management after evaluation.", "Ureteroscopy.", "Laser for stones.", "Percutaneous nephrolithotomy."],
        pathwayTitle: "Typical evaluation pathway",
        pathway: ["Pain or suspicion", "Medical evaluation", "Studies", "Plan by size and location", "Follow-up"],
        relatedTitle: "Related procedures and pages",
        related: [{ label: "Ureteroscopy", href: "/ureteroscopia" }, { label: "Endourology", href: "/endourologia" }, { label: "Book visit", href: "/agendar-cita" }],
        faqTitle: "Kidney stone FAQs",
        faq: [
          ["Do all stones need surgery?", "Not necessarily. Management depends on size, location, symptoms, and the patient's overall condition."],
          ["When should I go to urgent care?", "Seek urgent care if you have fever, persistent severe pain, vomiting, marked weakness, or difficulty urinating."],
          ["What studies are usually reviewed?", "Urine tests, labs, ultrasound, CT scan, and prior reports may be reviewed."],
          ["What is ureteroscopy?", "It is a procedure that allows evaluation or treatment of certain ureter conditions, including selected stone cases."],
          ["What should I bring?", "Bring imaging studies, labs, current medications, prior reports, and main questions."],
          ["Can stones come back?", "They can recur in some people. Follow-up can review risk factors and prevention guidance according to the case."],
        ],
        cta: "Book kidney stone evaluation",
      },
      prostata: {
        seoTitle: "Prostate evaluation in Panama | Dr. Carlos Brugiati",
        seoDescription: "Prostate evaluation in Panama: urinary symptoms, elevated PSA, enlarged prostate, biopsy, and preventive follow-up.",
        title: "Prostate",
        subtitle: "Evaluation of prostate symptoms, elevated PSA, enlarged prostate, and prostate-related conditions.",
        intro: "A private and organized visit to understand symptoms, studies, and next steps according to each case.",
        overviewTitle: "Prostate evaluation",
        overview: "Prostate evaluation can help organize urinary symptoms, history, PSA, available studies, and questions about enlarged prostate or suspected prostate disease.",
        whenTitle: "When to consult",
        when: ["Difficulty urinating or weak stream.", "Waking up often at night.", "Feeling of incomplete emptying.", "Elevated PSA or lab changes.", "Family history.", "Preventive follow-up."],
        evaluateTitle: "What evaluation may include",
        evaluate: "It may include medical history, symptom review, labs, imaging studies, or additional indications according to each case.",
        bringTitle: "What to bring",
        bringIntro: "Prior information helps interpret symptoms and studies more clearly.",
        bring: ["PSA results.", "Recent labs.", "Imaging studies.", "Previous medical reports.", "Medication list.", "Main questions."],
        nextTitle: "Topics that may be reviewed",
        next: ["Elevated PSA: it does not automatically mean cancer, but may require evaluation.", "Enlarged prostate and urinary symptoms.", "Prostate biopsy if findings justify it.", "Preventive or specialized follow-up."],
        relatedTitle: "Related pages",
        related: [{ label: "Uro-oncology", href: "/uro-oncologia" }, { label: "Second opinion", href: "/segunda-opinion" }, { label: "Men's health", href: "/salud-masculina" }],
        faqTitle: "Prostate FAQs",
        faq: [
          ["When should I check my prostate?", "It depends on age, symptoms, history, and studies. Consultation helps define individual guidance."],
          ["What does elevated PSA mean?", "Elevated PSA does not automatically mean cancer, but it may require medical evaluation and follow-up."],
          ["Are all urinary symptoms from the prostate?", "Not always. Urinary symptoms can have different causes and require evaluation."],
          ["When may biopsy be indicated?", "It may be considered based on clinical findings, labs, imaging, or medical evaluation."],
          ["What should I bring?", "Bring PSA, labs, imaging, prior reports, and current medications if available."],
        ],
        cta: "Book prostate evaluation",
      },
      uroOncologia: {
        seoTitle: "Uro-oncology in Panama | Specialized evaluation",
        seoDescription: "Specialized uro-oncology evaluation in Panama for suspected findings, diagnoses, abnormal studies, follow-up, and second opinions.",
        title: "Uro-oncology",
        subtitle: "Specialized evaluation of suspected, diagnosed, or follow-up urologic cancer-related conditions.",
        intro: "A page for patients who need to review studies, understand a diagnosis, or request a specialized second opinion.",
        overviewTitle: "What is uro-oncology?",
        overview: "Uro-oncology focuses on cancer-related conditions of the urologic system, including prostate, kidney, bladder, testicular, and other organs according to each case.",
        whenTitle: "When to request evaluation",
        when: ["Abnormal studies or clinical suspicion.", "Elevated PSA.", "Blood in urine.", "Prior diagnosis.", "Surgical recommendation.", "Need for second opinion."],
        evaluateTitle: "Study review",
        evaluate: "The visit may include review of imaging, labs, biopsies, prior medical reports, and previous treatments.",
        bringTitle: "What to bring",
        bringIntro: "Prior documents are especially important for uro-oncology evaluation.",
        bring: ["Medical reports.", "Images and reports.", "Labs.", "Biopsies if available.", "Previous treatments.", "Main questions."],
        nextTitle: "Clarity before deciding",
        next: ["Review available information.", "Understand the diagnosis or suspicion.", "Define whether additional studies are needed.", "Discuss management options after evaluation.", "Request second opinion when appropriate."],
        relatedTitle: "Related pages",
        related: [{ label: "Second opinion", href: "/segunda-opinion" }, { label: "Prostate", href: "/prostata" }, { label: "Laparoscopic surgery", href: "/cirugia-laparoscopica" }],
        faqTitle: "Uro-oncology FAQs",
        faq: [
          ["When should I request uro-oncology evaluation?", "When there are abnormal studies, suspicion, prior diagnosis, or a need to review options."],
          ["What studies should I bring?", "Bring imaging, labs, biopsies, medical reports, and previous treatments if available."],
          ["Can I request a second opinion?", "Yes. A second opinion can help clarify prior studies and recommendations."],
          ["Does the visit define whether I need surgery?", "Not necessarily. The doctor reviews the case and determines whether more studies or options are appropriate."],
          ["What if I already have a diagnosis?", "Available documentation can be reviewed to guide next steps after medical evaluation."],
        ],
        cta: "Request uro-oncology evaluation",
      },
      segundaOpinion: {
        seoTitle: "Urologic second opinion in Panama | Dr. Carlos Brugiati",
        seoDescription: "Urologic second opinion in Panama to review studies, previous diagnoses, or surgical recommendations before deciding.",
        title: "Urologic second opinion",
        subtitle: "Review of studies, prior diagnoses, or surgical recommendations before making a medical decision.",
        intro: "A high-value pathway for patients who want to better understand their case before deciding next steps.",
        overviewTitle: "When to request a second opinion",
        overview: "A second opinion can help review a recent diagnosis, hard-to-understand studies, abnormal results, or a previous surgical recommendation.",
        whenTitle: "Common reasons",
        when: ["Recent diagnosis.", "Proposed surgery.", "Questions about treatment options.", "Studies that are hard to understand.", "Abnormal results.", "Desire to confirm next steps."],
        evaluateTitle: "What is reviewed",
        evaluate: "Medical reports, imaging studies, labs, biopsies, current medications, and prior recommendations may be reviewed.",
        bringTitle: "What to bring",
        bringIntro: "The more organized the information, the clearer the review can be.",
        bring: ["Imaging studies.", "Medical report.", "Labs.", "Biopsy if available.", "Medication list.", "Main questions."],
        nextTitle: "What to expect",
        next: ["Review of available information.", "Relevant clinical questions.", "Explanation of findings and doubts.", "Guidance on what may correspond after evaluation."],
        urgentTitle: "Important safety note",
        urgent: "A second opinion does not replace emergency care and does not guarantee a specific treatment.",
        relatedTitle: "Related pages",
        related: [{ label: "Uro-oncology", href: "/uro-oncologia" }, { label: "Prostate", href: "/prostata" }, { label: "Kidney stones", href: "/calculos-renales" }, { label: "Book visit", href: "/agendar-cita" }],
        faqTitle: "Second opinion FAQs",
        faq: [
          ["Do I need all my studies?", "Not always, but bringing everything available is recommended for a more complete review."],
          ["Can I request it if surgery was already recommended?", "Yes. You can review the recommendation and better understand options before deciding."],
          ["Does the visit change my diagnosis?", "This cannot be promised. The visit reviews available information and guides next steps after evaluation."],
          ["Can I send documents before?", "A future system can enable secure document upload. For now, you can coordinate what to bring."],
          ["What should I prepare?", "Prepare studies, reports, current medications, and a list of main questions."],
        ],
        cta: "Request second opinion",
      },
      endourologia: {
        seoTitle: "Endourology in Panama | Minimally invasive procedures",
        seoDescription: "Endourology in Panama: minimally invasive urinary tract procedures for stones, obstructions, ureteroscopy, and cystoscopy.",
        title: "Endourology",
        subtitle: "Minimally invasive procedures to evaluate or treat urinary tract conditions.",
        intro: "Endourology is a procedural field; it is not a single procedure.",
        overviewTitle: "What is endourology?",
        overview: "Endourology uses specialized instruments to evaluate or treat urinary tract conditions through minimally invasive approaches in selected cases.",
        whenTitle: "When it may be useful",
        when: ["Urinary stones.", "Obstructions.", "Urinary tract evaluation.", "Conditions identified by studies."],
        evaluateTitle: "How appropriateness is defined",
        evaluate: "The doctor reviews symptoms, imaging, labs, and general condition to determine whether an endourologic procedure is appropriate.",
        bringTitle: "What to bring",
        bringIntro: "Available studies help define the type of evaluation.",
        bring: ["CT scan or ultrasound.", "Urine test.", "Labs.", "Prior reports.", "Current medications."],
        nextTitle: "Related procedures",
        next: ["Ureteroscopy.", "Laser for stones.", "Cystoscopy.", "Percutaneous nephrolithotomy."],
        pathwayTitle: "Endourology vs. ureteroscopy",
        pathway: ["Endourology: broad field", "Ureteroscopy: specific procedure", "Indication by studies", "Plan after evaluation"],
        relatedTitle: "Related pages",
        related: [{ label: "Ureteroscopy", href: "/ureteroscopia" }, { label: "Kidney stones", href: "/calculos-renales" }, { label: "Book visit", href: "/agendar-cita" }],
        faqTitle: "Endourology FAQs",
        faq: [
          ["Is endourology a specific surgery?", "No. It is a field of minimally invasive procedures; ureteroscopy is one example."],
          ["Is a procedure always needed?", "No. Medical evaluation is required first to determine whether it is appropriate."],
          ["Is it used for stones?", "It may be used for selected stone cases according to size, location, and symptoms."],
          ["What studies should I bring?", "Bring imaging, urine tests, labs, and prior reports if available."],
          ["What happens afterward?", "Follow-up depends on the procedure, findings, and each patient's evolution."],
        ],
        cta: "Explore endourologic procedures",
      },
      ureteroscopia: {
        seoTitle: "Ureteroscopy in Panama | Specialized urologic procedure",
        seoDescription: "Ureteroscopy in Panama to evaluate or treat stones and ureter conditions according to medical evaluation.",
        title: "Ureteroscopy",
        subtitle: "A minimally invasive procedure to evaluate or treat stones and ureter conditions.",
        intro: "A specific procedure within endourology that may be indicated in selected cases.",
        overviewTitle: "What is ureteroscopy?",
        overview: "Ureteroscopy allows the specialist to access the ureter and urinary system using specialized instruments. It may be used to evaluate or treat stones or other conditions depending on location, size, and characteristics.",
        whenTitle: "When it may be indicated",
        when: ["Stones located in the ureter.", "Pain related to urinary obstruction.", "Urinary tract changes requiring evaluation.", "Need to observe or treat a specific area according to medical criteria."],
        evaluateTitle: "Relationship with kidney stones",
        evaluate: "It may be used in selected stone cases, especially when stones are located in the ureter or when medical evaluation considers it appropriate.",
        bringTitle: "General preparation",
        bringIntro: "Preparation depends on the clinical case and the doctor's instructions.",
        bring: ["Imaging studies.", "Labs.", "Current medications.", "Known allergies.", "Prior reports."],
        nextTitle: "What to expect afterward",
        next: ["Post-procedure instructions according to what was performed.", "Follow-up to review progress.", "Medication or activity recommendations according to each case.", "Control visit when appropriate."],
        relatedTitle: "Related pages",
        related: [{ label: "Kidney stones", href: "/calculos-renales" }, { label: "Endourology", href: "/endourologia" }, { label: "Book visit", href: "/agendar-cita" }],
        faqTitle: "Ureteroscopy FAQs",
        faq: [
          ["Does ureteroscopy always require hospitalization?", "It depends on the case, procedure performed, and patient condition."],
          ["Is it used for kidney stones?", "It may be used in selected cases, especially when stones are in the ureter."],
          ["Do I need studies before?", "Imaging, labs, or other tests may be needed before defining management."],
          ["Does it replace consultation?", "No. Medical evaluation is required first to determine whether it is appropriate."],
          ["What should I bring?", "Bring imaging, labs, current medications, and prior reports if available."],
        ],
        cta: "Ask about ureteroscopy",
      },
      cirugiaLaparoscopica: {
        seoTitle: "Urologic laparoscopic surgery in Panama | Dr. Carlos Brugiati",
        seoDescription: "Urologic laparoscopic surgery in Panama: guidance on minimally invasive techniques in selected cases.",
        title: "Laparoscopic surgery",
        subtitle: "Minimally invasive surgical techniques used in selected urologic cases.",
        intro: "A page to understand when a laparoscopic approach may be considered, what information is reviewed, and how to prepare for a clear medical conversation before deciding.",
        overviewTitle: "What is laparoscopic surgery?",
        overview: "Laparoscopic surgery uses small incisions and specialized instruments to approach selected urologic cases with a minimally invasive technique. It may be part of the management of certain kidney, oncologic, or reconstructive conditions, but its indication depends on diagnosis, available studies, the patient's general condition, and medical evaluation.",
        whenTitle: "When it may be considered",
        when: ["Selected kidney conditions that require surgical evaluation.", "Imaging findings that need specialist review.", "A previous surgical recommendation you want to better understand.", "Need to review whether a minimally invasive option may apply.", "Questions before accepting a proposed surgery.", "Follow-up of a complex urologic condition."],
        evaluateTitle: "What studies are reviewed",
        evaluate: "The visit usually focuses on organizing the available information: reason for consultation, symptom timeline, imaging studies, labs, previous reports, diagnosis received, relevant history, medications, and general condition. With that information, the doctor can explain which findings matter, what information may be missing, and whether a surgical option should be discussed according to the case.",
        bringTitle: "What to bring",
        bringIntro: "For a serious surgical review, it helps to bring organized documents and, when possible, imaging studies in digital format or with complete written reports.",
        bring: ["CT scan, MRI, ultrasound, or other available imaging.", "Written imaging reports.", "Recent labs and urine tests if available.", "Diagnostic report or prior medical summary.", "Previous surgical recommendations.", "Current medication list and known allergies.", "Main questions you want answered."],
        nextTitle: "What is discussed in consultation",
        nextIntro: "The visit is not meant to rush a decision. The goal is to explain the clinical scenario, review reasonable alternatives, and define whether additional studies are needed before moving forward.",
        next: ["Whether surgery should truly be considered at this time.", "What the goal of the procedure would be if indicated.", "What alternatives may exist according to diagnosis and studies.", "What information is still missing before a responsible decision.", "What general risks, preparation, and follow-up should be discussed.", "How follow-up would be organized according to each case."],
        relatedTitle: "Related pages",
        related: [{ label: "Uro-oncology", href: "/uro-oncologia" }, { label: "Second opinion", href: "/segunda-opinion" }, { label: "Kidney stones", href: "/calculos-renales" }],
        faqTitle: "Laparoscopic surgery FAQs",
        faq: [
          ["Is surgery always needed?", "No. A surgical consultation does not mean surgery is necessary. Indication depends on diagnosis, studies, symptoms, the patient's general condition, and medical evaluation."],
          ["How is a laparoscopic approach considered?", "The doctor reviews imaging, labs, history, prior diagnosis, management goals, and possible alternatives. This helps clarify whether laparoscopy makes sense or whether other steps are needed first."],
          ["What studies should I bring?", "Bring CT scan, MRI, ultrasound, written reports, labs, previous medical summaries, current medications, and any prior surgical recommendation. These materials help avoid decisions based on incomplete information."],
          ["Is laparoscopic surgery the same as robotic surgery?", "Not necessarily. Both can be minimally invasive approaches, but they use different equipment and workflows. The appropriate option depends on the case, availability, and medical evaluation."],
          ["What is explained before deciding?", "Relevant findings, why surgery is being considered, possible alternatives, preparation, general risks, and follow-up should be explained according to each case."],
          ["Can I request a second opinion if surgery was recommended?", "Yes. A second opinion can help review the studies, understand the previous recommendation, and clarify questions before making a medical decision. It does not guarantee the recommendation will change."],
          ["Is recovery always quick?", "A specific recovery timeline should not be promised. Recovery depends on the procedure, the patient's condition, findings, postoperative care, and medical instructions."],
          ["What if more studies are needed?", "If the available information is not enough, the doctor may recommend additional studies before defining next steps. This supports a clearer and more responsible decision."],
        ],
        cta: "Request surgical guidance",
      },
      saludMasculina: {
        seoTitle: "Men's urologic health in Panama | Private consultation",
        seoDescription: "Private men's urologic health consultation in Panama: sexual function, fertility, urinary symptoms, and prevention.",
        title: "Men's urologic health",
        subtitle: "Medical evaluation of sexual function, fertility, urinary symptoms, and prevention.",
        intro: "A private, discreet, and respectful visit to discuss topics that affect well-being and quality of life.",
        overviewTitle: "Common reasons",
        overview: "Men's urologic health includes sexual function, male fertility, urinary symptoms, pain or discomfort, and urologic prevention.",
        whenTitle: "When to consult",
        when: ["Changes in sexual function.", "Questions about male fertility.", "Urinary symptoms.", "Pain or discomfort.", "Urologic prevention."],
        evaluateTitle: "What may be evaluated",
        evaluate: "Medical history, symptoms, medications, labs, and studies may be reviewed according to each case.",
        bringTitle: "What to bring",
        bringIntro: "The visit can be clearer if you bring relevant available information.",
        bring: ["Current medications.", "Previous studies.", "Main questions.", "Relevant history."],
        nextTitle: "Private and respectful consultation",
        next: ["Non-judgmental conversation.", "Organized symptom review.", "Guidance on studies when appropriate.", "Follow-up according to medical evaluation."],
        relatedTitle: "Related pages",
        related: [{ label: "Prostate", href: "/prostata" }, { label: "Second opinion", href: "/segunda-opinion" }, { label: "Book visit", href: "/agendar-cita" }],
        faqTitle: "Men's health FAQs",
        faq: [
          ["When should I consult for men's health?", "When there are changes in sexual function, fertility questions, urinary symptoms, pain, or preventive concerns."],
          ["Is the visit private?", "Yes. Privacy and discretion are essential parts of care."],
          ["What information should I bring?", "Current medications, prior studies, history, and main questions."],
          ["Can sexual function be discussed?", "Yes. These topics can be discussed medically, privately, and respectfully."],
          ["Are urinary symptoms also evaluated?", "Yes. Urinary symptoms are part of men's urologic evaluation."],
        ],
        cta: "Book private consultation",
      },
    },
  },
};
