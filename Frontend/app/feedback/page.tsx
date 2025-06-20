"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Compass, ThumbsUp, Send, Home } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function FeedbackPage() {
  const router = useRouter()
  const [satisfaction, setSatisfaction] = useState<string | null>(null)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-neutral-900" />
            <span className="font-medium text-xl">EasyTravel</span>
          </Link>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-neutral-200 text-neutral-600">ИИ</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-lg mx-auto">
          {!submitted ? (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold mb-3">Как вам наши рекомендации?</h1>
                <p className="text-neutral-600">
                  Ваш отзыв поможет нам улучшить сервис и делать более точные рекомендации
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="font-medium">Насколько вы довольны предложенными местами?</h2>
                  <RadioGroup value={satisfaction || ""} onValueChange={setSatisfaction}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very-satisfied" id="very-satisfied" />
                      <Label htmlFor="very-satisfied">Очень доволен</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="satisfied" id="satisfied" />
                      <Label htmlFor="satisfied">Доволен</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="neutral" id="neutral" />
                      <Label htmlFor="neutral">Нейтрально</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dissatisfied" id="dissatisfied" />
                      <Label htmlFor="dissatisfied">Не доволен</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very-dissatisfied" id="very-dissatisfied" />
                      <Label htmlFor="very-dissatisfied">Очень не доволен</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <h2 className="font-medium">Что понравилось или не понравилось в рекомендациях?</h2>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Поделитесь своими впечатлениями..."
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="font-medium">Какие места вы посетили?</h2>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="place1" className="rounded" />
                      <Label htmlFor="place1">Музей современного искусства</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="place2" className="rounded" />
                      <Label htmlFor="place2">Старинная библиотека</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="place3" className="rounded" />
                      <Label htmlFor="place3">Кафе 'Литературное'</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="place4" className="rounded" />
                      <Label htmlFor="place4">Сквер Тукая</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="place5" className="rounded" />
                      <Label htmlFor="place5">Галерея 'Смена'</Label>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Отправить отзыв
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ThumbsUp className="h-8 w-8 text-neutral-700" />
              </div>
              <h1 className="text-2xl font-bold mb-3">Спасибо за ваш отзыв!</h1>
              <p className="text-neutral-600 mb-8">
                Мы используем ваши комментарии для улучшения наших рекомендаций и сервиса в целом.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/public">
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    <Home className="h-4 w-4" />
                    На главную
                  </Button>
                </Link>
                <Link href="/search">
                  <Button className="gap-2 w-full sm:w-auto">
                    Новый поиск
                    <Compass className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-neutral-500 text-sm">© 2023 EasyTravel. Все права защищены.</div>
      </footer>
    </div>
  )
}
