import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import RNRestart from "react-native-restart";
import SecureStore from "expo-secure-store";
import FilledButton from "../FilledButton/FilledButton";
import IconButton from "../IconButton/IconButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorHeaderStyle: {
    justifyContent: "center",
    alignItems: "center",
    color: "#273A7F",
    fontSize: 32,
  },
  errorMessageStyle: {
    fontWeight: "400",
    marginVertical: 10,
  },
});

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  clearUserSettings = async () => {
    await SecureStore.deleteItemAsync("user");
  };

  handleError = async () => {
    await this.clearUserSettings();

    RNRestart.Restart();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={{ width: "100%" }}>
            <IconButton name="information-circle-outline" size={60} />
          </Text>
          <Text style={styles.errorHeaderStyle}>
            {" "}
            Oops, Something went wrong!{" "}
          </Text>
          <Text style={styles.errorMessageStyle}>
            The app ran into a problem and could not continue. We apologize for
            any inconvenience this has caused! Press the button below to restart
            the app and log back in.
          </Text>
          <FilledButton
            title={"Back to login screen"}
            handlePress={() => this.handleError()}
          />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
