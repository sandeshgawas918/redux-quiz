
export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type TransformedQuestions = Question & { answers: string[] }

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export const fetchQuestions = async (amount: number, difficulty: string, category: string) => {

    let endpoint = `https://opentdb.com/api.php?amount=${amount}&type=multiple`
    if (difficulty !== "any" && category !== "any") {
        endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&category=${category}`;
    } else if (difficulty !== "any") {
        endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    } else if (category !== "any") {
        endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`;
    }
    const data = await fetch(endpoint)
    const result = await data.json()
    const originalArray: Question[] = result.results
    console.log(`originalArray response data : `, originalArray)

    const transformedArray = originalArray.map((question: Question): TransformedQuestions => {
        return {
            ...question,
            answers: [...question.incorrect_answers, question.correct_answer]
        }
    })

    console.log(`transformedArray response data : `, transformedArray)

    return transformedArray
}