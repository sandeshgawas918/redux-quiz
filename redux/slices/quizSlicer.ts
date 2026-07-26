
import { TransformedQuestions } from "@/utils/API";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserAnswer = {
    question: string,
    answers: any,
    selectedAnswer: string,
    correct: boolean,
    correctAnswer: string
}

type QuizState = {
    questions: TransformedQuestions[],
    loading: boolean,
    number: number,
    userAns: UserAnswer[],
    score: number,
    gameOver: boolean,
    newArray?: UserAnswer,
    questionSize: number,
    category: string,
    difficulty: string
}



const initialState: QuizState = {
    questions: [],
    loading: false,
    number: 0,
    userAns: [],
    score: 0,
    gameOver: true,
    newArray: [],
    questionSize: 10,
    category: "any",
    difficulty: "any"
}


export const quizSlicer = createSlice({
    name: "quiz",
    initialState: initialState,
    reducers: {
        setloading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setquestions(state, action: PayloadAction<TransformedQuestions[]>) {
            state.questions = action.payload
        },
        setnumber(state) {
            state.number++
        },
        setuserAns(state, action: PayloadAction<UserAnswer>) {
            state.userAns.push(action.payload)
        },
        setscore(state) {
            state.score++
        },
        startGame(state) {
            state.gameOver = false,
                state.number = 0,
                state.score = 0,
                state.userAns = [],
                state.newArray = []
        },
        setNewArray(state, action: PayloadAction<UserAnswer>) {
            state.newArray.push(action.payload)
        },
        setQuestionSize(state, action: PayloadAction<number>) {
            state.questionSize = action.payload
        },
        setCategory(state, action: PayloadAction<string|any>) {
            state.category = action.payload
        },
        setDifficulty(state, action: PayloadAction<string|any>) {
            state.difficulty = action.payload
        }
    }
})

export const {
    setloading,
    setnumber,
    setquestions,
    setscore,
    setuserAns,
    startGame,
    setNewArray,
    setQuestionSize,
    setCategory,
    setDifficulty,
} = quizSlicer.actions

export default quizSlicer.reducer