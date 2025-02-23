import { client, BlogPost, CATEGORIES } from '@/lib/contentful';
import SearchBar from '@/components/SearchBar';
import PostCard from '@/components/PostCard';

interface Props {
  params: { slug: string };
  searchParams: { search?: string };
}

// Function to create slug from category name (same as in Navigation)
const createSlug = (category: string) => {
  return category
    .toLowerCase()
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Function to get category from slug
const getCategoryFromSlug = (slug: string) => {
  return CATEGORIES.find(
    category => createSlug(category) === slug
  );
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = params;
  const { search } = searchParams;

  const category = getCategoryFromSlug(slug);
  
  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-500 font-light">
          Kategori bulunamadı.
        </div>
      </div>
    );
  }

  // Fetch posts for this category
  const response = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
    'fields.category': category,
    ...(search && {
      'fields.title[match]': search,
    }),
  });

  const posts = response.items;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-light text-[#E85D45] mb-8 text-center">
        {category}
      </h1>
      
      <SearchBar />
      
      {posts.length > 0 ? (
        <div className="flex justify-center mt-12">
          <div className="grid gap-12 grid-cols-1 md:grid-cols-2 max-w-7xl w-full px-4">
            {posts.map((post) => (
              <PostCard key={post.sys.id} post={post as any} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 font-light">
          Bu kategoride henüz içerik bulunmamaktadır.
        </div>
      )}
    </div>
  );
}
