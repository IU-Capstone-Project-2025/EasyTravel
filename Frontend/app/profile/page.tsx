"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Compass, ArrowRight } from "lucide-react";
import Cookies from "js-cookie";
import UserMenu from "@/components/user-menu";

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
    const homeLink = Cookies.get("access_token") ? "/recommendations" : "/";

    useEffect(() => {
        try {
            const raw = localStorage.getItem("profile");
            if (!raw) throw new Error("No profile in localStorage");
            setProfile(JSON.parse(raw));
        } catch (err) {
            console.error("Failed to load profile:", err);
        }
    }, []);

    if (!profile) {
        return (
            <div className="container flex-1 py-12 text-center text-red-600">
                Profile data not found.
            </div>
        );
    }

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

            <main className="flex-1 container py-12">
                <div className="max-w-md mx-auto space-y-6">
                    <h1 className="text-2xl font-bold">User Profile</h1>

                    <div className="space-y-2">
                        <p><strong>ID:</strong> {profile.id}</p>
                        <p><strong>First Name:</strong> {profile.first_name}</p>
                        <p><strong>Last Name:</strong> {profile.last_name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>City:</strong> {profile.city}</p>
                        <p><strong>About Me:</strong> {profile.about_me || "—"}</p>
                        <p><strong>Additional Interests:</strong> {profile.additional_interests || "—"}</p>
                    </div>

                    <div className="space-y-1">
                        <p><strong>Interests:</strong></p>
                        <div className="flex flex-wrap gap-2">
                            {profile.interests.map((i) => (
                                <Badge key={i}>{i}</Badge>
                            ))}
                        </div>
                    </div>

                    <Button className="w-full mt-6" onClick={() => router.push("/recommendations") }>
                        Go to Recommendations
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </main>

            <footer className="border-t py-6">
                <div className="container text-center text-neutral-500 text-sm">
                    © 2023 EasyTravel
                </div>
            </footer>
        </div>
    );
}