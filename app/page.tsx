"use client"

import IntroPage from '@/components/IntroPage'
import QuestionCard, { UserAnswer } from '@/app/quiz-dashboard/page'
import { setloading, setnumber, setquestions, setscore, setuserAns, startGame } from '@/redux/slices/quizSlicer'
import { RootState } from '@/redux/store/store'
import { Difficulty, fetchQuestions, TransformedQuestions } from '@/utils/API'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TOTAL_QUESTIONS = 10

function page() {
  const dispatch = useDispatch()
  const {
    questions,
    loading,
    number,
    userAns,
    score,
  } = useSelector((state: RootState) => state.quiz)

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-700/50 px-4 py-10'>
      <IntroPage />
    </div>
  )
}

export default page