"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Play, Users, Trophy, Zap, BarChart3, Settings } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const recentQuizzes = [
    { id: 1, title: "Science Trivia", questions: 15, players: 24, status: "completed", score: 89 },
    { id: 2, title: "History Challenge", questions: 20, players: 18, status: "live", score: 0 },
    { id: 3, title: "Math Quiz Pro", questions: 12, players: 31, status: "completed", score: 76 },
  ]

  const stats = [
    { label: "Total Quizzes", value: "47", icon: BarChart3, change: "+12%" },
    { label: "Active Players", value: "1,234", icon: Users, change: "+8%" },
    { label: "Avg Score", value: "82%", icon: Trophy, change: "+5%" },
    { label: "Live Sessions", value: "3", icon: Zap, change: "Now" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center glow-border">
                <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <h1 className="text-lg sm:text-2xl font-display font-bold neon-text">QuizMaster Pro</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" className="sm:hidden p-2 bg-transparent">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">Welcome back, John!</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Ready to create some amazing quizzes?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 pulse-glow"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{stat.label}</p>
                    <p className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</p>
                    <Badge variant="secondary" className="mt-1 sm:mt-2 text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center ml-2">
                    <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="lg:col-span-2 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 glow-border">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl font-display">Create New Quiz</CardTitle>
              <CardDescription className="text-sm">
                Start building your next interactive quiz experience
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col gap-3 sm:gap-4">
                <Link href="/create" className="w-full">
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 sm:h-auto"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Create Quiz
                  </Button>
                </Link>
                <Link href="/lobby/quiz-1" className="w-full">
                  <Button variant="outline" size="lg" className="w-full bg-transparent h-12 sm:h-auto">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Quick Start
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-base sm:text-lg font-display">Live Sessions</CardTitle>
              <CardDescription className="text-sm">Currently active quiz sessions</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg border border-accent/30">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">History Challenge</p>
                    <p className="text-xs text-muted-foreground">18 players</p>
                  </div>
                  <Badge className="bg-accent text-accent-foreground ml-2">Live</Badge>
                </div>
                <Link href="/live" className="w-full">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">Join Session</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Quizzes */}
        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-display">Recent Quizzes</CardTitle>
            <CardDescription className="text-sm">Your latest quiz activities and results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">{quiz.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-1">
                      <span>{quiz.questions} questions</span>
                      <span>{quiz.players} players</span>
                      {quiz.status === "completed" && <span>Score: {quiz.score}%</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <Badge variant={quiz.status === "live" ? "default" : "secondary"} className="text-xs">
                      {quiz.status === "live" ? "Live" : "Completed"}
                    </Badge>
                    <Link href={quiz.status === "completed" ? `/results/${quiz.id}` : `/live/${quiz.id}`}>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Play className="w-4 h-4" />
                      </Button>
                    </Link>
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
