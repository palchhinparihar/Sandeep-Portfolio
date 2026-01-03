const Footer = () => {
  return (
    <footer className="text-center text-white px-3 py-10 flex flex-col md:flex-row gap-2 justify-center items-center text-sm backdrop-blur-sm" style={{ wordSpacing: "3px" }}>
      <span>© {new Date().getFullYear()} Sandeep Singh. All rights reserved.</span>
      <span className="hidden md:inline-block">|</span>
      <span>
        Designed & developed with
        <i className="fa-solid fa-heart mx-2"></i>
        by{" "}
        <a
          href="https://www.linkedin.com/in/palchhinparihar"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-400 hover:underline"
        >
          Palchhin
        </a>
      </span>
    </footer>
  );
};

export default Footer;