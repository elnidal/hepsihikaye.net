'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (term: string) => {
    const queryString = createQueryString('search', term);
    router.push(`?${queryString}`);
  };

  return (
    <div className="w-full">
      <input
        type="search"
        placeholder="Ara..."
        defaultValue={searchParams.get('search') || ''}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E85C44]/20 focus:border-[#E85C44]"
      />
    </div>
  );
}
