const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Solstream</h2>
          <p className="text-sm text-gray-400">
            Platform streaming film terbaik untuk semua genre dan suasana hati. Temukan film favoritmu hari ini!
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Navigasi</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:underline">Beranda</a></li>
            <li><a href="/kategori" className="hover:underline">Kategori</a></li>
            <li><a href="/tentang" className="hover:underline">Tentang Kami</a></li>
            <li><a href="/kontak" className="hover:underline">Kontak</a></li>
          </ul>
        </div>

        {/* Contact / Sosial Media */}
        <div>
          <h3 className="text-white font-semibold mb-3">Ikuti Kami</h3>
          <div className="flex gap-4 text-gray-300 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <i className="fab fa-facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <i className="fab fa-twitter" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Solstream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
