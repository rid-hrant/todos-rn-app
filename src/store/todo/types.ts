export type TToDoItem = {
  id: string;
  title: string;
  description: string;
};

export type TToDoSlice = {
  todos: TToDoItem[] | [];
};
