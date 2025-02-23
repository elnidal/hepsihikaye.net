import Image from 'next/image';
import Link from 'next/link';
import { Entry } from 'contentful';
import { BlogPost } from '@/lib/contentful';

interface Props {
  post: Entry<BlogPost>;
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/post/${post.sys.id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all w-full max-w-2xl mx-auto transform hover:-translate-y-1"
    >
      <div className="relative aspect-video">
        {post.fields.images && post.fields.images.length > 0 && (
          <Image
            src={`https:${post.fields.images[0].fields.file.url}`}
            alt={post.fields.title}
            fill
            className="object-cover"
          />
        )}
        {post.fields.video && post.fields.video.length > 0 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm">
            Video
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-light text-gray-900 group-hover:text-[#E85D45] transition-colors mb-2">
          {post.fields.title}
        </h3>
        <p className="text-base text-gray-500">
          {post.fields.category}
        </p>
      </div>
    </Link>
  );
}
