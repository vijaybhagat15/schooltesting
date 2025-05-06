import { FaEnvelope, FaPhoneAlt} from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const Section3: React.FC = () => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

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
    <div className="bg-gray-100 p-6 rounded-lg shadow-md border-[1px] border-primary items-center">
      <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
        <FaPhoneAlt className="text-green-400" /> Call Us On
      </h3>
      <p>
        For Support <span className=" text-yellow-600">+91 023 123 3335</span> <br />
        For Sales <span className=" text-yellow-600">+91 023 123 3335</span> <br />
        For Finance <span className=" text-yellow-600">+91 023 123 3335</span>
      </p>
    </div>

    <div className="bg-gray-100 p-6 rounded-lg shadow-md border-[1px] border-primary">
      <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
        <FaEnvelope className="text-yellow-500" /> Email Us On 
      </h3>
      <p>
        For Support <span className=" text-blue-600">support@gmail.com</span> <br />
        For Sales <span className=" text-blue-600">sales@gmail.com</span> <br />
        For Finance <span className=" text-blue-600">finance@gmail.com</span>
      </p>
    </div>
  </div>
</motion.div>

    </div>
  );
};

export default Section3;
