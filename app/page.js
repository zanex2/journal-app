'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
export default function WelcomePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  useEffect(() => {
    const savedName = localStorage.getItem('journalUserName')
    const savedAge = localStorage.getItem('journalUserAge')
    if (savedName && savedAge) {
      router.push('/journal')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-6">
      <Card className="max-w-md mx-auto mt-20 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-purple-800">
            Welcome to Your Daily Journal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700">
                What&apos;s your name?
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-purple-200 focus:border-purple-400"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700">
                How old are you?
              </label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="border-purple-200 focus:border-purple-400"
                placeholder="Enter your age"
              />
            </div>
            <Button 
              onClick={() => {
                if (name && age) {
                  localStorage.setItem('journalUserName', name)
                  localStorage.setItem('journalUserAge', age)
                  router.push('/journal')
                }
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Start Journaling
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}