import { FaSchool, FaUsers, FaFileAlt, FaDonate } from "react-icons/fa";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const sections = [
  { id: 1, icon: <FaSchool className="text-teal-500 w-12 h-12" />, title: "Visit", description: "Schedule a visit.", buttonText: "SCHEDULE" },
  { id: 2, icon: <FaUsers className="text-teal-500 w-12 h-12" />, title: "Learn More", description: "Discover our community.", buttonText: "LEARN MORE" },
  { id: 3, icon: <FaFileAlt className="text-teal-500 w-12 h-12" />, title: "How to Apply", description: "About the application process.", buttonText: "HOW TO APPLY" },
  { id: 4, icon: <FaDonate className="text-teal-500 w-12 h-12" />, title: "Giving", description: "Support our mission.", buttonText: "DONATE" },
];

const Section2 = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <section ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-10 pb-28 px-6 md:px-20 text-secondary border-gray-200 border-b-2">
      {sections.map((section, index) => (
        <motion.div
          key={section.id}
          className="relative flex flex-col items-center text-center px-6 bg-white  shadow-md transition-all duration-200 hover:bg-teal-100"
          onMouseEnter={() => setHovered(section.id)}
          onMouseLeave={() => setHovered(null)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          {section.icon}
          <h3 className="text-lg font-semibold">{section.title}</h3>

          {hovered === section.id && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full shadow-lg pb-1 bg-teal-100">
              <p className="px-2">{section.description}</p>
              <a
                href="#"
                className=" inline-block border border-teal-500 px-4 py-1 rounded-lg hover:bg-teal-500 hover:text-white transition-all"
              >
                {section.buttonText}
              </a>
            </div>
          )}
        </motion.div>
      ))}
    </section>
  );
};

export default Section2;
