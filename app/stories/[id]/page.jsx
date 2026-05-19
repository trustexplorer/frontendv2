"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import DOMPurify from "dompurify";

import useAuthStore from "@/store";

import { Header } from "@/components/header";

import { ArrowLeft, Calendar, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();

  const url = useAuthStore((state) => state.url);

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(false);

  // Fetch story
  useEffect(() => {
    if (!id || !url) return;

    const fetchStory = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${url}/api/story/${id}`);

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to load story");
        }

        const data = await res.json();

        setStory(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, url]);

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
          <div className="h-6 shimmer rounded w-1/3" />

          <div className="w-full h-64 shimmer rounded-2xl" />

          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 shimmer rounded w-full"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
          <p className="text-destructive">{error}</p>

          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // If no story
  if (!story) return null;

  // Sanitize HTML content
  const safeHtml =
    typeof window !== "undefined"
      ? DOMPurify.sanitize(story.content || "")
      : "";

  return (
    <>
      <Header />

      {/* Zoom Modal */}
      {zoom && story.image && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setZoom(false)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close zoom"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Zoomed Image */}
          <Image
            src={story.image}
            alt={story.title}
            width={900}
            height={600}
            className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            priority
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Stories
        </button>

        {/* Story Card */}
        <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          {/* Hero Image */}
          {story.image && (
            <div
              className="relative w-full h-64 sm:h-80 bg-muted cursor-zoom-in"
              onClick={() => setZoom(true)}
              title="Click to zoom"
            >
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover hover:scale-[1.02] transition-transform duration-300"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-5">
            {/* Meta */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />

              {new Date(story.createdAt).toLocaleDateString(
                "en-NG",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}

              {story.author?.userName && (
                <>
                  <span className="text-border">·</span>

                  <span>
                    By{" "}
                    <span className="font-medium text-foreground">
                      {story.author.userName}
                    </span>
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
              {story.title}
            </h1>

            {/* Story Content */}
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-foreground leading-relaxed
              prose-headings:font-semibold
              prose-a:text-primary
              prose-a:no-underline
              hover:prose-a:underline
              prose-img:rounded-xl
              prose-p:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />
          </div>
        </article>
      </div>
    </>
  );
};

export default Page;