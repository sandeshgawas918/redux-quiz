"use client"

import { setNewArray, setnumber, setscore, setuserAns, UserAnswer } from '@/redux/slices/quizSlicer'
import { RootState } from '@/redux/store/store'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from 'next/navigation'
import SessionExpired from '@/components/SessionExpired'

type Props = {
  question: string,
  answers: string[],
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
  userAnswer: UserAnswer,
  questionNr: number,
  totalQuestions: number
}

function QuestionCard() {
  const [selectedBtn, setselectedBtn] = useState("")
  const dispatch = useDispatch()
  const {
    questions,
    number,
    newArray,
    questionSize
  } = useSelector((state: RootState) => state.quiz)

  const router = useRouter()

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selected = e.currentTarget.value
    setselectedBtn(selected)

    const correct = (selected === questions[number].correct_answer)
    if (correct) dispatch(setscore())

    const answerObject: UserAnswer = {
      question: questions[number].question,
      answers: questions[number].answers,
      selectedAnswer: selected,
      correct: correct,
      correctAnswer: questions[number].correct_answer
    }
    dispatch(setuserAns(answerObject))
    if (
      newArray.length === 0 ||
      newArray[newArray.length - 1].question !== questions[number].question
    ) {
      dispatch(setNewArray(answerObject));
    }
    if (number < questionSize - 1) {
      dispatch(setnumber())
    }
    if (number >= questionSize - 1) {
      router.push("/quiz-result")
    }
  }

  if (!questions.length || !questions[number]) {
    return (
      <>
        <SessionExpired/>
      </>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-700/50 px-4 py-10">
      <Card className="w-full max-w-3xl shadow-2xl rounded-2xl">
        <CardHeader className="space-y-5">

          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">
                Ultimate Quiz Challenge
              </CardTitle>

              <CardDescription className="mt-2 font-semibold">
                Test your knowledge and improve your score.
              </CardDescription>
            </div>

            <Badge variant="secondary" className="text-base px-4 py-4 rounded-2xl">
              {number + 1} / {questionSize}
            </Badge>
          </div>

          <Progress
            value={((number + 1) / questionSize) * 100}
          />
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6">

          <div className="rounded-xl bg-muted p-4">
            <h2 className="font-semibold leading-9 text-xl md:text-2xl" dangerouslySetInnerHTML={{ __html: questions[number].question }}>
            </h2>
          </div>

          <div className="grid gap-3">

            {questions[number].answers.map((answer, index) => (

              <Button
                key={index}
                value={answer}
                onClick={checkAnswer}
                variant="outline"
                className={`justify-start h-auto py-3 text-left text-base whitespace-normal rounded-2xl ${selectedBtn == answer ? "bg-primary/30" : ""}`}
              >
                <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span dangerouslySetInnerHTML={{ __html: answer }}></span>
              </Button>

            ))}

          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default QuestionCard
