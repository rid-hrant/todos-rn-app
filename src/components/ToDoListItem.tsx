import React, {useCallback} from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import {TToDoItem} from '../store/todo/types';

interface Data {
  data: TToDoItem;
  onRemove: (todo: TToDoItem) => void;
}

export const ToDoListItem = ({data: todoItem, onRemove}: Data) => {
  const onRemovePress = useCallback(() => {
    onRemove(todoItem);
  }, [onRemove, todoItem]);

  return (
    <View>
      <View style={styles.separator} />
      <View style={styles.container}>
        <Text style={styles.title}>{todoItem.title}</Text>
        <Text style={styles.description}>{todoItem.description}</Text>
        <Button title="Remove" onPress={onRemovePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  separator: {
    height: 1,
    width: Dimensions.get('window').width,
    backgroundColor: 'gray',
  },
});
