const exampleImages = [
  {
    title: "Example/Monohybrid/1/1",
    image: require("../../../assets/images/background.jpg"),
  },
  {
    title: "Example/Monohybrid/1/2",
    image: require("../../../assets/images/background.jpg"),
  },

  {
    title: "Example/Monohybrid/1/3",
    image: require("../../../assets/images/background.jpg"),
  },

  {
    title: "Example/Monohybrid/2/2",
    image: require("../../../assets/images/background.jpg"),
  },

  {
    title: "Example/Monohybrid/2/3",
    image: require("../../../assets/images/background.jpg"),
  },
];

const practiceImages = [
  {
    title: "Practice/Monohybrid/1/2",
    image: require("../../../assets/images/background.jpg"),
  },
];
const testImages = [];
const questionImages = [...exampleImages, ...practiceImages, ...testImages];
export default questionImages;
