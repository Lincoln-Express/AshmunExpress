export const buttonStyle = Object.freeze({
  // might change the color later
  ios: '#273A7F',
  android: {
    color: '#273A7F',
    elevation: 5,
  },
});

export const getTabIcon = (props) => {
  const { platformName, focused, routeName } = props;
};

export default getTabIcon;
