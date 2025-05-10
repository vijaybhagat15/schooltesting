// src/components/Section3.tsx
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAppSelector } from '../../redux/hooks';

const Section3: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  const { website, loading, error } = useAppSelector((state) => state.website);

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (loading) return <p>Loading website data...</p>;
  if (!website) return <p>No website data found.</p>;

  const { numbers, emails } = website.modules.contact.data;
  const formatLabel = (label: string) =>
    label.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        ref={ref}
        className="my-10 px-4 md:px-16"
      >
        <h2 className="text-2xl font-bold text-center text-primary pb-5">
          How Can We Assist You?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Phone Numbers Card */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md border-[1px] border-primary">
            <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
              <FaPhoneAlt className="text-green-400" /> Call Us On
            </h3>
            {Object.entries(numbers).map(([type, nums]) => (
              <p key={type} className="mt-2">
                {formatLabel(type)}{' '}
                <span className="text-yellow-600">
                  {nums.join(', ')}
                </span>
              </p>
            ))}
          </div>

          {/* Email Addresses Card */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md border-[1px] border-primary">
            <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
              <FaEnvelope className="text-yellow-500" /> Email Us On
            </h3>
            {Object.entries(emails).map(([type, ems]) => (
              <p key={type} className="mt-2">
                {formatLabel(type)}{' '}
                <span className="text-blue-600">
                  {ems.join(', ')}
                </span>
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Section3;
