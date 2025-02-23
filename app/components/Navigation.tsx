import Link from 'next/link';

const categories = [
  { name: 'Öykü', href: '/category/story' },
  { name: 'Roman', href: '/category/novel' },
  { name: 'Şiir', href: '/category/poem' },
  { name: 'Deneme', href: '/category/essay' },
  { name: 'Makale', href: '/category/article' },
  { name: 'Haber', href: '/category/news' },
  { name: 'Video', href: '/category/video' },
];

export default function Navigation() {
  return (
    <header className="relative">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E85C44] to-[#E85C44]/90"></div>

      {/* Navigation Content */}
      <nav className="relative pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo and Subtitle */}
            <div className="text-center space-y-4">
              <h1 className="text-6xl font-light text-white tracking-wider">
                HEPSİHİKAYE
              </h1>
              <div className="flex items-center justify-center text-white/90 space-x-4">
                <div className="h-px bg-white/30 w-16"></div>
                <span className="text-sm font-light tracking-widest uppercase">
                  Kafamızda Çok Kuruyoruz
                </span>
                <div className="h-px bg-white/30 w-16"></div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-3 pb-2">
              {categories.map((category, index) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className={`
                    px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${index === 0 
                      ? 'bg-[#FFD466] text-gray-900 hover:bg-[#FFD466]/90 hover:scale-105 shadow-lg' 
                      : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105 backdrop-blur-sm'
                    }
                  `}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Decorative bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="fill-[#F5F5F5] w-full h-8"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
        >
          <path d="M0,48 L1440,48 L1440,0 C960,24 480,24 0,0 L0,48 Z" />
        </svg>
      </div>
    </header>
  );
}
