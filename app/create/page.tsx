"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Upload, Save, Eye, Clock, ImageIcon, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
  image?: string
  points: number
}

export default function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      timeLimit: 30,
      image: "",
      points: 100,
    },
  ])
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      timeLimit: 30,
      image: "",
      points: 100,
    }
    setQuestions([...questions, newQuestion])
    setCurrentQuestion(questions.length)
  }

  const deleteQuestion = (index: number) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index)
      setQuestions(newQuestions)
      if (currentQuestion >= newQuestions.length) {
        setCurrentQuestion(newQuestions.length - 1)
      }
    }
  }

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], [field]: value }
    setQuestions(newQuestions)
  }

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options[optionIndex] = value
    setQuestions(newQuestions)
  }

  const setCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    updateQuestion(questionIndex, "correctAnswer", optionIndex)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="p-2 sm:px-3">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-base sm:text-xl font-display font-bold neon-text">Create New Quiz</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="sm:hidden p-2 bg-transparent">
                <Eye className="w-4 h-4" />
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90 pulse-glow">
                <Save className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Save Quiz</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Quiz Settings Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base sm:text-lg font-display">Quiz Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="quiz-title" className="text-sm">
                    Quiz Title
                  </Label>
                  <Input
                    id="quiz-title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Enter quiz title..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="quiz-description" className="text-sm">
                    Description
                  </Label>
                  <Textarea
                    id="quiz-description"
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    placeholder="Brief description of your quiz..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Questions</span>
                    <Badge variant="secondary">{questions.length}</Badge>
                  </div>
                  <Button onClick={addQuestion} variant="outline" size="sm" className="w-full bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Question Navigation */}
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base sm:text-lg font-display">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
                  {questions.map((question, index) => (
                    <div
                      key={question.id}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                        currentQuestion === index
                          ? "bg-primary/20 border border-primary/50"
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                      onClick={() => setCurrentQuestion(index)}
                    >
                      <span className="text-xs sm:text-sm font-medium truncate">
                        Q{index + 1}: {question.question || "Untitled"}
                      </span>
                      {questions.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteQuestion(index)
                          }}
                          className="h-6 w-6 p-0 hover:bg-destructive/20 flex-shrink-0 ml-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Question Editor */}
          <div className="lg:col-span-3">
            <Card className="bg-card/80 backdrop-blur-sm border-border glow-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl font-display">
                    Question {currentQuestion + 1} of {questions.length}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    {questions[currentQuestion]?.points || 100} points
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* Question Input */}
                <div>
                  <Label htmlFor="question-text" className="text-sm sm:text-base font-semibold">
                    Question
                  </Label>
                  <Textarea
                    id="question-text"
                    value={questions[currentQuestion]?.question || ""}
                    onChange={(e) => updateQuestion(currentQuestion, "question", e.target.value)}
                    placeholder="Enter your question here..."
                    className="mt-2 text-base sm:text-lg"
                    rows={3}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <Label className="text-sm sm:text-base font-semibold">Question Image (Optional)</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center hover:border-primary/50 transition-colors">
                    <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                      Drag and drop an image, or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>

                {/* Answer Options */}
                <div>
                  <Label className="text-sm sm:text-base font-semibold">Answer Options</Label>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {questions[currentQuestion]?.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`relative p-3 sm:p-4 border-2 rounded-lg transition-all ${
                          questions[currentQuestion]?.correctAnswer === optionIndex
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Button
                            variant={questions[currentQuestion]?.correctAnswer === optionIndex ? "default" : "outline"}
                            size="sm"
                            className="w-7 h-7 sm:w-8 sm:h-8 p-0 rounded-full flex-shrink-0"
                            onClick={() => setCorrectAnswer(currentQuestion, optionIndex)}
                          >
                            {questions[currentQuestion]?.correctAnswer === optionIndex ? (
                              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                            ) : (
                              <span className="text-xs font-bold">{String.fromCharCode(65 + optionIndex)}</span>
                            )}
                          </Button>
                          <Input
                            value={option}
                            onChange={(e) => updateOption(currentQuestion, optionIndex, e.target.value)}
                            placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                            className="flex-1 text-sm sm:text-base"
                          />
                        </div>
                        {questions[currentQuestion]?.correctAnswer === optionIndex && (
                          <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs">
                            Correct
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question Settings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div>
                    <Label htmlFor="time-limit" className="text-sm">
                      Time Limit (seconds)
                    </Label>
                    <Select
                      value={questions[currentQuestion]?.timeLimit.toString()}
                      onValueChange={(value) => updateQuestion(currentQuestion, "timeLimit", Number.parseInt(value))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 seconds</SelectItem>
                        <SelectItem value="20">20 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="45">45 seconds</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                        <SelectItem value="90">90 seconds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="points" className="text-sm">
                      Points
                    </Label>
                    <Select
                      value={questions[currentQuestion]?.points.toString()}
                      onValueChange={(value) => updateQuestion(currentQuestion, "points", Number.parseInt(value))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 points</SelectItem>
                        <SelectItem value="100">100 points</SelectItem>
                        <SelectItem value="200">200 points</SelectItem>
                        <SelectItem value="500">500 points</SelectItem>
                        <SelectItem value="1000">1000 points</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-4 sm:pt-6">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {questions[currentQuestion]?.timeLimit}s timer
                    </span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    size="sm"
                  >
                    <span className="hidden sm:inline">Previous Question</span>
                    <span className="sm:hidden">Previous</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                    disabled={currentQuestion === questions.length - 1}
                    size="sm"
                  >
                    <span className="hidden sm:inline">Next Question</span>
                    <span className="sm:hidden">Next</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
