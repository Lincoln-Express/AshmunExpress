/* eslint-disable global-require */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { SectionList, View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../base/Loading/Loading";
import useFetch from "../../hooks/useFetch/useFetch";
import BASE_URL from "../../config/index";
import CustomCard from "../../base/CustomCard/CustomCard";
import IconButton from "../../base/IconButton/IconButton";
import { miniDescription } from "../../utils/quizDescription/quizDescription";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    paddingVertical: 5,
    marginLeft: 2,
  },
  item: {
    marginVertical: 10,
    padding: 10,
  },
  iconStyle: {
    marginRight: 15,
    marginBottom: 15,
  },
});

const QuizScreen: React.FC<null> = () => {
  const navigation = useNavigation();
  const { isError, isLoading, data } = useFetch(`${BASE_URL}/topics`);

  return (
    <View style={styles.container}>
      {isError && <View>{isError}</View>}
      {isLoading && <Loading loading={isLoading} />}
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <CustomCard
              title={item}
              subtitle={" "}
              right={() => (
                <IconButton
                  name="arrow-forward"
                  handlePress={() => {
                    navigation.navigate("QuizList", { name: item });
                  }}
                  style={styles.iconStyle}
                />
              )}
              elevation={5}
              paragraph={miniDescription.find((des) => des.name === item)?.des}
              uri=""
              onPress={() => {
                navigation.navigate("QuizList", { name: item });
              }}
            />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
};

export default QuizScreen;
