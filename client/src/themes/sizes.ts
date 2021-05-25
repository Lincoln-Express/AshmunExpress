import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const widthSize = {
  s: wp(4), // 15
  m: wp(6), // 23
  l: wp(8), // 31
  xl: wp(10), // 39
};

const heightSize = {
  s: hp(4), // 29
  m: hp(6), // 44
  l: hp(8), // 58.9
  xl: hp(10), // 73.8
};

export { widthSize, heightSize };
