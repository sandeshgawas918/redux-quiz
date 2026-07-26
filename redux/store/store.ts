import { quizSlicer } from "@/redux/slices/quizSlicer";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        quiz: quizSlicer.reducer
    }
})

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infer the type of `dispatch`
export type AppDispatch = typeof store.dispatch;