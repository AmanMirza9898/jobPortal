import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useDispatch } from "react-redux";
import { setSearchedQuery, setLoading } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const SearchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    dispatch(setLoading(true));
    navigate('/browse')
  }
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div className="relative overflow-hidden min-h-[600px] flex flex-col justify-center">
      {/* Particles Background */}
      {/* {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 z-0"
          options={{
            fullScreen: { enable: false },
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#6A38C2",
              },
              links: {
                color: "#6A38C2",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      )} */}

      {/* Dotted Background Pattern (Overlay on top of particles if desired, or remove to let particles shine) */}
      {/* <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{
        backgroundImage: "radial-gradient(#6A38C2 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }}></div> */}

      {/* Floating Elements (Mock Cards) */}
      <div className="absolute top-20 left-[10%] bg-white p-4 rounded-xl shadow-lg animate-float hidden md:block border border-gray-100 transform -rotate-6 z-10 hover:z-50 transition-all cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center text-red-500 font-bold">G</div>
          <div>
            <p className="text-sm font-bold text-gray-800">Product Designer</p>
            <p className="text-xs text-gray-500">Google Inc.</p>
          </div>
        </div>
      </div>

      <div className="absolute top-40 right-[10%] bg-white p-4 rounded-xl shadow-lg animate-float-delay-1 hidden md:block border border-gray-100 transform rotate-12 z-10 hover:z-50 transition-all cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">M</div>
          <div>
            <p className="text-sm font-bold text-gray-800">Multimedia Artist</p>
            <p className="text-xs text-gray-500">Microsoft</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 left-[10%] bg-white p-4 rounded-xl shadow-lg animate-float-delay-2 hidden md:block border border-gray-100 transform rotate-6 z-10 hover:z-50 transition-all cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <Search className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">500+ New Jobs</p>
            <p className="text-xs text-gray-500">Posted daily</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-[10%] bg-white p-4 rounded-xl shadow-lg animate-float hidden md:block border border-gray-100 transform rotate-3 z-10 hover:z-50 transition-all cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">Job Applied</p>
            <p className="text-xs text-gray-500">Successfully sent</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col gap-5 my-10 max-w-4xl mx-auto px-4 text-center">
        <span className="mx-auto px-4 py-2 rounded-full bg-white border border-[#F83002]/20 shadow-sm text-[#F83002] font-medium animate-fadeIn">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Start your career journey with thousands of job opportunities from top companies.
          Your dream job is just a search away.
        </p>
        <div className="flex w-full md:w-[60%] shadow-xl border border-gray-100 pl-4 py-1 rounded-full items-center gap-4 mx-auto bg-white transition-all focus-within:ring-2 ring-[#6A38C2]/20 ring-offset-2">
          <input
            type="text"
            placeholder="Find your Dream Jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-lg text-gray-700 placeholder-gray-400"
          />
          <Button onClick={SearchJobHandler} className="rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6] h-12 px-8 transition-colors">
            <Search className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};
