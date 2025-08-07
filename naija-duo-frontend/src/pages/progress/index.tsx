// app/progress/page.tsx
'use client'

import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { auth, db } from "@/services/firebase"
import { doc, setDoc } from "firebase/firestore"

export default function ProgressPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { score, total, lessonTitle } = location.state || {}

  useEffect(() => {
    const storeProgress = async () => {
      const user = auth.currentUser
      if (user) {
        const userProgressRef = doc(db, "progress", user.uid + "_" + lessonTitle)
        await setDoc(userProgressRef, {
          uid: user.uid,
          lessonTitle,
          score,
          total,
          percentage: Math.round((score / total) * 100),
          completedAt: new Date().toISOString()
        })
      }
    }
    if (score !== undefined && total !== undefined) {
      storeProgress()
    }
  }, [score, total, lessonTitle])

  if (score === undefined || total === undefined) return <p className="p-10">Invalid Progress</p>

  return (
    <div className="min-h-screen bg-[#fcf5eb] px-6 py-10">
      <div className="max-w-xl mx-auto">
        <Card className="bg-white shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl">🎉 Lesson Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-2">Lesson: {lessonTitle}</p>
            <p className="text-md mb-4">You scored {score} out of {total}</p>
            <Progress value={(score / total) * 100} className="mb-4" />

            <Button className="bg-[#0c4a6e] text-white w-full mt-4" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
