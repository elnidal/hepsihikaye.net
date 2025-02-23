import { client, BlogPost } from '@/lib/contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <span className="font-semibold">{text}</span>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-4 text-gray-700 font-light leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
      <h1 className="text-4xl font-light text-gray-900 mb-6">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-3xl font-light text-gray-800 mb-4">{children}</h2>
    ),
  },
};

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const response = await client.getEntry<BlogPost>(id);

  if (!response) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-500 font-light">
          İçerik bulunamadı.
        </div>
      </div>
    );
  }

  const post = response;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-light text-[#E85D45] mb-4">
          {post.fields.title}
        </h1>
        <div className="text-sm text-gray-500 font-light">
          {post.fields.category}
        </div>
      </header>

      {post.fields.images && post.fields.images.length > 0 && (
        <div className="mb-8">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src={`https:${post.fields.images[0].fields.file.url}`}
              alt={post.fields.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {documentToReactComponents(post.fields.content, options)}
      </div>

      {post.fields.video && post.fields.video.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Video</h2>
          <video
            controls
            className="w-full rounded-lg"
            src={`https:${post.fields.video[0].fields.file.url}`}
          />
        </div>
      )}
    </article>
  );
}
