import { socialIcons } from "../../data/socialLinks";

const Contact = ({ title }) => {
  return (
    <section
      id="contact"
      className="py-20 px-6 backdrop-blur-sm"
    >
      <div className="max-w-3xl md:max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-3">
          {title || "Contact"}
        </h2>
        <div className="w-40 bg-white h-1 mx-auto mb-10"></div>

        <p className="text-gray-300 mb-12">
          I'm available for collaboration, interpretation, or consulting. Choose a method below to get in touch!
        </p>

        {/* Contact Buttons */}
        <div className="flex flex-col w-[80%] mx-auto md:w-full md:flex-row justify-center gap-6 mb-16">
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
                className={`inline-block ${
                  social.title === "WhatsApp"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white font-semibold px-6 py-3 rounded-full transition text-lg`}
              >
                <i className={`${social.iconClass} mr-2`}></i>
                <span>{social.title === "WhatsApp" && "Chat on WhatsApp"}</span>
                <span>{social.title === "Mail" && "Send an Email"}</span>
              </a>
            ))}
        </div>

        {/* Social Icons */}
        <div className="mt-12">
          <h3 className="text-xl text-white mb-4">Connect with me</h3>
          <div className="flex justify-center gap-6 md:gap-8">
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
                  className="text-gray-300 text-3xl md:text-4xl hover:scale-105 hover:text-blue-400 transition duration-300"
                >
                  <i className={social.iconClass}></i>
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
