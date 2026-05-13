import { imageAssets } from "./images";

export const procedureCards = [
  {
    title: "Ureteroscopía",
    text: "Procedimiento mínimamente invasivo que permite evaluar o tratar condiciones del uréter, incluyendo algunos casos de cálculos urinarios.",
    cta: "Conocer más",
    href: "/ureteroscopia",
    image: imageAssets.ureteroscopy,
  },
  {
    title: "Cirugía láser para cálculos renales",
    text: "Técnica utilizada en determinados casos para fragmentar cálculos y facilitar su manejo, según tamaño, ubicación y evaluación médica.",
    cta: "Conocer más",
    href: "/calculos-renales",
    image: imageAssets.laserKidneyStone,
  },
  {
    title: "Biopsia de próstata",
    text: "Estudio que puede indicarse cuando existen hallazgos clínicos, de laboratorio o imagen que requieren una evaluación más específica.",
    cta: "Conocer más",
    href: "/agendar-cita",
    image: imageAssets.prostateBiopsy,
  },
  {
    title: "Nefrolitotomía percutánea",
    text: "Procedimiento que puede considerarse en ciertos casos de cálculos renales de mayor tamaño o complejidad.",
    cta: "Conocer más",
    href: "/calculos-renales",
    image: imageAssets.percutaneousNephrolithotomy,
  },
  {
    title: "Cistoscopía",
    text: "Evaluación visual de la vejiga y vías urinarias que puede ayudar a estudiar síntomas como sangre en la orina o molestias urinarias persistentes.",
    cta: "Conocer más",
    href: "/agendar-cita",
    image: imageAssets.cystoscopy,
  },
  {
    title: "Cirugía laparoscópica renal",
    text: "Técnica quirúrgica mínimamente invasiva utilizada en determinados casos renales, según diagnóstico y valoración médica.",
    cta: "Conocer más",
    href: "/agendar-cita",
    image: imageAssets.laparoscopicSurgery,
  },
];

export const patientJourneySteps = [
  {
    title: "Contacto inicial",
    text: "Comparta el motivo de consulta y el canal por el que prefiere ser contactado.",
  },
  {
    title: "Orientación y motivo de consulta",
    text: "El equipo o asistente digital puede ayudarle a organizar la información inicial.",
  },
  {
    title: "Evaluación médica",
    text: "Durante la consulta, el médico revisa síntomas, antecedentes y estudios disponibles.",
  },
  {
    title: "Estudios necesarios",
    text: "Si corresponde, se pueden solicitar laboratorios, imágenes u otros estudios.",
  },
  {
    title: "Explicación del diagnóstico",
    text: "El objetivo es que el paciente comprenda su condición y los siguientes pasos.",
  },
  {
    title: "Plan de tratamiento",
    text: "Las opciones se definen según el diagnóstico, el caso clínico y la valoración médica.",
  },
  {
    title: "Seguimiento",
    text: "El seguimiento permite revisar evolución, resolver dudas y ajustar indicaciones cuando sea necesario.",
  },
];

export const kidneyStoneRelated = [
  "Ureteroscopía",
  "Cirugía láser para cálculos",
  "Nefrolitotomía percutánea",
  "Seguimiento médico especializado",
];
