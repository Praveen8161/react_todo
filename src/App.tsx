import { useEffect, useState } from "react";
import Headers from "./Components/Headers";
import AddToDo from "./Components/AddTodo";
import FilterTodo from "./Components/FilterTodo";
import { data, todos } from "./helpers/Data";
import DisplayTodo from "./Components/DisplayTodo";

const App = () => {
  const [viewAdd, setViewAdd] = useState<boolean>(false);
  // Main Todo Data
  const [mainTodoData, setMainTodoData] = useState<data[] | null>(null);
  // Todo data for rendering and Filtering
  const [todoData, setTodoData] = useState<data[] | null>(null);
  // To manually invoke filter when adding new value
  const [addedNewvalue, setAddedNewValue] = useState<boolean>(false);

  // Initializing values
  useEffect(() => {
    setMainTodoData(() => todos);
    setTodoData(() => todos);
  }, []);

  // Checkbox For TODO
  const handleCheckBox = function (id: string): void {
    const tempData = mainTodoData?.map((todo) => {
      if (id === todo.date.toString()) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    const tempData2 = todoData?.map((todo) => {
      if (id === todo.date.toString()) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });
    if (tempData?.length && tempData2?.length) {
      setMainTodoData(() => tempData);
      setTodoData(() => tempData2);
    } else {
      setMainTodoData(() => null);
      setTodoData(() => null);
    }
  };

  // Deleting the TODO
  const handleDelete = function (id: string): void {
    const tempData = mainTodoData?.filter(
      (todo) => todo.date.toString() !== id
    );
    setMainTodoData(tempData ? tempData : null);

    const tempData2 = todoData?.filter((todo) => todo.date.toString() !== id);
    setTodoData(tempData2 ? tempData2 : null);
  };

  // Editing TODO
  const handleEdit = function (editTodo: data): void {
    const tempData = mainTodoData?.map((todo) => {
      if (todo.date.toString() === editTodo.date.toString()) {
        return editTodo;
      }

      return todo;
    });
    setMainTodoData(tempData ? tempData : null);

    const tempData2 = todoData?.map((todo) => {
      if (todo.date.toString() === editTodo.date.toString()) {
        return editTodo;
      }

      return todo;
    });
    setTodoData(tempData2 ? tempData2 : null);
  };

  // Add New TODO
  const handleNewTodo = function (newTodo: data): void {
    setMainTodoData((prev) => [...(prev ? prev : []), newTodo]);

    setTodoData((prev) => [...(prev ? prev : []), newTodo]);

    // manually invoking filter method
    setAddedNewValue((prev) => !prev);
  };

  return (
    <div>
      {/* Header */}
      <>
        <Headers setViewAdd={setViewAdd} />
      </>

      {/* Adding New Todo */}
      <>
        {viewAdd && (
          <AddToDo setViewAdd={setViewAdd} handleNewTodo={handleNewTodo} />
        )}
      </>

      {/* Filter Options */}
      <>
        <FilterTodo
          mainTodoData={mainTodoData}
          setTodoData={setTodoData}
          addedNewvalue={addedNewvalue}
        />
      </>

      {/* Display Todo */}
      <>
        <DisplayTodo
          todoData={todoData}
          handleCheckBox={handleCheckBox}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </>
    </div>
  );
};

export default App;
