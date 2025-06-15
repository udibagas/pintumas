'use client';

import { getItems } from "@/lib/api-client";
import { PostWithRelations } from "@/types";
import { Carousel, Image } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [posts, setPosts] = useState<PostWithRelations[]>([]);

  useEffect(() => {
    getItems<PostWithRelations[]>("/api//posts/featured")
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching featured posts:", error);
      });
  }, []);

  return (
    <section className="container mx-auto mt-8 p-4">
      <Carousel autoplay arrows>
        {posts.map((item) => (
          <div key={item.id} className="bg-yellow-600">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              <Image preview={false} alt="featured news" src={item.PostMedia?.[0].media.url} />
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl font-bold mb-4 text-white">{item.title}</h1>
                <p className="mb-4 text-white-700">
                  {item.excerpt}
                </p>
                <Link href={`/posts/${item.slug}`} className="text-yellow-700 font-semibold hover:underline">
                  Selengkapnya &rarr;
                </Link>
              </div>
            </div>

          </div>
        ))}
      </Carousel>
    </section>
  );
}