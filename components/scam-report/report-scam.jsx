"use client";

import useAuthStore from "@/store";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bootstrapAuth } from "@/lib/auth";
import { Upload, X, CheckCircle, AlertCircle, Image as ImageIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const BANKS = [
  "Access Bank","Citibank Nigeria","Ecobank Nigeria","Fidelity Bank",
  "First Bank of Nigeria","First City Monument Bank (FCMB)","Globus Bank",
  "Guaranty Trust Bank (GTBank)","Heritage Bank","Jaiz Bank","Keystone Bank",
  "Parallex Bank","Polaris Bank","PremiumTrust Bank","Providus Bank",
  "Stanbic IBTC Bank","Standard Chartered Bank","Sterling Bank","SunTrust Bank",
  "Titan Trust Bank","Union Bank of Nigeria","United Bank for Africa (UBA)",
  "Unity Bank","Wema Bank","Zenith Bank",
  "Opay (Paycom)","PalmPay","Kuda Microfinance Bank","Moniepoint Microfinance Bank",
  "FairMoney Microfinance Bank","Carbon (OneFi)","VFD Microfinance Bank",
  "Mint Finex MFB","Rubies Bank","Sparkle Microfinance Bank","Eyowo",
  "ALAT by Wema","GoMoney","Dot Microfinance Bank","Petra Microfinance Bank",
  "Renmoney","Page MFB","Accion Microfinance Bank",
];

const Field = ({ label, required, children, hint }) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium">
      {label}{required && <span className="text-destructive ml-0.5">*</span>}
    </Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

const ReportScams = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scamTypes, setScamTypes] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [files, setFiles] = useState([]);

  const url = useAuthStore((s) => s.url);
  const token = useAuthStore((s) => s.token);
  const setToken = useAuthStore((s) => s.setToken);
  const router = useRouter();

  const [form, setForm] = useState({
    startDate: "", endDate: "", description: "", name: "",
    scamType: "", accountNumber: "", bank: "", socialHandle: "", email: "", phone: "",
  });

  useEffect(() => { bootstrapAuth(token, setToken, router, "/login"); }, [token, setToken, router]);

  useEffect(() => {
    fetch(`${url}/user/scam-types`)
      .then((r) => r.json())
      .then((d) => setScamTypes(d.scamTypes || []))
      .catch(() => setScamTypes([]));
  }, [url]);

  useEffect(() => () => filePreviews.forEach((p) => p && URL.revokeObjectURL(p)), [filePreviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    e.target.value = "";
    if (files.length + selected.length > MAX_FILES) {
      toast.error(`Maximum ${MAX_FILES} files allowed.`); return;
    }
    const valid = [], previews = [];
    for (const file of selected) {
      if (!ALLOWED_TYPES.includes(file.type)) { toast.error(`${file.name}: images only.`); continue; }
      if (file.size > MAX_FILE_SIZE) { toast.error(`${file.name}: must be under 5MB.`); continue; }
      if (!files.some((f) => f.name === file.name && f.size === file.size)) {
        valid.push(file);
        previews.push(URL.createObjectURL(file));
      }
    }
    setFiles((prev) => [...prev, ...valid]);
    setFilePreviews((prev) => [...prev, ...previews]);
  };

  const removeFile = (i) => {
    if (filePreviews[i]) URL.revokeObjectURL(filePreviews[i]);
    setFiles((p) => p.filter((_, idx) => idx !== i));
    setFilePreviews((p) => p.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.scamType || !form.description || !form.accountNumber || !form.bank) {
      toast.error("Please fill in all required fields."); return;
    }
    if (files.length === 0) { toast.error("At least one evidence image is required."); return; }
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      files.forEach((f) => data.append("files", f, f.name));
      const authToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
      const res = await fetch(`${url}/user/add-report`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: data,
      });
      const json = await res.json();
      if (res.ok) {
        toast.success(json.message);
        setIsSubmitted(true);
        setFiles([]); setFilePreviews([]);
        setForm({ startDate:"",endDate:"",description:"",name:"",scamType:"",accountNumber:"",bank:"",socialHandle:"",email:"",phone:"" });
      } else {
        toast.error(json.error || "Failed to submit report.");
      }
    } catch { toast.error("Network error. Please try again."); }
    finally { setIsSubmitting(false); }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold">Report Submitted!</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Your report has been submitted for review. Our team will verify it shortly. Thank you for helping protect others.
        </p>
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={() => setIsSubmitted(false)}>Submit Another</Button>
          <Button onClick={() => router.push("/dashboard/my-reports")}>View My Reports</Button>
        </div>
      </div>
    );
  }

  const inputCls = "h-10 bg-background border-border focus-visible:ring-primary/40";
  const selectCls = "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none";

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <ToastContainer />

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Report a Scammer</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Help protect the community by reporting fraud. All fields marked <span className="text-destructive">*</span> are required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Section: Scammer Details */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Scammer Details</h3>

          <Field label="Scammer Name" required>
            <Input name="name" value={form.name} onChange={handleChange} className={inputCls} placeholder="Full name or alias" required />
          </Field>

          <Field label="Scam Type" required>
            <div className="relative">
              <select name="scamType" value={form.scamType} onChange={handleChange} className={selectCls} required>
                <option value="">Select a scam type</option>
                {scamTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </Field>

          <Field label="Description / What Happened" required>
            <textarea name="description" value={form.description} onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              rows={4} placeholder="Describe how the scam happened in detail..." required />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="First Payment Date">
              <Input type="date" name="startDate" value={form.startDate} onChange={handleChange} className={inputCls} />
            </Field>
            <Field label="Last Payment Date">
              <Input type="date" name="endDate" value={form.endDate} onChange={handleChange} className={inputCls} />
            </Field>
          </div>
        </div>

        {/* Section: Contact Information */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Contact Information</h3>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Account Number" required>
              <Input name="accountNumber" value={form.accountNumber} onChange={handleChange} className={inputCls} placeholder="0123456789" required />
            </Field>
            <Field label="Bank" required>
              <div className="relative">
                <select name="bank" value={form.bank} onChange={handleChange} className={selectCls} required>
                  <option value="">Select bank</option>
                  {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone Number">
              <Input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputCls} placeholder="08012345678" />
            </Field>
            <Field label="Email Address">
              <Input type="email" name="email" value={form.email} onChange={handleChange} className={inputCls} placeholder="scammer@example.com" />
            </Field>
          </div>

          <Field label="Social Media Handle">
            <Input name="socialHandle" value={form.socialHandle} onChange={handleChange} className={inputCls} placeholder="@username or profile URL" />
          </Field>
        </div>

        {/* Section: Evidence */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Evidence</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Upload screenshots of the scam. Max {MAX_FILES} images, 5MB each.</p>
          </div>

          {/* Drop zone */}
          <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Click to upload evidence</p>
              <p className="text-xs text-muted-foreground">JPEG, PNG, GIF, WEBP up to 5MB</p>
            </div>
            <input type="file" multiple onChange={handleFileChange} accept="image/*"
              className="sr-only" disabled={files.length >= MAX_FILES} />
          </label>

          {/* Previews */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {files.map((file, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden border border-border aspect-video bg-muted">
                  {filePreviews[i] ? (
                    <img src={filePreviews[i]} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <button type="button" onClick={() => removeFile(i)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    aria-label="Remove">
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-black/40 text-white text-[10px] px-2 py-1 truncate">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          )}

          {files.length === 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p className="text-xs font-medium">At least one evidence image is required</p>
            </div>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full h-11 font-semibold text-base">
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting Report...
            </div>
          ) : "Submit Report"}
        </Button>
      </form>
    </div>
  );
};

export default ReportScams;
