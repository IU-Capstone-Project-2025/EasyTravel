"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Compass, MapPin, ThumbsUp, Filter, List, MapIcon, ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Моковые данные для результатов
const resultsData = [
  {
    id: 1,
    name: "Музей современного искусства",
    image: "/placeholder.svg?height=200&width=400",
    description:
      "Небольшой музей с коллекцией современного искусства местных художников. Здесь редко бывает много посетителей.",
    tags: ["Музей", "Искусство", "Тихое место"],
    location: "ул. Пушкина, 15",
    rating: 4.7,
    coordinates: { lat: 55.796127, lng: 49.106414 },
  },
  {
    id: 2,
    name: "Старинная библиотека",
    image: "/placeholder.svg?height=200&width=400",
    description: "Историческое здание с уникальной архитектурой и тихими залами для чтения и работы.",
    tags: ["История", "Архитектура", "Тихое место"],
    location: "пр. Университетский, 5",
    rating: 4.9,
    coordinates: { lat: 55.790127, lng: 49.116414 },
  },
  {
    id: 3,
    name: "Кафе 'Литературное'",
    image: "/placeholder.svg?height=200&width=400",
    description: "Уютное кафе с книжными полками и отличным кофе. Популярно среди местных жителей, но не у туристов.",
    tags: ["Кафе", "Книги", "Местная атмосфера"],
    location: "ул. Баумана, 42",
    rating: 4.8,
    coordinates: { lat: 55.786127, lng: 49.126414 },
  },
  {
    id: 4,
    name: "Сквер Тукая",
    image: "/placeholder.svg?height=200&width=400",
    description: "Тихий сквер с фонтаном и скамейками, где можно отдохнуть от городской суеты.",
    tags: ["Парк", "Тихое место", "Природа"],
    location: "пл. Тукая",
    rating: 4.6,
    coordinates: { lat: 55.782127, lng: 49.122414 },
  },
  {
    id: 5,
    name: "Галерея 'Смена'",
    image: "/placeholder.svg?height=200&width=400",
    description: "Небольшая галерея с выставками современного искусства и инсталляциями.",
    tags: ["Искусство", "Выставки", "Современность"],
    location: "ул. Бурхана Шахиди, 7",
    rating: 4.5,
    coordinates: { lat: 55.788127, lng: 49.112414 },
  },
]

export default function ResultsPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

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
                Изменить запрос
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Результаты поиска</h1>
            <p className="text-neutral-600">Найдено 5 мест по запросу: "Интересные места в Казани без толп туристов"</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              Список
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="gap-2"
            >
              <MapIcon className="h-4 w-4" />
              Карта
            </Button>
          </div>
        </div>

        {viewMode === "map" ? (
          <div className="bg-neutral-100 rounded-lg overflow-hidden mb-6">
            <div className="relative h-[500px] w-full">
              {/* Здесь будет карта, пока заглушка */}
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
                <div className="text-center">
                  <MapIcon className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-600">Карта с отмеченными местами</p>
                  <p className="text-neutral-500 text-sm">(Интеграция с картами будет здесь)</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Найденные места</h2>
            <Button variant="ghost" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Фильтры
            </Button>
          </div>

          <div className="space-y-6">
            {resultsData.map((place) => (
              <Card key={place.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image
                      src={place.image || "/placeholder.svg"}
                      alt={place.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-5 md:w-2/3">
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
                    <p className="text-neutral-600 mb-4">{place.description}</p>
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
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/feedback">
            <Button className="gap-2">
              Оценить результаты
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-neutral-500 text-sm">© 2023 EasyTravel. Все права защищены.</div>
      </footer>
    </div>
  )
}
