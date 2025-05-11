import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchSection4Data } from "../../redux/slices/section4Slice";
import { AppDispatch, RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";

const Section4 = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const dispatch = useDispatch<AppDispatch>();

  const { logo } = useAppSelector((state: RootState) => state.header);

  useEffect(() => {
    dispatch(fetchSection4Data());
  }, [dispatch]);

  const { website } = useSelector((state: RootState) => state.website);
  const gallary = website?.modules?.gallery?.data;
  const sliders = gallary?.sliders || [];


  return (
    <section
      // className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 ${styles["border-primary"]}`}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 border-primary`} ref={ref}>
      {/* Left Column */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
        transition={{ duration: 0.8 }}
        className="text-center md:text-left"
      >
        <div className="flex justify-center lg:justify-start mb-4">
          <img
            src={logo?.url || `logo`}
            alt="Logo"
            className="w-36"
          />
        </div>
        <div className="justify-center">
          <h2
            // className={`text-2xl mb-4 ${styles["text-primary"]} w-64 mx-auto lg:mx-0`}
            className={`text-2xl mb-4 text-primary w-64 mx-auto lg:mx-0`}
          >
            {gallary?.gallery_title}
          </h2>
          {/* <h1>{gallary?.gallery_layout}</h1> */}
          {/* <p className={`${styles["text-secondary"]} mb-6`}> */}
            <p className={`text-secondary mb-6`}>

            {gallary?.gallery_description}
          </p>
          <div className="items-center justify-center flex">
            <button
              // className={`${styles["border-secondary"]} ${styles["bg-button"]} px-4 py-2 rounded transition w-36 mx-auto`}
              className={`border-secondary bg-button px-4 py-2 rounded transition w-36 mx-auto`}
            >
              LEARN MORE
            </button>
          </div>
        </div>
      </motion.div>

<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
  transition={{ duration: 0.8 }}
  className="grid grid-cols-2 gap-6"
>
  {sliders.map((slide, index) => (
    <div
      key={index}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-500 bg-white"
    >
      <div className="overflow-hidden">
        <img
          src={slide.imageUrl}
          alt={slide.Alt_text || `Gallery image ${index + 1}`}
          className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded text-xs text-center text-gray-800 group-hover:bg-white/90 transition-all duration-300">
        {slide.description}
      </div>
    </div>
  ))}
</motion.div>

    </section>
  );
};

export default Section4;
