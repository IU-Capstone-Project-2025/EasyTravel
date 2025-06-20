"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Compass } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const interests = [
  "Музеи",
  "Искусство",
  "История",
  "Архитектура",
  "Природа",
  "Парки",
  "Кафе",
  "Рестораны",
  "Шоппинг",
  "Спорт",
  "Активный отдых",
  "Ночная жизнь",
  "Местная кухня",
  "Фотография",
  "Тихие места",
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/recommendations")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-neutral-900" />
            <span className="font-medium text-xl">EasyTravel</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {step === 1 ? "Создайте аккаунт" : "Расскажите о своих интересах"}
            </h1>
            <p className="text-neutral-600">
              {step === 1
                ? "Заполните информацию о себе для персонализированных рекомендаций"
                : "Выберите интересы, чтобы мы могли предложить вам подходящие места"}
            </p>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-600"
                }`}
              >
                1
              </div>
              <div className="h-1 w-8 bg-neutral-200">
                <div className={`h-full bg-neutral-900 ${step >= 2 ? "w-full" : "w-0"}`}></div>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-600"
                }`}
              >
                2
              </div>
            </div>
            <div className="text-sm text-neutral-500">Шаг {step} из 2</div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <Input id="firstName" placeholder="Иван" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input id="lastName" placeholder="Иванов" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="example@mail.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" type="password" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Город проживания</Label>
                  <Input id="city" placeholder="Москва" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">О себе (необязательно)</Label>
                  <Textarea
                    id="bio"
                    placeholder="Расскажите немного о себе и своих предпочтениях в путешествиях"
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <Button type="button" className="w-full" onClick={() => setStep(2)}>
                  Продолжить
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-3 block">Выберите ваши интересы</Label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant={selectedInterests.includes(interest) ? "default" : "outline"}
                        className={`cursor-pointer text-sm py-1.5 px-3 ${
                          selectedInterests.includes(interest)
                            ? "bg-neutral-900 hover:bg-neutral-700"
                            : "hover:bg-neutral-100"
                        }`}
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferences">Дополнительные предпочтения</Label>
                  <Textarea
                    id="preferences"
                    placeholder="Расскажите о других предпочтениях, которые помогут нам лучше подобрать места для вас"
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox id="notifications" />
                  <Label htmlFor="notifications" className="text-sm font-normal">
                    Получать уведомления о новых интересных местах
                  </Label>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Назад
                  </Button>
                  <Button type="submit" className="flex-1">
                    Завершить
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-neutral-500 text-sm">© 2023 EasyTravel. Все права защищены.</div>
      </footer>
    </div>
  )
}
