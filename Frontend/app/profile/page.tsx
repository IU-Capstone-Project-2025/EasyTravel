"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Compass, ArrowRight } from "lucide-react";

interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    city: string;
    about_me: string;
    additional_interests: string;
    interests: string[];
}

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch("/api/user/me");
                if (!res.ok) throw new Error("Не удалось получить данные профиля");
                const data: UserProfile = await res.json();
                setProfile(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="container flex-1 py-12 text-center">Загрузка профиля...</div>
        );
    }

    if (!profile) {
        return (
            <div className="container flex-1 py-12 text-center text-red-600">
                Ошибка загрузки профиля
            </div>
        );
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
                <div className="max-w-md mx-auto space-y-6">
                    <h1 className="text-2xl font-bold">Профиль пользователя</h1>

                    <div className="space-y-2">
                        <p><strong>ID:</strong> {profile.id}</p>
                        <p><strong>Имя:</strong> {profile.first_name}</p>
                        <p><strong>Фамилия:</strong> {profile.last_name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Город:</strong> {profile.city}</p>
                        <p><strong>О себе:</strong> {profile.about_me || '—'}</p>
                        <p><strong>Доп. предпочтения:</strong> {profile.additional_interests || '—'}</p>
                    </div>

                    <div className="space-y-1">
                        <p><strong>Интересы:</strong></p>
                        <div className="flex flex-wrap gap-2">
                            {profile.interests.map((int) => (
                                <Badge key={int}>{int}</Badge>
                            ))}
                        </div>
                    </div>

                    <Button className="w-full mt-6" onClick={() => router.push("/recommendations") }>
                        Перейти к рекомендациям
                        n            <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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
