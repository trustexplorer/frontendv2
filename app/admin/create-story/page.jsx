"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store";

import dynamic from 'next/dynamic';

// Dynamically import ReactQuill with SSR disabled
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const url = useAuthStore((state) => state.url);
  const router = useRouter();
const token =  useAuthStore(state => state.token)



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      toast.error("All fields are required");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);


      const res = await fetch(`${url}/api/story`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Story created successfully!");
        router.push("/admin/all-stories");
      } else {
        toast.error(data?.error || "Failed to create story");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Create New Story</CardTitle>
        <CardDescription>Share your experience with the community</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 gap-7">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Story title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="lg:pb-10">
            <Label htmlFor="content">Content</Label>
            <ReactQuill
              value={content}
              onChange={setContent}
              id="content"
              placeholder="Write your story....."
              theme="snow"
              required
              className="lg:w-[46vw] lg:h-[30vh]"
            />

          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Posting..." : "Post Story"}
          </Button>
        </form>
        <ToastContainer />
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Your story will be visible to all users.
        </p>
      </CardFooter>
    </Card>
  );
};

export default Page;
