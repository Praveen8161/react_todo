import { Divider, Radio, RadioGroup } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { data } from "../helpers/Data";

type addTodoType = {
  setViewAdd: React.Dispatch<React.SetStateAction<boolean>>;
  handleNewTodo: (newTodo: data) => void;
};

type newTodoType = {
  name: string;
  description: string | null;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
};
const AddToDo = ({ setViewAdd, handleNewTodo }: addTodoType) => {
  const [addTodo, setAddTodo] = useState<newTodoType>({
    name: "",
    description: "",
    completed: false,
    priority: "High",
  });

  const updateNewTodo = function (
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setAddTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addNewTodo = function (): void {
    if (!addTodo.name) {
      return;
    }
    handleNewTodo({
      ...addTodo,
      date: new Date(),
    });

    setViewAdd(() => false);
  };

  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-3 px-3">
        <Input
          type="text"
          label="Todo Name"
          labelPlacement="outside"
          placeholder="Enter Todo Name"
          className="max-w-sm "
          value={addTodo.name}
          name="name"
          onChange={(e) => updateNewTodo(e)}
        />
        <Textarea
          variant="faded"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter Todo description"
          description="Description is Optional."
          className="max-w-sm"
          value={addTodo.description ? addTodo.description : ""}
          name="description"
          onChange={(e) => updateNewTodo(e)}
        />

        {/* Priority Select */}
        <div className="">
          <RadioGroup
            label="Select Priority"
            orientation="horizontal"
            defaultValue={addTodo.priority}
            name="priority"
            value={addTodo.priority}
            onChange={(e) => updateNewTodo(e)}
          >
            <Radio value="High">High</Radio>
            <Radio value="Medium">Medium</Radio>
            <Radio value="Low">Low</Radio>
          </RadioGroup>
        </div>

        <div className="flex flex-row items-end justify-center gap-4">
          <Button
            color="danger"
            variant="ghost"
            onClick={() => setViewAdd((prev) => !prev)}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={() => addNewTodo()}>
            Add
          </Button>
        </div>
      </section>
      <Divider className="my-4" />
    </div>
  );
};

export default AddToDo;
