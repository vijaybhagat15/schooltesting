import React, { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useAppSelector } from "../redux/hooks";

// Helper to convert platform string to Icon component name
const getIconComponent = (platform: string) => {
  // Normalize: remove spaces, hyphens, etc.
  const key = platform.replace(/[^a-zA-Z]/g, "").toLowerCase();
  // Capitalize first letter
  const pascal = key.charAt(0).toUpperCase() + key.slice(1);
  const iconName = `Fa${pascal}`;
  // @ts-ignore
  return FaIcons[iconName] || FaIcons.FaQuestionCircle;
};

// Define hover color mapping (fallback if not matched)
const hoverColorMap: Record<string, string> = {
  facebook: "hover:text-blue-600",
  instagram: "hover:text-pink-500",
  linkedin: "hover:text-blue-800",
  twitter: "hover:text-blue-400",
  youtube: "hover:text-red-600",
  vimeo: "hover:text-blue-500",
};

const Footer: React.FC = () => {
  const { footer } = useAppSelector((state) => state.footer);
  const { school } = useSelector((state: RootState) => state.school);
  const { logo, name, navigation } = useAppSelector(
    (state) => state.header
  );


  return (
    <footer className="bg-footer text-white py-5 px-6 md:px-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Academy Info */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <img
              src={footer?.logo || logo?.url || "/placeholder-logo.png"}
              alt="Footer Logo"
              className="h-32 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold">{footer?.name || name}</h2>
        </div>

        {/* Contact Details */}
        <div className="space-y-1">
          <h3 className="text-xl font-semibold pb-1 underline">
            Contact Details
          </h3>
          <p className="text-base">{school?.email}</p>
          <p className="text-base">{school?.phone}</p>
          <p className="text-base">
            {school?.street}, {school?.location}, {school?.zipcode}
          </p>
          <p className="text-base">
            {school?.state}, {school?.country}
          </p>
          <p className="text-base">{footer?.openingHours}</p>
        </div>

        {/* Navigations */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold underline pb-1">
            Navigations
          </h3>
          <ul className="space-y-2 text-blue-400 text-base">
            {navigation.map((item) => (
              <li key={item.title}>
                <a href={item.link} className="hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold underline pb-1">
            ACCREDITATION & MEMBERSHIPS
          </h3>
          <h3 className="mt-6 text-lg font-semibold">Like. Follow. Friend.</h3>
          <div className="flex space-x-4">
            {footer?.socialLinks?.map(({ platform, url, _id }) => {
              const key = platform.toLowerCase().replace(/[^a-z]/g, "");
              const Icon = getIconComponent(platform);
              const hoverClass =
                hoverColorMap[key] || "hover:text-gray-400";

              return (
                <a
                  key={_id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    `cursor-pointer text-2xl transition-transform transform hover:scale-110 ${hoverClass}`
                  }
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-64 sm:w-96 mx-auto text-center space-y-1 mt-2">
        <p className="text-base text-gray-400">
          <a
            href="/privacy-policy"
            className="underline hover:text-white"
          >
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
