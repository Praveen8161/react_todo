import { Divider } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const AddToDo = ({
  setViewAdd,
}: {
  setViewAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-3 px-3">
        <Input
          type="text"
          label="Todo Name"
          labelPlacement="outside"
          placeholder="Enter Todo Name"
          className="max-w-sm "
        />
        <Textarea
          variant="faded"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter Todo description"
          description="Description is Optional."
          className="max-w-sm"
        />

        <div className="flex flex-row items-end justify-center gap-4">
          <Button
            color="danger"
            variant="ghost"
            onClick={() => setViewAdd((prev) => !prev)}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={() => setViewAdd((prev) => !prev)}>
            Add
          </Button>
        </div>
      </section>
      <Divider className="my-4" />
    </div>
  );
};

export default AddToDo;
