import React, {useEffect, useState} from 'react'
import signinPic from "../assets/images/signin.jpg"
import {LogIn, LockKeyhole, Mail, Eye, EyeOff, BellRing, Telescope, Rss, SkipForward} from 'lucide-react';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router';
import { useUserStore } from '../Store/useUserStore';



const SignIn = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPwd, setShowPwd] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")

  const { signin } = useUserStore()
  const navigate = useNavigate();

  const handleSignin = async (e) => { 
    e.preventDefault()
    try {
      await signin(email, password)
      navigate('/')
    } catch (err) {
      setErrorMsg(err.response.data.message)
      console.log(err)
    }
  }

  useEffect(() => {
    if(!errorMsg) return
    const timer = setTimeout(() => {
      setErrorMsg("")
    }, 5000)

    return () => clearTimeout(timer)
  }, [errorMsg])
  


  return (
    <>
      {/* handle left and right side empty space */}
      <div className="mx-24 flex flex-col min-h-screen">

        {/* logo part */}
        <div className="flex flex-row justify-between items-center mt-2 mb-7">

          {/* logal here */}
          <Logo/>

          <div className="font-sans text-lg align-middle">
            <span className="text-red-600 font-semibold">New</span> to local Yard Sale?
            <a
              onClick={() => navigate('/signup')}
              className="underline cursor-pointer hover:text-teal-700 font-bold decoration-sky-500 ml-1">Create an account</a>     
          </div>
        </div>

        {/* left side for words and right side for sign up form */}
        <div className="flex">

          {/* left side, pic comes from freepik*/}
          <div className="w-1/2 h-full flex flex-col bg-white shadow-xl border rounded-3xl gap-5 pb-5 border-l-red-50 border-t-gray-100">
            <div className="ml-5 mt-5 flex flex-row justify-start items-center">
              <LogIn color="#3e9392" size={38}/>
              <span className="pl-5 font-mono font-bold text-2xl">Welcome back !</span>
            </div>
            <div className="w-full flex justify-center mb-2">
              <img className="w-[90%] shadow-2xl border rounded-xl border-b-red-700" src={signinPic} alt="yard sale view" />
            </div>

            <div className="ml-5 flex justify-start items-center">
              <Rss color="#3e9392" size={30} className="font-bold"/>
              <p className="text-lg">
                <span className="pl-5 font-bold">Explore yard sales </span> — keep up with the latest news !
              </p>
            </div>

            <div className="ml-5 flex justify-start items-center">
              <BellRing color="#3e9392" size={30} />
              <p className="text-lg">
                <span className="pl-5 font-bold">Hosting a Yard Sale </span>— Spread the Word & Sell Fast !
              </p>
            </div>

            <div className="ml-5 flex justify-start items-center">
              <Telescope color="#3e9392" size={30} />
              <p className="text-lg">
                <span className="pl-5 font-bold">Find It, Love It & Take It </span> — Your Yard Sale Adventure !
              </p>
            </div>
          </div>

          {/* right side */}
          <div className="w-1/2 mt-[5%]">

            <div className="flex flex-col justify-center items-center w-full h-auto pt-1">
              <div className="items-center w-[58%] ml-14">
                <div className="flex justify-center items-center">
                  <a className="font-bold text-4xl">Log in</a>
                </div>
                <form onSubmit={handleSignin} className="mt-5 max-w-md flex flex-col w-auto">

                  {/* email handle */}
                  <div className="flex flex-col mb-3">
                    <label htmlFor="email" className="mb-2">Email</label>
                    <div className="relative flex items-center">
                      <div className="absolute inset-y-0 left-0 pl-1 pr-3 flex items-center pointer-events-none">
                        <Mail/>
                      </div>
                      
                      <input
                        type="email"
                        value={email}
                        placeholder="email"
                        className="w-full pl-9 h-9 text-base bg-gray-50 rounded-lg border border-gray-600 focus:outline-none focus-bg-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:bg-white transition-all duration-200"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* password handle */}
                  <div className="flex flex-col my-2">
                    <label htmlFor="password" className="mb-2">Password</label>
                    <div className="relative flex items-center">
                      <div className="absolute inset-y-0 left-0 pl-1 pr-3 flex items-center pointer-events-none">
                        <LockKeyhole/>
                      </div>
                      
                      <input
                        type={showPwd ? "text" : "password"}
                        value={password}
                        placeholder="password"
                        className="w-full pl-9 h-9 text-base bg-gray-50 rounded-lg border border-gray-600 focus:outline-none focus-bg-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:bg-white transition-all duration-200"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {/* Eye icon toggle */}
                      <div className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
                        onClick={() => setShowPwd(!showPwd)}>
                        {showPwd ? <Eye/> : <EyeOff/>}
                      </div>
                    </div>
                  </div>

                  {/* remember me handle */}
                  <div className="flex flex-row justify-between mb-1">
                    <div className="flex flex-row">
                      <input type="checkbox" className="checked:bg-blue-500 mr-2" />
                      <p className='text-sm'>Remeber Me</p>
                    </div>

                    <div
                      onClick={() => navigate('/forgot-pwd')}
                      className="cursor-pointer text-teal-700 text-sm font-medium">
                      Forgot Password?
                    </div>
                  </div>

                  {/* submit handle */}
                  <button type="submit" className="mt-6 mb-3 w-full h-12 bg-red-600 rounded-full flex justify-center items-center text-white">
                    <SkipForward size={28} />
                  </button>


                  {errorMsg && <p className='text-red-600 font-semibold'>{ errorMsg }</p>}

                </form>

                {/* or continue with */}
                <div className="flex flex-col mt-3">

                  <div className="flex flex-row justify-between items-center mb-6">
                    <div className="w-[27%] justify-start"><hr/></div>
                    <div className="text-sm">Or continue with</div>
                    <div className="w-[27%] justify-end"><hr/></div>
                  </div>

                  <div className="flex flex-row justify-between">
                    {/* sign up with google */}
                    <a className="flex flex-row justify-center items-center h-12 border border-gray-300 w-[45%] rounded-full hover:bg-stone-50 cursor-pointer transition-all duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6" width="100" height="100" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                      </svg>
                      <span className="pl-3 font-semibold">
                        Google
                      </span>
                    </a>

                    {/* sign up with apple */}
                    <a className="flex flex-row justify-center items-center h-12 border border-gray-300 w-[45%] rounded-full hover:bg-stone-50 cursor-pointer transition-all duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6" width="100" height="100" viewBox="0 0 30 30">
                        <path d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z"></path>
                      </svg>
                      <span className="pl-3 font-semibold">
                        Apple
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <Footer/>
    </>
  )
}

export default SignIn