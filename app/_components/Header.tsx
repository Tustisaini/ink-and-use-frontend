"use client";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const menu = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Products", path: "/Products" },
  { id: 3, name: "About Us", path: "/AboutUs" },
  { id: 4, name: "Contact Us", path: "/ContactUs" },
];

export type User = {
  email: string;
  name: string;
  picture: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  const GetUserProfile = async (access_token: string) => {
    try {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: "Bearer " + access_token },
        }
      );
      console.log("GetUserProfile:", userInfo.data);
      setUser(userInfo.data);
    } catch (err) {
      localStorage.removeItem("tokenResponse");
      setUser(null);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenString = localStorage.getItem("tokenResponse");
      if (tokenString) {
        const tokenResponse = JSON.parse(tokenString);
        if (tokenResponse?.access_token) {
          GetUserProfile(tokenResponse.access_token);
        }
      }
    }
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      localStorage.setItem("tokenResponse", JSON.stringify(tokenResponse));
      await GetUserProfile(tokenResponse.access_token);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <header className="w-full bg-background shadow-md sticky top-0 z-50">
      <div className="flex items-center px-6 py-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/ink_use_logo.svg"
              alt="Ink&Use Logo"
              width={140}
              height={70}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-8">
            {menu.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="text-foreground text-lg font-medium hover:text-blue-600 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Actions */}
        <div className="ml-auto flex items-center gap-4">
          {/* Cart */}
          <Link
            href="/cart"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-transform transform hover:-translate-y-0.5 shadow-sm"
          >
            <Image src="/shopping_cart.svg" alt="Cart" width={24} height={24} />
          </Link>

          {/* Login or Profile Image */}
          {!user ? (
            <button
              onClick={() => googleLogin()}
              className="px-4 w-25 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300 flex items-center justify-center"
            >
              Login
            </button>
          ) : (
            <Image
              src={user.picture}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full border-2 border-white shadow-md"
            />
          )}
        </div>
      </div>
    </header>
  );
}
