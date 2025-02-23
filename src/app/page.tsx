import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Ara..."
          className="w-full max-w-xl px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#E85D45] font-light"
        />
        
        <div className="mt-12 text-center text-gray-500 font-light">
          Bu kategoride henüz içerik bulunmamaktadır.
        </div>
      </div>
    </div>
  );
}
