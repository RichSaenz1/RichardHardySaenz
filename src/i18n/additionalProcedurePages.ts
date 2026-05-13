import { imageAssets } from "../data/images";
import type { Language } from "./translations";
import type { ProcedurePage } from "./procedurePages";

export type AdditionalProcedureKey =
  | "holep"
  | "rtup"
  | "adenectomiaProstatica"
  | "ureteroscopiaFlexible"
  | "ureteroscopiaSemirrigida"
  | "litotriciaExtracorporea"
  | "disfuncionErectil"
  | "vasectomia";

export const additionalProcedurePages: Record<
  Language,
  Record<AdditionalProcedureKey, ProcedurePage>
> = {
  es: {
    holep: {
      seoTitle: "HoLEP en Panamá | Enucleación prostática con láser",
      seoDescription:
        "Información sobre HoLEP o enucleación prostática con láser de Holmio para crecimiento prostático benigno y síntomas urinarios.",
      title: "HoLEP",
      subtitle:
        "Enucleación prostática con láser de Holmio para crecimiento prostático benigno en casos seleccionados.",
      intro:
        "HoLEP es una técnica mínimamente invasiva que puede considerarse cuando el crecimiento benigno de la próstata causa obstrucción urinaria, flujo débil o retención.",
      image: imageAssets.prostate,
      overviewTitle: "Qué busca tratar",
      overview:
        "La enucleación prostática con láser de Holmio permite remover tejido prostático obstructivo por vía endoscópica. La decisión depende del tamaño prostático, síntomas, estudios, antecedentes y valoración médica.",
      whenTitle: "Cuándo puede conversarse",
      when: [
        "Dificultad persistente para orinar.",
        "Chorro débil o sensación de vaciado incompleto.",
        "Retención urinaria relacionada con crecimiento prostático.",
        "Próstatas con obstrucción que requieren evaluar una opción quirúrgica.",
      ],
      preparationTitle: "Qué se revisa antes",
      preparation:
        "La consulta organiza síntomas, estudios prostáticos y estado general para explicar si HoLEP tiene sentido o si existen alternativas más adecuadas.",
      preparationItems: [
        "PSA, ultrasonido, uroflujometría o estudios disponibles.",
        "Medicamentos actuales y respuesta a tratamientos previos.",
        "Antecedentes de sangrado, anticoagulantes o cirugías previas.",
        "Objetivos urinarios y expectativas realistas.",
      ],
      afterTitle: "Después y seguimiento",
      after:
        "El seguimiento depende de la evolución y de las indicaciones del equipo. No se deben prometer tiempos exactos de recuperación antes de la evaluación.",
      afterItems: [
        "Control de síntomas urinarios.",
        "Revisión de indicaciones posteriores.",
        "Seguimiento si se usa catéter o medicamentos.",
        "Señales de alarma como fiebre, sangrado importante o dificultad para orinar.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Mi tamaño prostático permite considerar HoLEP?",
        "¿Qué alternativas existen frente a RTUP u otros abordajes?",
        "¿Qué riesgos generales debo entender?",
        "¿Cómo se organizaría el seguimiento?",
      ],
      related: [
        { label: "Próstata", href: "/prostata" },
        { label: "RTUP", href: "/rtup" },
        { label: "Adenectomía prostática", href: "/adenectomia-prostatica" },
      ],
      faqTitle: "Preguntas frecuentes sobre HoLEP",
      faq: [
        ["¿HoLEP es para todos los pacientes con próstata grande?", "No. La indicación depende de síntomas, tamaño, estudios, condición general y conversación médica."],
        ["¿Es una cirugía abierta?", "No. Es un abordaje endoscópico con láser, pero sigue siendo un procedimiento que requiere evaluación, preparación y seguimiento."],
        ["¿Qué debo llevar?", "Lleve PSA, ultrasonido, estudios urinarios, lista de medicamentos e informes previos si los tiene."],
        ["¿Puede ayudar con retención urinaria?", "Puede considerarse en algunos casos de obstrucción por crecimiento prostático benigno, pero primero se debe revisar el caso completo."],
      ],
      cta: "Consultar sobre HoLEP",
      cardText:
        "Técnica láser para crecimiento prostático benigno que puede ayudar a remover tejido obstructivo cuando la evaluación confirma que corresponde.",
    },
    rtup: {
      seoTitle: "RTUP en Panamá | Resección transuretral de próstata",
      seoDescription:
        "Guía educativa sobre RTUP para hiperplasia prostática benigna, obstrucción urinaria y síntomas prostáticos.",
      title: "RTUP",
      subtitle:
        "Resección transuretral de próstata para obstrucción urinaria por hiperplasia prostática benigna.",
      intro:
        "La RTUP es una cirugía endoscópica que puede indicarse cuando el crecimiento prostático benigno afecta el vaciamiento de la vejiga y la calidad urinaria.",
      image: imageAssets.prostate,
      overviewTitle: "Qué permite hacer",
      overview:
        "El procedimiento busca remover tejido prostático que obstruye la salida de orina. La indicación se conversa después de revisar síntomas, estudios y alternativas de manejo.",
      whenTitle: "Cuándo puede indicarse",
      when: [
        "Obstrucción urinaria por hiperplasia prostática benigna.",
        "Urgencia, frecuencia o chorro débil persistente.",
        "Mala respuesta o intolerancia a manejo médico.",
        "Necesidad de comparar opciones quirúrgicas.",
      ],
      preparationTitle: "Antes de decidir",
      preparation:
        "La evaluación debe diferenciar síntomas prostáticos de otras causas urinarias y revisar si RTUP es la opción adecuada frente a alternativas como HoLEP.",
      preparationItems: [
        "Historia urinaria y medicamentos actuales.",
        "PSA y estudios prostáticos disponibles.",
        "Evaluación de vejiga y vaciamiento si corresponde.",
        "Riesgos generales y cuidados posteriores.",
      ],
      afterTitle: "Seguimiento",
      after:
        "El seguimiento se ajusta al procedimiento, evolución y síntomas posteriores. Las indicaciones se explican individualmente.",
      afterItems: [
        "Control de síntomas y micción.",
        "Revisión de cuidados posteriores.",
        "Atención a fiebre, sangrado importante o retención.",
        "Plan de control según evolución.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Por qué se consideraría RTUP en mi caso?",
        "¿Cómo se compara con HoLEP?",
        "¿Qué estudios faltan antes de decidir?",
        "¿Qué seguimiento necesitaría?",
      ],
      related: [
        { label: "HoLEP", href: "/holep" },
        { label: "Próstata", href: "/prostata" },
      ],
      faqTitle: "Preguntas frecuentes sobre RTUP",
      faq: [
        ["¿La RTUP se decide solo por síntomas?", "No. Los síntomas se revisan junto con estudios, antecedentes, medicamentos y evaluación médica."],
        ["¿Es lo mismo que HoLEP?", "No. Ambas pueden tratar obstrucción prostática, pero usan técnicas diferentes y se conversan según el caso."],
        ["¿Puede mejorar el vaciamiento?", "Ese es el objetivo cuando la obstrucción prostática es relevante, pero el resultado depende de cada paciente y no debe prometerse."],
        ["¿Qué debo llevar?", "Lleve estudios prostáticos, PSA, lista de medicamentos y reportes previos si existen."],
      ],
      cta: "Consultar sobre RTUP",
      cardText:
        "Cirugía endoscópica para obstrucción urinaria por hiperplasia prostática benigna, definida después de revisar síntomas y estudios.",
    },
    adenectomiaProstatica: {
      seoTitle: "Adenectomía prostática laparoscópica o robótica en Panamá",
      seoDescription:
        "Información sobre adenectomía prostática laparoscópica o con asistencia robótica para próstatas grandes con obstrucción urinaria.",
      title: "Adenectomía prostática",
      subtitle:
        "Abordaje laparoscópico o robótico para próstatas de gran tamaño en casos seleccionados.",
      intro:
        "La adenectomía prostática puede considerarse cuando una próstata grande causa obstrucción urinaria importante y requiere una estrategia quirúrgica específica.",
      image: imageAssets.laparoscopicSurgery,
      overviewTitle: "Qué la diferencia",
      overview:
        "Este abordaje busca extraer el adenoma prostático con técnica mínimamente invasiva cuando el tamaño o anatomía lo justifican. La opción laparoscópica o robótica depende del caso, disponibilidad y criterio médico.",
      whenTitle: "Cuándo puede conversarse",
      when: [
        "Próstatas de gran tamaño con obstrucción importante.",
        "Retención urinaria o síntomas severos persistentes.",
        "Recomendación quirúrgica previa que requiere revisión.",
        "Necesidad de comparar abordajes mínimamente invasivos.",
      ],
      preparationTitle: "Qué se revisa antes",
      preparation:
        "La planificación requiere estudios claros, evaluación general y conversación sobre alternativas quirúrgicas y no quirúrgicas.",
      preparationItems: [
        "Tamaño prostático y estudios de imagen.",
        "Síntomas, función urinaria y antecedentes.",
        "Riesgos quirúrgicos y medicamentos.",
        "Diferencia entre técnica laparoscópica, robótica y endoscópica.",
      ],
      afterTitle: "Después y seguimiento",
      after:
        "El seguimiento se organiza según el abordaje, evolución y hallazgos. No se debe asumir una recuperación específica antes de la evaluación.",
      afterItems: [
        "Controles postoperatorios según indicación.",
        "Revisión de síntomas urinarios.",
        "Cuidados de actividad y medicamentos.",
        "Señales de alarma y canal de contacto.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Por qué este abordaje sería mejor para mi tamaño prostático?",
        "¿Qué diferencia hay con HoLEP o RTUP?",
        "¿Qué riesgos y preparación debo entender?",
        "¿Dónde se realizaría el procedimiento?",
      ],
      related: [
        { label: "HoLEP", href: "/holep" },
        { label: "RTUP", href: "/rtup" },
        { label: "Cirugía laparoscópica", href: "/cirugia-laparoscopica" },
      ],
      faqTitle: "Preguntas frecuentes sobre adenectomía prostática",
      faq: [
        ["¿Es para cualquier crecimiento prostático?", "No. Se conversa especialmente en próstatas grandes o casos donde el abordaje debe planificarse con detalle."],
        ["¿Robótica y laparoscopía son iguales?", "No. Ambas pueden ser mínimamente invasivas, pero usan equipos y flujos diferentes."],
        ["¿Se define en una primera llamada?", "No. Se requiere evaluación médica y revisión de estudios antes de definir la indicación."],
        ["¿Qué debo llevar?", "Imágenes, PSA, estudios urinarios, lista de medicamentos e informes previos."],
      ],
      cta: "Consultar adenectomía prostática",
      cardText:
        "Opción laparoscópica o robótica para próstatas grandes con obstrucción significativa, definida tras evaluación especializada.",
    },
    ureteroscopiaFlexible: {
      seoTitle: "Ureteroscopia flexible en Panamá | Cirugía intrarrenal",
      seoDescription:
        "Información sobre ureteroscopia flexible o cirugía endoscópica intrarrenal para cálculos renales sin incisiones externas.",
      title: "Ureteroscopia flexible",
      subtitle:
        "Cirugía endoscópica intrarrenal para ciertos cálculos renales mediante tecnología mínimamente invasiva.",
      intro:
        "La ureteroscopia flexible puede permitir acceso al riñón por vía endoscópica para tratar cálculos seleccionados sin incisiones externas.",
      image: imageAssets.ureteroscopy,
      overviewTitle: "Qué permite evaluar o tratar",
      overview:
        "Mediante instrumentos flexibles se puede acceder a zonas del riñón y, cuando corresponde, fragmentar o remover piedras urinarias. La indicación depende de tamaño, ubicación y estudios.",
      whenTitle: "Cuándo puede considerarse",
      when: [
        "Cálculos renales accesibles por vía endoscópica.",
        "Piedras que generan dolor, obstrucción o recurrencia.",
        "Casos donde se compara láser, observación u otra técnica.",
        "Seguimiento de episodios previos de litiasis.",
      ],
      preparationTitle: "Antes de la indicación",
      preparation:
        "Se revisan imágenes, síntomas, laboratorios y antecedentes para decidir si el acceso flexible es seguro y útil.",
      preparationItems: [
        "Tomografía o ultrasonido.",
        "Análisis de orina y laboratorios.",
        "Ubicación y tamaño del cálculo.",
        "Episodios previos o infecciones.",
      ],
      afterTitle: "Seguimiento",
      after:
        "El seguimiento puede incluir control de síntomas, estudios posteriores y prevención según el caso.",
      afterItems: [
        "Revisión de evolución.",
        "Control de fiebre, dolor o molestias urinarias.",
        "Estudios de control si corresponden.",
        "Prevención de nuevos cálculos.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Mi cálculo es accesible por ureteroscopia flexible?",
        "¿Se usaría láser?",
        "¿Qué alternativa existe si el cálculo es grande?",
        "¿Cómo se previenen nuevos episodios?",
      ],
      related: [
        { label: "Láser para cálculos", href: "/laser-calculos-renales" },
        { label: "Litotricia extracorpórea", href: "/litotricia-extracorporea" },
        { label: "Cálculos renales", href: "/calculos-renales" },
      ],
      faqTitle: "Preguntas frecuentes sobre ureteroscopia flexible",
      faq: [
        ["¿Siempre se usa láser?", "No. Depende del cálculo, ubicación, equipo disponible y criterio médico."],
        ["¿Es para cálculos grandes?", "Algunos cálculos grandes o complejos pueden requerir otra estrategia como nefrolitotomía percutánea."],
        ["¿Necesito estudios antes?", "Sí. Las imágenes y laboratorios orientan la seguridad e indicación del procedimiento."],
        ["¿Reemplaza la consulta?", "No. La evaluación médica define si corresponde."],
      ],
      cta: "Consultar ureteroscopia flexible",
      cardText:
        "Procedimiento endoscópico que puede acceder al riñón para tratar cálculos seleccionados sin incisiones externas.",
    },
    ureteroscopiaSemirrigida: {
      seoTitle: "Ureteroscopia semirrígida en Panamá | Cálculos en uréter",
      seoDescription:
        "Información sobre ureteroscopia semirrígida para cálculos ubicados en el uréter y obstrucciones urinarias.",
      title: "Ureteroscopia semirrígida",
      subtitle:
        "Procedimiento endoscópico para cálculos ubicados en el uréter en casos seleccionados.",
      intro:
        "La ureteroscopia semirrígida puede utilizarse para manejar cálculos en el uréter, aliviar obstrucción y estudiar ciertas alteraciones de la vía urinaria.",
      image: imageAssets.ureteroscopy,
      overviewTitle: "Qué permite hacer",
      overview:
        "Permite acceder al uréter mediante endoscopia urinaria, sin incisiones externas. Puede apoyar el tratamiento de piedras y la evaluación de obstrucciones según el caso.",
      whenTitle: "Cuándo se conversa",
      when: [
        "Cálculos localizados en el uréter.",
        "Dolor asociado a obstrucción urinaria.",
        "Hallazgos en imágenes que requieren acceso endoscópico.",
        "Necesidad de revisar alternativas frente a observación o láser.",
      ],
      preparationTitle: "Qué se revisa antes",
      preparation:
        "La indicación depende de imágenes, síntomas, función renal, infección, dolor y seguridad del paciente.",
      preparationItems: [
        "Tomografía, ultrasonido o reporte de urgencias.",
        "Laboratorios y orina.",
        "Medicamentos, alergias y antecedentes.",
        "Síntomas actuales y evolución.",
      ],
      afterTitle: "Seguimiento",
      after:
        "Después del procedimiento, las indicaciones dependen de lo realizado, hallazgos y evolución.",
      afterItems: [
        "Control de dolor, fiebre o dificultad para orinar.",
        "Seguimiento si se coloca dispositivo urinario.",
        "Revisión de estudios cuando aplique.",
        "Plan de prevención según cada caso.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Dónde está ubicado el cálculo?",
        "¿Existe obstrucción?",
        "¿Qué alternativa tengo si no se realiza el procedimiento?",
        "¿Qué síntomas posteriores debo vigilar?",
      ],
      related: [
        { label: "Ureteroscopía", href: "/ureteroscopia" },
        { label: "Ureteroscopia flexible", href: "/ureteroscopia-flexible" },
        { label: "Cálculos renales", href: "/calculos-renales" },
      ],
      faqTitle: "Preguntas frecuentes sobre ureteroscopia semirrígida",
      faq: [
        ["¿Es igual que la flexible?", "No. Ambas son endoscópicas, pero se usan instrumentos y escenarios distintos según ubicación y caso."],
        ["¿Puede aliviar dolor por cálculo?", "Puede ser parte del manejo si el cálculo y la obstrucción lo justifican, pero la indicación depende de evaluación médica."],
        ["¿Qué estudios debo llevar?", "Imágenes, laboratorios, informe de urgencias, medicamentos y antecedentes."],
        ["¿Cuándo debo buscar urgencia?", "Fiebre, escalofríos, dolor intenso, sangrado importante o imposibilidad de orinar requieren atención urgente."],
      ],
      cta: "Consultar ureteroscopia semirrígida",
      cardText:
        "Abordaje endoscópico para cálculos en el uréter y obstrucciones urinarias, sin incisiones externas en casos seleccionados.",
    },
    litotriciaExtracorporea: {
      seoTitle: "Litotricia extracorpórea en Panamá | Ondas de choque",
      seoDescription:
        "Información sobre litotricia extracorpórea con ondas de choque para ciertos cálculos urinarios pequeños o medianos.",
      title: "Litotricia extracorpórea",
      subtitle:
        "Tratamiento no invasivo con ondas de choque para ciertos cálculos urinarios pequeños o medianos.",
      intro:
        "La litotricia extracorpórea puede fragmentar algunos cálculos para facilitar su eliminación natural, cuando tamaño, ubicación y condición clínica lo permiten.",
      image: imageAssets.kidneyStones,
      overviewTitle: "Qué busca lograr",
      overview:
        "Utiliza ondas de choque desde fuera del cuerpo para fragmentar cálculos seleccionados. No todos los cálculos responden igual y la decisión depende de estudios de imagen.",
      whenTitle: "Cuándo puede considerarse",
      when: [
        "Cálculos pequeños o medianos con ubicación favorable.",
        "Casos donde se quiere evitar un abordaje endoscópico si es seguro.",
        "Pacientes que requieren comparar opciones de manejo.",
        "Seguimiento de litiasis con criterios adecuados.",
      ],
      preparationTitle: "Qué se revisa antes",
      preparation:
        "Se revisa si el cálculo tiene características adecuadas y si existen factores que podrían reducir la efectividad o aumentar riesgos.",
      preparationItems: [
        "Tamaño, densidad y ubicación del cálculo.",
        "Síntomas y grado de obstrucción.",
        "Laboratorios y orina.",
        "Medicamentos y antecedentes relevantes.",
      ],
      afterTitle: "Después del tratamiento",
      after:
        "El seguimiento puede revisar eliminación de fragmentos, dolor, estudios de control y prevención.",
      afterItems: [
        "Control de evolución.",
        "Revisión de síntomas.",
        "Imágenes de control si corresponden.",
        "Prevención de nuevos cálculos.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Mi cálculo tiene buen perfil para ondas de choque?",
        "¿Qué pasa si no se fragmenta suficiente?",
        "¿Qué síntomas debo vigilar después?",
        "¿Cómo se confirma la evolución?",
      ],
      related: [
        { label: "Cálculos renales", href: "/calculos-renales" },
        { label: "Ureteroscopia flexible", href: "/ureteroscopia-flexible" },
        { label: "Láser para cálculos", href: "/laser-calculos-renales" },
      ],
      faqTitle: "Preguntas frecuentes sobre litotricia extracorpórea",
      faq: [
        ["¿Es para todos los cálculos?", "No. Depende de tamaño, ubicación, densidad, síntomas y criterio médico."],
        ["¿Evita siempre un procedimiento?", "No se puede prometer. Algunos cálculos pueden requerir otro manejo si no responden o si el caso no es adecuado."],
        ["¿Qué estudios se revisan?", "Imágenes, análisis de orina, laboratorios y antecedentes de episodios previos."],
        ["¿Requiere seguimiento?", "Sí. El seguimiento ayuda a revisar fragmentos, síntomas y prevención."],
      ],
      cta: "Consultar litotricia",
      cardText:
        "Opción no invasiva con ondas de choque para fragmentar ciertos cálculos urinarios pequeños o medianos.",
    },
    disfuncionErectil: {
      seoTitle: "Disfunción eréctil en Panamá | Evaluación urológica privada",
      seoDescription:
        "Evaluación integral y privada de disfunción eréctil, con revisión hormonal, vascular, metabólica y opciones personalizadas.",
      title: "Disfunción eréctil",
      subtitle:
        "Evaluación y tratamiento integral, con atención privada para dificultad persistente para lograr o mantener una erección.",
      intro:
        "La disfunción eréctil puede tener causas hormonales, vasculares, metabólicas, psicológicas o relacionadas con medicamentos. La evaluación permite ordenar el caso con discreción.",
      image: imageAssets.urinarySystem,
      overviewTitle: "Qué se evalúa",
      overview:
        "La consulta revisa salud general, función sexual, antecedentes, medicamentos y factores de riesgo. Las opciones terapéuticas se personalizan después de entender la causa probable.",
      whenTitle: "Cuándo consultar",
      when: [
        "Dificultad persistente para lograr o mantener una erección.",
        "Cambios recientes en función sexual.",
        "Condiciones metabólicas, vasculares u hormonales asociadas.",
        "Necesidad de una conversación médica privada y respetuosa.",
      ],
      preparationTitle: "Qué llevar o preparar",
      preparation:
        "No necesita tener todas las respuestas. Ayuda llevar información médica básica y hablar con claridad sobre objetivos y preocupaciones.",
      preparationItems: [
        "Medicamentos actuales.",
        "Laboratorios recientes si existen.",
        "Antecedentes cardiovasculares, hormonales o metabólicos.",
        "Tratamientos previos o suplementos utilizados.",
      ],
      afterTitle: "Plan y seguimiento",
      after:
        "El manejo puede incluir estudios, cambios médicos, tratamientos orales, opciones regenerativas o quirúrgicas según evaluación, sin prometer resultados.",
      afterItems: [
        "Plan individualizado.",
        "Laboratorios o estudios si corresponden.",
        "Seguimiento de respuesta y tolerancia.",
        "Privacidad durante todo el proceso.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Qué causas pueden estar influyendo?",
        "¿Qué estudios serían útiles?",
        "¿Qué opciones son apropiadas para mi caso?",
        "¿Cómo se hace seguimiento de forma privada?",
      ],
      related: [
        { label: "Salud masculina", href: "/salud-masculina" },
        { label: "Vasectomía", href: "/vasectomia" },
      ],
      faqTitle: "Preguntas frecuentes sobre disfunción eréctil",
      faq: [
        ["¿La consulta es privada?", "Sí. La privacidad y el respeto son parte central de la atención."],
        ["¿Siempre se indican medicamentos?", "No. Primero se revisan causas posibles y seguridad para definir opciones."],
        ["¿Puede relacionarse con salud cardiovascular?", "Puede estar relacionada en algunos pacientes, por eso se revisan antecedentes y factores de riesgo."],
        ["¿Qué debo llevar?", "Medicamentos, laboratorios disponibles, antecedentes y preguntas principales."],
      ],
      cta: "Agendar consulta privada",
      cardText:
        "Evaluación y tratamiento integral de función sexual masculina, con revisión hormonal, vascular y metabólica según cada caso.",
    },
    vasectomia: {
      seoTitle: "Vasectomía en Panamá | Anticoncepción masculina permanente",
      seoDescription:
        "Información sobre vasectomía como método anticonceptivo masculino permanente, ambulatorio y con seguimiento posterior.",
      title: "Vasectomía",
      subtitle:
        "Método anticonceptivo masculino permanente con orientación preoperatoria y seguimiento.",
      intro:
        "La vasectomía es una opción de anticoncepción masculina permanente. La decisión debe tomarse con información clara, consentimiento y conversación médica.",
      image: imageAssets.precisionSurgery,
      overviewTitle: "Qué significa",
      overview:
        "Es un procedimiento ambulatorio dirigido a interrumpir el paso de espermatozoides. Requiere orientación previa, explicación de cuidados, seguimiento y confirmación posterior según indicación médica.",
      whenTitle: "Cuándo conversarla",
      when: [
        "Deseo de anticoncepción masculina permanente.",
        "Necesidad de entender alternativas y carácter definitivo.",
        "Preguntas sobre preparación, cuidados y seguimiento.",
        "Decisión de pareja o individual que requiere claridad médica.",
      ],
      preparationTitle: "Antes del procedimiento",
      preparation:
        "La orientación previa explica beneficios, limitaciones, cuidados y necesidad de seguimiento posterior. No debe asumirse como reversible.",
      preparationItems: [
        "Historia médica y medicamentos.",
        "Expectativas y decisión informada.",
        "Indicaciones antes y después del procedimiento.",
        "Plan de control posterior.",
      ],
      afterTitle: "Seguimiento",
      after:
        "El seguimiento es clave para confirmar los próximos pasos y resolver dudas sobre recuperación y cuidados.",
      afterItems: [
        "Cuidados locales y actividad.",
        "Control según indicación.",
        "Confirmación de seguimiento antes de asumir efectividad.",
        "Consulta si hay dolor intenso, fiebre o sangrado importante.",
      ],
      questionsTitle: "Preguntas útiles",
      questions: [
        "¿Qué tan permanente es la decisión?",
        "¿Qué cuidados debo seguir después?",
        "¿Cuándo se confirma el resultado?",
        "¿Qué señales requieren atención?",
      ],
      related: [
        { label: "Salud masculina", href: "/salud-masculina" },
        { label: "Disfunción eréctil", href: "/disfuncion-erectil" },
      ],
      faqTitle: "Preguntas frecuentes sobre vasectomía",
      faq: [
        ["¿Es un método permanente?", "Sí. Debe considerarse permanente y conversarse con claridad antes del procedimiento."],
        ["¿Es ambulatoria?", "Puede realizarse de forma ambulatoria en muchos casos, según evaluación y protocolo del centro."],
        ["¿La efectividad es inmediata?", "No debe asumirse inmediata. El seguimiento posterior confirma próximos pasos según indicación médica."],
        ["¿Qué debo preguntar?", "Pregunte por preparación, cuidados, seguimiento, alternativas y señales de alarma."],
      ],
      cta: "Consultar vasectomía",
      cardText:
        "Método anticonceptivo masculino permanente, con orientación preoperatoria, procedimiento ambulatorio y seguimiento posterior.",
    },
  },
  en: {
    holep: {
      seoTitle: "HoLEP in Panama | Holmium laser prostate enucleation",
      seoDescription:
        "Information about HoLEP, Holmium laser prostate enucleation for benign prostate enlargement and urinary symptoms.",
      title: "HoLEP",
      subtitle:
        "Holmium laser prostate enucleation for selected cases of benign prostate enlargement.",
      intro:
        "HoLEP is a minimally invasive technique that may be considered when benign prostate enlargement causes urinary obstruction, weak flow, or retention.",
      image: imageAssets.prostate,
      overviewTitle: "What it aims to treat",
      overview:
        "Holmium laser enucleation removes obstructive prostate tissue through an endoscopic route. The decision depends on prostate size, symptoms, studies, history, and medical evaluation.",
      whenTitle: "When it may be discussed",
      when: [
        "Persistent difficulty urinating.",
        "Weak stream or incomplete emptying.",
        "Urinary retention related to prostate enlargement.",
        "Prostate obstruction requiring evaluation of a surgical option.",
      ],
      preparationTitle: "What is reviewed first",
      preparation:
        "The visit organizes symptoms, prostate studies, and general health to explain whether HoLEP makes sense or whether alternatives may be better.",
      preparationItems: [
        "PSA, ultrasound, uroflowmetry, or available studies.",
        "Current medications and response to prior treatment.",
        "Bleeding history, anticoagulants, or prior surgeries.",
        "Urinary goals and realistic expectations.",
      ],
      afterTitle: "Afterward and follow-up",
      after:
        "Follow-up depends on recovery and team instructions. Exact recovery timelines should not be promised before evaluation.",
      afterItems: [
        "Monitoring of urinary symptoms.",
        "Review of post-procedure instructions.",
        "Follow-up if a catheter or medication is used.",
        "Warning signs such as fever, significant bleeding, or difficulty urinating.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "Does my prostate size make HoLEP worth considering?",
        "What alternatives exist compared with TURP or other approaches?",
        "Which general risks should I understand?",
        "How would follow-up be organized?",
      ],
      related: [
        { label: "Prostate", href: "/prostata" },
        { label: "TURP", href: "/rtup" },
        { label: "Prostate adenectomy", href: "/adenectomia-prostatica" },
      ],
      faqTitle: "Frequently asked questions about HoLEP",
      faq: [
        ["Is HoLEP for every patient with an enlarged prostate?", "No. Indication depends on symptoms, size, studies, overall condition, and medical discussion."],
        ["Is it open surgery?", "No. It is an endoscopic laser approach, but it is still a procedure that requires evaluation, preparation, and follow-up."],
        ["What should I bring?", "Bring PSA, ultrasound, urinary studies, medication list, and previous reports if available."],
        ["Can it help with urinary retention?", "It may be considered in some obstruction cases from benign prostate enlargement, but the full case must be reviewed first."],
      ],
      cta: "Ask about HoLEP",
      cardText:
        "A laser technique for benign prostate enlargement that may remove obstructive tissue when evaluation confirms it is appropriate.",
    },
    rtup: {
      seoTitle: "TURP in Panama | Transurethral resection of prostate",
      seoDescription:
        "Educational guide to TURP for benign prostate enlargement, urinary obstruction, and prostate symptoms.",
      title: "TURP",
      subtitle:
        "Transurethral resection of prostate for urinary obstruction caused by benign prostate enlargement.",
      intro:
        "TURP is an endoscopic surgery that may be indicated when benign prostate enlargement affects bladder emptying and urinary quality.",
      image: imageAssets.prostate,
      overviewTitle: "What it may do",
      overview:
        "The procedure aims to remove prostate tissue that obstructs urine flow. Indication is discussed after reviewing symptoms, studies, and management alternatives.",
      whenTitle: "When it may be considered",
      when: [
        "Urinary obstruction from benign prostate enlargement.",
        "Persistent urgency, frequency, or weak stream.",
        "Poor response or intolerance to medical management.",
        "Need to compare surgical options.",
      ],
      preparationTitle: "Before deciding",
      preparation:
        "Evaluation should distinguish prostate symptoms from other urinary causes and review whether TURP is appropriate compared with alternatives such as HoLEP.",
      preparationItems: [
        "Urinary history and current medications.",
        "PSA and available prostate studies.",
        "Bladder and emptying evaluation when appropriate.",
        "General risks and aftercare.",
      ],
      afterTitle: "Follow-up",
      after:
        "Follow-up is adapted to the procedure, recovery, and symptoms afterward. Instructions are explained individually.",
      afterItems: [
        "Monitoring of symptoms and urination.",
        "Review of aftercare.",
        "Attention to fever, significant bleeding, or retention.",
        "Control plan according to recovery.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "Why would TURP be considered in my case?",
        "How does it compare with HoLEP?",
        "Which studies are still needed before deciding?",
        "What follow-up would I need?",
      ],
      related: [
        { label: "HoLEP", href: "/holep" },
        { label: "Prostate", href: "/prostata" },
      ],
      faqTitle: "Frequently asked questions about TURP",
      faq: [
        ["Is TURP decided only by symptoms?", "No. Symptoms are reviewed together with studies, history, medications, and medical evaluation."],
        ["Is it the same as HoLEP?", "No. Both may treat prostate obstruction, but they use different techniques and are discussed by case."],
        ["Can it improve emptying?", "That is the goal when prostate obstruction is relevant, but outcome depends on each patient and should not be promised."],
        ["What should I bring?", "Bring prostate studies, PSA, medication list, and prior reports if available."],
      ],
      cta: "Ask about TURP",
      cardText:
        "Endoscopic surgery for urinary obstruction from benign prostate enlargement, defined after symptoms and studies are reviewed.",
    },
    adenectomiaProstatica: {
      seoTitle: "Laparoscopic or robotic prostate adenectomy in Panama",
      seoDescription:
        "Information about laparoscopic or robot-assisted prostate adenectomy for large prostates with urinary obstruction.",
      title: "Prostate adenectomy",
      subtitle:
        "Laparoscopic or robotic approach for selected cases of very large prostate enlargement.",
      intro:
        "Prostate adenectomy may be considered when a large prostate causes significant urinary obstruction and requires a specific surgical strategy.",
      image: imageAssets.laparoscopicSurgery,
      overviewTitle: "What makes it different",
      overview:
        "This approach aims to remove the prostate adenoma with minimally invasive technique when size or anatomy justifies it. Laparoscopic or robotic selection depends on the case, availability, and medical judgment.",
      whenTitle: "When it may be discussed",
      when: [
        "Very large prostates with significant obstruction.",
        "Urinary retention or persistent severe symptoms.",
        "Prior surgical recommendation requiring review.",
        "Need to compare minimally invasive approaches.",
      ],
      preparationTitle: "What is reviewed first",
      preparation:
        "Planning requires clear studies, overall evaluation, and discussion of surgical and non-surgical alternatives.",
      preparationItems: [
        "Prostate size and imaging studies.",
        "Symptoms, urinary function, and history.",
        "Surgical risks and medications.",
        "Differences among laparoscopic, robotic, and endoscopic options.",
      ],
      afterTitle: "Afterward and follow-up",
      after:
        "Follow-up is organized according to the approach, recovery, and findings. A specific recovery timeline should not be assumed before evaluation.",
      afterItems: [
        "Postoperative controls as indicated.",
        "Review of urinary symptoms.",
        "Activity and medication instructions.",
        "Warning signs and contact channel.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "Why would this approach be better for my prostate size?",
        "How is it different from HoLEP or TURP?",
        "Which risks and preparation should I understand?",
        "Where would the procedure be performed?",
      ],
      related: [
        { label: "HoLEP", href: "/holep" },
        { label: "TURP", href: "/rtup" },
        { label: "Laparoscopic surgery", href: "/cirugia-laparoscopica" },
      ],
      faqTitle: "Frequently asked questions about prostate adenectomy",
      faq: [
        ["Is it for any prostate enlargement?", "No. It is especially discussed in larger prostates or cases that require detailed surgical planning."],
        ["Are robotic and laparoscopic approaches the same?", "No. Both may be minimally invasive, but use different equipment and workflows."],
        ["Can it be decided on a first call?", "No. Medical evaluation and study review are required before defining indication."],
        ["What should I bring?", "Imaging, PSA, urinary studies, medication list, and previous reports."],
      ],
      cta: "Ask about prostate adenectomy",
      cardText:
        "A laparoscopic or robotic option for large prostates with significant obstruction, defined after specialized evaluation.",
    },
    ureteroscopiaFlexible: {
      seoTitle: "Flexible ureteroscopy in Panama | Intrarenal endoscopic surgery",
      seoDescription:
        "Information about flexible ureteroscopy or intrarenal endoscopic surgery for kidney stones without external incisions.",
      title: "Flexible ureteroscopy",
      subtitle:
        "Intrarenal endoscopic surgery for selected kidney stones using minimally invasive technology.",
      intro:
        "Flexible ureteroscopy may allow endoscopic access to the kidney to treat selected stones without external incisions.",
      image: imageAssets.ureteroscopy,
      overviewTitle: "What it may evaluate or treat",
      overview:
        "Flexible instruments can reach areas of the kidney and, when appropriate, fragment or remove urinary stones. Indication depends on size, location, and studies.",
      whenTitle: "When it may be considered",
      when: [
        "Kidney stones accessible by endoscopic route.",
        "Stones causing pain, obstruction, or recurrence.",
        "Cases comparing laser, observation, or another technique.",
        "Follow-up of prior stone episodes.",
      ],
      preparationTitle: "Before indication",
      preparation:
        "Imaging, symptoms, labs, and history are reviewed to determine whether flexible access is safe and useful.",
      preparationItems: [
        "CT scan or ultrasound.",
        "Urine tests and labs.",
        "Stone location and size.",
        "Prior episodes or infections.",
      ],
      afterTitle: "Follow-up",
      after:
        "Follow-up may include symptom monitoring, later imaging, and prevention according to the case.",
      afterItems: [
        "Recovery review.",
        "Monitoring fever, pain, or urinary symptoms.",
        "Control studies when appropriate.",
        "Prevention of new stones.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "Is my stone accessible by flexible ureteroscopy?",
        "Would laser be used?",
        "What alternative exists if the stone is large?",
        "How are new episodes prevented?",
      ],
      related: [
        { label: "Laser for stones", href: "/laser-calculos-renales" },
        { label: "Shock wave lithotripsy", href: "/litotricia-extracorporea" },
        { label: "Kidney stones", href: "/calculos-renales" },
      ],
      faqTitle: "Frequently asked questions about flexible ureteroscopy",
      faq: [
        ["Is laser always used?", "No. It depends on the stone, location, equipment, and medical judgment."],
        ["Is it for large stones?", "Some large or complex stones may require another strategy such as percutaneous nephrolithotomy."],
        ["Do I need studies first?", "Yes. Imaging and labs guide procedure safety and indication."],
        ["Does it replace consultation?", "No. Medical evaluation defines whether it is appropriate."],
      ],
      cta: "Ask about flexible ureteroscopy",
      cardText:
        "An endoscopic procedure that may access the kidney to treat selected stones without external incisions.",
    },
    ureteroscopiaSemirrigida: {
      seoTitle: "Semi-rigid ureteroscopy in Panama | Ureter stones",
      seoDescription:
        "Information about semi-rigid ureteroscopy for stones located in the ureter and urinary obstruction.",
      title: "Semi-rigid ureteroscopy",
      subtitle:
        "Endoscopic procedure for stones located in the ureter in selected cases.",
      intro:
        "Semi-rigid ureteroscopy may be used to manage ureter stones, relieve obstruction, and evaluate selected urinary tract changes.",
      image: imageAssets.ureteroscopy,
      overviewTitle: "What it may do",
      overview:
        "It allows access to the ureter through urinary endoscopy, without external incisions. It may support stone treatment and obstruction evaluation depending on the case.",
      whenTitle: "When it is discussed",
      when: [
        "Stones located in the ureter.",
        "Pain associated with urinary obstruction.",
        "Imaging findings that require endoscopic access.",
        "Need to review alternatives such as observation or laser.",
      ],
      preparationTitle: "What is reviewed first",
      preparation:
        "Indication depends on imaging, symptoms, kidney function, infection, pain, and patient safety.",
      preparationItems: [
        "CT scan, ultrasound, or emergency report.",
        "Labs and urine testing.",
        "Medications, allergies, and history.",
        "Current symptoms and timeline.",
      ],
      afterTitle: "Follow-up",
      after:
        "After the procedure, instructions depend on what was done, findings, and recovery.",
      afterItems: [
        "Monitoring pain, fever, or difficulty urinating.",
        "Follow-up if a urinary device is placed.",
        "Review of studies when applicable.",
        "Prevention plan by case.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "Where is the stone located?",
        "Is there obstruction?",
        "What alternative do I have if the procedure is not performed?",
        "Which symptoms should I watch afterward?",
      ],
      related: [
        { label: "Ureteroscopy", href: "/ureteroscopia" },
        { label: "Flexible ureteroscopy", href: "/ureteroscopia-flexible" },
        { label: "Kidney stones", href: "/calculos-renales" },
      ],
      faqTitle: "Frequently asked questions about semi-rigid ureteroscopy",
      faq: [
        ["Is it the same as flexible ureteroscopy?", "No. Both are endoscopic, but use different instruments and scenarios according to location and case."],
        ["Can it relieve stone pain?", "It may be part of management if the stone and obstruction justify it, but indication depends on medical evaluation."],
        ["What studies should I bring?", "Imaging, labs, emergency report, medications, and history."],
        ["When should I seek urgent care?", "Fever, chills, severe pain, significant bleeding, or inability to urinate require urgent care."],
      ],
      cta: "Ask about semi-rigid ureteroscopy",
      cardText:
        "An endoscopic approach for ureter stones and urinary obstruction without external incisions in selected cases.",
    },
    litotriciaExtracorporea: {
      seoTitle: "Shock wave lithotripsy in Panama | ESWL",
      seoDescription:
        "Information about extracorporeal shock wave lithotripsy for selected small or medium urinary stones.",
      title: "Shock wave lithotripsy",
      subtitle:
        "Non-invasive shock wave treatment for selected small or medium urinary stones.",
      intro:
        "Extracorporeal lithotripsy may fragment some stones to support natural passage when size, location, and clinical condition allow.",
      image: imageAssets.kidneyStones,
      overviewTitle: "What it aims to do",
      overview:
        "It uses shock waves from outside the body to fragment selected stones. Not all stones respond the same way, and the decision depends on imaging.",
      whenTitle: "When it may be considered",
      when: [
        "Small or medium stones with favorable location.",
        "Cases where avoiding an endoscopic approach may be safe.",
        "Patients who need to compare management options.",
        "Stone follow-up with appropriate criteria.",
      ],
      preparationTitle: "What is reviewed first",
      preparation:
        "The visit reviews whether the stone has appropriate characteristics and whether factors could reduce effectiveness or increase risk.",
      preparationItems: [
        "Stone size, density, and location.",
        "Symptoms and degree of obstruction.",
        "Labs and urine testing.",
        "Medications and relevant history.",
      ],
      afterTitle: "After treatment",
      after:
        "Follow-up may review fragment passage, pain, control studies, and prevention.",
      afterItems: [
        "Recovery monitoring.",
        "Symptom review.",
        "Control imaging when appropriate.",
        "Prevention of new stones.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "Does my stone have a good profile for shock waves?",
        "What happens if fragmentation is not enough?",
        "Which symptoms should I watch afterward?",
        "How is progress confirmed?",
      ],
      related: [
        { label: "Kidney stones", href: "/calculos-renales" },
        { label: "Flexible ureteroscopy", href: "/ureteroscopia-flexible" },
        { label: "Laser for stones", href: "/laser-calculos-renales" },
      ],
      faqTitle: "Frequently asked questions about shock wave lithotripsy",
      faq: [
        ["Is it for every stone?", "No. It depends on size, location, density, symptoms, and medical judgment."],
        ["Does it always avoid a procedure?", "No. Some stones may require another approach if they do not respond or are not suitable."],
        ["Which studies are reviewed?", "Imaging, urine testing, labs, and history of prior episodes."],
        ["Does it require follow-up?", "Yes. Follow-up helps review fragments, symptoms, and prevention."],
      ],
      cta: "Ask about lithotripsy",
      cardText:
        "A non-invasive shock wave option to fragment selected small or medium urinary stones.",
    },
    disfuncionErectil: {
      seoTitle: "Erectile dysfunction in Panama | Private urology evaluation",
      seoDescription:
        "Comprehensive private evaluation for erectile dysfunction, including hormonal, vascular, metabolic, and personalized treatment pathways.",
      title: "Erectile dysfunction",
      subtitle:
        "Comprehensive evaluation and treatment planning for persistent difficulty achieving or maintaining an erection.",
      intro:
        "Erectile dysfunction may have hormonal, vascular, metabolic, psychological, or medication-related causes. Evaluation helps organize the case discreetly.",
      image: imageAssets.urinarySystem,
      overviewTitle: "What is evaluated",
      overview:
        "The visit reviews general health, sexual function, history, medications, and risk factors. Treatment options are personalized after understanding the likely cause.",
      whenTitle: "When to consult",
      when: [
        "Persistent difficulty achieving or maintaining an erection.",
        "Recent changes in sexual function.",
        "Metabolic, vascular, or hormonal conditions.",
        "Need for a private and respectful medical conversation.",
      ],
      preparationTitle: "What to bring or prepare",
      preparation:
        "You do not need to have every answer. Basic medical information helps, along with clear goals and concerns.",
      preparationItems: [
        "Current medications.",
        "Recent labs if available.",
        "Cardiovascular, hormonal, or metabolic history.",
        "Prior treatments or supplements used.",
      ],
      afterTitle: "Plan and follow-up",
      after:
        "Management may include studies, medical changes, oral treatments, regenerative options, or surgical options according to evaluation, without promising outcomes.",
      afterItems: [
        "Individualized plan.",
        "Labs or studies when appropriate.",
        "Follow-up of response and tolerance.",
        "Privacy throughout the process.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "Which causes may be influencing this?",
        "Which studies would be useful?",
        "Which options are appropriate for my case?",
        "How is follow-up handled privately?",
      ],
      related: [
        { label: "Men's health", href: "/salud-masculina" },
        { label: "Vasectomy", href: "/vasectomia" },
      ],
      faqTitle: "Frequently asked questions about erectile dysfunction",
      faq: [
        ["Is the visit private?", "Yes. Privacy and respect are central to care."],
        ["Are medications always prescribed?", "No. Possible causes and safety are reviewed first to define options."],
        ["Can it relate to cardiovascular health?", "It can in some patients, which is why history and risk factors are reviewed."],
        ["What should I bring?", "Medications, available labs, history, and main questions."],
      ],
      cta: "Book private consultation",
      cardText:
        "Comprehensive evaluation and treatment planning for male sexual function, including hormonal, vascular, and metabolic review by case.",
    },
    vasectomia: {
      seoTitle: "Vasectomy in Panama | Permanent male contraception",
      seoDescription:
        "Information about vasectomy as a permanent male contraception method with counseling, outpatient procedure, and follow-up.",
      title: "Vasectomy",
      subtitle:
        "Permanent male contraception with preoperative counseling and follow-up.",
      intro:
        "Vasectomy is a permanent male contraception option. The decision should be made with clear information, consent, and medical discussion.",
      image: imageAssets.precisionSurgery,
      overviewTitle: "What it means",
      overview:
        "It is an outpatient procedure intended to interrupt sperm transport. It requires counseling, explanation of aftercare, follow-up, and later confirmation according to medical instructions.",
      whenTitle: "When to discuss it",
      when: [
        "Desire for permanent male contraception.",
        "Need to understand alternatives and permanence.",
        "Questions about preparation, care, and follow-up.",
        "Individual or couple decision requiring medical clarity.",
      ],
      preparationTitle: "Before the procedure",
      preparation:
        "Counseling explains benefits, limits, care, and need for follow-up. It should not be assumed reversible.",
      preparationItems: [
        "Medical history and medications.",
        "Expectations and informed decision.",
        "Instructions before and after the procedure.",
        "Follow-up plan.",
      ],
      afterTitle: "Follow-up",
      after:
        "Follow-up is important to confirm next steps and answer questions about recovery and care.",
      afterItems: [
        "Local care and activity.",
        "Control according to instructions.",
        "Follow-up confirmation before assuming effectiveness.",
        "Consult if severe pain, fever, or significant bleeding occurs.",
      ],
      questionsTitle: "Useful questions",
      questions: [
        "How permanent is the decision?",
        "Which care instructions should I follow afterward?",
        "When is the result confirmed?",
        "Which warning signs require attention?",
      ],
      related: [
        { label: "Men's health", href: "/salud-masculina" },
        { label: "Erectile dysfunction", href: "/disfuncion-erectil" },
      ],
      faqTitle: "Frequently asked questions about vasectomy",
      faq: [
        ["Is it permanent?", "Yes. It should be considered permanent and discussed clearly before the procedure."],
        ["Is it outpatient?", "It can be outpatient in many cases, depending on evaluation and center protocol."],
        ["Is effectiveness immediate?", "It should not be assumed immediate. Follow-up confirms next steps according to medical instructions."],
        ["What should I ask?", "Ask about preparation, care, follow-up, alternatives, and warning signs."],
      ],
      cta: "Ask about vasectomy",
      cardText:
        "Permanent male contraception with preoperative counseling, outpatient procedure, and later follow-up.",
    },
  },
};
