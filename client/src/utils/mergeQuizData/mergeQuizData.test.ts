import mergeQuizData from "./MergeQuizData";

const data = [
  {
    topic_name: "Genetics",
    section_name: "Dihybrid",
  },
  {
    topic_name: "Genetics",
    section_name: "Monohybrid",
  },
  {
    topic_name: "Statistics",
    section_name: "Probability",
  },
];

describe("tests for validating merged objects with section_name and topic_name properties", () => {
  test("a section object has its appropriate topic names as properties", () => {
    const result = mergeQuizData(data);
    expect(result[0]?.topic_name).toEqual("Genetics");
  });
});
