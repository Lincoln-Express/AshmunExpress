import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Updates from "expo-updates";
import FilledButton from "../filledButton/FilledButton";
import Icon from "../icon/Icon";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorHeader: {
    justifyContent: "flex-start",
    alignItems: "center",
    color: "#273A7F",
    fontSize: widthSize.l,
  },
  errorMessage: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "400",
    marginVertical: heightSize.s / 3,
    color: "#273A7F",
  },
  button: {
    width: widthSize.xl * 7,
  },
});

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(): { hasError: boolean } {
    return {
      hasError: true,
    };
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, info);
  }

  handleError = () => {
    return Updates.reloadAsync();
  };

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <View style={styles.container}>
          <Icon name="information-circle-outline" size={60} color="#273A7F" />
          <Text style={styles.errorHeader}>Oops, Something went wrong!</Text>
          <Text style={styles.errorMessage}>
            The app ran into a problem and could not continue. We apologize for
            any inconvenience this has caused! Press the button below to reload
            the application.
          </Text>
          <FilledButton
            title="Back to the Home Page"
            onPress={() => this.handleError()}
            buttonStyle={styles.button}
          />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
