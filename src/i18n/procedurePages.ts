import { imageAssets, type ImageAsset } from "../data/images";
import type { Language } from "./translations";
import {
  additionalProcedurePages,
  type AdditionalProcedureKey,
} from "./additionalProcedurePages";

export type ProcedureKey =
  | "ureteroscopia"
  | "laserCalculos"
  | "biopsiaProstata"
  | "nefrolitotomiaPercutanea"
  | "cistoscopia"
  | "laparoscopiaRenal"
  | AdditionalProcedureKey;

export type ProcedurePage = {
  seoTitle: string;
  seoDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  image: ImageAsset;
  overviewTitle: string;
  overview: string;
  whenTitle: string;
  when: string[];
  preparationTitle: string;
  preparation: string;
  preparationItems: string[];
  afterTitle: string;
  after: string;
  afterItems: string[];
  questionsTitle: string;
  questions: string[];
  related: Array<{ label: string; href: string }>;
  faqTitle: string;
  faq: Array<[string, string]>;
  cta: string;
  cardText: string;
};

export const procedurePages: Record<Language, Record<ProcedureKey, ProcedurePage>> = {
  es: {
    ureteroscopia: {
      seoTitle: "Ureteroscopía en Panamá | Procedimiento urológico especializado",
      seoDescription:
        "Guía educativa sobre ureteroscopía en Panamá: cuándo puede indicarse, preparación, relación con cálculos y seguimiento según evaluación médica.",
      title: "Ureteroscopía",
      subtitle:
        "Procedimiento endourológico para evaluar o tratar condiciones del uréter en casos seleccionados.",
      intro:
        "Esta página explica el procedimiento como tal: qué permite observar, cuándo puede considerarse y qué preguntas conviene resolver antes de avanzar.",
      image: imageAssets.ureteroscopy,
      overviewTitle: "Qué permite hacer",
      overview:
        "La ureteroscopía utiliza instrumentos especializados para acceder al uréter y, según el caso, observar una zona específica, tratar algunos cálculos o apoyar la evaluación de alteraciones de las vías urinarias. No es una consulta diagnóstica por sí sola; primero se revisan síntomas, estudios y condición general.",
      whenTitle: "Cuándo puede indicarse",
      when: [
        "Cálculos ubicados en el uréter.",
        "Dolor asociado a posible obstrucción.",
        "Hallazgos en imágenes que requieren evaluación directa.",
        "Casos donde el médico considera adecuado tratar o revisar el área.",
      ],
      preparationTitle: "Preparación general",
      preparation:
        "La preparación depende de la indicación médica, estudios previos y condición del paciente. Durante la consulta se explica qué pasos serían necesarios si el procedimiento corresponde.",
      preparationItems: [
        "Revisión de imágenes y laboratorios.",
        "Análisis de orina o cultivo si aplica.",
        "Lista de medicamentos y alergias.",
        "Indicaciones individualizadas antes del procedimiento.",
      ],
      afterTitle: "Después del procedimiento",
      after:
        "Las indicaciones posteriores dependen de lo realizado y de los hallazgos. El seguimiento permite revisar evolución, molestias esperadas y señales que requieren atención.",
      afterItems: [
        "Control según indicación médica.",
        "Revisión de síntomas posteriores.",
        "Medicamentos o cuidados si corresponden.",
        "Seguimiento de cálculos o causa de base.",
      ],
      questionsTitle: "Preguntas útiles para la consulta",
      questions: [
        "¿Qué estudio muestra que este procedimiento podría corresponder?",
        "¿Se utilizaría láser o solo evaluación visual?",
        "¿Qué cuidados tendría después?",
        "¿Qué señales deben motivar atención urgente?",
      ],
      related: [
        { label: "Cálculos renales", href: "/calculos-renales" },
        { label: "Endourología", href: "/endourologia" },
      ],
      faqTitle: "Preguntas frecuentes sobre ureteroscopía",
      faq: [
        ["¿Sirve para todos los cálculos?", "No. Puede utilizarse en determinados casos, especialmente cuando el cálculo está en el uréter o cuando el acceso endoscópico es adecuado según estudios y evaluación médica."],
        ["¿Reemplaza la consulta?", "No. Primero se requiere una evaluación médica para revisar síntomas, estudios, alternativas y riesgos generales antes de decidir si corresponde."],
        ["¿Siempre se usa láser?", "No necesariamente. El uso de láser depende del tipo de cálculo, ubicación, equipo disponible y criterio médico."],
        ["¿Qué debo llevar?", "Lleve imágenes, reportes, laboratorios, medicamentos actuales, alergias e informes previos si los tiene disponibles."],
      ],
      cta: "Consultar sobre ureteroscopía",
      cardText:
        "Permite acceder al uréter con instrumentos especializados para evaluar o tratar ciertos cálculos y obstrucciones, según estudios y valoración médica.",
    },
    laserCalculos: {
      seoTitle: "Láser para cálculos urinarios en Panamá | UroPanama",
      seoDescription:
        "Información educativa sobre uso de láser para cálculos urinarios: indicaciones, evaluación previa y seguimiento según cada caso.",
      title: "Láser para cálculos urinarios",
      subtitle:
        "Técnica que puede utilizarse para fragmentar cálculos en casos seleccionados.",
      intro:
        "El láser no es un tratamiento universal para todas las piedras. Su uso depende de tamaño, ubicación, acceso, síntomas y evaluación médica.",
      image: imageAssets.laserKidneyStone,
      overviewTitle: "Qué hace el láser",
      overview:
        "En determinados procedimientos endourológicos, el láser puede ayudar a fragmentar cálculos para facilitar su manejo. La decisión se basa en estudios de imagen, ubicación del cálculo, condición del paciente y criterio médico.",
      whenTitle: "Cuándo puede considerarse",
      when: [
        "Cálculos en vías urinarias accesibles por técnica endoscópica.",
        "Piedras que por tamaño o ubicación no se manejan solo con observación.",
        "Casos donde el médico considera útil fragmentar el cálculo.",
        "Situaciones que requieren revisar alternativas antes de decidir.",
      ],
      preparationTitle: "Antes de conversar láser",
      preparation:
        "La consulta revisa si el cálculo realmente puede tratarse con esta técnica y si existen factores como infección, obstrucción o estudios pendientes.",
      preparationItems: [
        "Tomografía o ultrasonido disponible.",
        "Análisis de orina y laboratorios.",
        "Síntomas, dolor y evolución.",
        "Tratamientos previos o episodios anteriores.",
      ],
      afterTitle: "Seguimiento",
      after:
        "Después de un procedimiento con láser, el seguimiento puede incluir control de síntomas, revisión de fragmentos, estudios de control o prevención según el caso.",
      afterItems: [
        "Indicaciones posteriores individualizadas.",
        "Control de dolor, fiebre o molestias urinarias.",
        "Revisión de estudios si corresponde.",
        "Orientación preventiva cuando aplique.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Mi cálculo es accesible para láser?",
        "¿Qué alternativas existen?",
        "¿Qué estudios faltan antes de decidir?",
        "¿Cómo se controla la evolución después?",
      ],
      related: [
        { label: "Cálculos renales", href: "/calculos-renales" },
        { label: "Ureteroscopía", href: "/ureteroscopia" },
      ],
      faqTitle: "Preguntas frecuentes sobre láser para cálculos",
      faq: [
        ["¿El láser evita siempre una cirugía mayor?", "No se puede prometer. En algunos casos puede ser una opción mínimamente invasiva, pero la indicación depende del cálculo, estudios y valoración médica."],
        ["¿Todos los cálculos se fragmentan con láser?", "No. Algunos pueden requerir observación, otro procedimiento o cirugía percutánea según tamaño, ubicación y complejidad."],
        ["¿Qué estudios se revisan?", "Principalmente imágenes, análisis de orina, laboratorios y antecedentes de episodios previos para definir si esta técnica corresponde."],
        ["¿Puede haber seguimiento posterior?", "Sí. El seguimiento permite revisar evolución, molestias, estudios de control y prevención de nuevos episodios según cada caso."],
      ],
      cta: "Consultar opción láser",
      cardText:
        "Puede utilizarse dentro de procedimientos endourológicos para fragmentar cálculos seleccionados; la indicación depende de tamaño, ubicación y estudios.",
    },
    biopsiaProstata: {
      seoTitle: "Biopsia de próstata en Panamá | Evaluación especializada",
      seoDescription:
        "Información sobre biopsia de próstata: cuándo puede indicarse, qué estudios se revisan y cómo se conversa la decisión.",
      title: "Biopsia de próstata",
      subtitle:
        "Estudio que puede indicarse cuando ciertos hallazgos requieren una evaluación prostática más específica.",
      intro:
        "La biopsia no se decide de forma aislada. Se conversa después de revisar PSA, antecedentes, exploración, imágenes u otros hallazgos según cada caso.",
      image: imageAssets.prostateBiopsy,
      overviewTitle: "Para qué sirve",
      overview:
        "La biopsia de próstata busca obtener información más específica cuando existen hallazgos que lo justifican. Es parte de una ruta de evaluación, no una conclusión automática ante un PSA elevado.",
      whenTitle: "Cuándo puede discutirse",
      when: [
        "PSA elevado o cambios relevantes en seguimiento.",
        "Hallazgos en imagen o examen que requieren aclaración.",
        "Antecedentes o factores de riesgo que ameritan valoración.",
        "Necesidad de confirmar o descartar información clínica.",
      ],
      preparationTitle: "Qué se revisa antes",
      preparation:
        "Antes de plantear una biopsia se revisa el contexto completo para explicar por qué podría corresponder y qué información aportaría.",
      preparationItems: [
        "PSA actual y resultados previos.",
        "Resonancia u otros estudios si existen.",
        "Antecedentes familiares.",
        "Medicamentos, alergias y condición general.",
      ],
      afterTitle: "Después del estudio",
      after:
        "El seguimiento se orienta a revisar resultados, resolver dudas y definir próximos pasos según hallazgos y valoración médica.",
      afterItems: [
        "Revisión del reporte de patología.",
        "Explicación de hallazgos.",
        "Plan de seguimiento o estudios adicionales.",
        "Orientación sobre señales de alarma.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Qué hallazgo justifica discutir biopsia?",
        "¿Qué información puede aportar?",
        "¿Qué preparación requeriría?",
        "¿Cómo se revisarían los resultados?",
      ],
      related: [
        { label: "Próstata", href: "/prostata" },
        { label: "Uro-oncología", href: "/uro-oncologia" },
      ],
      faqTitle: "Preguntas frecuentes sobre biopsia de próstata",
      faq: [
        ["¿Un PSA elevado significa que necesito biopsia?", "No necesariamente. Un PSA elevado puede tener varias causas; la biopsia se considera solo si la evaluación médica lo justifica."],
        ["¿Qué debo llevar?", "Resultados de PSA, estudios previos, resonancia si existe, lista de medicamentos e informes médicos disponibles."],
        ["¿La biopsia confirma siempre un diagnóstico?", "La biopsia puede aportar información importante, pero los resultados deben interpretarse dentro del contexto clínico completo."],
        ["¿Puedo pedir segunda opinión antes?", "Sí. Puede ser útil si tiene dudas sobre la indicación, estudios previos o próximos pasos."],
      ],
      cta: "Consultar evaluación prostática",
      cardText:
        "Puede indicarse para obtener información más específica cuando PSA, imágenes o hallazgos clínicos requieren aclaración médica.",
    },
    nefrolitotomiaPercutanea: {
      seoTitle: "Nefrolitotomía percutánea en Panamá | Cálculos complejos",
      seoDescription:
        "Información sobre nefrolitotomía percutánea para cálculos renales grandes o complejos según evaluación médica.",
      title: "Nefrolitotomía percutánea",
      subtitle:
        "Procedimiento que puede considerarse en ciertos cálculos renales grandes o complejos.",
      intro:
        "Esta página explica cuándo se conversa una ruta percutánea y qué información se revisa antes de decidir.",
      image: imageAssets.percutaneousNephrolithotomy,
      overviewTitle: "Qué diferencia este procedimiento",
      overview:
        "La nefrolitotomía percutánea se considera en ciertos cálculos renales de mayor tamaño, carga o complejidad. No reemplaza la evaluación médica; se plantea después de revisar imágenes, síntomas, función renal y alternativas.",
      whenTitle: "Cuándo puede considerarse",
      when: [
        "Cálculos renales grandes o múltiples.",
        "Piedras con mayor complejidad anatómica.",
        "Casos donde otras opciones pueden no ser suficientes.",
        "Necesidad de revisar una recomendación quirúrgica previa.",
      ],
      preparationTitle: "Qué se revisa antes",
      preparation:
        "La planificación depende mucho de imágenes y condición general, por lo que la revisión previa debe ser ordenada.",
      preparationItems: [
        "Tomografía y reportes completos.",
        "Laboratorios y análisis de orina.",
        "Antecedentes de infecciones o cirugías.",
        "Medicamentos y riesgos individuales.",
      ],
      afterTitle: "Seguimiento",
      after:
        "El seguimiento depende del procedimiento realizado, evolución, estudios de control y orientación preventiva.",
      afterItems: [
        "Control de evolución.",
        "Revisión de estudios posteriores si corresponde.",
        "Indicaciones de cuidado y medicamentos.",
        "Prevención de recurrencia según evaluación.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Por qué no sería suficiente otra opción?",
        "¿Qué muestran las imágenes?",
        "¿Qué preparación requiere?",
        "¿Cómo se controla después?",
      ],
      related: [
        { label: "Cálculos renales", href: "/calculos-renales" },
        { label: "Endourología", href: "/endourologia" },
      ],
      faqTitle: "Preguntas frecuentes sobre nefrolitotomía percutánea",
      faq: [
        ["¿Es para todos los cálculos?", "No. Se conversa en ciertos cálculos de mayor tamaño o complejidad, según imágenes y evaluación médica."],
        ["¿Qué estudios son importantes?", "La tomografía, laboratorios y análisis de orina suelen ser clave para orientar la planificación."],
        ["¿Siempre es la primera opción?", "No necesariamente. Se comparan alternativas según tamaño, ubicación, síntomas y condición general."],
        ["¿Qué debo preguntar?", "Pregunte por el objetivo, alternativas, preparación, seguimiento y señales de alarma."],
      ],
      cta: "Consultar cálculos complejos",
      cardText:
        "Se considera en ciertos cálculos renales grandes o complejos, cuando tamaño, ubicación o carga de piedra requieren otra estrategia.",
    },
    cistoscopia: {
      seoTitle: "Cistoscopía en Panamá | Evaluación de vejiga y vías urinarias",
      seoDescription:
        "Información sobre cistoscopía: cuándo puede indicarse para sangre en la orina, molestias urinarias persistentes o evaluación vesical.",
      title: "Cistoscopía",
      subtitle:
        "Evaluación visual de vejiga y vías urinarias bajas en casos seleccionados.",
      intro:
        "La cistoscopía puede formar parte del estudio de síntomas urinarios, sangre en la orina o hallazgos que requieren revisión directa.",
      image: imageAssets.cystoscopy,
      overviewTitle: "Qué permite evaluar",
      overview:
        "La cistoscopía permite observar la vejiga y la uretra con instrumentos especializados. Se considera cuando la evaluación médica necesita información visual que otros estudios no explican por completo.",
      whenTitle: "Cuándo puede indicarse",
      when: [
        "Sangre en la orina.",
        "Molestias urinarias persistentes.",
        "Infecciones o síntomas que requieren estudio adicional.",
        "Seguimiento de ciertos hallazgos vesicales.",
      ],
      preparationTitle: "Qué se revisa antes",
      preparation:
        "La indicación depende de síntomas, análisis, imágenes y antecedentes. La consulta ayuda a explicar por qué podría aportar información.",
      preparationItems: [
        "Análisis de orina o urocultivo.",
        "Estudios de imagen si existen.",
        "Medicamentos y antecedentes.",
        "Síntomas principales y tiempo de evolución.",
      ],
      afterTitle: "Después de la evaluación",
      after:
        "Las indicaciones posteriores dependen de hallazgos y síntomas. El médico explica señales de alarma y necesidad de seguimiento.",
      afterItems: [
        "Revisión de hallazgos.",
        "Plan según síntomas o estudios.",
        "Control si corresponde.",
        "Indicaciones de cuidado general.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Qué síntoma justifica la cistoscopía?",
        "¿Qué información podría aportar?",
        "¿Qué estudios faltan antes?",
        "¿Qué seguimiento se requiere?",
      ],
      related: [
        { label: "Uro-oncología", href: "/uro-oncologia" },
        { label: "Especialidades", href: "/especialidades" },
      ],
      faqTitle: "Preguntas frecuentes sobre cistoscopía",
      faq: [
        ["¿Sirve para estudiar sangre en la orina?", "Puede ser parte de la evaluación, pero la indicación depende del contexto, análisis, imágenes y valoración médica."],
        ["¿Reemplaza otros estudios?", "No necesariamente. Puede complementar análisis, imágenes u otras pruebas según el caso."],
        ["¿Qué debo llevar?", "Lleve análisis de orina, cultivos, imágenes, medicamentos e informes previos si los tiene."],
        ["¿Cuándo debo consultar rápido?", "Si hay sangrado importante, fiebre, dolor intenso o dificultad para orinar, busque atención médica urgente."],
      ],
      cta: "Consultar síntomas urinarios",
      cardText:
        "Permite observar vejiga y uretra en casos seleccionados, especialmente cuando hay sangre en la orina o síntomas persistentes.",
    },
    laparoscopiaRenal: {
      seoTitle: "Cirugía laparoscópica renal en Panamá | Dr. Carlos Brugiati",
      seoDescription:
        "Información sobre cirugía laparoscópica renal y evaluación quirúrgica mínimamente invasiva según cada caso.",
      title: "Cirugía laparoscópica renal",
      subtitle:
        "Abordaje quirúrgico mínimamente invasivo utilizado en determinados casos renales.",
      intro:
        "Esta página se enfoca en la cirugía como procedimiento: qué se revisa antes, qué preguntas hacer y cómo se decide si corresponde.",
      image: imageAssets.laparoscopicSurgery,
      overviewTitle: "Qué la distingue",
      overview:
        "La laparoscopía renal utiliza pequeñas incisiones e instrumentos especializados para abordar ciertos casos renales. Su indicación depende del diagnóstico, imágenes, condición general y objetivos del manejo.",
      whenTitle: "Cuándo puede conversarse",
      when: [
        "Condiciones renales seleccionadas.",
        "Recomendación quirúrgica previa.",
        "Necesidad de revisar opción mínimamente invasiva.",
        "Segunda opinión antes de decidir.",
      ],
      preparationTitle: "Qué se revisa antes",
      preparation:
        "La consulta organiza la información clínica y quirúrgica para explicar si una ruta laparoscópica tiene sentido.",
      preparationItems: [
        "Imágenes y reportes completos.",
        "Laboratorios y condición general.",
        "Diagnóstico o recomendación previa.",
        "Medicamentos, alergias y antecedentes.",
      ],
      afterTitle: "Seguimiento",
      after:
        "El seguimiento se define según el procedimiento, hallazgos y evolución. No se prometen tiempos de recuperación.",
      afterItems: [
        "Controles posteriores.",
        "Revisión de indicaciones y síntomas.",
        "Resultados o estudios si aplican.",
        "Plan ajustado a cada caso.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Por qué se considera cirugía?",
        "¿Qué alternativa existe?",
        "¿Qué riesgos generales debo entender?",
        "¿Cómo será el seguimiento?",
      ],
      related: [
        { label: "Cirugía laparoscópica", href: "/cirugia-laparoscopica" },
        { label: "Segunda opinión", href: "/segunda-opinion" },
      ],
      faqTitle: "Preguntas frecuentes sobre laparoscopía renal",
      faq: [
        ["¿Siempre se necesita cirugía?", "No. La indicación depende de diagnóstico, estudios, síntomas, condición general y valoración médica."],
        ["¿Es lo mismo que una especialidad?", "No. Esta página explica el procedimiento; la especialidad quirúrgica incluye evaluación, indicación y seguimiento."],
        ["¿Qué debo llevar?", "Imágenes, reportes, laboratorios, recomendación previa, medicamentos y preguntas principales."],
        ["¿Puedo pedir segunda opinión?", "Sí. Puede ser útil si ya recibió una recomendación quirúrgica y desea entenderla mejor."],
      ],
      cta: "Consultar cirugía laparoscópica",
      cardText:
        "Explica el procedimiento quirúrgico renal mínimamente invasivo, qué se revisa antes y cómo se decide si corresponde.",
    },
    ...additionalProcedurePages.es,
  },
  en: {
    ureteroscopia: {
      seoTitle: "Ureteroscopy in Panama | Specialized urologic procedure",
      seoDescription:
        "Educational guide to ureteroscopy in Panama: when it may be considered, preparation, kidney stone use, and follow-up according to medical evaluation.",
      title: "Ureteroscopy",
      subtitle:
        "An endourologic procedure used to evaluate or treat selected ureter conditions.",
      intro:
        "This page explains the procedure itself: what it may allow the specialist to see, when it may be considered, and which questions are useful before moving forward.",
      image: imageAssets.ureteroscopy,
      overviewTitle: "What it may allow",
      overview:
        "Ureteroscopy uses specialized instruments to access the ureter and, depending on the case, inspect a specific area, manage selected stones, or support evaluation of urinary tract findings. It is not a diagnosis by itself; symptoms, imaging, and overall condition are reviewed first.",
      whenTitle: "When it may be considered",
      when: [
        "Stones located in the ureter.",
        "Pain associated with possible obstruction.",
        "Imaging findings that may require direct evaluation.",
        "Cases where the physician considers visual assessment or treatment appropriate.",
      ],
      preparationTitle: "General preparation",
      preparation:
        "Preparation depends on the medical indication, prior studies, and the patient’s condition. During the visit, the doctor explains which steps would be needed if the procedure is appropriate.",
      preparationItems: [
        "Review of imaging and labs.",
        "Urine testing or culture when applicable.",
        "Medication and allergy list.",
        "Individualized instructions before the procedure.",
      ],
      afterTitle: "After the procedure",
      after:
        "Post-procedure instructions depend on what was done and what was found. Follow-up helps review recovery, expected symptoms, and signs that should prompt medical attention.",
      afterItems: [
        "Follow-up according to medical instructions.",
        "Review of symptoms after the procedure.",
        "Medication or care instructions when appropriate.",
        "Monitoring of stones or the underlying cause.",
      ],
      questionsTitle: "Useful questions for the visit",
      questions: [
        "Which study suggests this procedure may be appropriate?",
        "Would laser be used, or only visual evaluation?",
        "What care would be needed afterward?",
        "Which symptoms should prompt urgent care?",
      ],
      related: [
        { label: "Kidney stones", href: "/calculos-renales" },
        { label: "Endourology", href: "/endourologia" },
      ],
      faqTitle: "Frequently asked questions about ureteroscopy",
      faq: [
        ["Is it used for every stone?", "No. It may be used in selected cases, especially when a stone is located in the ureter or when endoscopic access is appropriate based on imaging and medical evaluation."],
        ["Does it replace a consultation?", "No. A medical evaluation is needed first to review symptoms, studies, alternatives, and general considerations before deciding whether the procedure is appropriate."],
        ["Is laser always used?", "Not necessarily. Laser use depends on the stone type, location, available equipment, and the physician’s assessment of the case."],
        ["What should I bring?", "Bring imaging, reports, labs, current medications, allergies, and previous medical records if available so the case can be reviewed in context."],
      ],
      cta: "Ask about ureteroscopy",
      cardText:
        "A procedure that can access the ureter with specialized instruments to evaluate or treat selected stones and obstructions, depending on imaging and medical assessment.",
    },
    laserCalculos: {
      seoTitle: "Laser for urinary stones in Panama | UroPanama",
      seoDescription:
        "Educational information about laser use for urinary stones: indications, prior evaluation, and follow-up according to each case.",
      title: "Laser for urinary stones",
      subtitle:
        "A technique that may be used to fragment selected stones in specific cases.",
      intro:
        "Laser is not a universal treatment for every stone. Its use depends on size, location, access, symptoms, and medical evaluation.",
      image: imageAssets.laserKidneyStone,
      overviewTitle: "What laser does",
      overview:
        "In selected endourologic procedures, laser energy may help fragment stones to support their management. The decision is based on imaging, stone location, patient condition, and medical judgment.",
      whenTitle: "When it may be considered",
      when: [
        "Urinary stones accessible through endoscopic technique.",
        "Stones that may not be managed with observation alone.",
        "Cases where the doctor considers fragmentation useful.",
        "Situations where alternatives should be reviewed before deciding.",
      ],
      preparationTitle: "Before discussing laser",
      preparation:
        "The visit reviews whether the stone can truly be approached with this technique and whether factors such as infection, obstruction, or missing studies need attention first.",
      preparationItems: [
        "Available CT scan or ultrasound.",
        "Urine tests and laboratory results.",
        "Symptoms, pain pattern, and timeline.",
        "Prior treatments or previous stone episodes.",
      ],
      afterTitle: "Follow-up",
      after:
        "After a laser procedure, follow-up may include symptom review, fragment monitoring, control studies, or prevention guidance depending on the case.",
      afterItems: [
        "Individualized post-procedure instructions.",
        "Monitoring of pain, fever, or urinary symptoms.",
        "Review of studies when appropriate.",
        "Prevention guidance when applicable.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "Is my stone accessible for laser?",
        "What alternatives exist?",
        "Which studies are still needed before deciding?",
        "How would recovery and follow-up be monitored?",
      ],
      related: [
        { label: "Kidney stones", href: "/calculos-renales" },
        { label: "Ureteroscopy", href: "/ureteroscopia" },
      ],
      faqTitle: "Frequently asked questions about laser for stones",
      faq: [
        ["Does laser always avoid a larger surgery?", "No guarantee can be made. In some cases it may be a minimally invasive option, but the indication depends on the stone, imaging, and medical evaluation."],
        ["Can every stone be fragmented with laser?", "No. Some stones may require observation, another procedure, or a percutaneous approach depending on size, location, and complexity."],
        ["Which studies are reviewed?", "Imaging, urine tests, labs, and history of previous stone episodes are commonly reviewed to determine whether this technique is appropriate."],
        ["Is follow-up needed afterward?", "Yes. Follow-up helps review symptoms, control studies, and prevention of future episodes according to each case."],
      ],
      cta: "Ask about laser options",
      cardText:
        "A technique used within selected endourologic procedures to fragment urinary stones; indication depends on stone size, location, access, and imaging.",
    },
    biopsiaProstata: {
      seoTitle: "Prostate biopsy in Panama | Specialized evaluation",
      seoDescription:
        "Information about prostate biopsy: when it may be considered, which studies are reviewed, and how the decision is discussed.",
      title: "Prostate biopsy",
      subtitle:
        "A study that may be considered when certain findings require more specific prostate evaluation.",
      intro:
        "A biopsy is not decided in isolation. It is discussed after reviewing PSA, history, exam findings, imaging, or other relevant information according to the case.",
      image: imageAssets.prostateBiopsy,
      overviewTitle: "What it is for",
      overview:
        "A prostate biopsy seeks more specific information when findings justify it. It is part of an evaluation pathway, not an automatic conclusion after an elevated PSA.",
      whenTitle: "When it may be discussed",
      when: [
        "Elevated PSA or meaningful changes during follow-up.",
        "Imaging or exam findings that require clarification.",
        "Family history or risk factors that warrant evaluation.",
        "Need to confirm or clarify clinical information.",
      ],
      preparationTitle: "What is reviewed first",
      preparation:
        "Before considering a biopsy, the full context is reviewed so the patient understands why it may be appropriate and what information it could provide.",
      preparationItems: [
        "Current PSA and prior PSA results.",
        "MRI or other studies if available.",
        "Family history.",
        "Medications, allergies, and general condition.",
      ],
      afterTitle: "After the study",
      after:
        "Follow-up focuses on reviewing results, answering questions, and defining next steps according to findings and medical evaluation.",
      afterItems: [
        "Pathology report review.",
        "Explanation of findings.",
        "Follow-up plan or additional studies.",
        "Guidance on warning signs.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "Which finding makes biopsy worth discussing?",
        "What information could it provide?",
        "What preparation would be required?",
        "How would results be reviewed?",
      ],
      related: [
        { label: "Prostate", href: "/prostata" },
        { label: "Uro-oncology", href: "/uro-oncologia" },
      ],
      faqTitle: "Frequently asked questions about prostate biopsy",
      faq: [
        ["Does elevated PSA mean I need a biopsy?", "Not necessarily. PSA can be elevated for several reasons; biopsy is considered only when the medical evaluation supports that decision."],
        ["What should I bring?", "Bring PSA results, prior studies, MRI if available, medication list, and any relevant medical reports."],
        ["Does biopsy always confirm a diagnosis?", "A biopsy can provide important information, but results must be interpreted within the full clinical context."],
        ["Can I request a second opinion first?", "Yes. A second opinion can be helpful if you have questions about the indication, prior studies, or next steps."],
      ],
      cta: "Ask about prostate evaluation",
      cardText:
        "A study that may provide more specific information when PSA, imaging, or clinical findings need further medical clarification.",
    },
    nefrolitotomiaPercutanea: {
      seoTitle: "Percutaneous nephrolithotomy in Panama | Complex stones",
      seoDescription:
        "Information about percutaneous nephrolithotomy for larger or complex kidney stones according to medical evaluation.",
      title: "Percutaneous nephrolithotomy",
      subtitle:
        "A procedure that may be considered for selected larger or more complex kidney stones.",
      intro:
        "This page explains when a percutaneous approach may be discussed and what information is reviewed before deciding.",
      image: imageAssets.percutaneousNephrolithotomy,
      overviewTitle: "What makes it different",
      overview:
        "Percutaneous nephrolithotomy may be considered for selected stones with greater size, stone burden, or complexity. It does not replace medical evaluation; it is discussed after reviewing imaging, symptoms, kidney function, and alternatives.",
      whenTitle: "When it may be considered",
      when: [
        "Large or multiple kidney stones.",
        "Stones with more complex anatomy.",
        "Cases where other options may not be enough.",
        "Need to review a prior surgical recommendation.",
      ],
      preparationTitle: "What is reviewed first",
      preparation:
        "Planning depends heavily on imaging and overall condition, so the prior review needs to be organized and complete.",
      preparationItems: [
        "CT scan and complete reports.",
        "Labs and urine testing.",
        "History of infections or prior surgeries.",
        "Medications and individual risk factors.",
      ],
      afterTitle: "Follow-up",
      after:
        "Follow-up depends on the procedure performed, recovery, control studies, and prevention guidance.",
      afterItems: [
        "Recovery monitoring.",
        "Review of follow-up studies when appropriate.",
        "Care and medication instructions.",
        "Prevention planning according to evaluation.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "Why might another option not be enough?",
        "What do the images show?",
        "What preparation would be required?",
        "How would follow-up be handled?",
      ],
      related: [
        { label: "Kidney stones", href: "/calculos-renales" },
        { label: "Endourology", href: "/endourologia" },
      ],
      faqTitle: "Frequently asked questions about percutaneous nephrolithotomy",
      faq: [
        ["Is it for every stone?", "No. It is discussed for selected stones with greater size or complexity, based on imaging and medical evaluation."],
        ["Which studies matter most?", "CT imaging, labs, and urine testing are often key for planning and understanding individual risk."],
        ["Is it always the first option?", "Not necessarily. Alternatives are compared according to size, location, symptoms, and general condition."],
        ["What should I ask?", "Ask about the goal, alternatives, preparation, follow-up, and warning signs that should prompt medical attention."],
      ],
      cta: "Ask about complex stones",
      cardText:
        "A procedure considered for selected large or complex kidney stones when stone size, location, or burden calls for a different strategy.",
    },
    cistoscopia: {
      seoTitle: "Cystoscopy in Panama | Bladder and urinary tract evaluation",
      seoDescription:
        "Information about cystoscopy: when it may be considered for blood in urine, persistent urinary symptoms, or bladder evaluation.",
      title: "Cystoscopy",
      subtitle:
        "A visual evaluation of the bladder and lower urinary tract in selected cases.",
      intro:
        "Cystoscopy may be part of the evaluation of urinary symptoms, blood in the urine, or findings that require direct visual review.",
      image: imageAssets.cystoscopy,
      overviewTitle: "What it may evaluate",
      overview:
        "Cystoscopy allows the bladder and urethra to be viewed with specialized instruments. It may be considered when medical evaluation needs visual information that other studies do not fully explain.",
      whenTitle: "When it may be considered",
      when: [
        "Blood in the urine.",
        "Persistent urinary symptoms.",
        "Infections or symptoms that need additional evaluation.",
        "Follow-up of selected bladder findings.",
      ],
      preparationTitle: "What is reviewed first",
      preparation:
        "The indication depends on symptoms, urine tests, imaging, and history. The visit helps explain why it may provide useful information.",
      preparationItems: [
        "Urinalysis or urine culture.",
        "Imaging studies if available.",
        "Medication and medical history.",
        "Main symptoms and timeline.",
      ],
      afterTitle: "After the evaluation",
      after:
        "Instructions after cystoscopy depend on findings and symptoms. The physician explains warning signs and whether follow-up is needed.",
      afterItems: [
        "Review of findings.",
        "Plan according to symptoms or studies.",
        "Follow-up when appropriate.",
        "General care instructions.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "Which symptom makes cystoscopy worth considering?",
        "What information could it provide?",
        "Which studies are needed first?",
        "What follow-up would be required?",
      ],
      related: [
        { label: "Uro-oncology", href: "/uro-oncologia" },
        { label: "Specialties", href: "/especialidades" },
      ],
      faqTitle: "Frequently asked questions about cystoscopy",
      faq: [
        ["Can it help evaluate blood in the urine?", "It may be part of the evaluation, but the indication depends on context, urine testing, imaging, and medical assessment."],
        ["Does it replace other studies?", "Not necessarily. It may complement urine tests, imaging, or other studies depending on the case."],
        ["What should I bring?", "Bring urine tests, cultures, imaging, medications, and previous reports if available."],
        ["When should I seek urgent care?", "If there is significant bleeding, fever, intense pain, or difficulty urinating, seek urgent medical care."],
      ],
      cta: "Ask about urinary symptoms",
      cardText:
        "A procedure that allows visual evaluation of the bladder and urethra in selected cases, especially with blood in urine or persistent symptoms.",
    },
    laparoscopiaRenal: {
      seoTitle: "Renal laparoscopic surgery in Panama | Dr. Carlos Brugiati",
      seoDescription:
        "Information about renal laparoscopic surgery and minimally invasive surgical evaluation according to each case.",
      title: "Renal laparoscopic surgery",
      subtitle:
        "A minimally invasive surgical approach used for selected kidney conditions.",
      intro:
        "This page focuses on the procedure: what is reviewed beforehand, what to ask, and how the decision is made if surgery is appropriate.",
      image: imageAssets.laparoscopicSurgery,
      overviewTitle: "What distinguishes it",
      overview:
        "Renal laparoscopy uses small incisions and specialized instruments to address selected kidney cases. Its indication depends on diagnosis, imaging, general condition, and the goals of management.",
      whenTitle: "When it may be discussed",
      when: [
        "Selected kidney conditions.",
        "Previous surgical recommendation.",
        "Need to review a minimally invasive option.",
        "Second opinion before deciding.",
      ],
      preparationTitle: "What is reviewed first",
      preparation:
        "The visit organizes clinical and surgical information to explain whether a laparoscopic route may be appropriate.",
      preparationItems: [
        "Complete imaging and reports.",
        "Labs and general condition.",
        "Diagnosis or prior recommendation.",
        "Medications, allergies, and history.",
      ],
      afterTitle: "Follow-up",
      after:
        "Follow-up is defined according to the procedure, findings, and recovery. No recovery timeline is guaranteed.",
      afterItems: [
        "Post-procedure visits.",
        "Review of instructions and symptoms.",
        "Results or studies when applicable.",
        "Plan adjusted to each case.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "Why is surgery being considered?",
        "What alternatives exist?",
        "Which general risks should I understand?",
        "How would follow-up work?",
      ],
      related: [
        { label: "Laparoscopic surgery", href: "/cirugia-laparoscopica" },
        { label: "Second opinion", href: "/segunda-opinion" },
      ],
      faqTitle: "Frequently asked questions about renal laparoscopy",
      faq: [
        ["Is surgery always needed?", "No. The indication depends on diagnosis, studies, symptoms, general condition, and medical evaluation."],
        ["Is this the same as a specialty page?", "No. This page explains the procedure; the surgical specialty includes evaluation, indication, and follow-up."],
        ["What should I bring?", "Bring imaging, reports, labs, prior recommendations, medications, and your main questions."],
        ["Can I request a second opinion?", "Yes. It can be useful if you already received a surgical recommendation and want to understand it better."],
      ],
      cta: "Ask about laparoscopic surgery",
      cardText:
        "Explains the minimally invasive renal surgical procedure, what is reviewed beforehand, and how a decision is made if it may be appropriate.",
    },
    ...additionalProcedurePages.en,
  },
};

export const procedureRoutes: Record<ProcedureKey, string> = {
  ureteroscopia: "/ureteroscopia",
  laserCalculos: "/laser-calculos-renales",
  biopsiaProstata: "/biopsia-prostata",
  nefrolitotomiaPercutanea: "/nefrolitotomia-percutanea",
  cistoscopia: "/cistoscopia",
  laparoscopiaRenal: "/cirugia-laparoscopica-renal",
  holep: "/holep",
  rtup: "/rtup",
  adenectomiaProstatica: "/adenectomia-prostatica",
  ureteroscopiaFlexible: "/ureteroscopia-flexible",
  ureteroscopiaSemirrigida: "/ureteroscopia-semirrigida",
  litotriciaExtracorporea: "/litotricia-extracorporea",
  disfuncionErectil: "/disfuncion-erectil",
  vasectomia: "/vasectomia",
};

export const homeProcedureKeys: ProcedureKey[] = [
  "holep",
  "rtup",
  "adenectomiaProstatica",
  "ureteroscopia",
  "ureteroscopiaFlexible",
  "ureteroscopiaSemirrigida",
  "laserCalculos",
  "litotriciaExtracorporea",
  "biopsiaProstata",
  "nefrolitotomiaPercutanea",
  "cistoscopia",
  "laparoscopiaRenal",
  "disfuncionErectil",
  "vasectomia",
];

export const procedureNavigationKeys: ProcedureKey[] = [
  "holep",
  "rtup",
  "ureteroscopiaFlexible",
  "laserCalculos",
  "nefrolitotomiaPercutanea",
  "biopsiaProstata",
  "disfuncionErectil",
  "vasectomia",
];

export const procedureSectionLabels: Record<Language, { cardCta: string }> = {
  es: {
    cardCta: "Ver procedimiento",
  },
  en: {
    cardCta: "View procedure",
  },
};
