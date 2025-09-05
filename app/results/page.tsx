"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Clock, Target, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ResultsOverview() {
  const recentResults = [
    {
      id: "quiz-1",
      title: "Science Trivia Challenge",
      date: "2024-01-15",
      participants: 247,
      winner: "Alex Johnson",
      winnerScore: 950,
      averageScore: 76,
      duration: "12:45",
    },
    {
      id: "quiz-2",
      title: "History Masters",
      date: "2024-01-14",
      participants: 156,
      winner: "Sarah Chen",
      winnerScore: 890,
      averageScore: 68,
      duration: "15:30",
    },
    {
      id: "quiz-3",
      title: "Math Challenge Pro",
      date: "2024-01-13",
      participants: 89,
      winner: "Mike Rodriguez",
      winnerScore: 920,
      averageScore: 72,
      duration: "10:20",
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
            <h1 className="text-xl font-display font-bold neon-text">Quiz Results</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold mb-2">Recent Quiz Results</h2>
            <p className="text-muted-foreground">View detailed results and leaderboards from your quizzes</p>
          </div>

          <div className="space-y-6">
            {recentResults.map((result) => (
              <Card
                key={result.id}
                className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{result.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{result.date}</p>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{result.participants} players</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{result.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            <span>{result.averageScore}% avg</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-2">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                          Winner: {result.winner}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-primary mb-3">{result.winnerScore} pts</p>
                      <Link href={`/results/${result.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
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
  )
}
