import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
} from "@nextui-org/react";
import { data } from "../helpers/Data";

type singleTodoType = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currTodo: data | null;
};

const SingleTodoView = ({ isOpen, onOpenChange, currTodo }: singleTodoType) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <Modal
      isOpen={isOpen}
      placement="auto"
      onOpenChange={onOpenChange}
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
            <ModalHeader className="flex flex-col gap-1">
              {currTodo?.name}
            </ModalHeader>
            <ModalBody>
              <>
                <p className="text-lg font-semibold ">Description: </p>
                <p>{currTodo?.description}</p>
              </>
              <>
                <p className="text-lg font-semibold ">Date: </p>
                <p>{currTodo?.date.toLocaleString("en-US", options)}</p>
              </>
              <Chip
                color={
                  currTodo?.priority === "High"
                    ? "danger"
                    : currTodo?.priority === "Medium"
                    ? "warning"
                    : "secondary"
                }
                className=" max-w-[25%] min-w-max w-[100%] text-center text-xs"
              >
                {currTodo?.priority}
              </Chip>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SingleTodoView;
