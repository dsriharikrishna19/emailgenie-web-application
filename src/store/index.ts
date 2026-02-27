import { configureStore, createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
    mode: ThemeMode;
    isMounted: boolean;
}

const initialState: ThemeState = {
    mode: "dark",
    isMounted: false,
};

// Thunk to handle theme switching and synchronization with next-themes
export const toggleTheme = createAsyncThunk(
    "theme/toggleTheme",
    async (newTheme: ThemeMode) => {
        // Return the new theme to update the state
        return newTheme;
    }
);

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
        },
        setMounted: (state) => {
            state.isMounted = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(toggleTheme.fulfilled, (state, action) => {
            state.mode = action.payload;
        });
    },
});

export const { setThemeMode, setMounted } = themeSlice.actions;

export const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
