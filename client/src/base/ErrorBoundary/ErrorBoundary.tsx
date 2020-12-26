import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Updates from "expo-updates";
import FilledButton from "../FilledButton/FilledButton";
import IconButton from "../IconButton/IconButton";

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
    fontSize: 32,
  },
  errorMessage: {
    fontWeight: "400",
    marginVertical: 10,
    color: "#273A7F",
  },
});

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Record<string, unknown>, IState> {
  constructor(props: Record<string, unknown>) {
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

  handleError = (): void => {
    setTimeout(async () => Updates.reloadAsync(), 3000);
  };

  public render(): JSX.Element | null | undefined {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <View style={styles.container}>
          <IconButton name="information-circle-outline" size={60} />
          <Text style={styles.errorHeader}> Oops, Something went wrong! </Text>
          <Text style={styles.errorMessage}>
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
