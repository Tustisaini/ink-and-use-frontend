import React from "react";
import "./Hero.css"; // <-- create this file

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="text-block">
          <h1>
            Create <span>Customize</span> & Order
          </h1>
          <p>Personalize your products effortlessly — from design to print — all at your fingertips. 
  Create unique items that truly reflect your style and bring your ideas to life.</p>
          <div className="buttons">
            <a href="#">Start Designing</a>
            <a href="#">Explore Products</a>
          </div>
        </div>
        <div className="image-block">
          <img
            src="https://a.storyblok.com/f/165154/1450x1450/528ba4dfba/cc-1755_gelato-com-website-new-visual-identity-update-plan_personalization-studio_hero-banner.gif/m/"
            alt="Hero Banner"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
