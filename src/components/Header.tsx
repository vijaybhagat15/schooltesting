import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import MobilenavLinks from "./Mobilenavelinks";
import { useDispatch, useSelector } from 'react-redux';

import { fetchStyleData } from "../redux/slices/styleSlice";
import { fetchWebsite } from "../redux/slices/websiteSlice";
import { fetchHeader } from "../redux/slices/headerSlice";
import { fetchSchoolDetails } from "../redux/slices/schoolSlice";
import { fetchFooter  } from "../redux/slices/footerSlice";
import { fetchTheme } from '../redux/slices/style1Slice';
import { AppDispatch, RootState } from "../redux/store";
import { useAppSelector } from "../redux/hooks";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  // Pull state from the Redux store
  const { logo, name, navigation, loading: headerLoading, error: headerError } = useAppSelector(
    (state: RootState) => state.header
  );

  const { website, loading: websiteLoading, error: websiteError } = useAppSelector(
    (state: RootState) => state.website
  );

  const { styles, loading: styleLoading, error: styleError } = useAppSelector(
    (state: RootState) => state.style
  );
  const { data, loading, error } = useSelector((state: RootState) => state.style1);

  // Fetch website and style data on mount
  useEffect(() => {
    dispatch(fetchWebsite("680a1c0c53493f221d63304c"));
    dispatch(fetchStyleData());
  }, [dispatch]);

  // Once website data arrives, fetch header config
  useEffect(() => {
    if (website?.headerId) {
      dispatch(fetchHeader(website.headerId));
      // console.log(website?.headerId)
    }
  }, [dispatch, website?.headerId]);

  // Once website data arrives, fetch fetchTheme config
  useEffect(() => {
    if (website?.themeId) {
      dispatch(fetchTheme(website?.themeId));

      console.log(website?.themeId)
    }
  }, [dispatch,website?.themeId]);

  // Once website data arrives, fetch fetchSchoolDetails config
  useEffect(() => {
    if (website?.schoolId) {
      dispatch(fetchSchoolDetails(website.schoolId));
    }
  }, [dispatch, website?.schoolId]);

  // Once website data arrives, fetch fetchFooter config
  useEffect(() => {
    if (website?.footerId) {
      dispatch(fetchFooter(website.footerId));
      // console.log(website.footerId)
    }
  }, [dispatch, website?.footerId]);

  // Consolidate loading and error states
  const isLoading = websiteLoading || styleLoading || headerLoading;
  const errorMessage = websiteError || styleError || headerError;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <>
      <header
        style={{
          backgroundColor: data?.headerBackgroundColor || "#ffffff",
          color: data?.textColor || "#000000",
        }}
        className={`flex items-center justify-between px-4 md:px-6 shadow-md w-full sticky top-0 z-10 h-16 md:h-20`}
      >
        {/* Logo and Name */}
        <Link to="/" className="flex items-center space-x-2">
          {isLoading ? (
            <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
          ) : (
            <img
            // src="https://school2-omega.vercel.app/logo.png"
              src={logo?.url || "/placeholder-logo.png"}
              alt={logo?.altText || "Logo"}
              className="h-10 md:h-14"
            />
          )}
          <span
            className={`font-bold text-base sm:text-2xl sm:${
              styles?.["text-primary"] || "text-gray-800"
            }`}
          >
            {isLoading ? (
              <span className="inline-block h-6 w-24 bg-gray-200 animate-pulse rounded" />
            ) : (
              name
            )}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={`hidden lg:flex items-center space-x-6 font-semibold pr-10 ${
            styles?.["text-secondary"] || "text-gray-700"
          }`}
        >
          {isLoading
            ? // Show placeholder links when loading
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-4 w-16 bg-gray-200 animate-pulse rounded"
                />
              ))
            : // Render navigation items
              navigation.map((item) => (
                <Link
                  key={item.title}
                  to={item.link}
                  className={`hover:scale-110 transition ${
                    location.pathname === item.link ? "underline" : ""
                  }`}
                >
                  {item.title}
                </Link>
              ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden focus:outline-none ${
            styles?.["text-secondary"] || "text-gray-700"
          }`}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Error Banner */}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 text-center py-2">
          <p>Error loading header: {errorMessage}</p>
        </div>
      )}

      {/* Mobile Menu Links */}
      {menuOpen && !isLoading && !errorMessage && (
        <div
          className={`absolute top-16 left-0 w-full ${
            styles?.["bg-primary"] || "bg-white"
          } shadow-lg lg:hidden`}
        >
          <MobilenavLinks setMenuOpen={setMenuOpen} />
        </div>
      )}
    </>
  );
};

export default Header;
