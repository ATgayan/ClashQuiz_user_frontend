"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Play, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function JoinQuiz() {
  const liveQuizzes = [
    {
      id: "quiz-1",
      title: "Science Trivia Challenge",
      host: "Dr. Smith",
      participants: 247,
      status: "waiting",
      timeLeft: "2:30",
      code: "SCI123",
    },
    {
      id: "quiz-2",
      title: "History Masters",
      host: "Prof. Johnson",
      participants: 156,
      status: "live",
      timeLeft: "15:45",
      code: "HIS456",
    },
    {
      id: "quiz-3",
      title: "Math Challenge Pro",
      host: "Ms. Davis",
      participants: 89,
      status: "starting",
      timeLeft: "0:45",
      code: "MTH789",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-display font-bold neon-text">Join Live Quiz</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Join by Code */}
          <Card className="mb-8 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 glow-border">
            <CardHeader>
              <CardTitle className="text-2xl font-display">Join with Code</CardTitle>
              <CardDescription>Enter the quiz code provided by your host</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input placeholder="Enter quiz code..." className="flex-1 text-lg h-12" />
                <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                  <Play className="w-5 h-5 mr-2" />
                  Join Quiz
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Live Quizzes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold">Live Quizzes</h2>
            <div className="grid gap-4">
              {liveQuizzes.map((quiz) => (
                <Card
                  key={quiz.id}
                  className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{quiz.title}</h3>
                          <p className="text-sm text-muted-foreground">Hosted by {quiz.host}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="w-4 h-4" />
                              <span>{quiz.participants} players</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="w-4 h-4" />
                              <span>{quiz.timeLeft}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              Code: {quiz.code}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            quiz.status === "live" ? "default" : quiz.status === "starting" ? "secondary" : "outline"
                          }
                          className={quiz.status === "live" ? "bg-accent text-accent-foreground animate-pulse" : ""}
                        >
                          {quiz.status === "live" ? "Live" : quiz.status === "starting" ? "Starting Soon" : "Waiting"}
                        </Badge>
                        <Link href={`/live/${quiz.id}`}>
                          <Button
                            variant={quiz.status === "live" ? "default" : "outline"}
                            className={quiz.status === "live" ? "pulse-glow" : ""}
                          >
                            {quiz.status === "live" ? "Join Now" : "Join"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
