"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Compass, Search as SearchIcon, MapPin, Tag } from "lucide-react";
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
import UserMenu from "@/components/user-menu";

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });


const popularCities = [
  "Москва",
  "Санкт-Петербург",
  "Казань",
  "Екатеринбург",
  "Уфа",
  "Нижний Новгород",
];

const popularTags = [
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
  "Отдых",
  "Ночная жизнь",
  "Местные места",
  "Местная кухня",
  "Фотография",
  "Тихие места",
  "Интересные места",
];

interface Poi {
  id: string;
  name: string;
  city: string;
  lat: number;
  lon: number;
  score: number;
  description: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [results, setResults] = useState<Poi[]>([]);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      });
    }
  }, []);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!query.trim()) {
      alert("Введите поисковый запрос!");
      return;
    }

    const token = Cookies.get("access_token");
    if (!token) {
      alert("Для поиска нужно войти в систему.");
      router.push("/login");
      return;
    }

    const params = new URLSearchParams();
    params.append("q", query);
    if (selectedCity) params.append("city", selectedCity);

    try {
      const url = `/api/poi?${params.toString()}&limit=10`;
      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Ошибка поиска: ${res.status}`);
      }
      const data: Poi[] = await res.json();
      setResults(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

    const handleSave = async (id: string) => {
    const token = Cookies.get("access_token");
    if (!token) return;
    try {
      const res = await fetch(`/api/user/favorites/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to save');
    } catch (e) {
      console.error(e);
    }
  };

  const homeLink = Cookies.get("access_token") ? "/recommendations" : "/";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex justify-between items-center">
          <Link href={homeLink} className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-neutral-900" />
            <span className="font-medium text-xl">EasyTravel</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/recommendations">
              <Button variant="ghost" size="sm">
                Мои рекомендации
              </Button>
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-3">Что вы хотите найти?</h1>
            <p className="text-neutral-600">
              Опишите свои пожелания в свободной форме, и мы подберем идеальные места
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Query Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <SearchIcon className="h-5 w-5 text-neutral-500" />
                <h2 className="font-medium">Ваш запрос</h2>
              </div>
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Например: 'Я приехал в Казань на день...'"
                className="min-h-[120px] text-base resize-none"
                required
              />
            </div>

            {/* City Selection */}
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

            {/* Tags Section */}
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
                    className="cursor-pointer"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full py-6 text-base">
              Найти идеальные места
              <SearchIcon className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {error && <p className="mt-4 text-red-600">{error}</p>}

          {results.length > 0 && (
                        <>
              <ul className="mt-8 space-y-4">
                {results.map((poi) => (
                  <li key={poi.id} className="border p-4 rounded">
                    <h3 className="font-semibold">{poi.name}</h3>
                    <p className="text-sm text-neutral-600">{poi.city}</p>
                    <p className="mt-2 text-base">
                      {poi.description.slice(0, 100)}…
                    </p>
                    <div className="mt-2">
                      <Button variant="ghost" size="sm" onClick={() => handleSave(poi.id)}>
                        Сохранить
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="h-[400px] w-full mt-8">
                <MapContainer center={[results[0].lat, results[0].lon]} zoom={13} style={{ height: '100%', width: '100%' }} attributionControl={false}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="" />
                  {results.map((poi) => (
                    <Marker key={poi.id} position={[poi.lat, poi.lon]}>
                      <Popup>
                        <strong>{poi.name}</strong>
                        <br />
                        {poi.city}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-neutral-500 text-sm">
          © 2023 EasyTravel. Все права защищены.
        </div>
      </footer>
    </div>
  );
}