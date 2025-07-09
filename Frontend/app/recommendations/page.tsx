// frontend/pages/recommendations.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArrowRight, Compass, MapPin, ThumbsUp, Filter } from "lucide-react";
import UserMenu from "@/components/user-menu";
interface Poi {
  id: string;
  name: string;
  type: string;
  city: string;
  lat: number;
  lon: number;
  score: number;
  description: string;
}

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState<"all"|"museums"|"nature"|"food">("all");
  const [recs, setRecs] = useState<Poi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const limit = 10;

  useEffect(() => {
    const fetchRecs = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("access_token");
        if (!token) throw new Error("Войдите в систему, чтобы увидеть рекомендации");
        const res = await fetch(
            '/api/poi/recommendations?limit=' + limit,
            { headers: { Authorization: 'Bearer ' + token } }
        );
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        const data: Poi[] = await res.json();
        setRecs(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, []);

  const renderList = () => {
    if (loading) return <p>Загрузка рекомендаций…</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (recs.length === 0) return <p>Нет рекомендаций.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recs.map((place) => (
              <Card key={place.id} className="overflow-hidden">
                <div className="relative h-48 bg-neutral-100 flex items-center justify-center">
                  {/* Замените на реальную картинку, когда будет */}
                  <span className="text-neutral-400">Изображение</span>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{place.name}</h3>
                    <div className="flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded text-sm">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{place.score.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-neutral-600 text-sm mb-3">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {place.city}
                  </div>
                  <p className="text-neutral-600 mb-4 text-sm">
                    {place.description.slice(0, 100)}…
                  </p>
                  {/* В API нет тегов, можно выводить type или city */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">{place.type}</Badge>
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
    );
  };

  return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b py-4">
          <div className="container flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-neutral-900" />
              <span className="font-medium text-xl">EasyTravel</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/search">
                <Button variant="outline" size="sm">
                  Новый поиск
                </Button>
              </Link>
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Ваши рекомендации</h1>
              <p className="text-neutral-600">
                Места, которые могут вам понравиться, основываясь на ваших интересах
              </p>
            </div>
            <Link href="/search">
              <Button className="gap-2">
                Уточнить запрос
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-8">
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

            {/* Пока все вкладки показывают одинаковый список recs */}
            <TabsContent value="all">{renderList()}</TabsContent>
            <TabsContent value="museums">{renderList()}</TabsContent>
            <TabsContent value="nature">{renderList()}</TabsContent>
            <TabsContent value="food">{renderList()}</TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t py-6">
          <div className="container text-center text-neutral-500 text-sm">
            © 2023 EasyTravel. Все права защищены.
          </div>
        </footer>
      </div>
  );
}
