import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcademicsData } from "../redux/slices/academicsSlice";
import { AppDispatch, RootState } from "../redux/store";
import { fetchStyleData } from "../redux/slices/styleSlice";

const Academics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { academicsData, loading, error } = useSelector((state: RootState) => state.academics);

  useEffect(() => {
    dispatch(fetchAcademicsData());
    dispatch(fetchStyleData());
  }, [dispatch]);
  const { styles, loading: styleLoading, error: styleError } = useSelector((state: RootState) => state.style);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!academicsData) return null;
  if (styleLoading)
    return <p className="text-center text-gray-500">Style Loading...</p>;
  if (styleError)
    return <p className="text-center text-red-500">Style Error: {styleError}</p>;
  
  return (
    <section className="w-full text-center pb-20">
      {/* Header Section */}
      <div className="relative w-full h-[200px]">
        <img
          src={academicsData.headerImage.src}
          alt={academicsData.headerImage.alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="py-12 px-6 max-w-4xl mx-auto text-center">
        <div className={`${styles["bg-secondary"]} p-4 rounded-md shadow-md`}>
          <p className={`${styles["text-secondayr"]} font-semibold`}>{academicsData.introText}</p>
        </div>
      </div>

      {/* Program Levels */}
      <div className="max-w-4xl mx-auto py-12">
        <h2 className={` font-bold ${styles["text-primary"]} mb-6`}>Explore Our Programs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {academicsData.programLevels.map((level) => (
            <button
              key={level}
              className={`bg-gray-300 px-6 py-2 rounded-md ${styles["text-primary"]} font-bold hover:bg-gray-400 transition`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      {/* Description Sections */}
      <div className="max-w-3xl mx-auto px-6 space-y-12 text-left">
        {academicsData.sections.map((section, index) => (
          <div key={index}>
            <h2 className={`text-2xl font-bold ${styles["text-primary"]}`}>{section.title}</h2>
            <p className={`${styles["text-secondary"]} mt-3`}>{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Academics;
