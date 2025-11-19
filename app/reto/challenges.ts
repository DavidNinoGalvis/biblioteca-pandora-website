export type ChallengeType = "Matemáticas" | "Lectura crítica";

export type Challenge = {
  type: ChallengeType;
  question: string;
  options: string[];
  correctAnswer: number;
};

export const challengeBank: Challenge[] = [
  {
    type: "Matemáticas",
    question: "¿Cuánto es 12 + 8?",
    options: ["18", "20", "22", "24"],
    correctAnswer: 1,
  },
  {
    type: "Matemáticas",
    question: "Si tienes 5 manzanas y compras 3 más, ¿cuántas tienes en total?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2,
  },
  {
    type: "Lectura crítica",
    question:
      "María leyó un cuento sobre un gato que ayudaba a otros animales. ¿Qué palabra describe mejor al gato?",
    options: ["Egoísta", "Amable", "Travieso", "Dormilón"],
    correctAnswer: 1,
  },
  {
    type: "Matemáticas",
    question: "¿Cuánto es 7 × 3?",
    options: ["18", "21", "24", "28"],
    correctAnswer: 1,
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
  },
];

export const challengeTypes: ChallengeType[] = [
  "Matemáticas",
  "Lectura crítica",
];

export function getRandomChallenge(type?: ChallengeType) {
  const pool = type
    ? challengeBank.filter((challenge) => challenge.type === type)
    : challengeBank;
  return pool[Math.floor(Math.random() * pool.length)];
}
