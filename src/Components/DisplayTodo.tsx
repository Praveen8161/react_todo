import { Checkbox, Chip } from "@nextui-org/react";
import { data } from "../helpers/Data";
import { useDisclosure } from "@nextui-org/react";
import SingleTodoView from "./SingleTodoView";
import { useState } from "react";
import EditTodo from "./EditTodo";

type DisplayProps = {
  todoData: data[] | null;
  handleCheckBox: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (editTodo: data) => void;
};

const DisplayTodo = ({
  todoData,
  handleCheckBox,
  handleDelete,
  handleEdit,
}: DisplayProps) => {
  // For single Todo View
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //   For Todo Edit
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();

  const [currTodo, setCurrTodo] = useState<data | null>(null);

  return (
    <main className="flex justify-center ">
      <section className="sm:max-w-[1200px] flex flex-col justify-center items-center px-2  gap-3  w-full">
        {/* If there is no Todo List*/}

        {(!todoData || todoData.length < 1) && (
          <div>
            <p>No Todo's Found</p>
            <p>Create a New one</p>
          </div>
        )}

        {/* If there is a Todo List*/}

        {todoData &&
          todoData.length &&
          todoData.map((todo) => (
            <div
              key={todo.date.toString()}
              className="flex flex-row px-3 py-2 border flex-nowrap rounded-2xl sm:max-w-[500px] gap-3 sm:gap-4 sm:min-w-[350px] md:min-w-[450px] w-full min-w-[min(100%, 500px)] max-w-[500px] justify-between"
            >
              <Checkbox
                isSelected={todo.completed}
                color="success"
                lineThrough={true}
                onClick={() => handleCheckBox(todo.date.toString())}
                className=" max-w-[15%] sm:max-w-[7%] w-full"
              ></Checkbox>

              {/* TODO Name */}
              <span
                onClick={() => {
                  onOpen();
                  setCurrTodo(() => todo);
                }}
                className={`text-xs self-center text-start sm:text-base overflow-hidden text-ellipsis whitespace-nowrap max-w-[20%] sm:max-w-[43%] w-full
                ${todo.completed ? " line-through" : ""}
                `}
              >
                {todo.name}
              </span>

              {/* Priority */}
              <Chip
                color={
                  todo.priority === "High"
                    ? "danger"
                    : todo.priority === "Medium"
                    ? "warning"
                    : "secondary"
                }
                className=" min-w-max w-[100%] text-center text-xs max-w-[70px]"
              >
                {todo.priority}
              </Chip>

              {/* Edit Icon */}
              <span
                onClick={() => {
                  onOpenEdit();
                  setCurrTodo(() => todo);
                }}
                className="self-center "
              >
                <EditIcon />
              </span>

              {/* Delete Icon */}
              <span
                onClick={() => handleDelete(todo.date.toString())}
                className="self-center "
              >
                <DeleteIcon />
              </span>
            </div>
          ))}

        {/* Models */}
        <>
          {/* View Single Todo */}
          <SingleTodoView
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            currTodo={currTodo}
          />

          {/* Edit Single Todo */}
          {currTodo && (
            <EditTodo
              handleEdit={handleEdit}
              isOpenEdit={isOpenEdit}
              onOpenChangeEdit={onOpenChangeEdit}
              currTodo={currTodo}
            />
          )}
        </>
      </section>
    </main>
  );
};

export default DisplayTodo;

const EditIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
      className="self-center w-full cursor-pointer sm:max-w-6 sm:max-h-6 max-h-4 max-w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
};

const DeleteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
      className="self-center w-full h-full cursor-pointer sm:max-w-6 sm:max-h-6 max-h-4 max-w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
};
