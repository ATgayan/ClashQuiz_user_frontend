"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Play, Copy, Check, Wifi, UserPlus, Crown } from "lucide-react"

interface Participant {
  id: string
  name: string
  joinedAt: string
  isHost?: boolean
}

interface LobbyData {
  id: string
  title: string
  code: string
  host: string
  participants: Participant[]
  maxParticipants: number
  startTime?: string
  status: "waiting" | "starting" | "live"
}

export default function QuizLobby({ params }: { params: { id: string } }) {
  const [lobbyData, setLobbyData] = useState<LobbyData>({
    id: params.id,
    title: "Science Trivia Challenge",
    code: "SCI123",
    host: "Dr. Smith",
    maxParticipants: 500,
    status: "waiting",
    participants: [
      { id: "1", name: "Dr. Smith", joinedAt: "5 min ago", isHost: true },
      { id: "2", name: "Alex Johnson", joinedAt: "3 min ago" },
      { id: "3", name: "Sarah Chen", joinedAt: "2 min ago" },
      { id: "4", name: "Mike Rodriguez", joinedAt: "1 min ago" },
      { id: "5", name: "Emma Wilson", joinedAt: "30 sec ago" },
    ],
  })

  const [copied, setCopied] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

  // Simulate new participants joining
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && lobbyData.participants.length < 20) {
        const names = ["David Kim", "Lisa Brown", "Tom Anderson", "Grace Lee", "John Doe", "Jane Smith", "Chris Wilson"]
        const randomName = names[Math.floor(Math.random() * names.length)]

        setLobbyData((prev) => ({
          ...prev,
          participants: [
            ...prev.participants,
            {
              id: Date.now().toString(),
              name: randomName,
              joinedAt: "just now",
            },
          ],
        }))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [lobbyData.participants.length])

  const copyQuizCode = () => {
    navigator.clipboard.writeText(lobbyData.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const startQuiz = () => {
    setLobbyData((prev) => ({ ...prev, status: "starting" }))
    setCountdown(5)
  }

  // Countdown effect
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      // Redirect to live quiz
      window.location.href = `/live/${lobbyData.id}`
    }
  }, [countdown, lobbyData.id])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center glow-border flex-shrink-0">
                <Users className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-xl font-display font-bold neon-text truncate">{lobbyData.title}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Quiz Lobby</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <Badge variant="outline" className="bg-primary/20 border-primary text-primary">
                <Wifi className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {countdown !== null && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="bg-card border-primary glow-border">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Quiz Starting In...</h2>
              <div className="text-6xl font-bold text-primary neon-text animate-pulse mb-4">{countdown}</div>
              <p className="text-muted-foreground">Get ready!</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Info & Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quiz Code */}
            <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 glow-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-display">Quiz Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold font-display mb-4 neon-text">{lobbyData.code}</div>
                  <Button onClick={copyQuizCode} variant="outline" className="w-full bg-transparent">
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy Code"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Participant Count */}
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-display">Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{lobbyData.participants.length}</div>
                  <p className="text-sm text-muted-foreground">of {lobbyData.maxParticipants} max</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <UserPlus className="w-4 h-4 text-accent animate-pulse" />
                    <span className="text-sm text-accent">Players joining...</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Start Quiz */}
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-display">Ready to Start?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Button
                    onClick={startQuiz}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 pulse-glow"
                    disabled={lobbyData.status !== "waiting"}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {lobbyData.status === "starting" ? "Starting..." : "Start Quiz"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Minimum 2 players required</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Participants List */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-xl font-display flex items-center gap-2">
                <Users className="w-5 h-5" />
                Connected Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lobbyData.participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="font-semibold">
                        {participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{participant.name}</h3>
                        {participant.isHost && <Crown className="w-4 h-4 text-yellow-400" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{participant.joinedAt}</p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>
                ))}
              </div>

              {lobbyData.participants.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Waiting for players to join...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
