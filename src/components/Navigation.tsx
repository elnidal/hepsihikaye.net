"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { CATEGORIES } from '@/lib/contentful';

// Function to create slug from category name
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

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="bg-[#E85D45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl text-white font-light tracking-[0.2em] mb-6">
            HEPSİHİKAYE
          </h1>
          <div className="flex flex-col items-center relative w-full max-w-md">
            <div className="w-full h-[1px] bg-white/30 absolute top-1/2 -translate-y-1/2"></div>
            <p className="text-white text-sm tracking-[0.2em] font-light bg-[#E85D45] px-4 relative z-10">
              Kafamızda Çok Kuruyoruz
            </p>
          </div>
          <div className="flex justify-center space-x-2 mt-8">
            {CATEGORIES.map((category) => {
              const slug = createSlug(category);
              return (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  className={clsx(
                    'px-4 py-1 rounded-full text-sm font-light transition-colors',
                    pathname === `/category/${slug}`
                      ? 'bg-[#FFE17B] text-gray-800'
                      : 'bg-white/95 text-gray-800 hover:bg-[#FFE17B]'
                  )}
                >
                  {category}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
