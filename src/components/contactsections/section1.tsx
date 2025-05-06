import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {  useAppSelector } from '../../redux/hooks';

const Section1: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  const { website, loading, error } = useAppSelector((state) => state.website);
  if (error)
    return <p className="text-center text-red-500">About Error: {error}</p>;
  if (loading) return <p>Loading website data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!website) return <p>No website data found.</p>;


  return (
    <div className="relative h-[400px] w-full max-w-screen-2xl mx-auto border-gray-300 border-b-2" ref={ref}>
      <img
        src={website.modules.contact.data.contact_bg}
        className="w-full h-full object-cover"
        alt="Contact Background"
      />
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col items-start justify-center pl-5 sm:pl-20"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary">{website.modules.contact.data.contact_titel}</h1>
        <p className="text-secondary text-lg mt-2 max-w-xl">
        {website.modules.contact.data.description}
        </p>
      </motion.div>
    </div>
  );
};

export default Section1;
