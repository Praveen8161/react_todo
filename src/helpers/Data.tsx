export type data = {
  name: string;
  description: string | null;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  date: Date;
};

export const todos: data[] = [
  {
    name: "Task 1",
    description: "This is a task-1",
    completed: false,
    priority: "High",
    date: new Date("2024-02-24T11:55:38.830Z"),
  },
  {
    name: "Task 2",
    description: "This is a task-2",
    completed: true,
    priority: "Low",
    date: new Date("2024-02-23T11:55:38.830Z"),
  },
  {
    name: "Task 3",
    description: "This is a task-3",
    completed: false,
    priority: "Medium",
    date: new Date("2024-02-22T11:55:38.830Z"),
  },
  {
    name: "Task 4",
    description: "This is a task-4",
    completed: true,
    priority: "High",
    date: new Date("2024-02-21T11:55:38.830Z"),
  },
];
