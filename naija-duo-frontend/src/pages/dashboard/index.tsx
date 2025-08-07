'use client'

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { auth } from "../../services/firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) setUser(user)
            else navigate("/login")
        })
        return () => unsubscribe()
    }, [])

    const handleLogout = async () => {
        await signOut(auth)
        Swal.fire({
            icon: "success",
            title: "Goodbye!",
            text: "Logout successful.",
            timer: 1500,
            showConfirmButton: false,
        });
        navigate("/login")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fcf5eb] to-[#f7e9d7] px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-extrabold text-[#1c1c1c] mb-8">👋 Welcome, {user?.displayName || "Linguist"}!</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-white shadow-xl rounded-2xl hover:shadow-2xl transition duration-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl text-[#2b2b2b]">📚 Start Learning</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#555] mb-3">Pick up a Nigerian language and begin your first lesson.</p>
                            <Button onClick={() => navigate("/lessons")} className="bg-[#0c4a6e] hover:bg-[#075985] text-white">Go to Lessons</Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-xl rounded-2xl hover:shadow-2xl transition duration-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl text-[#2b2b2b]">🗣️ Practice Speaking</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#555] mb-3">Listen to native pronunciations and test your own speech in real-time.</p>
                            <Button onClick={() => navigate("/practice")} className="bg-[#0c4a6e] hover:bg-[#075985] text-white">Start Speaking</Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-xl rounded-2xl hover:shadow-2xl transition duration-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl text-[#2b2b2b]">📊 Progress Tracker</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#555] mb-3">Track how far you’ve come and what you’ve mastered.</p>
                            <Button onClick={() => navigate("/progress")} className="bg-[#0c4a6e] hover:bg-[#075985] text-white">View Progress</Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-xl rounded-2xl hover:shadow-2xl transition duration-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl text-[#2b2b2b]">⚙️ Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#555] mb-3">Update your profile, switch languages, or manage notifications.</p>
                            <Button onClick={() => navigate("/settings")} className="bg-[#0c4a6e] hover:bg-[#075985] text-white">Go to Settings</Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12 text-center">
                    <Button variant="outline" onClick={handleLogout} className="text-[#0c4a6e] border-[#0c4a6e] hover:bg-[#e0f2fe]">Logout</Button>
                </div>
            </div>
        </div>
    )
}
