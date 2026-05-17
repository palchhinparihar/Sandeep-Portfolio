import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-5 z-50 flex justify-center items-center py-3 px-3.5 rounded-full bg-white text-black shadow-md shadow-blue-300 transition-opacity ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <i className="fa-solid fa-arrow-up text-xl"></i>
    </button>
  );
};

export default ScrollToTop;