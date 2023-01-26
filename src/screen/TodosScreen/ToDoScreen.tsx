import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {addToDo, removeToDo} from '../../store/todo/todoSlice';
import {ToDoListItem} from '../../components/ToDoListItem';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectToDos} from '../../store/todo/selectors';
import {TToDoItem} from '../../store/todo/types';

export const ToDoScreen = () => {
  const dispatch = useAppDispatch();
  let todoListData = useAppSelector(selectToDos);

  const [tasksCount, setTasksCount] = useState(todoListData.length);
  const [currentTask, setCurrentTask] = useState<TToDoItem>({
    description: '',
    id: '',
    title: '',
  });

  useEffect(() => {
    setTasksCount(todoListData.length);
  }, [todoListData]);

  const onPressAddToDo = useCallback(() => {
    const taskId = Date.now().toString();
    setCurrentTask({
      id: taskId,
      title: currentTask.title,
      description: currentTask.description,
    });
    dispatch(addToDo(currentTask));
  }, [dispatch, currentTask]);

  const onRemoveToDo = useCallback(
    (todo: TToDoItem) => {
      dispatch(removeToDo(todo));
    },
    [dispatch],
  );

  const onCurrentTaskTitleChangedHandler = useCallback(
    (title: string) => {
      setCurrentTask({
        id: currentTask.id,
        title: title,
        description: currentTask.description,
      });
    },
    [currentTask],
  );

  const onCurrentTaskDescriptionChangedHandler = useCallback(
    (description: string) => {
      setCurrentTask({
        id: currentTask.id,
        title: currentTask.title,
        description: description,
      });
    },
    [currentTask],
  );

  const todoList = useMemo(() => {
    return todoListData.map(todo => (
      <ToDoListItem key={todo.id} data={todo} onRemove={onRemoveToDo} />
    ));
  }, [todoListData, onRemoveToDo]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Create new task</Text>
        <TextInput
          placeholder="Title"
          onChangeText={onCurrentTaskTitleChangedHandler}
        />
        <TextInput
          placeholder="Description"
          onChangeText={onCurrentTaskDescriptionChangedHandler}
        />
        <Pressable style={styles.createButton} onPress={onPressAddToDo}>
          <Text style={styles.buttonText}>Create</Text>
        </Pressable>
      </View>
      <Text style={styles.title}>You have {tasksCount} tasks todo!</Text>
      <ScrollView>{todoList}</ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },

  createButton: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
});
