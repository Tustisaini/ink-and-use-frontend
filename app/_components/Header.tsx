"use client";
import "./Header.css"; // 👈 import the css file
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const SaveNewUser = async (user: User) => {
    try {
      const check = await axios.get(
        `http://localhost:1337/api/user-lists?filters[Email][$eq]=${user.email}`
      );

      if (check.data.data.length > 0) {
        console.log("User already exists, skipping save.");
        return;
      }

      const result = await axios.post("http://localhost:1337/api/user-lists", {
        data: {
          FullName: user.name,
          Email: user.email,
          profile_image: user.picture,
        },
      });
      console.log("User saved:", result.data);
    } catch (error: any) {
      if (error.response) {
        console.error("Strapi error:", error.response.data);
      } else {
        console.error("Error saving user:", error);
      }
    }
  };

  const GetUserProfile = async (access_token: string) => {
    try {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: "Bearer " + access_token },
        }
      );
      setUser(userInfo.data);
      SaveNewUser(userInfo.data);
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
      localStorage.setItem("tokenResponse", JSON.stringify(tokenResponse));
      await GetUserProfile(tokenResponse.access_token);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const handleSignOut = () => {
    localStorage.removeItem("tokenResponse");
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="header-logo">
          <Image
            src="/ink_use_logo.svg"
            alt="Ink&Use Logo"
            width={140}
            height={70}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="header-nav">
          {menu.map((item) => (
            <Link key={item.id} href={item.path}>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Cart */}
          <Link href="/cart" className="header-cart">
            <Image src="/shopping_cart.svg" alt="Cart" width={22} height={22} />
          </Link>

          {/* Login or Profile */}
          {!user ? (
            <button onClick={() => googleLogin()} className="login-btn">
              Login
            </button>
          ) : (
            <div className="relative">
              <Image
                src={user.picture}
                alt={user.name}
                width={40}
                height={40}
                className="profile-img"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="dropdown">
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}