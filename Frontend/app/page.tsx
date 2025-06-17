import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Compass, User } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-neutral-900" />
            <span className="font-medium text-xl">EasyTravel</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/search" className="text-neutral-600 hover:text-neutral-900">
              Поиск
            </Link>
            <Link href="/recommendations" className="text-neutral-600 hover:text-neutral-900">
              Рекомендации
            </Link>
            <Link href="/register" className="text-neutral-600 hover:text-neutral-900">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Регистрация
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container py-12 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Откройте для себя идеальные места для путешествий
          </h1>
          <p className="text-xl text-neutral-600 mb-10">
            EasyTravel поможет найти интересные места в городе для прогулок и отдыха, основываясь на ваших предпочтениях
            и интересах.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Начать
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/search">
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                <MapPin className="h-4 w-4" />
                Искать места
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-50 p-6 rounded-lg">
            <div className="bg-neutral-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-neutral-700" />
            </div>
            <h3 className="text-lg font-medium mb-2">Персонализация</h3>
            <p className="text-neutral-600">
              Расскажите о своих интересах, и мы подберем места, которые вам точно понравятся.
            </p>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <div className="bg-neutral-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-neutral-700" />
            </div>
            <h3 className="text-lg font-medium mb-2">Умный поиск</h3>
            <p className="text-neutral-600">Опишите свои пожелания в свободной форме, и мы поймем, что вам нужно.</p>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <div className="bg-neutral-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Compass className="h-6 w-6 text-neutral-700" />
            </div>
            <h3 className="text-lg font-medium mb-2">Уникальные места</h3>
            <p className="text-neutral-600">Находите не только популярные, но и скрытые жемчужины города.</p>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-neutral-500 text-sm">© 2023 EasyTravel. Все права защищены.</div>
      </footer>
    </div>
  )
}
