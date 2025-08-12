import { images } from "../../data/gallery";
import CircularGallery from "../common/CircularGallery";

const Gallery = ({ title }) => {
  return (
    <section id="gallery" className="md:py-24 px-6 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-3">{title}</h2>
        <div className="w-28 md:w-34 h-1 bg-white mx-auto mb-12"></div>
      </div>

      <div data-aos="fade-up" className="hidden md:block h-[600px] relative">
        <CircularGallery
          items={images}
          bend={2}
          scrollSpeed={1}
        />
      </div>

      <div data-aos="fade-up" className="md:hidden w-full h-full flex flex-col justify-center">
        <div className="flex flex-nowrap overflow-auto gap-4 px-2">
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 h-full p-4 rounded-xl text-white">
              <img src={image.image} alt={image.text} className="rounded-lg object-cover w-70 h-70" />
            </div>
          ))}
        </div>

        <p className="flex gap-2 justify-end items-center">
          <span className="text-gray-500">Swipe to see more</span>
          <i className="fa-solid fa-right-long animate-pulse text-gray-300"></i>
        </p>
      </div>
    </section>
  );
};

export default Gallery;
