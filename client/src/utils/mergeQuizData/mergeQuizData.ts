/* eslint-disable camelcase */
const mergeQuizData = (
  data: Array<{ topic_name: string; section_name: string }>
): Array<{}> => {
  const result = [];

  data.forEach((item) => {
    let existing = result.filter((val) => {
      return (val.topic_name = item.topic_name);
    });

    if (existing.length) {
      let index = result.indexOf(existing[0]);
      result[index].section_name = result[index].section_name.concat(
        item.section_name
      );
    } else {
      if (typeof item.section_name == 'string') {
        item.section_name = [item.section_name] as any;
      }
      result.push(item);
    }
  });
  return result;
};

export default mergeQuizData;
