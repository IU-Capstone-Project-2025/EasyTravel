"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass } from "lucide-react";
import UserMenu from "@/components/user-menu";

interface Poi {
  id: string;
  name: string;
  city: string;
  description: string;
}

export default function FavoritesPage() {
  const [items, setItems] = useState<Poi[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("access_token");
  const homeLink = token ? "/recommendations" : "/";

  useEffect(() => {
    const fetchFavs = async () => {
      if (!token) return;
      try {
        const res = await fetch("/api/user/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Ошибка загрузки");
        const data: Poi[] = await res.json();
        setItems(data);
      } catch (e: any) {
        setError(e.message);
      }
    };
    fetchFavs();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex justify-between items-center">
          <Link href={homeLink} className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-neutral-900" />
            <span className="font-medium text-xl">EasyTravel</span>
          </Link>
          <UserMenu />
        </div>
      </header>

      <main className="flex-1 container py-8">
        <h1 className="text-2xl font-bold mb-4">Избранные места</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {items.length === 0 ? (
          <p>Нет сохранённых мест.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((place) => (
              <Card key={place.id} className="overflow-hidden">
                <CardContent className="p-5">
                  <h3 className="font-medium text-lg mb-1">{place.name}</h3>
                  <p className="text-neutral-600 text-sm mb-2">{place.city}</p>
                  <p className="text-neutral-600 text-sm">{place.description.slice(0,100)}…</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
