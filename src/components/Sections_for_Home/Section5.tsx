import { motion,} from "framer-motion";
import { useInView, } from "react-intersection-observer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSection5Data } from "../../redux/slices/section5Slice";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchStyleData } from "../../redux/slices/styleSlice";

const Section5 = () => {
  const { ref, inView: isInView } = useInView({ triggerOnce: false, threshold: 0.2 });
  const dispatch = useDispatch<AppDispatch>();

  const { values, loading, error } = useSelector(
    (state: RootState) => state.section5
  );

  useEffect(() => {
    dispatch(fetchSection5Data());
    dispatch(fetchStyleData());
  }, [dispatch]);
  const { styles, loading: styleLoading, error: styleError } = useSelector((state: RootState) => state.style);

  if (loading) return <p>Loading values...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (styleLoading)
    return <p className="text-center text-gray-500">Style Loading...</p>;
  if (styleError)
    return <p className="text-center text-red-500">Style Error: {styleError}</p>;
  
  return (
    <section ref={ref} className={`relative py-6 ${styles["text-secondary"]} ${styles["border-primary"]}`}>
      {/* Background SVG */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: "url('/path-to-svg.svg')" }}
      ></div>

      <div className="relative text-center">
        <motion.h2
          className={`text-3xl font-bold ${styles["text-primary"]}`}
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Values
        </motion.h2>

        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className={`w-64 p-6 text-center shadow-lg rounded-xl ${styles["bg-secondary"]}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`mx-auto w-16 h-16 flex items-center justify-center text-3xl rounded-full ${value.bgColor}`}
              >
                {value.icon}
              </div>
              <h3 className={`mt-4 text-xl font-semibold ${styles["text-primary"]}`}>
                {value.title}
              </h3>
              <p className="mt-2">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section5;