import type { Language, SpecialtyKey } from "./translations";

type SpecialtyEnhancement = {
  evaluatePoints: string[];
  faq: Array<[string, string]>;
};

export const specialtyEnhancements: Record<
  Language,
  Partial<Record<SpecialtyKey, SpecialtyEnhancement>>
> = {
  es: {
    calculosRenales: {
      evaluatePoints: [
        "Ubicación probable del cálculo y relación con el dolor.",
        "Tamaño, número y características visibles en imágenes.",
        "Datos de infección, obstrucción o compromiso de función renal.",
        "Tratamientos previos y evolución desde el inicio de síntomas.",
      ],
      faq: [
        ["¿Todos los cálculos necesitan cirugía?", "No necesariamente. El manejo depende del tamaño, ubicación, síntomas, presencia de infección u obstrucción y condición general del paciente. Algunos casos pueden vigilarse; otros pueden requerir procedimientos según valoración médica."],
        ["¿Cuándo debo ir a urgencias?", "Busque atención urgente si presenta fiebre, dolor intenso persistente, vómitos, debilidad marcada, escalofríos, dificultad para orinar o empeoramiento rápido. Esos síntomas pueden requerir atención inmediata."],
        ["¿Qué estudios se suelen revisar?", "Pueden revisarse análisis de orina, laboratorios de función renal, ultrasonido, tomografía, reportes previos e imágenes disponibles. El médico determina qué estudios corresponden según el caso."],
        ["¿Qué es la ureteroscopía?", "Es un procedimiento endourológico que permite acceder al uréter y, en ciertos casos, tratar cálculos ubicados en esa zona. No aplica a todos los cálculos; depende de ubicación, tamaño y evaluación médica."],
        ["¿Qué debo llevar a la consulta?", "Lleve estudios de imagen, reportes escritos, laboratorios, medicamentos actuales, informes previos, fecha de inicio de síntomas y preguntas principales. Si tiene imágenes en disco o enlace digital, también pueden ser útiles."],
        ["¿Puede volver a aparecer un cálculo?", "Puede ocurrir en algunas personas. El seguimiento permite revisar antecedentes, estudios, hábitos, posibles factores de riesgo y orientación preventiva según cada caso."],
        ["¿El dolor siempre significa que el cálculo se está moviendo?", "No siempre. El dolor puede relacionarse con obstrucción, inflamación u otras causas. La evaluación médica y los estudios ayudan a entender qué está ocurriendo."],
        ["¿Qué opciones existen si el cálculo es grande?", "Las opciones dependen del tamaño, ubicación y complejidad. En algunos casos se conversa sobre láser, ureteroscopía o nefrolitotomía percutánea, pero la indicación solo se define tras la evaluación."],
      ],
    },
    prostata: {
      evaluatePoints: [
        "Patrón de síntomas urinarios y tiempo de evolución.",
        "Resultados de PSA y cambios frente a estudios anteriores.",
        "Antecedentes familiares o hallazgos que requieran seguimiento.",
        "Necesidad de imagen, control, biopsia u otra evaluación.",
      ],
      faq: [
        ["¿Cuándo debo revisar la próstata?", "Depende de edad, síntomas, antecedentes familiares y estudios disponibles. La consulta permite definir si corresponde control preventivo, seguimiento de PSA o evaluación de síntomas urinarios."],
        ["¿Qué significa PSA elevado?", "Un PSA elevado no significa automáticamente cáncer. Puede elevarse por diferentes razones, pero requiere interpretación médica, comparación con estudios previos y, en algunos casos, seguimiento o estudios adicionales."],
        ["¿Todos los síntomas urinarios son por próstata?", "No siempre. Ardor, urgencia, levantarse de noche, chorro débil o sensación de vaciado incompleto pueden tener distintas causas. La evaluación ayuda a identificar qué puede estar influyendo."],
        ["¿Cuándo puede indicarse una biopsia?", "Puede considerarse si existen hallazgos clínicos, PSA, imágenes o antecedentes que lo justifiquen. La decisión debe explicarse durante la consulta y no se asume sin valoración médica."],
        ["¿Qué debo llevar a la consulta?", "Lleve resultados de PSA, laboratorios, estudios de imagen, informes previos, lista de medicamentos y preguntas principales. Si tiene resultados anteriores, pueden ayudar a comparar cambios."],
        ["¿El crecimiento prostático es cáncer?", "No. El crecimiento prostático benigno y el cáncer de próstata son condiciones diferentes. Los síntomas y estudios deben evaluarse para orientar los próximos pasos."],
        ["¿La consulta es privada?", "Sí. Los temas prostáticos y urinarios se manejan con privacidad, respeto y claridad, buscando que el paciente pueda hablar con confianza."],
        ["¿Qué pasa si tengo antecedentes familiares?", "Los antecedentes familiares pueden influir en la estrategia de seguimiento. El médico puede valorar edad, síntomas, PSA y otros factores para orientar el control adecuado."],
      ],
    },
    uroOncologia: {
      evaluatePoints: [
        "Órgano urológico involucrado y motivo de sospecha o diagnóstico.",
        "Coherencia entre imágenes, biopsia, laboratorios e informes.",
        "Tratamientos previos o recomendaciones recibidas.",
        "Próximos pasos posibles según la información disponible.",
      ],
      faq: [
        ["¿Cuándo pedir una evaluación uro-oncológica?", "Puede solicitarse cuando existen estudios alterados, sospecha clínica, diagnóstico previo, PSA elevado, sangre en la orina, una recomendación quirúrgica o necesidad de revisar opciones."],
        ["¿Qué estudios debo llevar?", "Lleve imágenes, reportes, laboratorios, biopsias, informes médicos, tratamientos previos y una lista de preguntas. Mientras más completa sea la información, más clara puede ser la orientación."],
        ["¿Puedo solicitar una segunda opinión?", "Sí. Una segunda opinión puede ayudar a entender mejor estudios, diagnóstico y recomendaciones previas antes de tomar decisiones. No sustituye urgencias ni garantiza un cambio de indicación."],
        ["¿La consulta define si necesito cirugía?", "No necesariamente. La consulta permite revisar el caso, explicar hallazgos y determinar si faltan estudios o qué opciones de manejo podrían corresponder según evaluación médica."],
        ["¿Qué pasa si tengo un diagnóstico previo?", "Puede revisarse la documentación disponible, confirmar qué información respalda el diagnóstico y conversar próximos pasos posibles. No se deben tomar decisiones sin revisar el caso completo."],
        ["¿La uro-oncología solo trata próstata?", "No. También puede involucrar riñón, vejiga, testículo y otros órganos del sistema urológico según cada caso."],
        ["¿Qué significa sangre en la orina?", "La sangre en la orina puede tener diferentes causas y requiere evaluación. En algunos casos puede indicarse imagen, análisis o cistoscopía, según criterio médico."],
        ["¿Puedo llevar a un familiar a la consulta?", "Sí, si el paciente lo desea. Un acompañante puede ayudar a recordar preguntas, entender la información y organizar próximos pasos."],
      ],
    },
    segundaOpinion: {
      evaluatePoints: [
        "Qué diagnóstico o recomendación desea revisar.",
        "Qué estudios respaldan la recomendación previa.",
        "Qué dudas permanecen antes de tomar una decisión.",
        "Qué información adicional podría hacer falta para orientar el caso.",
      ],
      faq: [
        ["¿Necesito tener todos mis estudios?", "No siempre, pero llevar todo lo disponible permite una revisión más completa. Si faltan documentos, el médico puede indicar qué información sería útil para continuar."],
        ["¿Puedo pedirla si ya me recomendaron cirugía?", "Sí. Puede revisar la recomendación, entender por qué fue propuesta y conversar si faltan estudios o si existen alternativas razonables según valoración médica."],
        ["¿La consulta cambia mi diagnóstico?", "No se puede prometer. La consulta revisa información disponible, aclara dudas y orienta próximos pasos. En algunos casos puede confirmar, ampliar o cuestionar información previa."],
        ["¿Puedo enviar documentos antes?", "La carga segura de documentos es una integración futura. Por ahora, puede coordinar qué llevar y organizar estudios, informes, biopsias o laboratorios disponibles."],
        ["¿Qué debo preparar?", "Prepare estudios, informes, medicamentos actuales, recomendaciones previas y una lista de preguntas principales. También es útil anotar qué decisión necesita tomar."],
        ["¿Qué pasa si los estudios son de otro país?", "Pueden revisarse si están disponibles. Idealmente lleve reportes escritos, imágenes digitales y traducción si algún documento no está en español o inglés."],
        ["¿Sirve para casos oncológicos?", "Sí, puede ser especialmente útil cuando existe diagnóstico, sospecha, biopsia, recomendación quirúrgica o dudas sobre próximos pasos en uro-oncología."],
        ["¿La segunda opinión reemplaza la atención de urgencia?", "No. Si hay dolor intenso, fiebre, sangrado importante, debilidad marcada o una emergencia, debe acudir a un servicio médico de urgencia."],
      ],
    },
    endourologia: {
      evaluatePoints: [
        "Si el problema corresponde a una vía endoscópica o requiere otra ruta.",
        "Tamaño, ubicación y complejidad de cálculos u obstrucciones.",
        "Riesgos asociados a infección, obstrucción o estudios alterados.",
        "Qué procedimiento específico podría discutirse si corresponde.",
      ],
      faq: [
        ["¿La endourología es una cirugía específica?", "No. Es un campo de procedimientos mínimamente invasivos de las vías urinarias. La ureteroscopía, la cistoscopía y algunos tratamientos para cálculos son ejemplos."],
        ["¿Siempre se necesita un procedimiento?", "No. Primero se requiere evaluación médica. Algunos casos pueden manejarse con seguimiento, estudios adicionales u otras opciones según diagnóstico."],
        ["¿Se usa para cálculos?", "Puede utilizarse en casos seleccionados de cálculos, dependiendo de tamaño, ubicación, síntomas, obstrucción, infección y condición general del paciente."],
        ["¿Qué estudios debo llevar?", "Lleve tomografía, ultrasonido, análisis de orina, laboratorios, informes previos y medicamentos actuales si los tiene. Las imágenes ayudan a definir la ruta de manejo."],
        ["¿Qué ocurre después?", "El seguimiento depende del procedimiento, hallazgos y evolución de cada paciente. Pueden indicarse controles, medicamentos, retiro de dispositivos o nuevos estudios según el caso."],
        ["¿Cuál es la diferencia con ureteroscopía?", "La endourología es el campo amplio. La ureteroscopía es un procedimiento específico que permite acceder al uréter y, en algunos casos, tratar cálculos."],
        ["¿Es útil para síntomas urinarios?", "Puede ser parte de la evaluación en ciertos síntomas, pero no todos los síntomas requieren un procedimiento. La consulta define qué estudios o pasos corresponden."],
        ["¿Qué preguntas debo hacer?", "Pregunte por el objetivo del procedimiento, alternativas, preparación, cuidados posteriores y señales de alarma. La decisión debe ser clara antes de avanzar."],
      ],
    },
    ureteroscopia: {
      evaluatePoints: [
        "Ubicación del cálculo o alteración en el uréter.",
        "Grado de obstrucción, dolor o cambios en estudios.",
        "Necesidad de láser u otros instrumentos durante el procedimiento.",
        "Preparación, indicaciones y seguimiento si llega a indicarse.",
      ],
      faq: [
        ["¿La ureteroscopía siempre requiere hospitalización?", "Depende del caso, del procedimiento realizado, de la condición del paciente y de los protocolos del centro. El médico explicará el escenario correspondiente durante la evaluación."],
        ["¿Se usa para cálculos renales?", "Puede utilizarse en determinados casos, especialmente cuando los cálculos están en el uréter o cuando el acceso endoscópico se considera adecuado según estudios y valoración médica."],
        ["¿Necesito estudios antes?", "Es posible que se requieran imágenes, laboratorios, análisis de orina u otros exámenes antes de definir el manejo. La indicación depende del caso clínico."],
        ["¿El procedimiento sustituye la consulta?", "No. Primero se requiere evaluación médica para determinar si corresponde, revisar estudios, explicar alternativas y resolver dudas."],
        ["¿Qué debo llevar?", "Lleve imágenes, reportes escritos, laboratorios, medicamentos actuales, alergias conocidas e informes previos si los tiene."],
        ["¿Siempre se usa láser?", "No siempre. El uso de láser depende del tipo de cálculo, ubicación, equipo disponible y criterio médico. No debe asumirse antes de la evaluación."],
        ["¿Qué síntomas después deben vigilarse?", "El médico indicará qué esperar y qué señales requieren atención. Fiebre, dolor intenso persistente, dificultad para orinar o empeoramiento rápido deben ser evaluados."],
        ["¿Puede requerir seguimiento?", "Sí. El seguimiento permite revisar evolución, resultados, retiro de dispositivos si se usan y prevención o control según cada caso."],
      ],
    },
    cirugiaLaparoscopica: {
      evaluatePoints: [
        "Motivo de la recomendación quirúrgica y objetivos del procedimiento.",
        "Hallazgos relevantes en imágenes, laboratorios e informes.",
        "Alternativas razonables o estudios pendientes antes de decidir.",
        "Preparación, riesgos generales y seguimiento si la cirugía corresponde.",
      ],
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
    },
    saludMasculina: {
      evaluatePoints: [
        "Síntomas urinarios, sexuales o de fertilidad que desea conversar.",
        "Medicamentos, antecedentes y factores que pueden influir.",
        "Necesidad de laboratorios o estudios complementarios.",
        "Plan de seguimiento privado y respetuoso según valoración.",
      ],
      faq: [
        ["¿Cuándo consultar por salud masculina?", "Cuando existen cambios en función sexual, dudas de fertilidad, síntomas urinarios, dolor, molestias, antecedentes relevantes o interés en prevención urológica."],
        ["¿La consulta es privada?", "Sí. La privacidad, discreción y conversación respetuosa son parte esencial de la atención, especialmente en temas sensibles."],
        ["¿Qué información debo llevar?", "Lleve medicamentos actuales, estudios previos, antecedentes relevantes, síntomas que le preocupan y preguntas principales. No necesita tener todo resuelto antes de consultar."],
        ["¿Se pueden tratar temas de función sexual?", "Sí. Estos temas pueden conversarse de forma médica, privada y respetuosa. La evaluación ayuda a definir si se requieren estudios o próximos pasos."],
        ["¿También se evalúan síntomas urinarios?", "Sí. Ardor, urgencia, frecuencia, levantarse de noche, cambios en el chorro o molestias pueden revisarse dentro de la salud urológica masculina."],
        ["¿Puedo consultar por fertilidad masculina?", "Sí. La fertilidad masculina puede evaluarse según antecedentes, estudios disponibles, síntomas y objetivos del paciente o pareja."],
        ["¿La edad importa?", "La edad puede orientar ciertos controles, pero los síntomas, antecedentes y preocupaciones personales también son importantes para decidir cuándo consultar."],
        ["¿Qué pasa si me da pena hablar del tema?", "Es común sentir incomodidad. La consulta está diseñada para conversar con respeto, sin juicio y con lenguaje claro."],
      ],
    },
  },
  en: {
    calculosRenales: {
      evaluatePoints: ["Likely stone location and relation to pain.", "Stone size, number, and imaging characteristics.", "Signs of infection, obstruction, or kidney function concern.", "Previous treatment and symptom timeline."],
      faq: [
        ["Do all stones need surgery?", "Not necessarily. Management depends on size, location, symptoms, infection or obstruction, and the patient's overall condition. Some cases may be monitored; others may need procedures after medical evaluation."],
        ["When should I go to urgent care?", "Seek urgent care for fever, persistent severe pain, vomiting, marked weakness, chills, difficulty urinating, or rapid worsening. These symptoms may require immediate attention."],
        ["What studies are usually reviewed?", "Urine tests, kidney function labs, ultrasound, CT scan, previous reports, and available images may be reviewed. The doctor determines what is appropriate for each case."],
        ["What is ureteroscopy?", "It is an endourologic procedure that allows access to the ureter and, in selected cases, treatment of stones in that area. It does not apply to every stone."],
        ["What should I bring?", "Bring imaging studies, written reports, labs, current medications, prior reports, symptom start date, and main questions. Digital images can also be useful."],
        ["Can a stone come back?", "It can happen in some people. Follow-up can review history, studies, habits, possible risk factors, and prevention guidance according to the case."],
        ["Does pain always mean the stone is moving?", "Not always. Pain may relate to obstruction, inflammation, or other causes. Medical evaluation and studies help clarify what is happening."],
        ["What options exist for a large stone?", "Options depend on size, location, and complexity. Laser, ureteroscopy, or percutaneous nephrolithotomy may be discussed in selected cases, but indication is defined after evaluation."],
      ],
    },
    prostata: {
      evaluatePoints: ["Urinary symptom pattern and duration.", "PSA results and changes compared with prior studies.", "Family history or findings that require follow-up.", "Need for imaging, monitoring, biopsy, or further evaluation."],
      faq: [
        ["When should I check my prostate?", "It depends on age, symptoms, family history, and available studies. The visit helps define whether preventive follow-up, PSA monitoring, or urinary symptom evaluation is appropriate."],
        ["What does elevated PSA mean?", "Elevated PSA does not automatically mean cancer. It can rise for different reasons, but it requires medical interpretation, comparison with prior studies, and sometimes follow-up or additional tests."],
        ["Are all urinary symptoms from the prostate?", "Not always. Burning, urgency, nighttime urination, weak stream, or incomplete emptying can have different causes. Evaluation helps identify what may be contributing."],
        ["When may biopsy be indicated?", "It may be considered if clinical findings, PSA, imaging, or history justify it. The decision should be explained during consultation and is not assumed without evaluation."],
        ["What should I bring?", "Bring PSA results, labs, imaging, previous reports, medication list, and main questions. Prior results can help compare changes."],
        ["Is enlarged prostate cancer?", "No. Benign prostate enlargement and prostate cancer are different conditions. Symptoms and studies should be evaluated to guide next steps."],
        ["Is the visit private?", "Yes. Prostate and urinary topics are handled with privacy, respect, and clarity so the patient can speak comfortably."],
        ["What if I have family history?", "Family history can influence follow-up strategy. The doctor can assess age, symptoms, PSA, and other factors to guide appropriate monitoring."],
      ],
    },
    uroOncologia: {
      evaluatePoints: ["Urologic organ involved and reason for suspicion or diagnosis.", "Consistency between imaging, biopsy, labs, and reports.", "Previous treatments or recommendations received.", "Possible next steps based on available information."],
      faq: [
        ["When should I request uro-oncology evaluation?", "It may be requested for abnormal studies, clinical suspicion, prior diagnosis, elevated PSA, blood in urine, a surgical recommendation, or the need to review options."],
        ["What studies should I bring?", "Bring images, reports, labs, biopsies, medical summaries, previous treatments, and questions. More complete information usually allows clearer guidance."],
        ["Can I request a second opinion?", "Yes. A second opinion can help clarify studies, diagnosis, and previous recommendations before decisions are made. It does not replace urgent care or guarantee a change in recommendation."],
        ["Does the visit define whether I need surgery?", "Not necessarily. The visit reviews the case, explains findings, and determines whether more studies or management options may be appropriate after evaluation."],
        ["What if I already have a diagnosis?", "Available documentation can be reviewed, including what supports the diagnosis and what next steps may be reasonable. Decisions should not be made without reviewing the full case."],
        ["Is uro-oncology only about prostate?", "No. It may also involve kidney, bladder, testicular, and other urologic organs according to each case."],
        ["What does blood in urine mean?", "Blood in urine can have different causes and requires evaluation. Imaging, urine tests, or cystoscopy may be indicated depending on medical judgment."],
        ["Can I bring a family member?", "Yes, if the patient wants. A companion can help remember questions, understand information, and organize next steps."],
      ],
    },
    segundaOpinion: {
      evaluatePoints: ["Which diagnosis or recommendation you want reviewed.", "Which studies support the prior recommendation.", "Which doubts remain before deciding.", "What additional information may be needed to guide the case."],
      faq: [
        ["Do I need all my studies?", "Not always, but bringing everything available allows a more complete review. If documents are missing, the doctor can explain what information would be useful."],
        ["Can I request it if surgery was already recommended?", "Yes. You can review why surgery was proposed and discuss whether studies are missing or whether reasonable alternatives exist after medical evaluation."],
        ["Does the visit change my diagnosis?", "This cannot be promised. The visit reviews available information, clarifies doubts, and guides next steps. In some cases it may confirm, expand, or question prior information."],
        ["Can I send documents before?", "Secure document upload is a future integration. For now, you can coordinate what to bring and organize studies, reports, biopsies, or labs."],
        ["What should I prepare?", "Prepare studies, reports, current medications, previous recommendations, and a list of main questions. It also helps to write down the decision you need to make."],
        ["What if my studies are from another country?", "They can be reviewed if available. Ideally bring written reports, digital images, and translation if any document is not in Spanish or English."],
        ["Is it useful for cancer-related cases?", "Yes, it can be especially useful when there is a diagnosis, suspicion, biopsy, surgical recommendation, or uncertainty about uro-oncology next steps."],
        ["Does a second opinion replace urgent care?", "No. If there is severe pain, fever, significant bleeding, marked weakness, or an emergency, seek urgent medical care."],
      ],
    },
    endourologia: {
      evaluatePoints: ["Whether the problem fits an endoscopic route or another approach.", "Size, location, and complexity of stones or obstructions.", "Risks related to infection, obstruction, or abnormal studies.", "Which specific procedure may be discussed if appropriate."],
      faq: [
        ["Is endourology a specific surgery?", "No. It is a field of minimally invasive urinary tract procedures. Ureteroscopy, cystoscopy, and selected stone treatments are examples."],
        ["Is a procedure always needed?", "No. Medical evaluation comes first. Some cases may be managed with follow-up, additional studies, or other options depending on diagnosis."],
        ["Is it used for stones?", "It may be used for selected stone cases depending on size, location, symptoms, obstruction, infection, and the patient's overall condition."],
        ["What studies should I bring?", "Bring CT scan, ultrasound, urine tests, labs, prior reports, and current medications if available. Images help define the management route."],
        ["What happens afterward?", "Follow-up depends on the procedure, findings, and patient evolution. Controls, medications, device removal, or new studies may be indicated according to the case."],
        ["How is it different from ureteroscopy?", "Endourology is the broader field. Ureteroscopy is a specific procedure that accesses the ureter and may treat stones in selected cases."],
        ["Can it help urinary symptoms?", "It may be part of evaluation in certain symptoms, but not every symptom requires a procedure. Consultation defines which studies or steps are appropriate."],
        ["What should I ask?", "Ask about the purpose of the procedure, alternatives, preparation, aftercare, and warning signs. The decision should be clear before moving forward."],
      ],
    },
    ureteroscopia: {
      evaluatePoints: ["Location of the stone or ureter finding.", "Degree of obstruction, pain, or study changes.", "Whether laser or other instruments may be needed.", "Preparation, instructions, and follow-up if indicated."],
      faq: [
        ["Does ureteroscopy always require hospitalization?", "It depends on the case, procedure performed, patient condition, and center protocols. The doctor will explain the relevant scenario during evaluation."],
        ["Is it used for kidney stones?", "It may be used in selected cases, especially when stones are in the ureter or when endoscopic access is considered appropriate based on studies and evaluation."],
        ["Do I need studies before?", "Imaging, labs, urine tests, or other exams may be required before management is defined. Indication depends on the clinical case."],
        ["Does the procedure replace consultation?", "No. Medical evaluation is required first to determine whether it is appropriate, review studies, explain alternatives, and answer questions."],
        ["What should I bring?", "Bring images, written reports, labs, current medications, known allergies, and prior medical reports if available."],
        ["Is laser always used?", "Not always. Laser use depends on stone type, location, available equipment, and medical judgment. It should not be assumed before evaluation."],
        ["What symptoms afterward should be watched?", "The doctor will explain what to expect and warning signs. Fever, persistent severe pain, difficulty urinating, or rapid worsening should be evaluated."],
        ["Can it require follow-up?", "Yes. Follow-up can review recovery, results, device removal if used, and prevention or control according to each case."],
      ],
    },
    cirugiaLaparoscopica: {
      evaluatePoints: ["Reason for the surgical recommendation and procedure goals.", "Relevant findings in imaging, labs, and reports.", "Reasonable alternatives or pending studies before deciding.", "Preparation, general risks, and follow-up if surgery is appropriate."],
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
    },
    saludMasculina: {
      evaluatePoints: ["Urinary, sexual, or fertility symptoms you want to discuss.", "Medications, history, and factors that may contribute.", "Need for labs or complementary studies.", "Private and respectful follow-up plan after evaluation."],
      faq: [
        ["When should I consult for men's health?", "When there are changes in sexual function, fertility questions, urinary symptoms, pain, discomfort, relevant history, or interest in urologic prevention."],
        ["Is the visit private?", "Yes. Privacy, discretion, and respectful conversation are essential parts of care, especially for sensitive topics."],
        ["What information should I bring?", "Bring current medications, prior studies, relevant history, symptoms that concern you, and main questions. You do not need to have everything figured out before consulting."],
        ["Can sexual function be discussed?", "Yes. These topics can be discussed medically, privately, and respectfully. Evaluation helps define whether studies or next steps are needed."],
        ["Are urinary symptoms also evaluated?", "Yes. Burning, urgency, frequency, nighttime urination, stream changes, or discomfort can be reviewed as part of men's urologic health."],
        ["Can I ask about male fertility?", "Yes. Male fertility can be evaluated according to history, available studies, symptoms, and the goals of the patient or couple."],
        ["Does age matter?", "Age can guide certain controls, but symptoms, history, and personal concerns also matter when deciding when to consult."],
        ["What if I feel embarrassed to discuss it?", "That is common. The consultation is designed to be respectful, nonjudgmental, and clear."],
      ],
    },
  },
};
