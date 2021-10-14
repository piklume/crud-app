import { render } from "@testing-library/react";

import UserProvider from "../provider/user.provider";

const testData = [
  {
    id: 1,
    name: "Test1",
    email: "email1@nowhere.com",
  },
  {
    id: 2,
    name: "Test2",
    email: "email2@nowhere.com",
  },
  {
    id: 3,
    name: "Test3",
    email: "email3@nowhere.com",
  },
  {
    id: 4,
    name: "Test4",
    email: "email4@nowhere.com",
  },
  {
    id: 5,
    name: "Test5",
    email: "email5@nowhere.com",
  },
];

const AllTheProviders = ({ children }) => {
  return <UserProvider users={testData}>{children}</UserProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
