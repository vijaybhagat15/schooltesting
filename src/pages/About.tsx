import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAppSelector } from '../redux/hooks';

const About = () => {
  const { website, loading, error } = useAppSelector((state) => state.website);
  


  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  if (error)
    return <p className="text-center text-red-500">About Error: {error}</p>;
  if (loading) return <p>Loading website data...</p>;
  if (!website) return <p>No website data found.</p>;

  const {sliders, faculties } = website.modules.about.data;

  return (
    <div ref={ref} className={`border-y-2 border-white text-secondary`}>
      <div className="container mx-auto px-6 py-16 font-sans">
        {/* Dynamically render each slider section in zig-zag */}
        {sliders.map((slide, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center mb-16`}
          >
            {/* Text Column */}
            <div className="md:w-1/2">
              <h2 className="text-primary">{slide.title}</h2>
              <p className="mt-6  md:text-left text-secondary leading-relaxed">
                {slide.description}
              </p>
            </div>

            {/* Image Column */}
            <div className="md:w-1/2 flex justify-center bg-teal-500 rounded-3xl p-[1px]">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="rounded-3xl shadow-lg object-cover h-64 w-full"
              />
            </div>
          </motion.div>
        ))}

        {/* Faculty Section */}
        <div className="mt-16">
          <div className="container mx-auto text-center">
            <h2 className="text-primary mb-8">Meet Our Faculty</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {faculties.map((f, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-white p-4 rounded-lg shadow-lg border-2 border-transparent hover:scale-105 transition-transform"
                >
                  <img
                    src={f.imageUrl}
                    alt={f.Facultyname}
                    className="w-full h-64 object-cover rounded-md mb-4 border-2 border-teal-500"
                  />
                  <h3 className="mb-2 text-primary">{f.Facultyname}</h3>
                  <p className="font-sans text-secondary">{f.Facultytype}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
