const Footer = () => {
  return (
    <footer className="text-white px-3 flex flex-col text-center backdrop-blur-sm" style={{ wordSpacing: "3px" }}>
      <span className="text-sm pt-10">© {new Date().getFullYear()} Sandeep Singh. All rights reserved.</span>
      <span className="text-xs text-gray-400 mt-1 pb-5">
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