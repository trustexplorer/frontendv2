"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import useAuthStore from "@/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = useAuthStore((state) => state.url);
  // Use store token — not localStorage directly
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(`${url}/api/stories`);
        if (res.ok) {
          const data = await res.json();
          // Handle paginated response shape { stories, pagination }
          setStories(data.stories ?? data);
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

  const handleDelete = async (id) => {
    // Removed window.confirm — delete button is explicit enough; no blocking dialog needed
    try {
      const authToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
      const res = await fetch(`${url}/api/story/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setStories((prev) => prev.filter((s) => s._id !== id));
      } else {
        toast.error(data.error || "Failed to delete story");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle>Community Stories</CardTitle>
          <CardDescription>Manage stories on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : stories.length === 0 ? (
            <p className="text-sm text-muted-foreground">No stories available.</p>
          ) : (
            <div className="space-y-4">
              {stories.map((story) => (
                <div key={story._id} className="border p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Link href={`/stories/${story._id}`}>
                      <h2 className="text-base sm:text-lg font-semibold text-primary hover:underline cursor-pointer">
                        {story.title}
                      </h2>
                    </Link>
                    <div className="flex gap-2">
                      <Link href={`/stories/edit/${story._id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(story._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
