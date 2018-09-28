const defaultDate = () :string => (new Date((new Date()).setDate((new Date()).getDate()+7))).toISOString();

class ToDo {
  id: string;
  title: string;
  priority: number;
  dueDate: string;
  dueDateTimeStamp: number;
  done: boolean;

  constructor({ title = '', priority = 1, dueDate = defaultDate() , done = false }: ITodoInput) {
    this.id = require('crypto').randomBytes(10).toString('hex'),
      this.title = title,
      this.priority = priority,
      this.dueDate = dueDate,
      this.dueDateTimeStamp = +(new Date(dueDate));
    this.done = done
  }

  setDueDate(dueDate: string) {
    this.dueDate = dueDate;
    this.dueDateTimeStamp = +(new Date(dueDate));
    return this;
  }
}

function sort(fakeDB: Array<ToDo> ,{orderBy = 'title', orderType = 'ASC'} = {}) {
  const fieldName = orderBy === 'dueDate' ? 'dueDateTimeStamp' : orderBy;
  if (orderType === 'ASC') {
    return fakeDB.sort((a, b) => (a as any)[fieldName] < (b as any)[fieldName] ? -1 : 1 )
  }
  return fakeDB.sort((a, b) => (a as any)[fieldName] > (b as any)[fieldName] ? -1 : 1)
}

function defaultInitData() {
  const data: Array<ITodoInput> = [
    {
      title: 'Create a Readme',
      priority: 2,
      dueDate: (new Date()).toISOString(),
      done: false
    },
    {
      title: 'Finish The project',
      priority: 1,
      dueDate: (new Date()).toISOString(),
      done: false
    },
    {
      title: 'Host the project on github',
      priority: 1,
      dueDate: (new Date()).toISOString(),
      done: false
    }
  ];

  return data;
}

export class FakeDB {

  data: Array<ToDo>;

  constructor(initData: Array<ITodoInput> = defaultInitData()) {
    this.data = initData.map((item) :ToDo => { return new ToDo(item) });
  }

  getToDos({orderBy = 'title', orderType = 'ASC'} = {}) {
    return sort(this.data, {orderBy, orderType});
  }

  createToDo({ title = '', priority = 1, dueDate, done = false }: ITodoInput) {
    const todo = new ToDo({
      title,
      priority,
      dueDate,
      done
    });
    this.data.push(todo);
    return todo;
  }

  deleteToDo({ id = '' } = {}) {
    const index =  (this.data as any).findIndex((item: any)=> id === item.id);
    if(index > -1) {
      this.data.splice(index, 1);
      return id;
    }
    return null;
  }

  updateToDo({ id ,title, priority, dueDate, done}: ITodo) : ITodo {
    if(id) {
      const todo =  (this.data as any).find((item: any)=> id === item.id);
      if (!todo) {
        return null;
      }
      if (title) {
        todo.title = title;
      }
      if (typeof priority === 'number') {
        todo.priority = priority;
      }
      if (dueDate) {
        todo.setDueDate(dueDate);
      }
      if (typeof done === "boolean") {
        todo.done = done;
      }

      return todo;
    }
    return null;
  }
}