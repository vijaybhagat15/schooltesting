import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import MobilenavLinks from "./Mobilenavelinks";
import { useDispatch, useSelector } from 'react-redux';
import { fetchWebsite } from "../redux/slices/websiteSlice";
import { fetchHeader } from "../redux/slices/headerSlice";
import { fetchSchoolDetails } from "../redux/slices/schoolSlice";
import { fetchFooter  } from "../redux/slices/footerSlice";
import { fetchTheme } from '../redux/slices/style1Slice';
import { AppDispatch, RootState } from "../redux/store";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  // Pull state from the Redux store
  const { logo, name, navigation, loading: headerLoading, error: headerError } = useSelector(
    (state: RootState) => state.header
  );

  const { website, loading: websiteLoading, error: websiteError } = useSelector(
    (state: RootState) => state.website
  );

  // Use style1 slice (theme) for styling
  const { data: theme, loading: themeLoading, error: themeError } = useSelector(
    (state: RootState) => state.style1
  );

  // Fetch website and theme data on mount
  useEffect(() => {
    dispatch(fetchWebsite("school.com"));
  }, [dispatch]);

  // Once website data arrives, fetch related configs
  useEffect(() => {
    if (website?.headerId) {
      dispatch(fetchHeader(website.headerId));
    }
    if (website?.themeId) {
      dispatch(fetchTheme(website.themeId));
    }
    if (website?.schoolId) {
      dispatch(fetchSchoolDetails(website.schoolId));
    }
    if (website?.footerId) {
      dispatch(fetchFooter(website.footerId));
    }
  }, [dispatch, website]);

  // Consolidate loading and error states
  const isLoading = websiteLoading || themeLoading || headerLoading;
  const errorMessage = websiteError || themeError || headerError;

  if (themeLoading) return <p>Loading theme...</p>;
  if (themeError) return <p>Error loading theme: {themeError}</p>;
  if (!theme) return null;

  return (
    <>
      <header
        style={{
          backgroundColor: theme.headerBackgroundColor || "#ffffff",
          color: theme.primary_text_Color || "#000000",
        }}
        className="flex items-center justify-between px-4 md:px-6 shadow-md w-full sticky top-0 z-10 h-16 md:h-20"
      >
        {/* Logo and Name */}
        <Link to="/" className="flex items-center space-x-2">
          {isLoading ? (
            <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
          ) : (
            <img
              src={logo?.url || "/placeholder-logo.png"}
              alt={logo?.altText || "Logo"}
              className="h-10 md:h-14"
            />
          )}
          <span className={`font-bold text-base sm:text-2xl`}> 
            {isLoading ? (
              <span className="inline-block h-6 w-24 bg-gray-200 animate-pulse rounded" />
            ) : (
              name
            )}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 font-semibold pr-10">
          {isLoading
            ? [1, 2, 3].map((i) => (
                <div key={i} className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
              ))
            : navigation.map((item) => (
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
          className="lg:hidden"
          style={{ color: theme.primary_text_Color || "#000000" }}
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
          className="absolute top-16 left-0 w-full shadow-lg lg:hidden"
          style={{ backgroundColor: theme.primary_text_Color || "#ffffff" }}
        >
          <MobilenavLinks setMenuOpen={setMenuOpen} navigation={navigation}/>
        </div>
      )}
    </>
  );
};

export default Header;
