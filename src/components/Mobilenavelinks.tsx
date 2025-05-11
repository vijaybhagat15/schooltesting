import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface NavItem {
  title: string;
  link: string;
}

interface MobileNavLinksProps {
  setMenuOpen: (open: boolean) => void;
  navigation: NavItem[];
}

const MobilenavLinks: React.FC<MobileNavLinksProps> = ({ setMenuOpen ,navigation }) => {
  const location = useLocation();

  // const { styles, loading: styleLoading, error: styleError } = useSelector((state: RootState) => state.style);
  // if (styleLoading)
  //   return <p className="text-center text-gray-500">Style Loading...</p>;
  // if (styleError)
  //   return <p className="text-center text-red-500">Style Error: {styleError}</p>;
  
  return (
<div className="z-50 relative">
      <motion.div
      initial={{ opacity: 0, y: -20 }} // Start invisible and slightly above
      animate={{ opacity: 1, y: 0 }} // Fade in and slide down
      exit={{ opacity: 0, y: -20 }} // Fade out when unmounting
      transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
      // className={`absolute left-0 w-full ${styles["bg-primary"]} shadow-lg rounded-b-xl flex flex-col items-center space-y-4 p-6 lg:hidden`}
      className={`absolute left-0 w-full shadow-lg bg-primary rounded-b-xl flex flex-col items-center space-y-4 p-6 lg:hidden`}
>
      {/* Navigation Links */}
      {navigation.map((item) => (
        <Link
          key={item.title}
          to={item.link}
          className={`flex justify-between items-center w-full px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-300 
            ${
            // location.pathname === item.path
            //   ? `${styles["text-primary"]} ${styles["bg-ternary"]}`
            //   : `${styles["text-secondary"]}`
              location.pathname === item.link
              ? `text-primary bg-ternary`
              : `text-secondary`
            
          }`}
          onClick={() => setMenuOpen(false)}
        >
          {item.title}
          <span className="text-blue-900 transition-transform duration-300 group-hover:translate-x-1">
            &gt;
          </span>
        </Link>
      ))}

      {/* Social Media Icons */}
      <div className="flex space-x-6 mt-6">
        {navigation .map((social, index) => (
          <a
            key={index}
            href={social.link}
            className="text-blue-900 text-xl hover:text-blue-500 transition-transform duration-300 transform hover:scale-110"
          >
          </a>
        ))}
      </div>
    </motion.div>
</div>
  );
};

export default MobilenavLinks;
