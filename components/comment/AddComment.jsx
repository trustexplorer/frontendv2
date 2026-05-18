'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageIcon, X } from 'lucide-react';
import useAuthStore from '@/store';

const AddComment = () => {
  const url = useAuthStore((state) => state.url);
  const [comment, setComment] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const MAX_MEDIA = 3;

  const handleMediaChange = (e) => {
    const files = [...mediaFiles, ...Array.from(e.target.files)];
    if (files.length > MAX_MEDIA) return alert(`Max ${MAX_MEDIA} media allowed`);
    setMediaFiles(files);
  };

  const removeMedia = (index) =>
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      mediaFiles.forEach((file, i) => formData.append(`media_${i}`, file));
      formData.append('comment', comment);

      const res = await fetch(`${url}/add-comment-on-report`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      const success = res.ok;
      const msg = success ? 'Comment posted successfully!' : 'Failed to post comment.';
      if (success) {
        setComment('');
        setMediaFiles([]);
      }

      setMessage(msg);
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-xl border bg-white shadow-sm space-y-4">
      {message && <p className="text-center text-sm text-blue-600">{message}</p>}

      <Textarea
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[120px]"
      />

      <label className="flex items-center gap-2 cursor-pointer">
        <ImageIcon className="w-5 h-5 text-gray-600" />
        <span className="text-sm text-gray-600">Add media (max {MAX_MEDIA})</span>
        <Input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleMediaChange}
          className="hidden"
        />
      </label>

      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {mediaFiles.map((file, index) => {
            const isImage = file.type.startsWith('image');
            const preview = URL.createObjectURL(file);
            return (
              <div key={index} className="relative">
                <button
                  type="button"
                  onClick={() => removeMedia(index)}
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
                >
                  <X size={14} />
                </button>
                {isImage ? (
                  <img src={preview} alt="" className="w-full h-24 object-cover rounded-md" />
                ) : (
                  <video src={preview} className="w-full h-24 object-cover rounded-md" controls />
                )}
              </div>
            );
          })}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Posting...' : 'Post Comment'}
      </Button>
    </form>
  );
};

export default AddComment;
