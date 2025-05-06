import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchSection4Data } from "../../redux/slices/section4Slice";
import { fetchStyleData } from "../../redux/slices/styleSlice";

import { AppDispatch, RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";

const Section4 = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const dispatch = useDispatch<AppDispatch>();

  const { sections, loading, error } = useSelector((state: RootState) => state.section4);
  const { logo, name} = useAppSelector((state: RootState) => state.header);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchSection4Data());
    dispatch(fetchStyleData());
  }, [dispatch]);
  const { styles, loading: styleLoading, error: styleError } = useSelector((state: RootState) => state.style);

  // Handle loading state
  if (loading) {
    return <div className="text-center py-10">Loading section...</div>;
  }
  // Handle error state
  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }
  if (styleLoading)
    return <p className="text-center text-gray-500">Style Loading...</p>;
  if (styleError)
    return <p className="text-center text-red-500">Style Error: {styleError}</p>;
  
  return (
    <section className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 ${styles["border-primary"]}`}  ref={ref}>
      {/* Left Column */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
        transition={{ duration: 0.8 }}
        className="text-center md:text-left"
      >
        <div className="flex justify-center lg:justify-start mb-4">
          <img src={logo?.url|| `logo`} alt="10 Years Celebration" className="w-36" />
        </div>
        <div className="justify-center">
          <h2 className={`text-2xl mb-4 ${styles["text-primary"]} w-64 mx-auto lg:mx-0`} >At {name}</h2>
          <p className={`${styles["text-secondary"]} mb-6`}>
            {sections?.p1} {/* Ensure data exists before accessing */}
          </p>
          <div className="items-center justify-center flex">
            <button className={`${styles["border-secondary"]} ${styles["bg-button"]} px-4 py-2 rounded transition w-36 mx-auto`}>
              LEARN MORE
            </button>
          </div>
        </div>
      </motion.div>

      {/* Right Column - Image Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
        transition={{ duration: 0.8 }}
        className="lg:grid lg:grid-rows-2 lg:grid-cols-2 gap-1 hidden"
      >
        {sections && (
          <>
            <div className="col-span-2 h-48">
              <img src={sections.img1} alt="Video Thumbnail" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="h-48">
              <img src={sections.img2} alt="Kids Playing" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="h-48">
              <img src={sections.img3} alt="Girl Learning" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="col-span-2 h-64">
              <img src={sections.img4} alt="STEM Activity" className="w-full h-full object-cover rounded-lg" />
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default Section4;
