'use client';

import { categories, difficulties } from '@/utils/utils';
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { setCategory, setDifficulty, setloading, setquestions, setQuestionSize, startGame } from '@/redux/slices/quizSlicer';
import { Difficulty, fetchQuestions } from '@/utils/API';
import { useRouter } from 'next/navigation';
import QuizLoader from './QuizLoader';


function IntroPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch()
    const {
        questionSize,
        category,
        difficulty,
    } = useSelector((state: RootState) => state.quiz)

    const startQuizz = async () => {
        try {
            setIsLoading(true)
            dispatch(startGame())
            const newQuestions = await fetchQuestions(questionSize, difficulty, category)
            dispatch(setquestions(newQuestions))
            router.push("/quiz-dashboard")
        } catch (error) {
            console.log(error)
        } finally {
            console.log("routed to quiz dashboard")
        }
    }

    return (
        <div className=" mt-5">
            {isLoading && <QuizLoader />}
            {/* Dark Overlay */}
            <div className="absolute inset-0"></div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">
                        🧠 Ultimate Quiz Challenge
                    </h1>

                    <p className="mt-3 text-slate-300">
                        Choose your quiz preferences and put your knowledge to the test.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Number of Questions */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-200">
                            Number of Questions
                        </label>

                        <Input
                            min={1}
                            max={49}
                            value={questionSize}
                            onChange={(e) => dispatch(setQuestionSize(Number(e.target.value)))}
                            className="h-12 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/40"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-200">
                            Select Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) => dispatch(setCategory(e.target.value))}
                            className="appearance-none h-12 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                            <option value="" className='px-7'>Select Category</option>
                            {categories.map((item) => (
                                <option key={item.id} value={item.id} className='px-7'>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-200">
                            Select Difficulty
                        </label>

                        <Select value={difficulty} onValueChange={(value) => {
                            if (value) {
                                dispatch(setDifficulty(value));
                            }
                        }}>
                            <SelectTrigger className="h-12 w-full rounded-xl border border-slate-700 bg-slate-800/80 text-white focus:ring-2 focus:ring-violet-500 focus:ring-offset-0 py-6">
                                <SelectValue placeholder="Choose difficulty" />
                            </SelectTrigger>

                            <SelectContent className="rounded-xl border border-slate-700 bg-slate-900 text-white shadow-2xl">
                                <SelectGroup>
                                    {difficulties.map((item) => (
                                        <SelectItem
                                            key={item.value}
                                            value={item.value}
                                            className="cursor-pointer rounded-md focus:bg-violet-600 focus:text-white"
                                        >
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Start Button */}
                    <button
                        onClick={startQuizz}
                        className="mt-2 h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-violet-500 hover:via-indigo-500 hover:to-blue-500 active:scale-95"
                    >
                        🚀 Start Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}

export default IntroPage;