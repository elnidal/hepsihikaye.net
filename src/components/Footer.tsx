export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base text-gray-400">
            © {new Date().getFullYear()} HepsiHikaye. Tüm hakları saklıdır.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            KAFAMIZDA ÇOK KURUYORUZ
          </p>
        </div>
      </div>
    </footer>
  );
}
