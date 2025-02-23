import { Content } from './types/content';
import client from './lib/contentful';
import Link from 'next/link';

const categories = [
  { name: 'Öykü', slug: 'story', description: 'Kısa hikayeler ve öyküler' },
  { name: 'Roman', slug: 'novel', description: 'Uzun soluklu romanlar' },
  { name: 'Şiir', slug: 'poem', description: 'Şiirler ve dizeler' },
  { name: 'Deneme', slug: 'essay', description: 'Düşünce yazıları' },
  { name: 'Makale', slug: 'article', description: 'Akademik ve bilimsel yazılar' },
  { name: 'Haber', slug: 'news', description: 'Güncel haberler' },
  { name: 'Video', slug: 'video', description: 'Video içerikler' },
];

async function getFeaturedContent(): Promise<Content[]> {
  const response = await client.getEntries({
    content_type: 'blogPost',
    limit: 6,
    order: '-sys.createdAt',
  });

  return response.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title || 'Untitled',
    slug: item.sys.id,
    category: 'story' as Category,
    coverImage: item.fields.images?.fields ?? null,
    content: item.fields.content?.content?.[0]?.content?.[0]?.value || '',
    createdAt: item.sys.createdAt,
    updatedAt: item.sys.updatedAt,
  }));
}

export default async function Home() {
  const featuredContent = await getFeaturedContent();

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Content Section */}
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-light text-[#E85C44]">Öne Çıkan İçerikler</h2>
            <div className="ml-4 h-px bg-[#E85C44]/20 flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredContent.map((content) => (
              <Link href={`/content/${content.slug}`} key={content.id} className="group">
                <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {content.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={content.coverImage.url}
                        alt={content.coverImage.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-[#E85C44] transition-colors duration-300">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 text-sm">
                      {content.content}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section>
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-light text-[#E85C44]">Kategoriler</h2>
            <div className="ml-4 h-px bg-[#E85C44]/20 flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-center mb-2 group-hover:text-[#E85C44] transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 text-sm text-center">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
