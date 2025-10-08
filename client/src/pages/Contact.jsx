import { useEffect } from "react";
import { useLocation } from 'react-router';
import Footer from '../components/Layout/Footer';
import Logo from '../components/UI/Logo';


const Contact = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when route changes
  }, [pathname]);

  return (
    <>
      <div className="w-full px-[5%]">
        {/* logo here */}
        <div className="flex flex-row justify-between items-center pt-3">
          <Logo />
        </div>
          
        <div className="max-w-3xl mx-auto px-6 ">
          <div className="text-4xl font-bold text-center">Contact Us</div>
          <p className="text-lg text-gray-700 text-center my-5 font-light">
            Have a question or need assistance? Get in touch with us, and we'll be happy to help!
          </p>

          <form className="mt-1 bg-white p-6 rounded-xl shadow-2xl mx-24">
            <h2 className="text-xl font-semibold mb-4">📩 Send Us a Message</h2>
            
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Your Email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-2">Your Address (Only City and State)</label>
              <input
                type="text"
                name="address"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Only City and State"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows="4"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Leave Your Message Here"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      
      <Footer/>
    </>
  );
};

export default Contact;
