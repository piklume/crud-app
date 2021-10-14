import { render, screen } from "../../../utils/userProviderWrapper";
import userEvent from "@testing-library/user-event";

import EnhancedTable from "../muiTable";

describe("Test for the data table", () => {
  test("Data table renders with + button visible", () => {
    render(<EnhancedTable />);
    //Get the table
    const dataTable = screen.getByRole("table");

    //Expect table to render
    expect(dataTable).toBeInTheDocument();

    const addButton = screen.getByTestId("AddIcon");
    expect(addButton).toBeInTheDocument();
  });

  test("Data table renders with edit and delete button not initially visible", () => {
    render(<EnhancedTable />);

    const editButton = screen.queryByTestId("EditIcon");
    const deleteButton = screen.queryByTestId("DeleteIcon");

    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });

  test("Clicking Add button opens popop to add person", () => {
    render(<EnhancedTable />);

    const addButton = screen.getByTestId("AddIcon");
    userEvent.click(addButton);

    const popup = screen.getByRole("dialog");
    expect(popup).toBeInTheDocument();
  });

  test("Add user popop is not visible on document load", () => {
    render(<EnhancedTable />);

    const popup = screen.queryByRole("dialog");
    expect(popup).not.toBeInTheDocument();
  });

  test("Clicking on record makes the edit and delete button visible", () => {
    render(<EnhancedTable />);

    const firstRecord = screen.getByRole("checkbox", { name: "Test1" });
    userEvent.click(firstRecord);

    const editButton = screen.getByTestId("EditIcon");
    const deleteButton = screen.getByTestId("DeleteIcon");

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("Clicking on edit opens the record text in popup", () => {
    render(<EnhancedTable />);

    const firstRecord = screen.getByRole("checkbox", { name: "Test1" });
    userEvent.click(firstRecord);
    const editButton = screen.getByTestId("EditIcon");
    userEvent.click(editButton);

    const name = screen.getByRole("textbox", { name: "Name" });
    expect(name).toHaveValue("Test1");

    const email = screen.getByRole("textbox", { name: "Email Address" });
    expect(email).toHaveValue("email1@nowhere.com");
  });

  test("Record can be edited and saved", async () => {
    render(<EnhancedTable />);

    const firstRecord = screen.getByRole("checkbox", { name: "Test1" });
    userEvent.click(firstRecord);
    const editButton = screen.getByTestId("EditIcon");
    userEvent.click(editButton);
    const name = screen.getByRole("textbox", { name: "Name" });
    const email = screen.getByRole("textbox", { name: "Email Address" });

    userEvent.clear(name);
    userEvent.clear(email);

    userEvent.type(name, "Changed name");
    userEvent.type(email, "Changed@nowhere.com");

    const saveButton = screen.getByRole("button", { name: /save/i });
    userEvent.click(saveButton);

    const rowName = await screen.findByRole("rowheader", {
      name: /Changed name/i,
    });
    const rowEmail = await screen.findByRole("rowheader", {
      name: /Changed@nowhere.com/i,
    });

    expect(rowName).toHaveTextContent("Changed name");
    expect(rowEmail).toHaveTextContent("Changed@nowhere.com");
  });

  test("Single as well as multiple records can be deleted", () => {
    render(<EnhancedTable />);

    const firstRecord = screen.getByRole("checkbox", { name: "Test1" });
    userEvent.click(firstRecord);

    const deleteButton = screen.getByTestId("DeleteIcon");
    userEvent.click(deleteButton);

    expect(firstRecord).not.toBeInTheDocument();

    const secondRecord = screen.getByRole("checkbox", { name: "Test2" });
    userEvent.click(secondRecord);
    const thirdRecord = screen.getByRole("checkbox", { name: "Test3" });
    userEvent.click(thirdRecord);
    const delb = screen.getByTestId("DeleteIcon");
    userEvent.click(delb);

    expect(secondRecord).not.toBeInTheDocument();
    expect(thirdRecord).not.toBeInTheDocument();
  });
});
