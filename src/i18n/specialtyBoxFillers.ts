import type { Language, SpecialtyKey } from "./translations";

type BoxFiller = {
  when?: string[];
  bringIntro: string;
  bring: string[];
  nextIntro: string;
  next: string[];
};

export const specialtyBoxFillers: Record<
  Language,
  Partial<Record<SpecialtyKey, BoxFiller>>
> = {
  es: {
    calculosRenales: {
      bringIntro:
        "Si los tiene disponibles, lleve documentos que permitan entender el episodio actual, comparar evolución y revisar si existen señales de obstrucción, infección o recurrencia.",
      bring: [
        "Tomografía, ultrasonido u otros estudios de imagen.",
        "Reportes escritos y enlaces o discos con imágenes.",
        "Análisis de orina y laboratorios recientes.",
        "Medicamentos actuales y tratamientos recibidos.",
        "Fecha de inicio, intensidad y cambios del dolor.",
        "Episodios previos de cálculos o procedimientos anteriores.",
        "Preguntas principales sobre manejo y prevención.",
      ],
      nextIntro:
        "El objetivo es definir una ruta segura según tamaño, ubicación, síntomas y estudios disponibles. No todos los cálculos requieren intervención.",
      next: [
        "Confirmar ubicación, tamaño y posible obstrucción.",
        "Revisar si hay datos de infección o compromiso renal.",
        "Definir si corresponde observación, manejo médico o procedimiento.",
        "Conversar ureteroscopía, láser o cirugía percutánea si aplica.",
        "Explicar señales de alarma y cuándo buscar urgencias.",
        "Planificar seguimiento y prevención según el caso.",
      ],
    },
    prostata: {
      bringIntro:
        "La evaluación prostática se entiende mejor cuando se comparan síntomas, laboratorios y antecedentes en el tiempo.",
      bring: [
        "Resultados de PSA actuales y anteriores.",
        "Laboratorios recientes y estudios de orina si existen.",
        "Ultrasonido, resonancia u otros estudios disponibles.",
        "Informes de biopsia o procedimientos previos si aplica.",
        "Lista de medicamentos, suplementos y antecedentes familiares.",
        "Registro de síntomas urinarios y frecuencia nocturna.",
        "Preguntas sobre prevención, seguimiento o privacidad.",
      ],
      nextIntro:
        "La consulta ayuda a diferenciar síntomas, interpretar el PSA con contexto y decidir si hacen falta controles o estudios adicionales.",
      next: [
        "Revisar síntomas urinarios y calidad de vida.",
        "Interpretar PSA frente a edad, antecedentes y estudios previos.",
        "Conversar crecimiento prostático, inflamación u otras causas posibles.",
        "Definir si corresponde imagen, control o biopsia según hallazgos.",
        "Explicar próximos pasos sin asumir un diagnóstico.",
        "Planificar seguimiento preventivo o especializado.",
      ],
    },
    uroOncologia: {
      bringIntro:
        "En uro-oncología, la revisión ordenada de documentos permite entender mejor el diagnóstico, la sospecha o la recomendación recibida.",
      bring: [
        "Informes médicos y resumen del diagnóstico si existe.",
        "Imágenes, reportes y enlaces o discos disponibles.",
        "Biopsias, patología o reportes histológicos si aplica.",
        "Laboratorios, PSA u otros marcadores relevantes.",
        "Tratamientos previos, fechas y recomendaciones recibidas.",
        "Lista de medicamentos y antecedentes importantes.",
        "Preguntas sobre opciones, seguimiento o segunda opinión.",
      ],
      nextIntro:
        "El enfoque es revisar evidencia disponible, aclarar dudas y definir si faltan estudios antes de conversar opciones de manejo.",
      next: [
        "Ordenar diagnóstico, sospecha o hallazgos alterados.",
        "Revisar concordancia entre imágenes, biopsias y laboratorios.",
        "Identificar información faltante o estudios pendientes.",
        "Conversar opciones de manejo según valoración médica.",
        "Definir si una segunda opinión puede aportar claridad.",
        "Planificar seguimiento responsable y seguro.",
      ],
    },
    segundaOpinion: {
      bringIntro:
        "La segunda opinión es más útil cuando la información llega organizada y permite entender qué decisión médica necesita tomar.",
      bring: [
        "Informe médico principal o resumen del caso.",
        "Estudios de imagen con reportes y archivos disponibles.",
        "Laboratorios, biopsias o patología si existen.",
        "Recomendación quirúrgica o plan propuesto previamente.",
        "Lista de medicamentos y tratamientos recibidos.",
        "Preguntas concretas que desea aclarar.",
        "Fechas importantes del diagnóstico o evolución.",
      ],
      nextIntro:
        "La consulta no promete cambiar una indicación; busca revisar la información, explicar el razonamiento médico y ayudarle a decidir con más claridad.",
      next: [
        "Identificar qué recomendación o diagnóstico desea revisar.",
        "Revisar evidencia disponible y documentos clave.",
        "Aclarar qué información falta o qué estudios podrían requerirse.",
        "Explicar alternativas razonables según valoración médica.",
        "Distinguir dudas clínicas de situaciones de urgencia.",
        "Definir próximos pasos para consulta, seguimiento o coordinación.",
      ],
    },
    endourologia: {
      when: [
        "Cálculos urinarios con dolor o estudios alterados.",
        "Obstrucciones o estrecheces sospechadas en vías urinarias.",
        "Necesidad de evaluar vejiga, uréter o sistema urinario.",
        "Resultados de imagen que requieren explicación especializada.",
        "Dudas sobre ureteroscopía, cistoscopía o láser.",
        "Seguimiento después de un procedimiento o episodio urinario.",
      ],
      bringIntro:
        "Los estudios ayudan a determinar si un problema de vías urinarias puede evaluarse o tratarse con técnicas endourológicas.",
      bring: [
        "Tomografía, ultrasonido o estudios de imagen recientes.",
        "Análisis de orina y urocultivo si existen.",
        "Laboratorios de función renal u otros resultados relevantes.",
        "Informes de procedimientos urinarios previos.",
        "Medicamentos actuales, anticoagulantes y alergias.",
        "Síntomas principales y tiempo de evolución.",
        "Preguntas sobre procedimiento, preparación y seguimiento.",
      ],
      nextIntro:
        "La endourología agrupa procedimientos; la consulta define si alguno corresponde o si se necesita otra ruta de evaluación.",
      next: [
        "Confirmar si el problema corresponde a vías urinarias.",
        "Revisar imágenes para ubicar cálculos, obstrucciones o hallazgos.",
        "Diferenciar ureteroscopía, cistoscopía u otros procedimientos.",
        "Conversar beneficios, límites y preparación si aplica.",
        "Definir si faltan estudios antes de indicar un procedimiento.",
        "Planificar seguimiento según hallazgos y evolución.",
      ],
    },
    ureteroscopia: {
      when: [
        "Cálculos ubicados o sospechados en el uréter.",
        "Dolor asociado a posible obstrucción urinaria.",
        "Hidronefrosis, dilatación o hallazgos en imágenes.",
        "Necesidad de valorar uso de láser en casos seleccionados.",
        "Síntomas persistentes pese a manejo inicial.",
        "Dudas sobre preparación, seguimiento o segunda opinión.",
      ],
      bringIntro:
        "La preparación depende de estudios, síntomas y condición general; llevar información completa ayuda a valorar si la ureteroscopía corresponde.",
      bring: [
        "Tomografía, ultrasonido o reportes de imagen.",
        "Laboratorios, análisis de orina y cultivos si existen.",
        "Medicamentos actuales, anticoagulantes y alergias.",
        "Informes de urgencias, hospitalizaciones o procedimientos previos.",
        "Fecha de inicio del dolor o síntomas urinarios.",
        "Preguntas sobre láser, catéter, seguimiento o recuperación.",
      ],
      nextIntro:
        "La consulta permite explicar si el procedimiento aplica, qué estudios respaldan la decisión y qué cuidados podrían requerirse.",
      next: [
        "Revisar ubicación del cálculo o alteración en el uréter.",
        "Confirmar si hay obstrucción, infección o dolor persistente.",
        "Conversar si puede requerirse láser u otro instrumento.",
        "Explicar preparación general y posibles cuidados posteriores.",
        "Definir seguimiento y señales de alarma.",
        "Coordinar próximos pasos solo si la indicación corresponde.",
      ],
    },
    cirugiaLaparoscopica: {
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
    },
    saludMasculina: {
      when: [
        "Cambios en función sexual o deseo de orientación médica.",
        "Dudas sobre fertilidad masculina o estudios previos.",
        "Síntomas urinarios, ardor, frecuencia o urgencia.",
        "Dolor, molestias pélvicas o cambios que afectan calidad de vida.",
        "Necesidad de prevención urológica y conversación privada.",
        "Preguntas sensibles que requieren un espacio respetuoso.",
      ],
      bringIntro:
        "No necesita preparar una explicación perfecta. Traer información básica ayuda a conversar con más claridad y privacidad.",
      bring: [
        "Lista de medicamentos, suplementos y antecedentes relevantes.",
        "Estudios o laboratorios previos si existen.",
        "Síntomas urinarios, sexuales o de fertilidad que desea conversar.",
        "Tiempo de evolución y factores que empeoran o mejoran síntomas.",
        "Preguntas que le gustaría resolver con discreción.",
        "Antecedentes de procedimientos, infecciones o dolor.",
      ],
      nextIntro:
        "La consulta se organiza para hablar sin juicio, revisar causas posibles y decidir si hacen falta estudios o seguimiento.",
      next: [
        "Escuchar el motivo de consulta con privacidad.",
        "Revisar síntomas, antecedentes y medicamentos.",
        "Definir si corresponden laboratorios o estudios.",
        "Conversar opciones de orientación según valoración médica.",
        "Resolver dudas sensibles con lenguaje claro.",
        "Planificar seguimiento si es necesario.",
      ],
    },
  },
  en: {
    calculosRenales: {
      bringIntro:
        "If available, bring documents that help clarify the current episode, compare progression, and review whether there are signs of obstruction, infection, or recurrence.",
      bring: [
        "CT scan, ultrasound, or other imaging studies.",
        "Written reports plus image links or discs when available.",
        "Urine tests and recent laboratory results.",
        "Current medications and treatments already received.",
        "Date of onset, intensity, and changes in pain.",
        "Previous stone episodes or prior procedures.",
        "Main questions about management and prevention.",
      ],
      nextIntro:
        "The goal is to define a safe path according to size, location, symptoms, and available studies. Not every stone requires intervention.",
      next: [
        "Confirm stone location, size, and possible obstruction.",
        "Review whether there are signs of infection or kidney impact.",
        "Define whether observation, medical management, or a procedure applies.",
        "Discuss ureteroscopy, laser, or percutaneous surgery when relevant.",
        "Explain warning signs and when urgent care is needed.",
        "Plan follow-up and prevention according to the case.",
      ],
    },
    prostata: {
      bringIntro:
        "Prostate evaluation is clearer when symptoms, lab results, and history can be compared over time.",
      bring: [
        "Current and previous PSA results.",
        "Recent labs and urine studies if available.",
        "Ultrasound, MRI, or other available imaging.",
        "Biopsy or prior procedure reports when applicable.",
        "Medication list, supplements, and family history.",
        "Record of urinary symptoms and nighttime frequency.",
        "Questions about prevention, follow-up, or privacy.",
      ],
      nextIntro:
        "The visit helps separate possible causes of symptoms, interpret PSA in context, and decide whether monitoring or additional studies are needed.",
      next: [
        "Review urinary symptoms and quality-of-life impact.",
        "Interpret PSA with age, history, and prior studies.",
        "Discuss enlargement, inflammation, or other possible causes.",
        "Define whether imaging, monitoring, or biopsy is appropriate.",
        "Explain next steps without assuming a diagnosis.",
        "Plan preventive or specialized follow-up.",
      ],
    },
    uroOncologia: {
      bringIntro:
        "In uro-oncology, organized records help clarify the diagnosis, suspicion, or recommendation that needs review.",
      bring: [
        "Medical reports and diagnosis summary if available.",
        "Images, written reports, and available links or discs.",
        "Biopsy, pathology, or histology reports when applicable.",
        "Labs, PSA, or other relevant markers.",
        "Previous treatments, dates, and recommendations.",
        "Medication list and important medical history.",
        "Questions about options, follow-up, or second opinion.",
      ],
      nextIntro:
        "The focus is to review the available evidence, clarify doubts, and define whether more information is needed before discussing management options.",
      next: [
        "Organize the diagnosis, suspicion, or abnormal finding.",
        "Review consistency between imaging, biopsy, and labs.",
        "Identify missing information or pending studies.",
        "Discuss management options after medical evaluation.",
        "Define whether a second opinion may add clarity.",
        "Plan responsible and safe follow-up.",
      ],
    },
    segundaOpinion: {
      bringIntro:
        "A second opinion is most useful when the information is organized and clearly connected to the decision you need to make.",
      bring: [
        "Main medical report or case summary.",
        "Imaging studies with reports and files when available.",
        "Labs, biopsy, or pathology if applicable.",
        "Proposed surgical recommendation or prior plan.",
        "Medication list and treatments already received.",
        "Specific questions you want clarified.",
        "Important dates in the diagnosis or symptom timeline.",
      ],
      nextIntro:
        "The visit does not promise to change a recommendation; it reviews the information, explains the medical reasoning, and supports clearer decision-making.",
      next: [
        "Identify which diagnosis or recommendation needs review.",
        "Review available evidence and key documents.",
        "Clarify what information or studies may be missing.",
        "Explain reasonable alternatives after evaluation.",
        "Separate clinical questions from urgent warning situations.",
        "Define next steps for consultation, follow-up, or coordination.",
      ],
    },
    endourologia: {
      when: [
        "Urinary stones with pain or abnormal studies.",
        "Suspected obstruction or narrowing in the urinary tract.",
        "Need to evaluate the bladder, ureter, or urinary system.",
        "Imaging findings that require specialist explanation.",
        "Questions about ureteroscopy, cystoscopy, or laser.",
        "Follow-up after a urinary procedure or episode.",
      ],
      bringIntro:
        "Available studies help determine whether a urinary tract problem can be evaluated or treated with endourologic techniques.",
      bring: [
        "CT scan, ultrasound, or recent imaging studies.",
        "Urine test or urine culture if available.",
        "Kidney function labs or other relevant results.",
        "Reports from previous urinary procedures.",
        "Current medications, blood thinners, and allergies.",
        "Main symptoms and timeline.",
        "Questions about procedure, preparation, and follow-up.",
      ],
      nextIntro:
        "Endourology includes several procedures; the visit determines whether any of them apply or whether another evaluation route is better.",
      next: [
        "Confirm whether the problem involves the urinary tract.",
        "Review imaging to locate stones, obstructions, or findings.",
        "Differentiate ureteroscopy, cystoscopy, or other procedures.",
        "Discuss benefits, limits, and preparation if applicable.",
        "Define whether more studies are needed first.",
        "Plan follow-up according to findings and evolution.",
      ],
    },
    ureteroscopia: {
      when: [
        "Stones located or suspected in the ureter.",
        "Pain related to possible urinary obstruction.",
        "Hydronephrosis, dilation, or imaging findings.",
        "Need to evaluate laser use in selected cases.",
        "Persistent symptoms despite initial management.",
        "Questions about preparation, follow-up, or second opinion.",
      ],
      bringIntro:
        "Preparation depends on studies, symptoms, and general condition; complete information helps determine whether ureteroscopy applies.",
      bring: [
        "CT scan, ultrasound, or imaging reports.",
        "Labs, urine tests, and cultures if available.",
        "Current medications, blood thinners, and allergies.",
        "Emergency, hospitalization, or prior procedure reports.",
        "Date of pain onset or urinary symptoms.",
        "Questions about laser, stent, follow-up, or recovery.",
      ],
      nextIntro:
        "The visit explains whether the procedure applies, which studies support the decision, and what care may be required.",
      next: [
        "Review stone location or ureter finding.",
        "Confirm obstruction, infection, or persistent pain if present.",
        "Discuss whether laser or another instrument may be needed.",
        "Explain general preparation and possible aftercare.",
        "Define follow-up and warning signs.",
        "Coordinate next steps only if the indication is appropriate.",
      ],
    },
    cirugiaLaparoscopica: {
      bringIntro:
        "For a serious surgical review, it helps to bring organized documents and, when possible, imaging studies in digital format or with complete written reports.",
      bring: [
        "CT scan, MRI, ultrasound, or other available imaging.",
        "Written imaging reports.",
        "Recent labs and urine tests if available.",
        "Diagnostic report or prior medical summary.",
        "Previous surgical recommendations.",
        "Current medication list and known allergies.",
        "Main questions you want answered.",
      ],
      nextIntro:
        "The visit is not meant to rush a decision. The goal is to explain the clinical scenario, review reasonable alternatives, and define whether additional studies are needed before moving forward.",
      next: [
        "Whether surgery should truly be considered at this time.",
        "What the goal of the procedure would be if indicated.",
        "What alternatives may exist according to diagnosis and studies.",
        "What information is still missing before a responsible decision.",
        "What general risks, preparation, and follow-up should be discussed.",
        "How follow-up would be organized according to each case.",
      ],
    },
    saludMasculina: {
      when: [
        "Changes in sexual function or need for medical guidance.",
        "Questions about male fertility or previous studies.",
        "Urinary symptoms, burning, frequency, or urgency.",
        "Pain, pelvic discomfort, or changes affecting quality of life.",
        "Interest in urologic prevention and private consultation.",
        "Sensitive questions that require a respectful setting.",
      ],
      bringIntro:
        "You do not need a perfect explanation before visiting. Basic information helps make the conversation clearer and more private.",
      bring: [
        "Medication list, supplements, and relevant history.",
        "Previous studies or labs if available.",
        "Urinary, sexual, or fertility concerns you want to discuss.",
        "Symptom timeline and factors that worsen or improve symptoms.",
        "Questions you would like to address discreetly.",
        "History of procedures, infections, or pain.",
      ],
      nextIntro:
        "The visit is structured to discuss concerns without judgment, review possible causes, and decide whether studies or follow-up are needed.",
      next: [
        "Listen to the concern with privacy.",
        "Review symptoms, history, and medications.",
        "Define whether labs or studies are appropriate.",
        "Discuss guidance options after medical evaluation.",
        "Answer sensitive questions with clear language.",
        "Plan follow-up when needed.",
      ],
    },
  },
};
