"use client";

import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "@/store";
import Link from "next/link";

const Page = () => {
  const user = useAuthStore((state) => state.user);
  const fetchUsers = useAuthStore((state) => state.fetchUsers);
  // Use store token — not localStorage directly
  const token = useAuthStore((state) => state.token);
  const url = useAuthStore((state) => state.url);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    // Fixed: was calling fetchUsers() twice (once in if, once unconditionally)
    if (!user || user.length === 0) fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}/admin/delete-user/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "User deleted");
        fetchUsers(); // Refresh list from server instead of mutating local state
      } else {
        toast.error(result.error || "Failed to delete user");
      }
    } catch {
      toast.error("Network error");
    }
  };

  const safeUsers = Array.isArray(user) ? user : [];

  return (
    <Card className="bg-background text-foreground">
      <ToastContainer />
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">All Users</CardTitle>
            <CardDescription>List of all registered users</CardDescription>
          </div>
          <ShieldCheck className="text-primary h-6 w-6" />
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading users...</p>
        ) : safeUsers.length === 0 ? (
          <p className="text-sm text-muted-foreground">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse text-foreground">
              <thead className="bg-muted">
                <tr className="text-left border-b border-border">
                  <th className="py-2 px-2">#</th>
                  <th className="py-2 px-2">Name</th>
                  <th className="py-2 px-2">Email</th>
                  <th className="py-2 px-2">Role</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2">Joined</th>
                  <th className="py-2 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {safeUsers.map((u, idx) => (
                  <tr key={u._id} className="border-b border-border last:border-0">
                    <td className="py-2 px-2">{idx + 1}</td>
                    <td className="py-2 px-2">{u.firstName} {u.lastName}</td>
                    <td className="py-2 px-2">{u.email}</td>
                    <td className="py-2 px-2">
                      <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                        {u.role || "user"}
                      </Badge>
                    </td>
                    <td className="py-2 px-2">
                      {u.isBlocked
                        ? <Badge variant="destructive">Blocked</Badge>
                        : <Badge variant="outline">Active</Badge>}
                    </td>
                    <td className="py-2 px-2">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-2 text-right">
                      <div className="flex flex-row gap-2 justify-end">
                        <Link href={`/admin/singleuser/${u._id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                        <Button onClick={() => handleDelete(u._id)}
                          variant="ghost" size="sm"
                          className="text-red-600 hover:text-red-800">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Page;
