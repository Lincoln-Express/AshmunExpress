import { Alert, Platform } from "react-native";
import * as React from "react";
import * as ImagePicker from "expo-image-picker";

const useImagePicker = () => {
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "User Action",
            "You need permission to be able to upload a profile picture",
            [
              { text: "Cancel", onPress: () => {}, style: "cancel" },
              {
                text: "Ok",
                onPress: async () =>
                  await ImagePicker.getMediaLibraryPermissionsAsync(),
              },
            ],
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return { image, pickImage };
};

export default useImagePicker;
