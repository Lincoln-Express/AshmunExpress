/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/state-in-constructor */
import React, { Component, ErrorInfo } from "react";
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
  public state = {
    hasError: false,
  };

  public static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  public clearUserSettings = async () => {
    await SecureStore.deleteItemAsync("user");
  };

  public handleError = async () => {
    await this.clearUserSettings();

    RNRestart.Restart();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={{ width: "100%" }}>
            <IconButton
              name="information-circle-outline"
              size={60}
              handlePress={() => {}}
              style={{}}
            />
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
            title="Back to login screen"
            handlePress={() => this.handleError()}
          />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
