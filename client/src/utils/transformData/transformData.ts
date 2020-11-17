
const transformData = (arr) =>  {
    return arr.map((val) => ({
        title: val.topic_name, data: val.section_name
     }));
}

export default transformData;