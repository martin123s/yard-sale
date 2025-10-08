import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import { Navigate } from 'react-router-dom'

import { useUserStore } from '../Store/useUserStore';
import Logo from '../components/UI/Logo';
import Footer from '../components/Layout/Footer';




const Auth = () => {

  const { pathname } = useLocation();
  const [code, setCode] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [userMsg, setUserMsg] = useState(null)

  const { verifyEmail } = useUserStore()
  const { isAuthenticated, user } = useUserStore()
  const navigate = useNavigate();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />
  }

  const handleSubmit = async () => {
    const verifyCode = code;
    setCode("")

    try {
      const user = await verifyEmail(verifyCode)
      setUserMsg(user)
    } catch (err) {
      setErrorMsg(err.response.data.message)
      console.log(err)
    }
  }

  useEffect(() => {
    if (userMsg) {
      navigate('/')
      setUserMsg(null)
    }
  }, [userMsg])

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when route changes
  }, [pathname]);

  useEffect(() => {
    if(!errorMsg) return
    const timer = setTimeout(() => {
      setErrorMsg("")
    }, 3000)

    return () => clearTimeout(timer)
  }, [errorMsg])

  
  return (
    <>
      <div className="w-full min-h-screen px-[5%]">
        {/* logo here */}
        <div className="flex flex-row justify-between items-center pt-3">
          <Logo />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-5xl text-center mb-6 text-teal-700">Account Confirmation</h1>
          <p className="text-xl font-light mb-8 text-wrap">
            Welcome ! <br/><span className="font-semibold text-red-600">A verification code has been sent to your email.</span><br/> Please check your inbox and enter the code below to confirm your account.
          </p>
          <div className="mb-12"></div>

          <div className="flex item-center">
            <div className="h-14 w-[50%] border-b-2 border-gray-500 flex justify-between">
              <div className="flex items-center font-semibold text-xl">Verification Code: </div>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text" className="w-64 text-2xl text-center text-teal-700 font-bold border border-gray-400 rounded focus:outline-none focus:border-gray-400" />
            </div>
            <div className="w-[50%] flex justify-center items-center">
              <div
                onClick={handleSubmit}
                className="w-40 h-14 bg-sky-600 flex justify-center items-center text-lg font-bold text-white rounded-xl cursor-pointer">Confirm</div>
            </div>
          </div>

          {errorMsg &&
            <div className="flex justify-start items-center text-xl text-red-700">
              { errorMsg }
            </div>
          }

          <div className="grid md:grid-cols-2 gap-6 mt-14">

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

        </div>
      </div>

      <Footer/>
    </>
  )
}

export default Auth

