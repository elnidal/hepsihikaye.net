import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json');

async function getPost(slug: string) {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    const posts = JSON.parse(content);
    return posts.find((post: any) => post.id === slug);
  } catch {
    return null;
  }
}

export default async function ContentPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              href={`/category/${post.category}`}
              className="text-[#E85C44] hover:text-[#E85C44]/80 transition-colors"
            >
              ← Geri Dön
            </Link>
          </div>

          {/* Content */}
          <article className="bg-white rounded-2xl shadow-sm p-8">
            <h1 className="text-4xl font-medium mb-6">{post.title}</h1>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-8">
              <span>{new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
              <div className="flex items-center gap-4">
                <span>👍 {post.likes || 0}</span>
                <span>👎 {post.dislikes || 0}</span>
              </div>
            </div>

            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}
