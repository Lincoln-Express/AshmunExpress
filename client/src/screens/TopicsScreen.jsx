/* eslint-disable react/jsx-fragments */
import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../config/index';
import FilledButton from '../components/FilledButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    padding: 16,
    backgroundColor: '#fff',
  },
});
const TopicsScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const navigation = useNavigation();
  const [topics, setTopics] = useState([]);

  useEffect(async () => {
    await axios.get(`${BASE_URL}topic`).then((res) => {
      setTopics(res.data);
    });
  }, []);

  return (
    <Fragment>
      <View style={styles.container}>
        <Text>Topics</Text>
      </View>
      {topics.map((topic) => (
        <FilledButton
          title={topic}
          handlePress={() => navigation.push('Levels', { name: { topic } })}
        />
      ))}
    </Fragment>
  );
};

export default TopicsScreen;
