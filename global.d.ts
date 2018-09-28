interface ITodo  {
  id: string;
  title: string;
  priority: number;
  dueDate: string;
  done: boolean
}

interface ITodoInput  {
  title: string;
  priority: number;
  dueDate: string;
  done: boolean;
}
