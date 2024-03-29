import { RadioGroup, Radio, Divider } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { data } from "../helpers/Data";

type FileterTodoType = {
  mainTodoData: data[] | null;
  setTodoData: React.Dispatch<React.SetStateAction<data[] | null>>;
  addedNewvalue: boolean;
};

type FilterValueType = {
  search: string;
  completed: "true" | "false" | "All";
  priority: "High" | "Medium" | "Low" | "All";
};

const FilterTodo = ({
  mainTodoData,
  setTodoData,
  addedNewvalue,
}: FileterTodoType) => {
  //
  const [showDrop, setShowDrop] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [filterValues, setFilterValues] = useState<FilterValueType>({
    search: "",
    completed: "All",
    priority: "All",
  });

  // TO close the dropdown by clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setShowDrop(() => false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterValues = function (
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setFilterValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const handleFilter = function (): void {
      const tempData = mainTodoData?.filter((todo) => {
        if (
          filterValues.completed !== "All" &&
          todo.completed.toString() !== filterValues.completed
        ) {
          return false;
        }
        if (
          filterValues.priority !== "All" &&
          todo.priority !== filterValues.priority
        ) {
          return false;
        }

        if (
          filterValues.search !== "" &&
          !todo.name.toLowerCase().includes(filterValues.search.toLowerCase())
        ) {
          return false;
        }

        return true;
      });

      setTodoData(tempData || null);
    };

    handleFilter();
  }, [
    filterValues.priority,
    filterValues.completed,
    filterValues.search,
    addedNewvalue,
  ]);

  return (
    <div className="flex justify-center px-5 py-2 ">
      <div className="flex items-center justify-end w-full gap-2 max-w-7xl">
        {/* Search Input */}
        <input
          type="search"
          className=" max-w-[150px] sm:max-w-[250px] rounded-lg sm:px-3 sm:py-2 py-1 px-2"
          placeholder="Search"
          name="search"
          value={filterValues.search}
          onChange={handleFilterValues}
        />

        <div className="relative ">
          {/* Filter Image */}
          <FilterIcon setShowDrop={setShowDrop} />

          {/* DropDown Menu */}
          {showDrop && (
            <div
              className="absolute right-0 z-10 w-[170px] mt-3 origin-top-right rounded-md shadow-lg border bg-slate-800"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={1}
              ref={dropDownRef}
            >
              <div className="px-3 py-2" role="none">
                {/* Status */}
                <RadioGroup
                  label="Status"
                  color="secondary"
                  defaultValue="All"
                  name="completed"
                  value={filterValues.completed}
                  onChange={handleFilterValues}
                >
                  <Radio value="All">All</Radio>
                  <Radio value="false">Not Completed</Radio>
                  <Radio value="true">Completed</Radio>
                </RadioGroup>
                <Divider className="my-2" />

                {/* Priority */}
                <RadioGroup
                  label="Priority"
                  color="secondary"
                  defaultValue="All"
                  name="priority"
                  value={filterValues.priority}
                  onChange={handleFilterValues}
                >
                  <Radio value="All">All</Radio>
                  <Radio value="High">High</Radio>
                  <Radio value="Medium">Medium</Radio>
                  <Radio value="Low">Low</Radio>
                </RadioGroup>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterTodo;

const FilterIcon = ({
  setShowDrop,
}: {
  setShowDrop: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-[22px] h-[22px] cursor-pointer"
      onClick={() => setShowDrop((prev) => !prev)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
      />
    </svg>
  );
};
