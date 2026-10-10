import { socialIcons } from "../../data/socialLinks";

const Contact = ({ title }) => {
  return (
    <section id="contact" className="min-h-[85vh] pt-20 pb-1 px-6 backdrop-blur-sm">
      <div className="max-w-3xl md:max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-3">
          {title}
        </h2>
        <div className="w-43 md:w-52 bg-white h-1 mx-auto mb-10"></div>

        <p data-aos="fade-up" className="text-gray-300 mb-12 text-[17px]">
          I'm available for collaboration, interpretation, or consulting. Choose a method below to get in touch!
        </p>

        {/* Contact Buttons */}
        <div data-aos="fade-down" className="flex flex-col w-[80%] mx-auto md:w-full md:flex-row justify-center gap-6 mb-18">
          {socialIcons
            .filter((social) => social.title === "WhatsApp" || social.title === "Mail")
            .map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                data-aos={social.aos}
                className={`flex justify-center items-center ${
                  social.title === "WhatsApp"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                } text-white font-semibold px-6 py-3.5 rounded-lg transition text-base md:text-xl`}
              >
                <social.icon className="mr-2" aria-hidden="true" />
                <span>{social.title === "Mail" && "Send an Email"}</span>
                <span>{social.title === "WhatsApp" && "Chat on WhatsApp"}</span>
              </a>
            ))}
        </div>

        {/* Social Icons */}
        <div className="mt-12">
          <h3 data-aos="fade-up" className="text-2xl text-white mb-6">Connect with me</h3>
          <div data-aos="fade-down" className="flex justify-center gap-6 md:gap-8">
            {socialIcons
              .filter((social) => social.title === "LinkedIn" || social.title === "Instagram")
              .map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                  aria-label={social.ariaLabel}
                  data-aos={social.aos}
                  className={`text-3xl md:text-4xl hover:scale-105 border-2 group hover:border-dotted ${social.title === "LinkedIn" ? "hover:border-blue-400 hover:text-blue-500" : "hover:border-pink-500 hover:text-pink-500"} p-5 rounded-full transition duration-300`}
                >
                  <social.icon aria-hidden="true" />
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;