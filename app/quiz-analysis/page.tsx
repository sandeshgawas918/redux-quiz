"use client"
import React from 'react'
import { useSelector } from 'react-redux'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from '@/components/ui/separator';
import { RootState } from '@/redux/store/store';

function page() {
    const { score, newArray, questionSize } = useSelector((state: RootState) => state.quiz)
    return (
        <div className="mx-auto max-w-4xl space-y-3 px-4 py-5">

            <h1 className="text-4xl font-bold text-center">
                📊 Quiz Analysis
            </h1>

            <p className="text-muted-foreground text-center">
                Review every question and compare your answers with the correct ones.
            </p>

            {newArray.map((item, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl">
                                Question {index + 1}
                            </CardTitle>

                            <Badge variant={item.correct ? "default" : "destructive"}>
                                {item.correct ? "Correct" : "Incorrect"}
                            </Badge>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="space-y-5">
                        <h2 className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: item.question }} />
                        <div className="space-y-3">
                            {item.answers.map((answer: string, i: number) => {
                                const isCorrect = answer === item.correctAnswer;
                                const isSelected = answer === item.selectedAnswer;
                                return (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-3 rounded-xl border p-3
                ${isCorrect ? "border-green-500 bg-green-500/10" : isSelected ? "border-red-500 bg-red-500/10" : ""}`}
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                        <span
                                            className="flex-1"
                                            dangerouslySetInnerHTML={{ __html: answer }}
                                        />
                                        {isCorrect && <span>✅</span>}
                                        {!isCorrect && isSelected && <span>❌</span>}
                                    </div>
                                );
                            })}
                        </div>
                        <Separator />
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-xl bg-muted p-4">
                                <p className="text-sm text-muted-foreground">
                                    Your Answer
                                </p>
                                <p
                                    className={`mt-1 font-semibold ${item.selectedAnswer === item.correctAnswer
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                    dangerouslySetInnerHTML={{
                                        __html: item.selectedAnswer,
                                    }}
                                />
                            </div>
                            <div className="rounded-xl bg-muted p-4">
                                <p className="text-sm text-muted-foreground">
                                    Correct Answer
                                </p>
                                <p
                                    className="mt-1 font-semibold text-green-600"
                                    dangerouslySetInnerHTML={{
                                        __html: item.correctAnswer,
                                    }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default page

const dummyArray = [
    {
        "question": "In the 2014 Pokemon VGC Finals, which Pokemon was famous for bringing the winner to victory?",
        "answers": ["Garchomp", "Lapras", "Primal Groudon", "Pachirisu"],
        "selectedAnswer": "Garchomp",
        "correct": false,
        "correctAnswer": "Pachirisu"
    },
    {
        "question": "What is the official language of Costa Rica?",
        "answers": ["English", "Portuguese", "Creole", "Spanish"],
        "selectedAnswer": "Creole",
        "correct": false,
        "correctAnswer": "Spanish"
    },
    {
        "question": "Who recorded the album called \"Down to the Moon\" in 1986?",
        "answers": ["Jean-Michel Jarre", "Bing Crosby", "Enya", "Andreas Vollenweider"],
        "selectedAnswer": "Enya",
        "correct": false,
        "correctAnswer": "Andreas Vollenweider"
    },
    {
        "question": "Which product did Nokia, the telecommunications company, originally sell?",
        "answers": ["Phones", "Computers", "Processors", "Paper"],
        "selectedAnswer": "Paper",
        "correct": true,
        "correctAnswer": "Paper"
    },
    {
        "question": "What is the standard frame rate for animation?",
        "answers": ["12 FPS", "30 FPS", "60 FPS", "24 FPS"],
        "selectedAnswer": "30 FPS",
        "correct": false,
        "correctAnswer": "24 FPS"
    },
    {
        "question": "When was Pong released?",
        "answers": ["March 29, 2017", "November 29, 1970", "December 14, 1974", "November 29, 1972"],
        "selectedAnswer": "December 14, 1974",
        "correct": false,
        "correctAnswer": "November 29, 1972"
    },
    {
        "question": "What is the name of the City in Saints Row The Third?",
        "answers": ["Stilwater", "Carcer", "Liberty", "Steelport"],
        "selectedAnswer": "Carcer",
        "correct": false,
        "correctAnswer": "Steelport"
    },
    {
        "question": "How many flagship monsters appear in Monster Hunter Generations?",
        "answers": ["1", "2", "3", "4"],
        "selectedAnswer": "3",
        "correct": false,
        "correctAnswer": "4"
    },
    {
        "question": "Which of the following is a personal computer made by the Japanese company Fujitsu?",
        "answers": ["PC-9801", "Xmillennium", "MSX", "FM-7"],
        "selectedAnswer": "MSX",
        "correct": false,
        "correctAnswer": "FM-7"
    },
    {
        "question": "The notion of a \"set that contains all sets which do not contain themselves\" is a paradoxical idea attributed to which English philosopher?",
        "answers": ["Francis Bacon", "John Locke", "Alfred North Whitehead", "Bertrand Russell"],
        "selectedAnswer": "Alfred North Whitehead",
        "correct": false,
        "correctAnswer": "Bertrand Russell"
    }
]