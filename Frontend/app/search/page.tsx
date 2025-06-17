"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Compass, Search, MapPin, Clock, Tag } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const popularCities = ["Москва", "Санкт-Петербург", "Казань", "Сочи", "Калининград", "Владивосток"]

const popularTags = [
  "Музеи",
  "Парки",
  "Архитектура",
  "Кафе",
  "Тихие места",
  "Панорамные виды",
  "История",
  "Искусство",
  "Местная кухня",
]

export default function SearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/results")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex justify-between items-center">
          <Link href="/public" className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-neutral-900" />
            <span className="font-medium text-xl">EasyTravel</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/recommendations">
              <Button variant="ghost" size="sm">
                Мои рекомендации
              </Button>
            </Link>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-neutral-200 text-neutral-600">ИИ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-3">Что вы хотите найти?</h1>
            <p className="text-neutral-600">Опишите свои пожелания в свободной форме, и мы подберем идеальные места</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Search className="h-5 w-5 text-neutral-500" />
                <h2 className="font-medium">Ваш запрос</h2>
              </div>
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Например: «Я приехал в Казань на день, хочу интересно провести время, люблю музеи, но не хочу толпы и туристические места»"
                className="min-h-[120px] text-base resize-none"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-neutral-500" />
                <h2 className="font-medium">Город или место</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="Или введите другое место" />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {popularCities.slice(0, 4).map((city) => (
                  <Badge
                    key={city}
                    variant="outline"
                    className="cursor-pointer hover:bg-neutral-100"
                    onClick={() => setSelectedCity(city)}
                  >
                    {city}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-5 w-5 text-neutral-500" />
                <h2 className="font-medium">Интересы и предпочтения</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedTags.includes(tag) ? "bg-neutral-900 hover:bg-neutral-700" : "hover:bg-neutral-100"
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-neutral-500" />
                <h2 className="font-medium">Дополнительные параметры</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Время пребывания" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="few-hours">Несколько часов</SelectItem>
                    <SelectItem value="one-day">Один день</SelectItem>
                    <SelectItem value="weekend">Выходные</SelectItem>
                    <SelectItem value="week">Неделя</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Бюджет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Экономный</SelectItem>
                    <SelectItem value="moderate">Средний</SelectItem>
                    <SelectItem value="premium">Премиум</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full py-6 text-base">
              Найти идеальные места
              <Search className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-neutral-500 text-sm">© 2023 EasyTravel. Все права защищены.</div>
      </footer>
    </div>
  )
}
