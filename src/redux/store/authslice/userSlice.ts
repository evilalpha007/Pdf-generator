import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type User = {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
};

interface AuthState {
    currentUser: User | null;
    users: User[];
}

const initialState: AuthState = {
    users: JSON.parse(localStorage.getItem("users") || "[]"),
    currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup(state, action: PayloadAction<User>) {
            const exists = state.users.find(u => u.email === action.payload.email);
            if (exists) throw new Error("Email already registered");
            state.users.push(action.payload);
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        login(state, action: PayloadAction<{ email: string; password: string }>) {
            const { email, password } = action.payload;

            const user = state.users.find(u => u.email === email && u.password === password);

            if (user) {
                state.currentUser = user;
                localStorage.setItem("currentUser", JSON.stringify(user));
            } else {
                throw new Error("Invalid credentials");
            }
          },
        logout(state) {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        }
    }
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
