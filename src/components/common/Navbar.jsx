import { Link } from "react-scroll";
import headerIcon from "../../assets/header-icon.png";
import { socialIcons } from "../../data/socialLinks";

const Navbar = ({ title }) => {
  const path = [
    { href: "home", label: "Home" },
    { href: "about", label: "About" },
    { href: "experience", label: "Experience" },
    { href: "certificates", label: "Certificates" }, 
    { href: "clients", label: "Clients" },
    { href: "skills", label: "Skills" },
    { href: "contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 bg-[rgb(10,25,47)]/80 text-white z-50 backdrop-blur-lg md:py-4">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <a className="font-bold hidden md:block text-white text-lg hover:text-gray-200" href="/">
          {title}
        </a>
        <a className="font-bold md:hidden block text-white" href="/">
          <img src={headerIcon} alt="Sandeep Singh" className="w-8" />
        </a>

        {/* Social Icons - Mobile Only */}
        <div className="flex gap-3 md:hidden">
          {socialIcons.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.title}
              aria-label={social.ariaLabel}
              className="pt-1 text-white text-xl hover:text-blue-400 transition-colors"
            >
              <i className={`${social.iconClass} text-white`}></i>
            </a>
          ))}
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-6">
          {path.map(({ href, label }) => (
            <li key={href}>
              <Link
                to={href}
                spy={true}
                smooth={true}
                duration={500}
                offset={-100}
                activeClass="active-link"
                className="cursor-pointer text-white hover:text-blue-400 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
