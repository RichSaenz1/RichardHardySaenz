import { imageAssets } from "./images";

export const concernOptions = [
  {
    title: "Síntomas de próstata",
    icon: "user",
    text: "Evaluación de síntomas urinarios, PSA elevado, crecimiento prostático o sospecha de enfermedad prostática.",
  },
  {
    title: "Cálculos renales",
    icon: "stones",
    text: "Orientación para dolor por piedras, estudios de imagen y procedimientos como ureteroscopía, láser o cirugía percutánea según cada caso.",
  },
  {
    title: "Uro-oncología",
    icon: "shield",
    text: "Evaluación especializada de sospechas, diagnósticos o seguimiento relacionado con cáncer urológico.",
  },
  {
    title: "Dolor o molestias urinarias",
    icon: "urinary",
    text: "Consulta por ardor, infecciones, sangre en la orina, urgencia urinaria, dolor pélvico o cambios al orinar.",
  },
  {
    title: "Salud sexual masculina",
    icon: "heart",
    text: "Evaluación médica de función sexual, fertilidad masculina y salud urológica integral.",
  },
  {
    title: "Segunda opinión",
    icon: "opinion",
    text: "Revisión de estudios, diagnósticos previos o recomendaciones quirúrgicas antes de tomar una decisión médica.",
  },
];

export const specialtyPillars = [
  {
    title: "Uro-oncología",
    text: "Evaluación y seguimiento de condiciones oncológicas urológicas, con orientación clara sobre estudios, diagnóstico y opciones de manejo según cada caso.",
    image: imageAssets.uroOncology,
  },
  {
    title: "Cálculos renales",
    text: "Atención para piedras en los riñones o vías urinarias, incluyendo evaluación de síntomas, estudios de imagen y alternativas de tratamiento.",
    image: imageAssets.kidneyStones,
  },
  {
    title: "Próstata",
    text: "Evaluación de síntomas prostáticos, PSA elevado, crecimiento prostático, biopsia y condiciones relacionadas con la próstata.",
    image: imageAssets.prostate,
  },
  {
    title: "Endourología",
    text: "Procedimientos especializados de mínima invasión para tratar condiciones de las vías urinarias con instrumentos de alta precisión.",
    image: imageAssets.endourology,
  },
  {
    title: "Cirugía laparoscópica",
    text: "Técnicas quirúrgicas mínimamente invasivas utilizadas en determinados casos urológicos, según la evaluación médica.",
    image: imageAssets.laparoscopicSurgery,
  },
  {
    title: "Salud urológica masculina",
    text: "Atención médica para función sexual, fertilidad masculina, molestias urinarias y prevención urológica.",
    image: imageAssets.urinarySystem,
  },
];

export const specialtySections = [
  {
    title: "Uro-oncología",
    text: "La uro-oncología se enfoca en la evaluación y manejo de condiciones oncológicas relacionadas con el sistema urológico, incluyendo próstata, riñón, vejiga y otros órganos según cada caso.",
    detail:
      "Puede requerir evaluación si tiene estudios alterados, diagnóstico previo, sospecha clínica o necesita una segunda opinión.",
    cta: "Solicitar evaluación",
    href: "/agendar-cita",
    image: imageAssets.uroOncology,
  },
  {
    title: "Cálculos renales",
    text: "Los cálculos renales pueden causar dolor intenso, molestias al orinar, sangre en la orina o infecciones. La evaluación permite determinar tamaño, ubicación y posibles opciones de manejo.",
    detail:
      "El manejo se define según síntomas, estudios disponibles y valoración médica.",
    cta: "Ver cálculos renales",
    href: "/calculos-renales",
    image: imageAssets.kidneyStones,
  },
  {
    title: "Próstata",
    text: "La evaluación prostática puede ser necesaria ante síntomas urinarios, PSA elevado, crecimiento prostático, sospecha de cáncer de próstata o seguimiento preventivo.",
    detail:
      "Durante la consulta se define qué estudios o seguimiento pueden corresponder.",
    cta: "Agendar evaluación prostática",
    href: "/agendar-cita",
    image: imageAssets.prostate,
  },
  {
    title: "Endourología",
    text: "La endourología incluye procedimientos especializados de mínima invasión para evaluar o tratar condiciones de las vías urinarias mediante instrumentos de precisión.",
    detail:
      "Puede formar parte del plan de manejo cuando el caso clínico lo amerita.",
    cta: "Conocer procedimientos",
    href: "/ureteroscopia",
    image: imageAssets.endourology,
  },
  {
    title: "Cirugía laparoscópica",
    text: "La cirugía laparoscópica puede utilizarse en determinados casos urológicos como alternativa mínimamente invasiva, dependiendo del diagnóstico y la valoración médica.",
    detail:
      "La indicación quirúrgica se conversa durante la evaluación especializada.",
    cta: "Solicitar orientación",
    href: "/agendar-cita",
    image: imageAssets.laparoscopicSurgery,
  },
  {
    title: "Salud urológica masculina",
    text: "La salud urológica masculina incluye función sexual, fertilidad, síntomas urinarios y prevención. Una evaluación médica permite identificar causas y definir los próximos pasos.",
    detail:
      "La orientación inicial ayuda a ordenar el motivo de consulta antes de la cita.",
    cta: "Agendar consulta",
    href: "/agendar-cita",
    image: imageAssets.urinarySystem,
  },
  {
    title: "Segunda opinión urológica",
    text: "Una segunda opinión puede ayudarle a comprender mejor un diagnóstico, revisar estudios previos o analizar una recomendación quirúrgica antes de tomar una decisión.",
    detail:
      "Puede traer informes, laboratorios, imágenes o recomendaciones previas para revisión.",
    cta: "Solicitar segunda opinión",
    href: "/agendar-cita",
    image: imageAssets.secondOpinion,
  },
];

export const doctorHighlights = [
  "Urología",
  "Uro-oncología",
  "Endourología",
  "Cirugía percutánea",
  "Cirugía laparoscópica",
  "Mínima invasión",
];

export const anatomyAreas = [
  {
    key: "rinon",
    label: "Riñón",
    text: "Los riñones pueden estar relacionados con cálculos renales, tumores renales, dolor lumbar de origen urológico o estudios de imagen que requieren valoración especializada.",
  },
  {
    key: "ureter",
    label: "Uréter",
    text: "El uréter puede verse afectado por cálculos, obstrucciones o condiciones que pueden requerir estudios específicos o procedimientos como la ureteroscopía.",
  },
  {
    key: "vejiga",
    label: "Vejiga",
    text: "La vejiga puede estar relacionada con síntomas urinarios, sangre en la orina, infecciones o estudios como la cistoscopía.",
  },
  {
    key: "prostata",
    label: "Próstata",
    text: "La próstata puede requerir evaluación por síntomas urinarios, crecimiento prostático, PSA elevado, biopsia o sospecha de enfermedad prostática.",
  },
  {
    key: "salud",
    label: "Salud masculina",
    text: "La salud urológica masculina incluye función sexual, fertilidad, prevención y evaluación de molestias que afectan la calidad de vida.",
  },
];
