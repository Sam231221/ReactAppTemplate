// src/features/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Interface for User
interface User {
  id: number;
  name: string;
  email: string;
}

// Initial state type
interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Load initial state from localStorage
const loadUsersFromLocalStorage = (): User[] => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

// Initial state
const initialState: UserState = {
  users: loadUsersFromLocalStorage(),
  status: "idle",
  error: null,
};

// Async thunks for CRUD operations

// Fetch users (READ)
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
});

// Add new user (CREATE)
export const addUser = createAsyncThunk(
  "users/addUser",
  async (user: Omit<User, "id">) => {
    const users = loadUsersFromLocalStorage();
    const newUser = { ...user, id: users.length + 1 }; // Auto-increment ID
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return newUser;
  }
);

// Update user (UPDATE)
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser: User) => {
    const users = loadUsersFromLocalStorage();
    const userIndex = users.findIndex((user) => user.id === updatedUser.id);
    users[userIndex] = updatedUser;
    localStorage.setItem("users", JSON.stringify(users));
    return updatedUser;
  }
);

// Delete user (DELETE)
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: number) => {
    let users = loadUsersFromLocalStorage();
    users = users.filter((user) => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(users));
    return userId;
  }
);

// Slice definition
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch users
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });

    // Add user
    builder.addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    });

    // Update user
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        state.users[index] = action.payload;
      }
    );

    // Delete user
    builder.addCase(
      deleteUser.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      }
    );
  },
});

export default userSlice.reducer;
