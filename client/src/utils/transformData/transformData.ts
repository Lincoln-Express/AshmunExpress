const transformData = (arr): Array<{ title: string; data: Array<string> }> => {
  return arr.map((val) => ({
    title: val.topic_name,
    data: val.section_name,
  }));
};

export default transformData;
