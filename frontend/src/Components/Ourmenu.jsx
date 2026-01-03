import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../reduxToolkit/cartSlice";
import axios from "axios";

// Enhanced LazyImage Component with better loading and error handling
const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const currentImgRef = imgRef.current;
    if (!currentImgRef || !src) return;

    let observer;
    let img;

    const loadImage = () => {
      img = new Image();
      img.src = src;
      
      img.onload = () => {
        if (imgRef.current) {
          setIsLoaded(true);
          setHasError(false);
        }
      };
      
      img.onerror = () => {
        if (imgRef.current) {
          setHasError(true);
          setIsLoaded(false);
        }
      };
    };

    // Use IntersectionObserver if available
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage();
            if (observer && currentImgRef) {
              observer.unobserve(currentImgRef);
            }
          }
        });
      }, { 
        threshold: 0.01,
        rootMargin: '200px' // Start loading slightly before in viewport
      });

      observer.observe(currentImgRef);
    } else {
      // Fallback for older browsers
      loadImage();
    }

    return () => {
      if (observer && currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {/* Loading Spinner */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4B8E10]"></div>
        </div>
      )}
      
      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500 mt-2">Image not available</p>
          </div>
        </div>
      )}
      
      {/* Actual Image */}
      <img
        ref={imgRef}
        src={isLoaded && !hasError ? src : undefined}
        alt={alt}
        className={`${className} ${
          isLoaded && !hasError 
            ? 'opacity-100 transition-opacity duration-300' 
            : 'opacity-0'
        }`}
        onError={() => {
          setHasError(true);
          setIsLoaded(false);
        }}
      />
    </div>
  );
};

function OurMenu() {
  // Animation initialization
  useEffect(() => {
    AOS.init({ 
      duration: 500, 
      once: true, 
      easing: "ease-in-out",
      offset: 120 
    });
  }, []);

  const dispatch = useDispatch();
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Enhanced URL transformation function
  const transformImageUrl = (url) => {
    if (!url) return '/default-image.jpg';
    
    // Handle cases where URL might already be in production format
    if (url.startsWith('/uploads')) {
      return url;
    }
    
    // Handle local development URLs
    if (url.startsWith('http://localhost')) {
      return url.replace('http://localhost:5000/uploads');
    }
    
    // Handle relative paths or other cases
    return url.startsWith('/uploads') 
      ? `${url}`
      : url;
  };

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          "/api/admin/menu-items", 
          {
            withCredentials: true,
            timeout: 5000
          }
        );

        if (Array.isArray(response.data)) {
          const transformedData = response.data.map(item => ({
            ...item,
            img: (item.img)
          }));
          setMenuData(transformedData);
        } else {
          throw new Error("Unexpected data format from API");
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError(error.response?.data?.message || error.message || "Failed to load menu items");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Get unique categories
  const getUniqueCategories = () => {
    const categories = menuData.map(item => item.category);
    return ['All', ...new Set(categories)];
  };

  // Add to Cart Function
  const handleAddToCart = (item) => {
    try {
      const cartItem = {
        id: item._id || item.id,
        title: item.title,
        price: item.price,
        img: item.img,
        quantity: 1,
      };

      dispatch(addToCart(cartItem));
      toast.success(`${item.title} added to cart! 🍽️`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { marginTop: '20px' }
      });
    } catch (error) {
      toast.error("Failed to add item to cart", {
        position: "top-right",
        style: { marginTop: '150px' }
      });
      console.error("Add to cart error:", error);
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="rounded-lg p-4 shadow-md bg-gray-100 animate-pulse">
          <div className="bg-gray-300 h-48 w-full rounded-md"></div>
          <div className="mt-4 space-y-2">
            <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
            <div className="bg-gray-300 h-4 w-full rounded"></div>
            <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Filtered menu items
  const filteredItems = menuData.filter(item => 
    (activeCategory === 'All' || item.category === activeCategory) &&
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log({filteredItems
  })

  return (
    <div className="bg-black min-h-screen py-10">
      {/* ToastContainer with top margin */}
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: '150px' }}
        toastStyle={{ marginTop: '150px' }}
      />
      
      <div className="bg-black p-4 md:p-8 mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="text-center my-12 md:my-20">
          <hr className="w-10 border-none h-1 bg-[#4B8E10] mx-auto mb-3" />
          <p className="font-semibold text-white text-lg mb-2">OUR MENU</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold">
            DELICIOUS DISHES
          </h2>
        </div>

        {/* Search and Filter */}
        <div className="mx-auto mb-8 max-w-md px-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search dishes..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4B8E10]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute right-3 top-3 text-gray-400"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {getUniqueCategories().map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-[#4B8E10] text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 text-xl mb-4">⚠️ {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#4B8E10] text-white px-6 py-2 rounded-md hover:bg-[#3a7a0a] transition"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
                  data-aos="fade-up"
                >
                  <div className="relative h-48 overflow-hidden">
                    <LazyImage
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <span className="text-lg font-semibold text-[#4B8E10]">
                        £{item.price.toFixed(2)} {/* Changed from $ to £ */}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <button
                      className="w-full bg-[#4B8E10] text-white py-2 px-4 rounded-md hover:bg-[#3a7a0a] transition flex items-center justify-center gap-2"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-white text-xl">No items found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OurMenu;