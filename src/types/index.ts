export type User = {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
};

type Address = {
  city: string;
  street: string;
};

type Company = {
  name: string;
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type StatusFilter = "all" | "completed" | "uncompleted" | "favorites";

export type TodoFilters = {
  status: StatusFilter;
  userId: number | "all";
  search: string;
};
