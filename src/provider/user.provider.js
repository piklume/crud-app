import { createContext, useState } from "react";

const defaultUserList = [
  {
    id: 1,
    name: "This app demonstrates simple CRUD operations",
    email: "email1@nowhere.com",
  },
  {
    id: 2,
    name: "Click the (+) button to add a person",
    email: "email2@nowhere.com",
  },
  {
    id: 3,
    name: "Click on existing records to reveal available operations",
    email: "email3@nowhere.com",
  },
  {
    id: 4,
    name: "Click the (pencil) button to edit a person",
    email: "email4@nowhere.com",
  },
  {
    id: 5,
    name: "Click the (bin) button to delete one/multiple persons",
    email: "email5@nowhere.com",
  },
];

export const UserContext = createContext({
  userList: [],
  isUpdate: false,
  setUpdate: () => {},
  addPerson: () => {},
  updatePerson: () => {},
  deletePerson: () => {},
  updateID: 0,
  setUpdateIDToContext: () => {},
  selected: [],
  setSelectedToContext: () => {},
  openDialog: false,
  setDialogState: () => {},
});

const UserProvider = ({ users = defaultUserList, children }) => {
  const [userList, setUserList] = useState(users);

  const [isUpdate, setIsUpdate] = useState(false);
  const [newID, setNewID] = useState(userList.length + 1);
  const [updateID, setUpdateID] = useState(0);
  const [selected, setSelected] = useState([]);
  const [openDialog, setDialog] = useState(false);

  const setDialogState = (value) => setDialog(value);

  const setUpdate = (value) => {
    setIsUpdate(value);
    setUpdateIDToContext(selected[0]);
  };

  const setUpdateIDToContext = (id) => setUpdateID(id);

  const setSelectedToContext = (selected) => setSelected(selected);

  const addPerson = (person) => {
    if (person.name.length > 0 && person.email.length > 0) {
      setUserList([
        ...userList,
        {
          id: newID,
          name: person.name,
          email: person.email,
        },
      ]);

      setNewID((prev) => prev + 1);
    }
  };

  const updatePerson = (person, updateID) => {
    if (person.name.length > 0 && person.email.length > 0) {
      const oldPerson = userList.filter((person) => person.id === updateID);
      const newUserList = [...userList];

      newUserList[userList.indexOf(oldPerson[0])] = {
        id: updateID,
        name: person.name,
        email: person.email,
      };

      setUserList(newUserList);
      setUpdate(false);
      setUpdateIDToContext(0);
    }
  };

  const deletePerson = () => {
    const newUserList = userList.filter((item) => !selected.includes(item.id));
    setUserList(newUserList);
    setSelectedToContext([]);
  };

  return (
    <UserContext.Provider
      value={{
        userList,
        isUpdate,
        setUpdate,
        addPerson,
        updatePerson,
        deletePerson,
        updateID,
        setUpdateIDToContext,
        selected,
        setSelectedToContext,
        openDialog,
        setDialogState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
