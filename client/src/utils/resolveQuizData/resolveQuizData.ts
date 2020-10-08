/* eslint-disable camelcase */
const resolveQuizData = (
  data: Array<{ topic_name: string; section_name: string }>,
): any => {
  return data.map((d) => {
    const { topic_name: topicName } = d;
    return topicName;
  });
};

export default resolveQuizData;
