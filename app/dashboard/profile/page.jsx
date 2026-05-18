"use client";

import useAuthStore from "@/store";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, Phone, AtSign, Save, AlertCircle, CheckCircle } from "lucide-react";

const Page = () => {
  const token = useAuthStore((s) => s.token);
  const url = useAuthStore((s) => s.url);
  const user = useAuthStore((s) => s.dashboard);
  const getDashboard = useAuthStore((s) => s.getDashboard);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({ userName: "", firstName: "", lastName: "", phone: "" });

  useEffect(() => { if (!user) getDashboard(); }, []);
  useEffect(() => {
    if (user) setFormData({ userName: user.userName || "", firstName: user.firstName || "", lastName: user.lastName || "", phone: user.phone || "" });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(""); setSuccess(false);
    try {
      const res = await fetch(`${url}/user/update-profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) { toast.success("Profile updated!"); setSuccess(true); getDashboard(); }
      else { const msg = data.error || "Failed to update profile"; setErrorMessage(msg); toast.error(msg); }
    } catch { toast.error("Network error. Please try again."); }
    finally { setIsSubmitting(false); }
  };

  const inputCls = "h-10 pl-9 bg-background border-border focus-visible:ring-primary/40";

  return (
    <div className="p-4 md:p-6 max-w-xl">
      <ToastContainer />

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Edit Profile</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Update your account information</p>
      </div>

      {/* Avatar initials block */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-card border border-border rounded-xl">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl uppercase shrink-0">
          {formData.firstName?.[0]}{formData.lastName?.[0]}
        </div>
        <div>
          <p className="font-semibold">{formData.firstName} {formData.lastName}</p>
          <p className="text-sm text-muted-foreground">@{formData.userName}</p>
          {user?.email && <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>}
        </div>
      </div>

      {errorMessage && (
        <Alert variant="destructive" className="mb-4 py-2.5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">{errorMessage}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 py-2.5 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">Profile updated successfully!</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-sm">First Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className={inputCls} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-sm">Last Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={inputCls} />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="userName" className="text-sm">Username</Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="userName" name="userName" value={formData.userName} onChange={handleChange} className={inputCls} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputCls} placeholder="08012345678" />
          </div>
        </div>

        {user?.email && (
          <div className="space-y-1.5">
            <Label className="text-sm">Email Address</Label>
            <Input value={user.email} disabled className="h-10 bg-muted text-muted-foreground cursor-not-allowed" />
            <p className="text-xs text-muted-foreground">Email cannot be changed after registration</p>
          </div>
        )}

        <Button type="submit" className="w-full h-10 font-semibold gap-2 mt-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
          ) : <><Save className="h-4 w-4" /> Save Changes</>}
        </Button>
      </form>
    </div>
  );
};

export default Page;
