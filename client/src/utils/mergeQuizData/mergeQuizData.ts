/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const mergeQuizData = (
  data: Array<{ topic_name: string; section_name: string }>,
) => {
  const result: [] = [];

  data.forEach((item) => {
    const existing = result.filter((val) => {
      return val.topic_name === item.topic_name;
    });

    if (existing.length) {
      const index = result.indexOf(existing[0]);
      result[index].section_name = result[index].section_name.concat(
        item.section_name,
      );
    } else {
      if (typeof item.section_name === "string") {
        item.section_name = [item.section_name];
      }
      result.push(item);
    }
  });
  return result;
};

export default mergeQuizData;
