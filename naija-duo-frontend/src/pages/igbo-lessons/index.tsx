'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { auth } from "../../services/firebase"

const lessons = [
    {
        id: 1,
        title: "Lesson 1: Igbo Greetings",
        description: "Learn common greetings like Ndewo, Kedu, and more.",
        path: "/lessons/1"
    },
    {
        id: 2,
        title: "Lesson 2: Numbers",
        description: "Learn how to count from 1 to 20 in Igbo.",
        path: "/lessons/2"
    },
    {
        id: 3,
        title: "Lesson 3: Family Words",
        description: "Learn how to refer to your family members in Igbo.",
        path: "/lessons/3"
    },
]

export default function LessonsPage() {
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) navigate("/login")
        })
        return () => unsubscribe()
    }, [])

    return (
        <div className="min-h-screen bg-[#fcf5eb] px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-[#1c1c1c]">📚 Igbo Lessons</h1>
                <div className="grid gap-6 md:grid-cols-2">
                    {lessons.map((lesson) => (
                        <Card
                            key={lesson.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
                        >
                            <CardHeader>
                                <CardTitle>{lesson.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">{lesson.description}</p>
                                <Button onClick={() => navigate(lesson.path)} className="bg-[#0c4a6e] text-white">
                                    Start Lesson
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
