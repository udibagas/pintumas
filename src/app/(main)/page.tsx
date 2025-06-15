'use client';

import HeroSection from "@/components/HeroSection";
import LatestNews from "@/components/LatestNews";
import CategorySection from "@/components/CategorySection";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { getItems } from "@/lib/api-client";
import { CategoryWithRelations } from "@/types";
// import MultimediaSection from "@/components/MultimediaSection";

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryWithRelations[]>([]);

  useEffect(() => {
    getItems<CategoryWithRelations[]>("/api/posts/category")
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching featured posts:", error);
      });
  }, []);

  return (
    <main className="flex-1">
      <HeroSection />
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 mt-8">
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <LatestNews />
          {categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
        <aside className="w-full lg:w-1/3">
          <Sidebar />
        </aside>
      </div>
      {/* <MultimediaSection /> */}
    </main>
  );
}