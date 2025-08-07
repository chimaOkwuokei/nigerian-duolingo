// app/lessons/[lessonId]/page.tsx
'use client'

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/services/firebase"
import { Progress } from "@/components/ui/progress"
import clsx from "clsx"
import { Volume2 } from "lucide-react"

const lessonData = {
  1: {
    title: "Lesson 1: Igbo Greetings",
    description: "Master essential greetings used in everyday Igbo conversations.",
    slides: [
      {
        characterSpeech: "Kedu! Do you know what that means?",
        sentence: "_____ means Hello in Igbo.",
        correctWord: "Ndewo",
        options: ["Sannu", "Kedu", "Ndewo", "Bawo ni"],
        audio: "/audio/ndewo.mp3",
        hint: "Tap to learn what each word means."
      },
      {
        characterSpeech: "Now let’s try this one:",
        sentence: "How are you? is translated as _____ in Igbo.",
        correctWord: "Kedu",
        options: ["Ndewo", "Daalu", "Kedu", "Ina kwana"],
        audio: "/audio/kedu.mp3",
        hint: "'Kedu' is used to ask how someone is doing."
      },
      {
        characterSpeech: "Awesome! Can you guess the correct reply?",
        sentence: "The correct response to 'Kedu' is _____",
        correctWord: "Adị m mma",
        options: ["Kedu", "Daalu", "Adị m mma", "Biko"],
        audio: "/audio/adim_mma.mp3",
        hint: "Think about what you say when you’re doing fine."
      }
    ]
  }
}

export default function LessonDetail1() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const [_user, setUser] = useState<any>(null)
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const lesson = lessonData[Number(lessonId) as keyof typeof lessonData]

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login")
      else setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const playAudio = (src: string) => {
    const audio = new Audio(src)
    audio.play()
  }

  const handleSelect = (word: string) => {
    if (answered) return
    setSelectedWord(word)
    setAnswered(true)
    if (word === current.correctWord) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (step + 1 < lesson.slides.length) {
      setStep(step + 1)
      setSelectedWord(null)
      setAnswered(false)
      setShowHint(false)
    } else {
      navigate("/progress", {
        state: {
          lessonTitle: lesson.title,
          score,
          total: lesson.slides.length
        }
      })
    }
  }

  if (!lesson) return <p className="p-10">Lesson not found</p>

  const current = lesson.slides[step]

  return (
    <div className="min-h-screen bg-[#fcf5eb] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1c1c1c] mb-6">{lesson.title}</h1>
        <Progress value={((step + 1) / lesson.slides.length) * 100} className="mb-6" />

        <Card className="bg-white shadow-md rounded-xl p-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500">Placeholder</span>
              </div>
              <div className="text-lg italic text-[#333]">{current.characterSpeech}</div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-xl text-[#1c1c1c]">
                {current.sentence.replace("_____", selectedWord || "_____")}
              </CardTitle>
              <Button variant="ghost" onClick={() => playAudio(current.audio)}>
                <Volume2 className="w-6 h-6 text-[#0c4a6e]" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {current.options.map((option, i) => (
                <Button
                  key={i}
                  onClick={() => handleSelect(option)}
                  disabled={answered}
                  className={clsx(
                    selectedWord === option &&
                      (option === current.correctWord
                        ? "border-green-500 text-green-700"
                        : "border-red-500 text-red-600"),
                    "justify-start"
                  )}
                  variant="outline"
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="mt-4">
              <Button variant="link" className="text-sm text-[#0c4a6e]" onClick={() => setShowHint(!showHint)}>
                {showHint ? "Hide" : "Tap a word to see the translation"}
              </Button>
              {showHint && <p className="text-sm text-gray-600 mt-2">💡 {current.hint}</p>}
            </div>

            {answered && (
              <Button onClick={handleNext} className="mt-6 bg-[#0c4a6e] text-white">
                {step + 1 < lesson.slides.length ? "Next" : "Finish Lesson"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
