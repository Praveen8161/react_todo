import { useEffect, useState } from "react";
import Headers from "./Components/Headers";
import AddToDo from "./Components/AddTodo";
import FilterTodo from "./Components/FilterTodo";
import { data, todos } from "./helpers/Data";
import DisplayTodo from "./Components/DisplayTodo";

const App = () => {
  const [viewAdd, setViewAdd] = useState<boolean>(false);
  const [mainTodoData, setMainTodoData] = useState<data[] | null>(null);
  const [todoData, setTodoData] = useState<data[] | null>(null);

  useEffect(() => {
    setMainTodoData(() => todos);
    setTodoData(() => todos);
  }, []);

  // Checkbox For TODO
  const handleCheckBox = function (id: string): void {
    const tempData = todoData?.map((todo) => {
      if (id === todo.date.toString()) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    if (tempData?.length) setTodoData(() => tempData);
    else setTodoData(null);
  };

  // Deleting the TODO
  const handleDelete = function (id: string): void {
    const tempData = mainTodoData?.filter(
      (todo) => todo.date.toString() !== id
    );
    setMainTodoData(tempData ? tempData : null);
    setTodoData(tempData ? tempData : null);
  };

  return (
    <div>
      {/* Header */}
      <>
        <Headers setViewAdd={setViewAdd} />
      </>

      {/* Adding New Todo */}
      <>{viewAdd && <AddToDo setViewAdd={setViewAdd} />}</>

      {/* Filter Options */}
      <>
        <FilterTodo />
      </>

      {/* Display Todo */}
      <>
        <DisplayTodo
          todoData={todoData}
          handleCheckBox={handleCheckBox}
          handleDelete={handleDelete}
        />
      </>
    </div>
  );
};

export default App;
