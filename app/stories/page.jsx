"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import useAuthStore from "@/store";
import { toast } from "react-toastify";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookOpen, ArrowRight } from "lucide-react";

const Page = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = useAuthStore((state) => state.url);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${url}/api/stories`);
        if (res.ok) {
          const data = await res.json();
          // Backend returns { stories, pagination } — extract the array
          setStories(Array.isArray(data) ? data : (data.stories ?? []));
        } else {
          toast.error("Failed to load stories");
        }
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [url]);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Community Stories</h1>
            <p className="text-sm text-muted-foreground mt-1">Real experiences shared by Nigerians</p>
          </div>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm self-start">
            Share your story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="w-full h-44 shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-4 shimmer rounded w-3/4" />
                  <div className="h-3 shimmer rounded w-full" />
                  <div className="h-3 shimmer rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto">
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium">No stories yet</p>
            <p className="text-sm text-muted-foreground">Be the first to share your experience</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stories.map((story) => (
              <Link href={`/stories/${story._id}`} key={story._id}>
                <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer h-full flex flex-col">
                  {story.image && (
                    <div className="relative w-full h-44 overflow-hidden bg-muted shrink-0">
                      <Image
                        src={story.image}
                        alt={story.title || "Story image"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-semibold text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                      {story.title}
                    </h2>
                    {/* Render as plain text — avoids XSS without needing DOMPurify in list view */}
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                      {story.content?.replace(/<[^>]+>/g, "") || ""}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {new Date(story.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span className="text-xs text-primary font-medium flex items-center gap-0.5 group-hover:underline">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Page;
