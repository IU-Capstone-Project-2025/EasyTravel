"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Cookies from "js-cookie";


const interestsList = [
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
];

// Сопоставление русских интересов с enum InterestsEnum
const interestsMap: Record<string, string> = {
  "Музеи": "museums",
  "Искусство": "art",
  "История": "history",
  "Архитектура": "architecture",
  "Природа": "nature",
  "Парки": "parks",
  "Кафе": "cafes",
  "Рестораны": "restaurants",
  "Шоппинг": "shopping",
  "Спорт": "sports",
  "Активный отдых": "active",
  "Ночная жизнь": "nightlife",
  "Местная кухня": "cuisine",
  "Фотография": "photography",
  "Тихие места": "quiet",
};

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");

  // Step 2 fields
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [preferences, setPreferences] = useState("");
  const [notifications, setNotifications] = useState(false);

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
        prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // payload matching UserCreateDTO + extra preferences
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      city,
      about_me: bio,
      interests: selectedInterests.map(i => interestsMap[i]).filter(Boolean),
      additional_interests: preferences,
    };

    try {
      const res = await fetch('/api/user/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Registration failed:", errorData);
        alert("Ошибка при регистрации: " + errorData.detail?.[0]?.msg || res.statusText);
        return;
      }

      const data = await res.json();
      console.log("Registered user:", data);
      // Автоматический логин после регистрации
      const loginRes = await fetch('/api/token/get-token', {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });
      if (loginRes.ok) {
        const loginData = await loginRes.json();
        Cookies.set("access_token", loginData.access_token, { expires: 7 });
        router.push("/recommendations");
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      alert("Произошла ошибка при подключении к серверу.");
    }
  };

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
                        <Input
                            id="firstName"
                            placeholder="Иван"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Фамилия</Label>
                        <Input
                            id="lastName"
                            placeholder="Иванов"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                          id="email"
                          type="email"
                          placeholder="example@mail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Пароль</Label>
                      <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Город проживания</Label>
                      <Input
                          id="city"
                          placeholder="Москва"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">О себе (необязательно)</Label>
                      <Textarea
                          id="bio"
                          placeholder="Расскажите немного о себе и своих предпочтениях в путешествиях"
                          className="resize-none"
                          rows={3}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
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
                        {interestsList.map((interest) => (
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
                          value={preferences}
                          onChange={e => setPreferences(e.target.value)}
                      />
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
  );
}
