'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Cookies from 'js-cookie';
import { Compass } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const loggedIn = Boolean(Cookies.get('access_token'));
  const homeLink = loggedIn ? '/recommendations' : '/';


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/token/get-token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        Cookies.set("access_token", data.access_token, { expires: 7 });
        router.push("/recommendations");
      } else {
        setError("Неверный email или пароль");
      }
    } catch (err) {
      console.error(err);
      setError("Не удалось выполнить вход");
    }
  };

  return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b py-4">
          <div className="container flex justify-between items-center">
            <Link href={homeLink} className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-neutral-900" />
              <span className="font-medium text-xl">EasyTravel</span>
            </Link>
            {!loggedIn && (
                <Link href="/register">
                  <Button variant="outline" size="sm">Регистрация</Button>
                </Link>
            )}
          </div>
        </header>

        <main className="flex-1 container py-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Вход</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* поля email/password и ошибка */}
              <div className="text-center">
                Нет аккаунта?{' '}
                <Link href="/register" className="text-blue-600 hover:underline">
                  Зарегистрируйтесь
                </Link>
              </div>
              <Button type="submit" className="w-full">Войти</Button>
            </form>
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