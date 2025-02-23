'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '../components/RichTextEditor';

export default function NewPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'story',
    content: '',
    videoUrl: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // If it's a video post, format the content differently
      const finalContent = formData.category === 'video' 
        ? {
            ...formData,
            content: `<div class="video-content">
              <div class="video-container">
                ${getEmbedCode(formData.videoUrl)}
              </div>
              <div class="video-description">
                ${formData.description}
              </div>
            </div>`
          }
        : formData;

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalContent),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Redirect to the category page
      router.push(`/category/${formData.category}`);
      router.refresh();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Yazı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (html: string) => {
    setFormData(prev => ({ ...prev, content: html }));
  };

  // Function to convert YouTube URL to embed code
  const getEmbedCode = (url: string) => {
    try {
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/)?.[1];
      return videoId 
        ? `<iframe 
            width="100%" 
            height="500" 
            src="https://www.youtube.com/embed/${videoId}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>`
        : 'Geçersiz YouTube URL';
    } catch {
      return 'Geçersiz YouTube URL';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light text-[#E85C44] text-center mb-8">Yeni Yazı</h1>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
            <div>
              <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
                Başlık
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E85C44]/20 focus:border-[#E85C44]"
                placeholder="Yazı başlığını girin..."
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E85C44]/20 focus:border-[#E85C44]"
              >
                <option value="story">Öykü</option>
                <option value="novel">Roman</option>
                <option value="poem">Şiir</option>
                <option value="essay">Deneme</option>
                <option value="article">Makale</option>
                <option value="news">Haber</option>
                <option value="video">Video</option>
              </select>
            </div>

            {formData.category === 'video' ? (
              <>
                <div>
                  <label htmlFor="videoUrl" className="block text-lg font-medium text-gray-700 mb-2">
                    YouTube Video URL
                  </label>
                  <input
                    type="url"
                    id="videoUrl"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E85C44]/20 focus:border-[#E85C44]"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
                    Video Açıklaması
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E85C44]/20 focus:border-[#E85C44]"
                    placeholder="Video hakkında kısa bir açıklama yazın..."
                  />
                </div>
                {formData.videoUrl && (
                  <div className="border rounded-xl p-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Video Önizleme</h3>
                    <div dangerouslySetInnerHTML={{ __html: getEmbedCode(formData.videoUrl) }} />
                  </div>
                )}
              </>
            ) : (
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  İçerik
                </label>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <RichTextEditor
                    onChange={handleContentChange}
                    content={formData.content}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#E85C44] text-white rounded-full hover:bg-[#E85C44]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Yayınlanıyor...' : 'Yayınla'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
