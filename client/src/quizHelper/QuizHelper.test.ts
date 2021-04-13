import QuizHelper from "./QuizHelper";

const data = [
  {
    id: 1,
    question:
      "Using the Punnett square below, complete the following monohybrid cross: AA x Aa\r\n\r\nWhat is the pairing or genotype that will be found in Box 1?\r\n",
    section: "Monohybrid",
    level: 1,
    "option a": "aa",
    "option b": "Aa",
    "option c": "AA",
    "option d": "aA",
    answer: "AA",
    explanation:
      "“The boxes are filled with the alleles that they are aligned with. What letters will you find in each box? \r\nHint: look at the gamete’s allele listed on the top and to the left side of the requested box number.”",
    answer_explanation:
      "“Congratulations! You have the correct answer. Combining the alleles from the gametes above the box and directly to the left of the box provides the correct answer.”",
    picture: "",
  },
  {
    id: 2,
    question:
      "Using the Punnett square below, complete the following monohybrid cross: Aa x Aa\r\n\r\nWhat is the pairing or genotype that will be found in Box 2?\r\n",
    section: "Monohybrid",
    level: 1,
    "option a": "aa",
    "option b": "Aa",
    "option c": "AA",
    "option d": "aA",
    answer: "Aa",
    explanation:
      "“The boxes are filled with the alleles that they are aligned with. What letters will you find in each box? \r\nHint: look at the gamete’s allele listed on the top and to the left side of the requested box number.”",
    answer_explanation:
      "“Congratulations! You have the correct answer. Combining the alleles from the gametes above the box and directly to the left of the box provides the correct answer.”",
    picture: "",
  },
  {
    id: 3,
    question:
      "Using the Punnett square below, complete the following monohybrid cross: Aa x Aa\r\n\r\nWhat is the pairing or genotype that will be found in Box 4?\r\n",
    section: "Monohybrid",
    level: 1,
    "option a": "aa",
    "option b": "Aa",
    "option c": "AA",
    "option d": "aA",
    answer: "aa",
    explanation:
      "“The boxes are filled with the alleles that they are aligned with. What letters will you find in each box? \r\nHint: look at the gamete’s allele listed on the top and to the left side of the requested box number.”",
    answer_explanation:
      "“Congratulations! You have the correct answer. Combining the alleles from the gametes above the box and directly to the left of the box provides the correct answer.”\r\n",
    picture: "",
  },
];

const mockQuizHelper = QuizHelper();

describe("tests for validating the Quiz Helper Object", () => {
  test("get the correct option keys", () => {
    const { getAnswers } = mockQuizHelper;
    const result = getAnswers(data[0]);
    expect(result.length).toEqual(4);
    expect(result[1]).toEqual("Aa");
  });

  test("gets the correct answer option", () => {
    const { isCorrect } = mockQuizHelper;
    const result1 = isCorrect(data[0], "AA");
    const result2 = isCorrect(data[1], "Aa");
    const result3 = isCorrect(data[2], "aA");

    expect(result1).toEqual(true);
    expect(result2).toEqual(true);
    expect(result3).toEqual(false);
  });

  test("given valid params, getQuestionObject() returns the expected question object, ", () => {
    const counter = mockQuizHelper.getCounter();
    const questionObject = data[counter];

    expect(questionObject.id).toBe(1);
  });
});
