export function creatData(): Array<ITodoInput> {
  const toDos: Array<ITodoInput> = [
    {
      title: 'Todo 1',
      priority: 2,
      dueDate: '2018-09-27T10:53:48.248Z',
      done: false
    },
    {
      title: 'Todo 2',
      priority: 1,
      dueDate: '2018-09-27T10:53:48.248Z',
      done: false
    }
  ];
  return toDos;
}
