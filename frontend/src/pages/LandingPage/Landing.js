import React, { useEffect, useState } from "react";
import "./landingPage.css";
import { Link } from "react-scroll";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const Landing = () => {
  const navigate = useNavigate();
  const [showJob, setShowJob] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [faqs, setFaqs] = useState([
    {
      heading: "What is GradHire Search?",
      content:
        "GradHire Search is an AI-driven recruitment platform that helps companies connect with top talent globally.",
      shown: false,
    },
    {
      heading: "How does Smart Search help in finding better candidates?",
      content:
        "GradHire's AI-powered Smart Search allows employers to discover talent based on location, soft skills, technical expertise, work experience, and education. With just a few clicks, our intelligent algorithm delivers the best-matched candidates for your needs.",
      shown: false,
    },
    {
      heading: "What new features are coming in future updates?",
      content:
        "We are continuously enhancing GradHire Search to provide cutting-edge AI capabilities. Future updates will include an advanced Smart Search that matches candidates directly to job postings, along with a Candidate Tracking System to help hiring managers monitor the recruitment process and refine our AI recommendations.",
      shown: false,
    },
  ]);

  const changeNavbar = () => {
    $(document).ready(function () {
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 200) {
          $(".custom_nav").addClass("shadow");
        } else {
          $(".custom_nav").removeClass("shadow");
        }
      });
    });
  };

  const moveToLogin = () => {
    navigate("/login");
  };

  const moveToSignUp = () => {
    navigate("/signup");
  };

  const moveToDashboard = () => {
    navigate("/dashboard/home");
  };

  useEffect(() => {
    changeNavbar();
  }, []);

  const cardsContent = [
    {
      img: "img1.png",
      heading: "Talented Candidates",
      description:
        "GradHire leverages Machine Learning to analyze your past hiring decisions, refining matches for future candidates to ensure better and faster recruitment.",
    },
    {
      img: "img2.png",
      heading: "Smart Search",
      description:
        "GradHire utilizes Deep Neural Networks to learn from your company's hiring patterns, identifying both technical skills and soft skills from CVs and publicly available data.",
    },
    {
      img: "img3.png",
      heading: "Valuable Insights",
      description:
        "Gain data-driven insights to optimize hiring strategies, improve candidate selection, and identify key factors behind successful hires.",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white custom_nav border-gray-200 px-3 sm:px-6 py-2 fixed top-0 left-0 right-0 border-b border-gray-100 z-30">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            className="flex items-center"
            to="home"
            spy={true}
            smooth={true}
            offset={-90}
            duration={500}
          >
            <img
              src={require("./../../assests/gradhireLogo.png")}
              className="h-7 w-auto sm:h-8 md:h-12 lg:h-14"
              alt="GradHire Logo"
            />
          </Link>

          <div className="hidden md:flex md:flex-1 md:justify-center">
            <ul className="flex space-x-12 text-sm font-medium">
              <li>
                <Link
                  className="text-blue-700"
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    setShowJob(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-blue-700"
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    setShowJob(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-blue-700"
                  to="about_us"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    setShowJob(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-blue-700"
                  to="contact_us"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    setShowJob(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={moveToLogin}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm md:text-base px-4 py-1.5 sm:px-6 sm:py-2 md:px-8 md:py-2.5 lg:px-12 lg:py-2.5 min-w-[100px] md:min-w-[140px] lg:min-w-[160px]"
            >
              Login
            </button>

            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-1.5 sm:p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  isMobileMenuOpen ? "hidden" : "block"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  isMobileMenuOpen ? "block" : "hidden"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } absolute top-full left-0 right-0 bg-white border-b border-gray-100 md:hidden`}
          >
            <ul className="flex flex-col py-2">
              <li>
                <Link
                  className="block py-2 px-4 text-blue-700"
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    setShowJob(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-50"
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    setShowJob(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-50"
                  to="about_us"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    setShowJob(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-50"
                  to="contact_us"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    setShowJob(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {!showJob ? (
        <div className="pt-20">
          <div className="container mx-auto px-4 pt-8" id="home">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-6/12 lg:pr-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="highlight">GradHire</span> An Intelligent
                  Recruitment Platform
                </h2>
                <p className="text-gray-500 text-sm md:text-base mb-6">
                  GradHire offers seamless and intelligent hiring solutions,
                  enabling tech companies and scale-ups to efficiently recruit
                  top talent.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={moveToSignUp}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                  >
                    Get Started
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <Link
                    className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium"
                    to="contact_us"
                    spy={true}
                    smooth={true}
                    offset={-90}
                    duration={500}
                  >
                    Contact us
                  </Link>
                </div>
              </div>
              <div className="hidden md:block md:w-6/12">
                <img
                  src={require("./../../img/illustrations2.png")}
                  className="w-full h-auto"
                  alt="landing illustration"
                />
              </div>
            </div>
          </div>

          <div id="services" className="py-16 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold">
                  <span className="text-blue-600">Fast </span>and Reliable{" "}
                  <span className="text-blue-600">Recruitment</span> Solution
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cardsContent.map((el, i) => (
                  <Card
                    key={i}
                    img={el.img}
                    heading={el.heading}
                    description={el.description}
                  />
                ))}
              </div>
            </div>
          </div>

          <div id="about_us" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center">
                <div className="w-full lg:w-6/12 mb-8 lg:mb-0">
                  <h2 className="text-5xl md:text-6xl lg:text-8xl font-semibold text-blue-500">
                    About Us
                  </h2>
                </div>
                <div className="w-full lg:w-6/12">
                  <div className="text-gray-600 text-lg space-y-6">
                    <p>
                      GradHire Search was created by Muhib Arshad and his team
                      at PUCIT. Team members include Shafqat Abbas, Muhammad
                      Bilal, and Faiz Muhammad. The team is supported by the
                      Professor of Software Engineering, Farhan Ahmad Ch. The
                      team is also supported by people of the industry.
                    </p>
                    <p>
                      Muhib with his team is the founder of GradHire and helps
                      tech companies and scale-ups with finding new talent. He
                      connects leaders to the right scale-ups. This is a role
                      well-suited to him and inline with his executive search
                      experiences and as a tech entrepreneur.
                    </p>
                    <p>
                      GradHire is an innovative platform that can change the way
                      traditional hiring happens.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="contact_us" className="py-16 bg-blue-600 text-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center">
                <div className="w-full lg:w-5/12 mb-8 lg:mb-0">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Contact Us
                  </h2>
                  <p className="text-white/80">
                    If you have any question feel free to contact us, our team
                    will get to you in minutes and help you with everything you
                    need!
                  </p>
                </div>
                <div className="w-full lg:w-7/12">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      className="p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 md:col-span-2"
                    />
                    <textarea
                      placeholder="Your message here!"
                      rows="4"
                      className="p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 md:col-span-2"
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-white text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors md:col-span-2"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div id="faq_section" className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold">
                  Frequently Asked{" "}
                  <span className="text-blue-600">Questions</span>
                </h2>
              </div>
              <div className="max-w-3xl mx-auto">
                {faqs.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 py-4">
                    <button
                      onClick={() => {
                        const newFaqs = [...faqs];
                        newFaqs[index].shown = !newFaqs[index].shown;
                        setFaqs(newFaqs);
                      }}
                      className="w-full flex justify-between items-center py-2 text-left"
                    >
                      <span className="font-semibold text-lg text-gray-900">
                        {item.heading}
                      </span>
                      <svg
                        className={`w-6 h-6 text-gray-500 transform ${
                          item.shown ? "rotate-180" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    {item.shown && (
                      <div className="py-3">
                        <p className="text-gray-600">{item.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen pt-20">
          <div className="text-4xl font-semibold">Loading...</div>
        </div>
      )}

      <footer className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-gray-500">
            <div>© 2025 GradHire. All rights reserved.</div>
            <div>Any Inquiry?</div>
            <div>Privacy Policy | Terms & Conditions</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
