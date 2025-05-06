import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  // FaTwitter,
  // FaYoutube,
  // FaVimeoV,
} from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store"; // Adjust path if needed
import { fetchStyleData } from "../redux/slices/styleSlice";
import { useAppSelector } from "../redux/hooks";

const iconMap = {
  "face book": <FaFacebook />,
  "insta": <FaInstagram />,
  "libkdin": <FaLinkedin />
};

const hoverColorMap = {
  "face book": "hover:text-blue-600",
  "insta": "hover:text-pink-500",
  "libkdin": "hover:text-blue-800"
};

const Footer = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Extracting footer state from Redux
  const { footer} = useSelector((state: RootState) => state.footer);
  const { school} = useSelector((state: RootState) => state.school);
  const { logo, name, navigation} = useAppSelector((state: RootState) => state.header);
  useEffect(() => {
    dispatch(fetchStyleData());
  }, [dispatch]);
  // const { styles, loading: styleLoading, error: styleError } = useSelector((state: RootState) => state.style);
  // if (styleLoading)
  //   return <p className="text-center text-gray-500">Style Loading...</p>;
  // if (styleError)
  //   return <p className="text-center text-red-500">Style Error: {styleError}</p>;
  
  return (
    // <footer className={`${styles["bg-footer"]} text-white py-5 px-6 md:px-5`}>
          <footer className={`bg-footer text-white py-5 px-6 md:px-5`}>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    
    {/* Logo and Academy Info */}
    <div className="text-center space-y-2">
      <div className="flex justify-center">
        <img 
          //  src='https://school2-omega.vercel.app/logo.png'

          src={logo?.url || "/placeholder-logo.png"}
          alt="Footer Logo"
          className="h-32 object-contain"
        />
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
    </div>

    {/* Contact Details */}
    <div className="space-y-1">
      <h3 className="text-xl font-semibold pb-1 underline">Contact Details</h3>
      <p className="text-base">{school?.email}</p>
      <p className="text-base">{school?.phone}</p>
      <p className="text-base">{school?.street}, {school?.location}, {school?.zipcode}</p>
      <p className="text-base">{school?.state}, {school?.country}</p>
      <p className="text-base">{footer?.openingHours}</p>
    </div>

    {/* Navigations */}
    <div className="space-y-2">
      <h3 className="text-xl font-semibold underline pb-1">Navigations</h3>
      <ul className="space-y-2 text-blue-400 text-base">
        {navigation.map((item) => (
          <li key={item?.title}>
            <a href={item.link} className="hover:underline">{item.title}</a>
          </li>
        ))}
      </ul>
    </div>

    {/* Social Media */}
    <div className="space-y-2">
      <h3 className="text-xl font-semibold underline pb-1">ACCREDITATION & MEMBERSHIPS</h3>

      <h3 className="mt-6 text-lg font-semibold">Like. Follow. Friend.</h3>
      <div className="flex space-x-4">
        {footer?.socialLinks.map(({ platform, url }, idx) => (
          <a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`cursor-pointer text-2xl transition-transform transform hover:scale-110 ${hoverColorMap[platform]}`}
          >
            {iconMap[platform]}
          </a>
        ))}
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="w-64 sm:w-96 mx-auto text-center space-y-1 mt-2">
    {/* <p className="text-base text-gray-300">{footer?.description}</p> */}
    <p className="text-base text-gray-400">
      <a href="/privacy-policy" className="underline hover:text-white">
        {footer?.Privacy_Policy}
      </a>
    </p>
    <p className="text-base text-gray-500">
      {footer?.copyright}
    </p>
  </div>
</footer>

  );
};

export default Footer;
