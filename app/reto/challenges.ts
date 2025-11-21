export type ChallengeType = "Matemáticas" | "Lectura crítica";

export type AgeGroup = "A6_7" | "A8_10" | "A11_13" | "A14_15";

export type Challenge = {
  type: ChallengeType;
  question: string;
  options: string[];
  correctAnswer: number;
  ageGroup?: AgeGroup;
};

export const challengeBank: Challenge[] = [
  {
    type: "Matemáticas",
    question: "¿Cuánto es 12 + 8?",
    options: ["18", "20", "22", "24"],
    correctAnswer: 1,
    ageGroup: "A8_10",
  },
  {
    type: "Matemáticas",
    question: "Si tienes 5 manzanas y compras 3 más, ¿cuántas tienes en total?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2,
    ageGroup: "A6_7",
  },
  {
    type: "Lectura crítica",
    question:
      "María leyó un cuento sobre un gato que ayudaba a otros animales. ¿Qué palabra describe mejor al gato?",
    options: ["Egoísta", "Amable", "Travieso", "Dormilón"],
    correctAnswer: 1,
    ageGroup: "A6_7",
  },
  {
    type: "Matemáticas",
    question: "¿Cuánto es 7 × 3?",
    options: ["18", "21", "24", "28"],
    correctAnswer: 1,
    ageGroup: "A6_7",
  },
  {
    type: "Lectura crítica",
    question:
      "Pedro llegó tarde a la escuela porque se quedó dormido. ¿Cuál es la causa de que llegara tarde?",
    options: [
      "La escuela está lejos",
      "Se quedó dormido",
      "Perdió el bus",
      "No tenía reloj",
    ],
    correctAnswer: 1,
    ageGroup: "A8_10",
  },
];

export const challengeTypes: ChallengeType[] = [
  "Matemáticas",
  "Lectura crítica",
];

export function getRandomChallenge(type?: ChallengeType, ageGroup?: AgeGroup) {
  let pool = type
    ? challengeBank.filter((challenge) => challenge.type === type)
    : challengeBank.slice();

  if (ageGroup) {
    const filtered = pool.filter((c) => c.ageGroup === ageGroup);
    if (filtered.length > 0) pool = filtered;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}
