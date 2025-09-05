"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Share2, RotateCcw, Download, Users, Clock, Target, Zap, Crown } from "lucide-react"
import Link from "next/link"

interface Player {
  id: string
  name: string
  score: number
  correctAnswers: number
  totalAnswers: number
  averageTime: number
  rank: number
  avatar?: string
}

interface QuizResults {
  id: string
  title: string
  totalQuestions: number
  totalPlayers: number
  averageScore: number
  completionTime: string
  players: Player[]
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [showAnimation, setShowAnimation] = useState(true)
  const [results, setResults] = useState<QuizResults>({
    id: params.id,
    title: "Science Trivia Challenge",
    totalQuestions: 10,
    totalPlayers: 247,
    averageScore: 76,
    completionTime: "12:45",
    players: [
      {
        id: "1",
        name: "Alex Johnson",
        score: 950,
        correctAnswers: 9,
        totalAnswers: 10,
        averageTime: 8.5,
        rank: 1,
      },
      {
        id: "2",
        name: "Sarah Chen",
        score: 920,
        correctAnswers: 9,
        totalAnswers: 10,
        averageTime: 12.3,
        rank: 2,
      },
      {
        id: "3",
        name: "Mike Rodriguez",
        score: 890,
        correctAnswers: 8,
        totalAnswers: 10,
        averageTime: 9.8,
        rank: 3,
      },
      {
        id: "4",
        name: "Emma Wilson",
        score: 850,
        correctAnswers: 8,
        totalAnswers: 10,
        averageTime: 15.2,
        rank: 4,
      },
      {
        id: "5",
        name: "David Kim",
        score: 820,
        correctAnswers: 8,
        totalAnswers: 10,
        averageTime: 11.7,
        rank: 5,
      },
      {
        id: "6",
        name: "Lisa Brown",
        score: 780,
        correctAnswers: 7,
        totalAnswers: 10,
        averageTime: 13.4,
        rank: 6,
      },
      {
        id: "7",
        name: "Tom Anderson",
        score: 750,
        correctAnswers: 7,
        totalAnswers: 10,
        averageTime: 16.8,
        rank: 7,
      },
      {
        id: "8",
        name: "Grace Lee",
        score: 720,
        correctAnswers: 7,
        totalAnswers: 10,
        averageTime: 14.9,
        rank: 8,
      },
    ],
  })

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{rank}</div>
        )
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-black"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-black"
      default:
        return "bg-primary text-primary-foreground"
    }
  }

  const topThree = results.players.slice(0, 3)
  const otherPlayers = results.players.slice(3)
  const maxScore = Math.max(...results.players.map((p) => p.score))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center glow-border flex-shrink-0">
                <Trophy className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-xl font-display font-bold neon-text">Quiz Results</h1>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{results.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="sm:hidden p-2 bg-transparent">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="sm:hidden p-2 bg-transparent">
                <Share2 className="w-4 h-4" />
              </Button>
              <Link href="/">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <RotateCcw className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">New Quiz</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Quiz Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardContent className="p-4 sm:p-6 text-center">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold">{results.totalPlayers}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Players</div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardContent className="p-4 sm:p-6 text-center">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold">{results.totalQuestions}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Questions</div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardContent className="p-4 sm:p-6 text-center">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold">{results.averageScore}%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Avg Score</div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardContent className="p-4 sm:p-6 text-center">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold">{results.completionTime}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Duration</div>
            </CardContent>
          </Card>
        </div>

        {/* Podium - Top 3 */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 glow-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-2xl font-display text-center flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />🏆 WINNERS PODIUM 🏆
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-center items-end gap-4 sm:gap-8 py-6 sm:py-8">
              {/* 2nd Place */}
              {topThree[1] && (
                <div className="text-center order-2 sm:order-1 transform hover:scale-105 transition-transform duration-300">
                  <div className="relative mb-4">
                    <div className="w-16 h-12 sm:w-20 sm:h-16 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-end justify-center pb-2 mx-auto shadow-lg">
                      <span className="text-black font-bold text-base sm:text-lg">2</span>
                    </div>
                    <Avatar className="w-12 h-12 sm:w-16 sm:h-16 absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 border-4 border-gray-300 shadow-lg">
                      <AvatarFallback className="bg-gray-200 text-gray-800 font-bold text-sm sm:text-base">
                        {topThree[1].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg truncate">{topThree[1].name}</h3>
                  <p className="text-xl sm:text-2xl font-bold text-primary">{topThree[1].score}</p>
                  <Badge className="mt-2 bg-gray-300 text-black text-xs sm:text-sm font-bold">🥈 2ND PLACE</Badge>
                </div>
              )}

              {/* 1st Place */}
              {topThree[0] && (
                <div className="text-center order-1 sm:order-2 transform hover:scale-110 transition-transform duration-300">
                  <div className="relative mb-4">
                    <div className="w-20 h-16 sm:w-24 sm:h-20 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-lg flex items-end justify-center pb-2 glow-border mx-auto shadow-xl animate-pulse">
                      <span className="text-black font-bold text-lg sm:text-xl">1</span>
                    </div>
                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 border-4 border-yellow-400 shadow-xl">
                      <AvatarFallback className="bg-yellow-200 text-yellow-800 font-bold text-base sm:text-lg">
                        {topThree[0].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 animate-bounce" />
                    <div className="absolute -top-16 sm:-top-20 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce">
                      🎉
                    </div>
                    <div className="absolute -top-16 sm:-top-20 left-1/4 transform -translate-x-1/2 text-xl animate-pulse">
                      ✨
                    </div>
                    <div className="absolute -top-16 sm:-top-20 right-1/4 transform translate-x-1/2 text-xl animate-pulse">
                      ⭐
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg sm:text-xl truncate">{topThree[0].name}</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-400 neon-text">{topThree[0].score}</p>
                  <Badge className="mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-xs sm:text-sm animate-pulse">
                    🏆 CHAMPION! 🏆
                  </Badge>
                </div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <div className="text-center order-3 transform hover:scale-105 transition-transform duration-300">
                  <div className="relative mb-4">
                    <div className="w-16 h-10 sm:w-20 sm:h-12 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg flex items-end justify-center pb-2 mx-auto shadow-lg">
                      <span className="text-black font-bold text-base sm:text-lg">3</span>
                    </div>
                    <Avatar className="w-12 h-12 sm:w-16 sm:h-16 absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 border-4 border-amber-400 shadow-lg">
                      <AvatarFallback className="bg-amber-200 text-amber-800 font-bold text-sm sm:text-base">
                        {topThree[2].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg truncate">{topThree[2].name}</h3>
                  <p className="text-xl sm:text-2xl font-bold text-primary">{topThree[2].score}</p>
                  <Badge className="mt-2 bg-amber-400 text-black text-xs sm:text-sm font-bold">🥉 3RD PLACE</Badge>
                </div>
              )}
            </div>

            <div className="text-center mt-6 p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-primary/30">
              <h4 className="text-lg font-bold mb-2">🎊 Congratulations to our Winners! 🎊</h4>
              <p className="text-sm text-muted-foreground">
                Amazing performance from all {results.totalPlayers} participants!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Full Leaderboard */}
        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-display">Complete Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {results.players.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                    player.rank <= 3
                      ? "bg-primary/10 border-primary/30 pulse-glow"
                      : "bg-muted/50 border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    {getRankIcon(player.rank)}
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                      <AvatarFallback className="font-semibold text-sm sm:text-base">
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-base sm:text-lg truncate">{player.name}</h3>
                      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        <Badge className={`${getRankBadgeColor(player.rank)} text-xs sm:text-sm`}>#{player.rank}</Badge>
                        <span className="text-lg sm:text-2xl font-bold text-primary">{player.score}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>
                          {player.correctAnswers}/{player.totalAnswers} correct
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{player.averageTime}s avg time</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{Math.round((player.correctAnswers / player.totalAnswers) * 100)}% accuracy</span>
                      </div>
                    </div>

                    <div className="mt-2 sm:mt-3">
                      <Progress value={(player.score / maxScore) * 100} className="h-1 sm:h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
