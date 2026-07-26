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

type Props = {
  question: string,
  answers: string[],
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
  userAnswer: UserAnswer,
  questionNr: number,
  totalQuestions: number
}


// function QuestionCard({ question, answers, callback, userAnswer, questionNr, totalQuestions }: Props) {
function QuestionCard() {
  const [selectedBtn, setselectedBtn] = useState("")
  const dispatch = useDispatch()
  const {
    questions,
    loading,
    number,
    userAns,
    score,
    newArray,
    questionSize
  } = useSelector((state: RootState) => state.quiz)

  const router=useRouter()

  const nextQuestion = () => {
    dispatch(setnumber())
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value)
    const selected = e.currentTarget.value
    setselectedBtn(selected)
    // alert(e.currentTarget.value )

    console.log(selected)

    const correct = (selected === questions[number].correct_answer)
    if (correct) dispatch(setscore())

    const answerObject: UserAnswer = {
      question: questions[number].question,
      answers:questions[number].answers,
      selectedAnswer: selected,
      correct: correct,
      correctAnswer: questions[number].correct_answer
    }
    dispatch(setuserAns(answerObject))
    dispatch(setNewArray(answerObject))
    console.log('selected answer object :', answerObject)
  }

  const finishQuiz = () => {
    router.push("/quiz-result")
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
              {/* {questions[number].question} */}
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
                <span dangerouslySetInnerHTML={{__html:answer}}></span>
              </Button>

            ))}

          </div>

        </CardContent>

        <CardFooter className="flex items-center justify-center py-5">
          {number + 1 < questionSize && (
            <Button
              onClick={nextQuestion}
              size="lg"
              className="rounded-md py-4"
            >
              Next Question →
            </Button>

          )}

          {number === questionSize - 1 && (
            <Button
              onClick={finishQuiz}
              size="lg"
              className="rounded-md py-4"
            >
              Finish Quiz
            </Button>
          )}

        </CardFooter>

      </Card>
    </div>
  )
}

export default QuestionCard


const dummyArray = [
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Entertainment: Film",
    "question": "In the 2010 Nightmare on Elm Street reboot, who played Freddy Kruger?",
    "correct_answer": "Jackie Earle Haley",
    "incorrect_answers": [
      "Tyler Mane",
      "Derek Mears",
      "Gunnar Hansen"
    ],
    "answers": [
      "Tyler Mane",
      "Derek Mears",
      "Gunnar Hansen",
      "Jackie Earle Haley"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Entertainment: Film",
    "question": "Actress Susan Sarandon caught pneumonia during filming of which movie?",
    "correct_answer": "The Rocky Horror Picture Show",
    "incorrect_answers": [
      "Thelma and Louise",
      "Dead Man Walking",
      "Enchanted"
    ],
    "answers": [
      "Thelma and Louise",
      "Dead Man Walking",
      "Enchanted",
      "The Rocky Horror Picture Show"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Entertainment: Film",
    "question": "In Mulan (1998), who is the leader of the Huns?",
    "correct_answer": "Shan Yu",
    "incorrect_answers": [
      "Chien-Po",
      "Li Shang",
      "Fa Zhou"
    ],
    "answers": [
      "Chien-Po",
      "Li Shang",
      "Fa Zhou",
      "Shan Yu"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Entertainment: Film",
    "question": "What is the name of the queen&#039;s pet in A Bug&#039;s Life?",
    "correct_answer": "Aphie",
    "incorrect_answers": [
      "Flik",
      "Hopper",
      "Dot"
    ],
    "answers": [
      "Flik",
      "Hopper",
      "Dot",
      "Aphie"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Entertainment: Film",
    "question": "The 1939 movie &quot;The Wizard of Oz&quot; contained a horse that changed color, what material did they use to achieve this effect?",
    "correct_answer": "Gelatin",
    "incorrect_answers": [
      "Dye",
      "Paint",
      "CGI Effect"
    ],
    "answers": [
      "Dye",
      "Paint",
      "CGI Effect",
      "Gelatin"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Entertainment: Film",
    "question": "Brendan Fraser starred in the following movies, except which one?",
    "correct_answer": "Titanic",
    "incorrect_answers": [
      "Monkeybone",
      "Encino Man",
      "Mrs. Winterbourne"
    ],
    "answers": [
      "Monkeybone",
      "Encino Man",
      "Mrs. Winterbourne",
      "Titanic"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Entertainment: Film",
    "question": "What mutated animals act as monsters in the movie &#039;Night of the Lepus&#039;?",
    "correct_answer": "Rabbits",
    "incorrect_answers": [
      "Dogs",
      "Rats",
      "Bats"
    ],
    "answers": [
      "Dogs",
      "Rats",
      "Bats",
      "Rabbits"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Entertainment: Film",
    "question": "Bela Lugosi was a Hungarian-American actor best known for his starring role of what 1931 horror film?",
    "correct_answer": "Count Dracula",
    "incorrect_answers": [
      "Dr Frankenstein",
      "Werewolf",
      "The Creature from the Black Lagoon"
    ],
    "answers": [
      "Dr Frankenstein",
      "Werewolf",
      "The Creature from the Black Lagoon",
      "Count Dracula"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Entertainment: Film",
    "question": "What is the name of the villian in the 2015 Russian-American Sci-Fi Movie &quot;Hardcore Henry&quot;?",
    "correct_answer": "Akan",
    "incorrect_answers": [
      "Estelle",
      "Jimmy",
      "Henry"
    ],
    "answers": [
      "Estelle",
      "Jimmy",
      "Henry",
      "Akan"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Entertainment: Film",
    "question": "In the 1979 British film &quot;Quadrophenia&quot; what is the name of the main protagonist?",
    "correct_answer": "Jimmy Cooper",
    "incorrect_answers": [
      "Pete Townshend",
      "Franc Roddam",
      "Archie Bunker"
    ],
    "answers": [
      "Pete Townshend",
      "Franc Roddam",
      "Archie Bunker",
      "Jimmy Cooper"
    ]
  }
]