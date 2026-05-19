"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "@/store";

const EditStoryPage = () => {
  const { id } = useParams();
  const router = useRouter();

  // Zustand store values
  const url = useAuthStore((state) => state.url);
  const token = useAuthStore((state) => state.token);

  // States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch story
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`${url}/api/story/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();

          setTitle(data.title || "");
          setContent(data.content || "");
          setImagePreview(data.image || null);
        } else {
          toast.error("Failed to load story");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error loading story");
      }
    };

    if (id && url) {
      fetchStory();
    }
  }, [id, url]);

  // Update story
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      setLoading(true);

      const authToken =
        token ||
        (typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null);

      const res = await fetch(`${url}/api/story/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Story updated successfully");

        setTimeout(() => {
          router.push("/all-stories");
        }, 1500);
      } else {
        toast.error(data.error || "Failed to update story");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Story</CardTitle>
          <CardDescription>
            Update your story details below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>

              <Input
                id="title"
                type="text"
                placeholder="Enter story title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>

              <Textarea
                id="content"
                rows={6}
                placeholder="Write your story..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {/* Current Image */}
            {imagePreview && (
              <div className="space-y-2">
                <Label>Current Image</Label>

                <Image
                  src={imagePreview}
                  alt="Story Image"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-auto"
                  priority
                />
              </div>
            )}

            {/* New Image */}
            <div className="space-y-2">
              <Label htmlFor="image">
                Replace Image (optional)
              </Label>

              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files[0])}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Updating..." : "Update Story"}
            </Button>
          </form>

          <ToastContainer />
        </CardContent>

        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Story updates will reflect immediately upon success.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditStoryPage;