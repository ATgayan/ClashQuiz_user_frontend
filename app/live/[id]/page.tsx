"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Clock, Zap, Trophy, Volume2, VolumeX, CheckCircle } from "lucide-react"

interface LiveQuizData {
  id: string
  title: string
  currentQuestion: number
  totalQuestions: number
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
  participants: number
  image?: string
}

interface ParticipantActivity {
  id: string
  name: string
  selectedAnswer: number | null
  isCorrect?: boolean
  timeToAnswer?: number
}

export default function LiveQuiz({ params }: { params: { id: string } }) {
  const [quizData, setQuizData] = useState<LiveQuizData>({
    id: params.id,
    title: "Science Trivia Challenge",
    currentQuestion: 1,
    totalQuestions: 10,
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Fe", "Cu"],
    correctAnswer: 0,
    timeLimit: 30,
    participants: 247,
  })

  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const [participantActivity, setParticipantActivity] = useState<ParticipantActivity[]>([
    { id: "1", name: "Alex J.", selectedAnswer: null },
    { id: "2", name: "Sarah C.", selectedAnswer: null },
    { id: "3", name: "Mike R.", selectedAnswer: null },
    { id: "4", name: "Emma W.", selectedAnswer: null },
    { id: "5", name: "David K.", selectedAnswer: null },
    { id: "6", name: "Lisa B.", selectedAnswer: null },
  ])

  useEffect(() => {
    if (!isAnswered && timeLeft > 0) {
      const interval = setInterval(() => {
        setParticipantActivity((prev) =>
          prev.map((participant) => {
            if (participant.selectedAnswer === null && Math.random() > 0.85) {
              const randomAnswer = Math.floor(Math.random() * 4)
              return {
                ...participant,
                selectedAnswer: randomAnswer,
                isCorrect: randomAnswer === quizData.correctAnswer,
                timeToAnswer: quizData.timeLimit - timeLeft,
              }
            }
            return participant
          }),
        )
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [timeLeft, isAnswered, quizData.correctAnswer, quizData.timeLimit])

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isAnswered) {
      // Time's up - show results
      setShowResult(true)
      setIsAnswered(true)
    }
  }, [timeLeft, isAnswered])

  // Reset for next question
  useEffect(() => {
    setTimeLeft(quizData.timeLimit)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsAnswered(false)
    setParticipantActivity((prev) =>
      prev.map((p) => ({ ...p, selectedAnswer: null, isCorrect: undefined, timeToAnswer: undefined })),
    )
  }, [quizData.currentQuestion, quizData.timeLimit])

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)

    // Show result after a brief delay
    setTimeout(() => {
      setShowResult(true)
    }, 500)
  }

  const nextQuestion = () => {
    // Simulate moving to next question
    const nextQuestionData = {
      ...quizData,
      currentQuestion: quizData.currentQuestion + 1,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      participants: quizData.participants + Math.floor(Math.random() * 10) - 5,
    }
    setQuizData(nextQuestionData)
  }

  const getAnswerButtonClass = (index: number) => {
    const baseClass = "h-16 text-lg font-semibold transition-all duration-300 transform hover:scale-105"

    if (!showResult) {
      if (selectedAnswer === index) {
        return `${baseClass} bg-primary text-primary-foreground border-primary scale-105 pulse-glow`
      }
      return `${baseClass} bg-card hover:bg-primary/20 border-border hover:border-primary/50`
    }

    // Show results
    if (index === quizData.correctAnswer) {
      return `${baseClass} bg-green-600 text-white border-green-500 glow-border`
    }
    if (selectedAnswer === index && index !== quizData.correctAnswer) {
      return `${baseClass} bg-red-600 text-white border-red-500`
    }
    return `${baseClass} bg-muted text-muted-foreground border-border opacity-60`
  }

  const progressPercentage = (quizData.currentQuestion / quizData.totalQuestions) * 100
  const timePercentage = (timeLeft / quizData.timeLimit) * 100
  const answeredCount = participantActivity.filter((p) => p.selectedAnswer !== null).length

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center glow-border flex-shrink-0">
                <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-xl font-display font-bold neon-text truncate">{quizData.title}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Question {quizData.currentQuestion} of {quizData.totalQuestions}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="flex items-center gap-1 sm:gap-2 bg-primary/20 px-2 sm:px-3 py-1 rounded-full">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-semibold">{quizData.participants}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSoundEnabled(!soundEnabled)} className="p-2">
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-card/30 border-b border-border">
        <div className="container mx-auto px-4 py-2">
          <Progress value={progressPercentage} className="h-1 sm:h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Quiz Area */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              {/* Timer */}
              <div className="text-center">
                <div
                  className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 transition-all duration-300 ${
                    timeLeft <= 5 ? "border-red-500 bg-red-500/20 animate-pulse" : "border-primary bg-primary/20"
                  }`}
                >
                  <Clock className={`w-5 h-5 sm:w-6 sm:h-6 ${timeLeft <= 5 ? "text-red-400" : "text-primary"}`} />
                  <span
                    className={`text-xl sm:text-2xl font-bold font-display ${timeLeft <= 5 ? "text-red-400" : "text-primary"}`}
                  >
                    {timeLeft}s
                  </span>
                </div>
                <div className="mt-2 max-w-xs sm:max-w-md mx-auto">
                  <Progress
                    value={timePercentage}
                    className={`h-1 ${timeLeft <= 5 ? "[&>div]:bg-red-500" : "[&>div]:bg-primary"}`}
                  />
                </div>
              </div>

              {/* Question */}
              <Card className="bg-card/80 backdrop-blur-sm border-border glow-border">
                <CardContent className="p-6 sm:p-8 text-center">
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
                    {quizData.question}
                  </h2>
                  {quizData.image && (
                    <div className="mt-4 sm:mt-6 max-w-sm sm:max-w-md mx-auto">
                      <img
                        src={`/abstract-geometric-shapes.png?height=200&width=300&query=${encodeURIComponent(quizData.question)}`}
                        alt="Question illustration"
                        className="w-full rounded-lg border border-border"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {quizData.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={`${getAnswerButtonClass(index)} h-14 sm:h-16 text-base sm:text-lg`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-background/20 rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="truncate">{option}</span>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Result Feedback */}
              {showResult && (
                <Card
                  className={`border-2 transition-all duration-500 ${
                    selectedAnswer === quizData.correctAnswer
                      ? "border-green-500 bg-green-500/20"
                      : "border-red-500 bg-red-500/20"
                  }`}
                >
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      {selectedAnswer === quizData.correctAnswer ? (
                        <>
                          <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                          <h3 className="text-xl sm:text-2xl font-bold text-green-400">Correct!</h3>
                        </>
                      ) : (
                        <>
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm sm:text-base">✕</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-red-400">Incorrect</h3>
                        </>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                      The correct answer was: <strong>{quizData.options[quizData.correctAnswer]}</strong>
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                      <Badge variant="secondary" className="text-sm">
                        +{selectedAnswer === quizData.correctAnswer ? "100" : "0"} points
                      </Badge>
                      <Button onClick={nextQuestion} className="bg-primary hover:bg-primary/90">
                        Next Question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-card/80 backdrop-blur-sm border-border sticky top-4">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Live Activity</h3>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Answered</span>
                      <span>
                        {answeredCount}/{participantActivity.length}
                      </span>
                    </div>
                    <Progress value={(answeredCount / participantActivity.length) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {participantActivity.map((participant) => (
                      <div
                        key={participant.id}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${
                          participant.selectedAnswer !== null
                            ? participant.isCorrect
                              ? "bg-green-500/20 border border-green-500/30"
                              : "bg-red-500/20 border border-red-500/30"
                            : "bg-muted/50"
                        }`}
                      >
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{participant.name}</p>
                          {participant.selectedAnswer !== null && (
                            <p className="text-xs text-muted-foreground">{participant.timeToAnswer}s</p>
                          )}
                        </div>
                        {participant.selectedAnswer !== null && (
                          <div className="flex items-center gap-1">
                            {participant.isCorrect ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                                <span className="text-white text-xs">✕</span>
                              </div>
                            )}
                            <span className="text-xs font-bold">
                              {String.fromCharCode(65 + participant.selectedAnswer)}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center mt-6">
            <div className="bg-card/50 rounded-lg p-3 sm:p-4 border border-border">
              <div className="text-lg sm:text-2xl font-bold text-primary">{quizData.participants}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Players</div>
            </div>
            <div className="bg-card/50 rounded-lg p-3 sm:p-4 border border-border">
              <div className="text-lg sm:text-2xl font-bold text-accent">
                {Math.round((answeredCount / participantActivity.length) * 100)}%
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Answered</div>
            </div>
            <div className="bg-card/50 rounded-lg p-3 sm:p-4 border border-border">
              <div className="text-lg sm:text-2xl font-bold text-foreground">
                {quizData.currentQuestion}/{quizData.totalQuestions}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
