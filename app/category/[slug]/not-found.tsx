import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl font-bold mb-4">Kategori Bulunamadı</h2>
      <p className="text-gray-600 mb-8">
        Aradığınız kategori mevcut değil veya kaldırılmış olabilir.
      </p>
      <Link
        href="/"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
