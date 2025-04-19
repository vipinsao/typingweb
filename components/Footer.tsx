const Footer = () => {
  return (
    <footer className="mt-16 w-full bg-gray-900 text-white py-4 text-center border-t border-gray-700">
      <div className="text-sm">
        Made with ❤️ by{" "}
        <span className="font-semibold text-green-400">Vipin Chandra Sao</span>
      </div>
      <div className="text-xs text-gray-400 mt-1">
        © {new Date().getFullYear()} TypeWeb. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
