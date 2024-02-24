import { Button } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";

const Headers = ({
  setViewAdd,
}: {
  setViewAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <nav className="flex flex-row justify-between px-3 py-3 sm:px-8">
        <p className="text-xl font-bold lg:text-2xl">React Todo</p>
        <Button
          color="success"
          onClick={() => setViewAdd(true)}
          className=" text-medium"
        >
          Add Todo
        </Button>
      </nav>
      <Divider className="mb-4" />
    </>
  );
};

export default Headers;
