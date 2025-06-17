"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Compass, MapPin, ThumbsUp, Filter } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Моковые данные для рекомендаций
const recommendationData = [
  {
    id: 1,
    name: "Исторический музей",
    image: "/placeholder.svg?height=200&width=400",
    description: "Уникальная коллекция исторических артефактов в тихой атмосфере.",
    tags: ["Музей", "История", "Искусство"],
    location: "Центр города",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Ботанический сад",
    image: "/placeholder.svg?height=200&width=400",
    description: "Спокойное место с редкими растениями и живописными тропинками.",
    tags: ["Природа", "Парк", "Тихое место"],
    location: "Северный район",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Кафе 'Уютный уголок'",
    image: "/placeholder.svg?height=200&width=400",
    description: "Атмосферное кафе с авторскими десертами и отличным кофе.",
    tags: ["Кафе", "Десерты", "Уютная атмосфера"],
    location: "Старый город",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Галерея современного искусства",
    image: "/placeholder.svg?height=200&width=400",
    description: "Выставки работ современных художников в минималистичном пространстве.",
    tags: ["Искусство", "Выставки", "Современность"],
    location: "Арт-квартал",
    rating: 4.5,
  },
]

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex justify-between items-center">
          <Link href="/public" className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-neutral-900" />
            <span className="font-medium text-xl">EasyTravel</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/search">
              <Button variant="outline" size="sm">
                Новый поиск
              </Button>
            </Link>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-neutral-200 text-neutral-600">ИИ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Ваши рекомендации</h1>
            <p className="text-neutral-600">Места, которые могут вам понравиться, основываясь на ваших интересах</p>
          </div>
          <Link href="/search">
            <Button className="gap-2">
              Уточнить запрос
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="museums">Музеи</TabsTrigger>
              <TabsTrigger value="nature">Природа</TabsTrigger>
              <TabsTrigger value="food">Еда и напитки</TabsTrigger>
            </TabsList>
            <Button variant="ghost" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Фильтры
            </Button>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendationData.map((place) => (
                <Card key={place.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={place.image || "/placeholder.svg"}
                      alt={place.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg">{place.name}</h3>
                      <div className="flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded text-sm">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>{place.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-neutral-600 text-sm mb-3">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {place.location}
                    </div>
                    <p className="text-neutral-600 mb-4 text-sm">{place.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {place.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Подробнее
                      </Button>
                      <Button variant="ghost" size="sm">
                        Сохранить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="museums" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendationData
                .filter((place) => place.tags.includes("Музей") || place.tags.includes("Искусство"))
                .map((place) => (
                  <Card key={place.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-lg">{place.name}</h3>
                        <div className="flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded text-sm">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>{place.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-neutral-600 text-sm mb-3">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {place.location}
                      </div>
                      <p className="text-neutral-600 mb-4 text-sm">{place.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {place.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Подробнее
                        </Button>
                        <Button variant="ghost" size="sm">
                          Сохранить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Аналогично для других вкладок */}
        </Tabs>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-neutral-500 text-sm">© 2023 EasyTravel. Все права защищены.</div>
      </footer>
    </div>
  )
}
