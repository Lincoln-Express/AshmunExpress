/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { SectionList, View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useSWR from "swr";
import Loading from "../../base/Loading/Loading";
import fetcher from "../../utils/fetcher/fetcher";
import BASE_URL from "../../config/index";
import mergeQuizData from "../../utils/mergeQuizData/mergeQuizData";
import SectionCard from "../../base/SectionCard/SectionCard";
import IconButton from "../../base/IconButton/IconButton";

const description = [
  {
    name: "Monohybrid",
    des: "stuff",
  },
  {
    name: "Dihybrid",
    des: "another One",
  },
  {
    name: "Probability",
    des: "again",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    backgroundColor: "#fff",
  },
});

const QuizScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const { data, error } = useSWR(`${BASE_URL}/topics`, fetcher);
  const result = mergeQuizData(data);

  return (
    <View style={styles.container}>
      {error && <View>{error.info}</View>}
      {!data && <Loading loading />}
      {data && (
        <SectionList
          sections={result}
          keyExtractor={({ item, index }) => item + index}
          renderItem={(item) => (
            <SectionCard
              title={item.item}
              subtitle={" "}
              right={() => (
                <IconButton
                  name="arrow-forward"
                  handlePress={() => {
                    navigation.navigate("QuizList", { name: item.item });
                  }}
                />
              )}
              elevation={5}
              paragraph={description.find((des) => des.name === item.item)?.des}
              uri={`../../../assets/${item}.jpg`}
              onPress={() => {
                navigation.navigate("QuizList", { name: item.item });
              }}
            />
          )}
          renderSectionHeader={({ section: { section_name } }) => (
            <Text style={styles.header}>{section_name}</Text>
          )}
        />
      )}
    </View>
  );
};

export default QuizScreen;
