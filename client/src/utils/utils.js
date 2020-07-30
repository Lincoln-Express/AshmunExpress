import { PropTypes } from 'prop-types';

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
  let iconName;

  if (routeName === 'Home') {
    if (focused) {
      if (platformName === 'ios') {
        iconName = 'ios-home';
      } else if (platformName === 'android') {
        iconName = 'md-home';
      }
    } else if (!focused) {
      if (platformName === 'ios') {
        iconName = 'ios-home-outline';
      } else if (platformName === 'android') {
        iconName = 'md-home-outline';
      }
    }
  } else if (routeName === 'Settings') {
    if (focused) {
      if (platformName === 'ios') {
        iconName = 'ios-settings';
      } else if (platformName === 'android') {
        iconName = 'md-settings';
      }
    } else if (!focused) {
      if (platformName === 'ios') {
        iconName = 'ios-settings-outline';
      } else if (platformName === 'android') {
        iconName = 'md-settings-outline';
      }
    }
  } else if (routeName === 'Topics') {
    if (focused) {
      if (platformName === 'ios') {
        iconName = 'ios-list';
      } else if (platformName === 'android') {
        iconName = 'md-list';
      }
    } else if (!focused) {
      if (platformName === 'ios') {
        iconName = 'ios-list-outline';
      } else if (platformName === 'android') {
        iconName = 'md-list-outline';
      }
    }
  } else if (routeName === 'Profile') {
    if (focused) {
      if (platformName === 'ios') {
        iconName = 'ios-person';
      } else if (platformName === 'android') {
        iconName = 'md-person';
      }
    } else if (!focused) {
      if (platformName === 'ios') {
        iconName = 'ios-person-outline';
      } else if (platformName === 'android') {
        iconName = 'md-person-outline';
      }
    }
  }

  return iconName;
};

getTabIcon.propTypes = {
  platformName: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  routeName: PropTypes.string.isRequired,
};
