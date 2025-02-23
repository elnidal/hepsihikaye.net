'use client';

import { Content } from '../types/content';
import Link from 'next/link';
import { useState } from 'react';

interface ContentCardProps {
  content: Content;
  showActions?: boolean;
}

export default function ContentCard({ content, showActions = true }: ContentCardProps) {
  const [likes, setLikes] = useState(content.likes || 0);
  const [dislikes, setDislikes] = useState(content.dislikes || 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleReaction = async (type: 'like' | 'dislike') => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/posts/${content.id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) throw new Error('Failed to update reaction');

      const data = await response.json();
      setLikes(data.likes);
      setDislikes(data.dislikes);
    } catch (error) {
      console.error('Error updating reaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to strip HTML tags and get plain text
  const getPlainText = (html: string) => {
    if (typeof window === 'undefined') return html;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  // Function to get video description
  const getVideoDescription = (html: string) => {
    const match = html.match(/<div class="video-description">(.*?)<\/div>/s);
    return match ? match[1].trim() : '';
  };

  // Function to get video thumbnail
  const getVideoThumbnail = (html: string) => {
    const match = html.match(/youtube\.com\/embed\/([\w-]{11})/);
    return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
  };

  // Function to get the first image from the content
  const getFirstImage = (html: string) => {
    const match = html.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  };

  const isVideo = content.category === 'video';
  const description = isVideo ? getVideoDescription(content.content) : getPlainText(content.content);
  const thumbnail = isVideo ? getVideoThumbnail(content.content) : null;
  const contentUrl = `/content/${content.id}`;

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
      {(thumbnail || !isVideo) && (
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img
            src={thumbnail || getFirstImage(content.content) || '/placeholder.jpg'}
            alt=""
            className="w-full h-full object-cover"
          />
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-[#E85C44] ml-1"></div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="p-8">
        <Link href={contentUrl}>
          <h2 className="text-2xl font-medium mb-4 hover:text-[#E85C44] transition-colors">
            {content.title}
          </h2>
        </Link>
        <p className="text-gray-600 mb-4 text-lg line-clamp-3">
          {description}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {new Date(content.createdAt).toLocaleDateString('tr-TR')}
          </span>
          
          <div className="flex items-center gap-4">
            {showActions && (
              <>
                <button
                  onClick={() => handleReaction('like')}
                  disabled={isLoading}
                  className="flex items-center gap-1 text-gray-500 hover:text-[#E85C44] transition-colors disabled:opacity-50"
                >
                  👍 <span>{likes}</span>
                </button>
                <button
                  onClick={() => handleReaction('dislike')}
                  disabled={isLoading}
                  className="flex items-center gap-1 text-gray-500 hover:text-[#E85C44] transition-colors disabled:opacity-50"
                >
                  👎 <span>{dislikes}</span>
                </button>
              </>
            )}
            <Link
              href={contentUrl}
              className="text-[#E85C44] hover:text-[#E85C44]/80 transition-colors ml-4"
            >
              {isVideo ? 'Videoyu İzle →' : 'Devamını Oku →'}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
