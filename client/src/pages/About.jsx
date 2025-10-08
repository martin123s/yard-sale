import React, {useEffect} from 'react'
import Logo from '../components/UI/Logo';
import Footer from '../components/Layout/Footer';
import { useLocation } from 'react-router';

const About = () => {

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

        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-5xl text-center mb-6 text-teal-700">About Our Yard Sale</h1>
          <p className="text-xl font-light mb-8 text-wrap">
            Welcome to <span className="font-semibold text-red-600">Local Yard Sale At Your State Website</span>, your one-stop destination for hidden treasures, unique finds, and unbeatable bargains! Whether you're a seasoned thrifter or just looking for something special, you've come to the right place.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gray-500 rounded-xl">
              <div className="bg-white p-6 rounded-xl shadow-xl hover:-translate-x-4 hover:-translate-y-4 transition-all">
                <h2 className="text-xl font-semibold mb-3">Why Shop With Us?</h2>
                <div className="list-disc list-inside text-gray-700 space-y-2">
                  <div>✅ Gently used clothing & accessories</div>
                  <div>✅ Furniture & home decor</div>
                  <div>✅ Electronics & gadgets</div>
                  <div>✅ Books, toys & games</div>
                  <div>✅ Collectibles & antiques</div>
                  <div>✅ And much more!</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-500 rounded-xl">
              <div className="bg-white p-6 rounded-xl h-full shadow-xl hover:translate-x-4 hover:-translate-y-4 transition-all">
                <h2 className="text-xl font-semibold mb-3">Sustainability Matters</h2>
                <p className="text-gray-700" style={{ lineHeight: "1.7" }}>
                  By shopping second-hand, you're not only saving money but also helping the planet! Every item sold keeps waste out of landfills and supports a more sustainable way of shopping.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold">📍 Visit Us</h2>
            <p className="text-lg">📍 <strong className='text-xl'>Location: </strong> Depedending on your current position</p>
            <p className="text-lg">📅 <strong>Next Sale Date: </strong>Please Check the Users' Posts</p>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  )
}

export default About
