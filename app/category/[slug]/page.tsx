import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { promises as fs } from 'fs';
import path from 'path';
import ContentCard from '@/app/components/ContentCard';
import Link from 'next/link';
import SearchBar from '@/app/components/SearchBar';
import { Content } from '@/app/types/content';
import { notFound } from 'next/navigation';

// Category mapping for display names
const categoryDisplayNames: Record<string, string> = {
  story: 'Öykü',
  novel: 'Roman',
  poem: 'Şiir',
  essay: 'Deneme',
  article: 'Makale',
  news: 'Haber',
  video: 'Video',
};

// Validate category
const isValidCategory = (category: string): boolean => {
  return Object.keys(categoryDisplayNames).includes(category);
};

// Get posts for a category
async function getCategoryPosts(category: string): Promise<Content[]> {
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const allPosts: Content[] = JSON.parse(fileContents);
    return allPosts.filter((post) => post.category === category);
  } catch {
    return [];
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { search?: string };
}) {
  // Validate category
  if (!isValidCategory(params.slug)) {
    notFound();
  }

  // Get session
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.email === 'admin@hepsihikaye.com';

  // Get posts
  let posts = await getCategoryPosts(params.slug);

  // Apply search filter if search param exists
  if (searchParams.search) {
    const searchTerm = searchParams.search.toLowerCase();
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
    );
  }

  // Sort posts by creation date (newest first)
  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-light text-[#E85C44]">
            {categoryDisplayNames[params.slug]}
          </h1>
          {isAdmin && (
            <Link
              href="/yeni-yazi"
              className="px-6 py-2 bg-[#E85C44] text-white rounded-full hover:bg-[#E85C44]/90 transition-colors"
            >
              Yeni Yazı
            </Link>
          )}
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Bu kategoride henüz içerik bulunmamaktadır.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <ContentCard key={post.id} content={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
