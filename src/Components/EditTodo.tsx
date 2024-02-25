import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { data } from "../helpers/Data";
import { useState } from "react";

type editTodoType = {
  handleEdit: (editTodo: data) => void;
  isOpenEdit: boolean;
  onOpenChangeEdit: (isOpen: boolean) => void;
  currTodo: data;
};

const EditTodo = ({
  handleEdit,
  isOpenEdit,
  onOpenChangeEdit,
  currTodo,
}: editTodoType) => {
  const [editTodo, setEditTodo] = useState<data>(currTodo);

  const editvalueUpdate = function (
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setEditTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateTodoData = function (editTodo: data): void {
    if (!editTodo.name) {
      return;
    }
    handleEdit(editTodo);
  };

  return (
    <Modal
      isOpen={isOpenEdit}
      onOpenChange={onOpenChangeEdit}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      motionProps={{
        variants: {
          enter: {
            y: "var(--slide-enter)",
            opacity: 1,
            transition: {
              duration: 0.2,
              ease: "easeOut",
            },
          },
          exit: {
            y: "-100%",
            opacity: 0,
            transition: {
              duration: 0.1,
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Todo</ModalHeader>
            <ModalBody>
              {/* Todo Name */}
              <Input
                type="text"
                variant="underlined"
                label="Todo Name"
                placeholder="Enter name"
                name="name"
                value={editTodo.name}
                onChange={(e) => {
                  editvalueUpdate(e);
                }}
              />

              {/* Todo Description */}
              <Textarea
                variant="underlined"
                label="Description"
                maxRows={3}
                labelPlacement="outside"
                name="description"
                placeholder="Enter your description"
                value={editTodo.description ? editTodo.description : ""}
                onChange={(e) => editvalueUpdate(e)}
              />

              {/* Priority Select */}
              <RadioGroup
                label="Select Priority"
                orientation="horizontal"
                defaultValue={editTodo.priority}
                name="priority"
                onChange={(e) => editvalueUpdate(e)}
              >
                <Radio value="High">High</Radio>
                <Radio value="Medium">Medium</Radio>
                <Radio value="Low">Low</Radio>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  onClose();
                  updateTodoData(editTodo);
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditTodo;
