"use client";

import React, { useEffect, useState } from "react";
import useAuthStore from "@/store";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, Clock, X, ThumbsUp, ThumbsDown, ArrowLeft, MessageSquare, Send, ChevronRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "@/components/header";
import Link from "next/link";

const InfoCell = ({ label, value }) => (
  <div className="bg-muted/40 rounded-xl px-4 py-3">
    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
    <p className="text-sm font-medium break-all">{value || "N/A"}</p>
  </div>
);

const SingleReport = () => {
  const [sinReport, setSinReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState(null);
  const [content, setContent] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const { id } = useParams();
  const url = useAuthStore((s) => s.url);
  const storeToken = useAuthStore((s) => s.token);
  const router = useRouter();
  const token = storeToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`${url}/user/single-report/${id}`);
        if (!res.ok) { const e = await res.json(); throw new Error(e.error || "Failed to load report."); }
        setSinReport(await res.json());
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, [id, url]);

  const handleVote = async (type) => {
    if (!token) { toast.error("Please log in to vote."); return; }
    try {
      const res = await fetch(`${url}/user/${type}-report/${id}`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setSinReport((prev) => ({
          ...prev,
          upvotes: type === "upvote" ? [...(prev.upvotes || []), "new"] : prev.upvotes,
          downvotes: type === "downvote" ? [...(prev.downvotes || []), "new"] : prev.downvotes,
        }));
      } else toast.error(data.error || "Failed to vote.");
    } catch { toast.error("Network error."); }
  };

  const handleCommentReact = async (commentId, type) => {
    if (!token) { toast.error("Please log in to react."); return; }
    const endpoint = type === "like" ? "like-comment" : "dislike-comment";
    try {
      const res = await fetch(`${url}/user/${endpoint}/${commentId}`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setSinReport((prev) => ({
          ...prev,
          comments: prev.comments.map((c) =>
            c._id === commentId
              ? { ...c, [type === "like" ? "likes" : "disLikes"]: [...(c[type === "like" ? "likes" : "disLikes"] || []), "new"] }
              : c
          ),
        }));
      } else toast.error(data.error);
    } catch { toast.error("Network error."); }
  };

  const handleCommentSubmit = async () => {
    if (!token) { toast.error("Please log in to comment."); return; }
    if (!content.trim()) { toast.error("Comment cannot be empty."); return; }
    setSubmittingComment(true);
    try {
      const res = await fetch(`${url}/user/comment/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (res.ok) {
        setContent("");
        toast.success(data.message);
        setSinReport((prev) => ({ ...prev, comments: [...(prev.comments || []), data.comment] }));
      } else toast.error(data.error || "Failed to submit comment.");
    } catch { toast.error("Network error."); }
    finally { setSubmittingComment(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
        <div className="h-8 shimmer rounded w-1/3" />
        <div className="h-48 shimmer rounded-2xl" />
        <div className="grid grid-cols-2 gap-3">
          {[1,2,3,4].map(i => <div key={i} className="h-16 shimmer rounded-xl" />)}
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-destructive font-medium">{error}</p>
        <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
      </div>
    </div>
  );

  const evidences = sinReport?.evidences || [];
  const comments  = sinReport?.comments  || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ToastContainer />

      {/* Image lightbox */}
      {view && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setView(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          <Image src={view} alt="Evidence" width={900} height={600}
            className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Back nav */}
        <button onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Header card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-destructive/80 via-destructive/50 to-destructive/20" />
          <div className="p-6 space-y-5">

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold">{sinReport?.name}</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Reported by <span className="font-medium text-foreground">{sinReport?.reporter || "Anonymous"}</span>
                  {" · "}
                  {sinReport?.createdAt && new Date(sinReport.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                  sinReport?.status === "approved" ? "risk-safe" : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900"
                }`}>
                  {sinReport?.status === "approved"
                    ? <><CheckCircle className="h-3 w-3" /> Verified</>
                    : <><Clock className="h-3 w-3" /> {sinReport?.status}</>}
                </span>
                <span className="text-xs px-3 py-1 rounded-full risk-high font-semibold">
                  {sinReport?.scamType}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">What happened</p>
              <div className="bg-muted/40 rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap">
                {sinReport?.description}
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <InfoCell label="Account Number" value={sinReport?.accountNumber} />
              <InfoCell label="Bank" value={sinReport?.bank} />
              <InfoCell label="Phone" value={sinReport?.phone} />
              <InfoCell label="Email" value={sinReport?.email} />
              <InfoCell label="Social Handle" value={sinReport?.socialHandle} />
              {sinReport?.startDate && sinReport?.endDate && (
                <InfoCell label="Date Range"
                  value={`${new Date(sinReport.startDate).toLocaleDateString("en-NG")} – ${new Date(sinReport.endDate).toLocaleDateString("en-NG")}`} />
              )}
            </div>

            {/* Vote bar */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <button onClick={() => handleVote("upvote")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium risk-safe hover:opacity-80 transition-opacity">
                  <ThumbsUp className="h-4 w-4" />
                  {sinReport?.upvotes?.length || 0} Confirm
                </button>
                <button onClick={() => handleVote("downvote")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium risk-high hover:opacity-80 transition-opacity">
                  <ThumbsDown className="h-4 w-4" />
                  {sinReport?.downvotes?.length || 0} Dispute
                </button>
              </div>
              {!token && (
                <Link href="/login" className="text-xs text-primary hover:underline">
                  Sign in to vote
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Evidence gallery */}
        {evidences.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold">Evidence ({evidences.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {evidences.map((ev, i) => {
                const src = ev?.url || ev;
                return (
                  <button key={i} onClick={() => setView(src)}
                    className="group relative aspect-video rounded-xl overflow-hidden border border-border bg-muted hover:border-primary/50 transition-colors">
                    <Image src={src} alt={`Evidence ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Comments ({comments.length})</h2>
          </div>

          {/* Comment list */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {comments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first.</p>
            ) : comments.map((com, i) => (
              <div key={com?._id || i} className="bg-muted/40 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">{com?.user?.userName || "Anonymous"}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {com?.createdAt && new Date(com.createdAt).toLocaleDateString("en-NG")}
                  </p>
                </div>
                <p className="text-sm">{com?.comment}</p>
                <div className="flex gap-2 pt-1">
                  <button onClick={() => handleCommentReact(com._id, "like")}
                    className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg risk-safe hover:opacity-80 transition-opacity">
                    <ThumbsUp className="h-3 w-3" /> {com?.likes?.length || 0}
                  </button>
                  <button onClick={() => handleCommentReact(com._id, "dislike")}
                    className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg risk-high hover:opacity-80 transition-opacity">
                    <ThumbsDown className="h-3 w-3" /> {com?.disLikes?.length || 0}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comment input */}
          {token ? (
            <div className="flex gap-2 pt-1 border-t border-border">
              <Textarea value={content} onChange={(e) => setContent(e.target.value)}
                placeholder="Share your experience or information about this scammer..."
                className="min-h-[80px] resize-none bg-background border-border focus-visible:ring-primary/40 text-sm" />
              <Button onClick={handleCommentSubmit} disabled={submittingComment || !content.trim()}
                className="shrink-0 self-end h-10 px-4 gap-1.5">
                {submittingComment ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : <><Send className="h-3.5 w-3.5" /> Post</>}
              </Button>
            </div>
          ) : (
            <div className="text-center py-3 border-t border-border">
              <Link href="/login" className="text-sm text-primary font-medium hover:underline">
                Sign in to leave a comment →
              </Link>
            </div>
          )}
        </div>

        {/* Report CTA */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Know someone who was scammed?</p>
          <Link href="/login">
            <Button size="sm" className="gap-1.5">
              Report a Scam <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleReport;
