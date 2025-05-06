import { motion } from "framer-motion";
import { GraduationCap, University, School, Users } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSection3Data } from "../../redux/slices/section3Slice";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchStyleData } from "../../redux/slices/styleSlice";

const Section3 = () => {
  const { ref, inView: isInView } = useInView({ triggerOnce: false, threshold: 0.2 });
  const dispatch = useDispatch<AppDispatch>();

  const { section3data, loading, error } = useSelector(
    (state: RootState) => state.section3
  );

  useEffect(() => {
    dispatch(fetchSection3Data());
    dispatch(fetchStyleData());
  }, [dispatch]);
  const { styles, loading: styleLoading, error: styleError } = useSelector((state: RootState) => state.style);

  if (loading) return <p>Loading section 3...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (styleLoading)
    return <p className="text-center text-gray-500">Style Loading...</p>;
  if (styleError)
    return <p className="text-center text-red-500">Style Error: {styleError}</p>;
  
  return (
    <section
      ref={ref}
      className={`relative py-6 px-6 bg-cover bg-center text-center ${styles["text-secondary"]} ${styles["border-primary"]}`}
      style={{ backgroundImage: "url('/images/background.svg')" }}
    >
      <h2 className={`font-bold ${styles["text-primary"]}`}>Our Impact</h2>

      <div className="flex flex-wrap justify-center gap-8 mt-8">
        <motion.div
          className="flex flex-col items-center w-64"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <div className="w-20 h-20 bg-teal-700 rounded-full flex items-center justify-center">
            <GraduationCap size={40} className="text-white" />
          </div>
          <h3 className="font-bold mt-4">{section3data?.GraduationCap.value}</h3>
          <p className="text-sm mt-2">{section3data?.GraduationCap.text}</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center w-64"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
            <University size={40} className="text-white" />
          </div>
          <h3 className="font-bold mt-4">{section3data?.University.value}</h3>
          <p className="text-sm mt-2">{section3data?.University.text}</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center w-64"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="w-20 h-20 bg-teal-700 rounded-full flex items-center justify-center">
            <School size={40} className="text-white" />
          </div>
          <h3 className="font-bold mt-4">{section3data?.School.value}</h3>
          <p className="text-sm mt-2">{section3data?.School.text}</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center w-64"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
            <Users size={40} className="text-white" />
          </div>
          <h3 className="font-bold mt-4">{section3data?.Users.value}</h3>
          <p className="text-sm mt-2">{section3data?.Users.text}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Section3;
