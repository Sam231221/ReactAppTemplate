// src/App.tsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../redux/reducers/users/userSlice";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (editId) {
      dispatch(updateUser({ id: editId, name, email }));
      setEditId(null);
    } else {
      dispatch(addUser({ name, email }));
    }
    setName("");
    setEmail("");
  };

  const handleEditUser = (user: {
    id: number;
    name: string;
    email: string;
  }) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">User Management</h1>

      <form className="max-w-[300px] border shadow-md p-2 rounded-sm">
        <div className="mb-5 ">
          <input
            type="text"
            className="bg-slate-50 text-xs w-full focus:outline-none py-3 px-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            type="email"
            className="bg-slate-50 text-xs w-full focus:outline-none py-3 px-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="mb-2 bg-sky-500 px-4 text-white text-xs py-2 hover:bg-sky-600"
          onClick={handleAddUser}
        >
          {editId ? "Update User" : "Add User"}
        </button>
      </form>

      <div className="mt-5 max-w">
        <h2 className="text-lg pb-2 border-b mb-2">Users</h2>
        {users.map((user) => (
          <li className="flex items-center gap-2 mb-2" key={user.id}>
            <p>
              <span className="capitalize">
                {user.id}. {user.name}
              </span>{" "}
              ({user.email})
            </p>
            <button
              className="ml-2 bg-sky-500 px-3 rounded-sm text-white text-xs py-1 hover:bg-sky-600"
              onClick={() => handleEditUser(user)}
            >
              Edit
            </button>
            <button
              className="ml-2 bg-red-500 px-3 rounded-sm text-white text-xs py-1 hover:bg-red-600"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default App;
