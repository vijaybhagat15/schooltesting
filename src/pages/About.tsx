import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchStyleData } from "../redux/slices/styleSlice";
import { useAppSelector } from '../redux/hooks';

const About = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { website, loading, error } = useAppSelector((state) => state.website);
  
  useEffect(() => {
    dispatch(fetchStyleData());
  }, [dispatch]);
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  // const { styles, loading: styleLoading, error: styleError } = useSelector((state: RootState) => state.style);

  // if (styleLoading || loading)
  //   return <p className="text-center text-gray-500">Loading...</p>;
  // if (styleError)
  //   return <p className="text-center text-red-500">Style Error: {styleError}</p>;
  if (error)
    return <p className="text-center text-red-500">About Error: {error}</p>;
  if (loading) return <p>Loading website data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!website) return <p>No website data found.</p>;

  return (
    // <div className={`border-y-2 border-white ${styles["text-secondary"]}`}>
    <div className={`border-y-2 border-white text-secondary`}>
      <div className="container mx-auto px-6 py-16 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* <h2 className={`${styles["text-primary"]}`}>Our Journey</h2> */}
            <h2 className={`text-primary`}>Our Journey</h2>
            {/* <p className={`mt-6 text-center md:text-left ${styles["text-secondary"]} leading-relaxed`}> */}
            <p className={`mt-6 text-center md:text-left text-secondary leading-relaxed`}>
              {website.modules.about.data.Your_mission || "Loading..."}
            </p>
          </motion.div>

          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center bg-teal-500 rounded-3xl p-[1px]"
          >
            <img
              src={website.modules.about.data.mission_img || "Loading..."}
              alt="Our Campus"
              className="rounded-3xl shadow-lg"
            />
          </motion.div>
        </div>

        {/* Mission Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          {/* <h2 className={`${styles["text-primary"]}`}>Our Mission</h2> */}
          <h2 className={`text-primary`}>Our Mission</h2>
          {/* <p className={`mt-6 ${styles["text-secondary"]} leading-relaxed max-w-3xl mx-auto`}> */}
          <p className={`mt-6 text-secondary leading-relaxed max-w-3xl mx-auto`}>
            {website.modules.about.data.journey|| "Loading..."}
          </p>
        </motion.div>

        {/* Faculty Section */}
        <div className="mt-16">
          <div className="container mx-auto text-center">
            {/* <h2 className={`${styles["text-primary"]} mb-8`}>Meet Our Faculty</h2> */}
            <h2 className={`text-primary mb-8`}>Meet Our Faculty</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <div>
              <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 rounded-lg shadow-lg border-2 border-transparent hover:scale-105 transition-transform"
                  >
                    <img
                      src={website.modules.about.data.Principal_img}
                      alt={website.modules.about.data.Principal}
                      className="w-full h-64 object-cover rounded-md mb-4 border-2 border-teal-500"
                    />
                    {/* <h3 className={`mb-2 ${styles["text-primary"]}`}> */}
                    <h3 className={`mb-2 text-primary`}>
                    {website.modules.about.data.Principal}                    </h3>
                    {/* <p className={`font-sans ${styles["text-secondary"]}`}> */}
                    <p className={`font-sans text-secondary`}>
                    Principal
                    </p>
                  </motion.div>
              </div>
              <div>
              <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 rounded-lg shadow-lg border-2 border-transparent hover:scale-105 transition-transform"
                  >
                    <img
                      src={website.modules.about.data.HOD_img}
                      className="w-full h-64 object-cover rounded-md mb-4 border-2 border-teal-500"
                    />
                    {/* <h3 className={`mb-2 ${styles["text-primary"]}`}> */}
                    <h3 className={`mb-2 text-primary`}>
                    {website.modules.about.data.HOD}
                    </h3>
                    {/* <p className={`font-sans ${styles["text-secondary"]}`}> */}
                    <p className={`font-sans text-secondary`}>
                     HOD
                    </p>
                  </motion.div>
              </div>
              <div>
              <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 rounded-lg shadow-lg border-2 border-transparent hover:scale-105 transition-transform"
                  >
                    <img
                      src={website.modules.about.data.President_img}
                      alt={website.modules.about.data.President}
                      className="w-full h-64 object-cover rounded-md mb-4 border-2 border-teal-500"
                    />
                    {/* <h3 className={`mb-2 ${styles["text-primary"]}`}> */}
                    <h3 className={`mb-2 text-primary`}>
                    {website.modules.about.data.President}                    </h3>
                    {/* <p className={`font-sans ${styles["text-secondary"]}`}> */}
                    <p className={`font-sans text-secondary`}>
                    President
                    </p>
                  </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
