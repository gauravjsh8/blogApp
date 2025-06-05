import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Trending = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { blogs } = useAuth();
  console.log(blogs);
  return (
    <div className="container mx-auto px-8 my-10 mt-40 ">
      <h1 className="text-lg font-bold">Trending</h1>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={1000}
        itemClass="px-2"
        containerClass="py-4"
      >
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => {
            return (
              <Link
                to={`/blogs/${blog._id}`}
                key={blog._id}
                className="mx-3  group bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 "
              >
                <div className="relative ">
                  <img
                    src={blog.blogImage.url}
                    className="w-full h-56 object-cover"
                    alt="Blog"
                  />
                  <div></div>
                  <h1 className="absolute bottom-5 text-lg font-bold group-hover:text-yellow-500">
                    {blog.title}
                  </h1>
                </div>
                <div>
                  <img
                    src={blog.adminPhoto}
                    alt="Admin Photo"
                    className="w-12 h-12 rounded-full border-2 border-yellow-400"
                  />
                  <div>
                    <p>{blog.adminName}</p>
                    <p className="text-sm text-gray-500">New</p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div></div>
        )}
      </Carousel>
    </div>
  );
};

export default Trending;
