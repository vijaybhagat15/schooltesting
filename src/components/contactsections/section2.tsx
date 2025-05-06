// src/components/section2.tsx
import { useAppSelector } from '../../redux/hooks';
import React from "react";
import {  useSelector } from "react-redux";
import {  RootState } from "../../redux/store"; // Adjust path if needed

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

  const Section2: React.FC = () => {
    const { school} = useSelector((state: RootState) => state.school);

  const { website, loading, error } = useAppSelector((state) => state.website);
if (error)
    return <p className="text-center text-red-500">About Error: {error}</p>;
  if (loading) return <p>Loading website data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!website) return <p>No website data found.</p>;

  return (
    <section className="grid md:grid-cols-2 gap-6 px-3 md:px-10 py-5 max-w-screen-2xl mx-auto border-gray-300 border-b-2">
      <div className="h-80">
        <iframe
          src=
          {website.modules.contact.data.location}
          width="100%"
          height="100%"
          loading="lazy"
          className="rounded-md"
        ></iframe>
      </div>

      <div className="bg-primary p-6 rounded-lg shadow-md">
            {/* Contact Details */}
    <div className="space-y-1">
      <h3 className="text-xl font-semibold pb-1 underline">Contact Details</h3>
      <p className="text-base">{school?.email}</p>
      <p className="text-base">{school?.phone}</p>
      <p className="text-base">{school?.street}, {school?.location}, {school?.zipcode}</p>
      <p className="text-base">{school?.state}, {school?.country}</p>
    </div>

        <div className="mt-4 text-sm">
          <div className="mt-4">
            <div className="mt-2 flex space-x-4">
              <FaFacebook className="w-6 h-6 cursor-pointer hover:scale-110 text-blue-500 transition-transform" />
              <FaInstagram className="w-6 h-6 cursor-pointer hover:scale-110 text-pink-500 transition-transform" />
              <FaLinkedin className="w-6 h-6 cursor-pointer hover:scale-110 text-blue-600 transition-transform" />
              <FaTwitter className="w-6 h-6 cursor-pointer hover:scale-110 text-blue-400 transition-transform" />
              <FaYoutube className="w-6 h-6 cursor-pointer hover:scale-110 text-red-500 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
