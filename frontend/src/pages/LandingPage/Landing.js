import React, { useEffect, useState } from 'react'
import './landingPage.css'
import { Link } from 'react-scroll'
import $ from 'jquery'
import { useNavigate } from 'react-router-dom'
import Card from './Card'
const Landing = () => {
  const navigate = useNavigate()
  const [showJob, setShowJob] = useState(false)

  const [faqs, setFaqs] = useState([
    {
      heading: 'What is GradHire Search?',
      content:
        'GradHire Search is an AI-driven recruitment platform that helps companies connect with top talent globally.',
      shown: false,
    },
    {
      heading: 'How does Smart Search help in finding better candidates?',
      content:
        'GradHire’s AI-powered Smart Search allows employers to discover talent based on location, soft skills, technical expertise, work experience, and education. With just a few clicks, our intelligent algorithm delivers the best-matched candidates for your needs.',
      shown: false,
    },
    {
      heading: 'What new features are coming in future updates?',
      content:
        'We are continuously enhancing GradHire Search to provide cutting-edge AI capabilities. Future updates will include an advanced Smart Search that matches candidates directly to job postings, along with a Candidate Tracking System to help hiring managers monitor the recruitment process and refine our AI recommendations.',
      shown: false,
    },
]);


  const changeNavbar = () => {
    $(document).ready(function () {
      $(window).scroll(function () {
        var scroll = $(window).scrollTop()
        if (scroll > 200) {
          $('.custom_nav').addClass('shadow')
        } else {
          $('.custom_nav').removeClass('shadow')
        }
      })
    })
  }

  const moveToLogin = () => {
    navigate('/login')
  }

  const moveToSignUp = () => {
    navigate('/signup')
  }

  const moveToDashboard = () => {
    navigate('/dashboard/home')
  }

  useEffect(() => {
    changeNavbar()
  }, [])

  const cardsContent = [
    {
      img: 'img1.png',
      heading: 'Talented Candidates',
      description:
        'GradHire leverages Machine Learning to analyze your past hiring decisions, refining matches for future candidates to ensure better and faster recruitment.',
    },
    {
      img: 'img2.png',
      heading: 'Smart Search',
      description:
        "GradHire utilizes Deep Neural Networks to learn from your company's hiring patterns, identifying both technical skills and soft skills from CVs and publicly available data.",
    },
    {
      img: 'img3.png',
      heading: 'Valuable Insights',
      description:
        'Gain data-driven insights to optimize hiring strategies, improve candidate selection, and identify key factors behind successful hires.',
    },
];

  return (
    <>
      {
        //************  NAVBAR **************
      }
      <nav className='bg-white custom_nav border-gray-200 px-5 sm:px-4 py-2.5 fixed top-0 left-0 right-0 border-1 border-gray-100 dark:bg-gray-800 z-30'>
        <div className='flex flex-wrap justify-between items-center mx-auto'>
          <Link
            className='bg-white'
            style={{ backgroundColor: '#ffffff' }}
            to='home'
            spy={true}
            smooth={true}
            offset={-90}
            duration={500}
          >
            <img
              src={require('./../../assests/gradhireLogo.png')}
              style={{ width: '150px', height: '60px' }}
              alt='lOGO'
            />
          </Link>

          <div className='flex md:order-2'>
            <button
              style={{ border: 'none' }}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-0'
              onClick={moveToLogin}
            >
              {' '}
              Login
            </button>

            <button
              style={{ border: 'none' }}
              data-collapse-toggle='mobile-menu-4'
              type='button'
              className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='mobile-menu-4'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <svg
                className='hidden w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>

          <div
            className='hidden justify-between items-center w-full md:flex md:w-auto md:order-1'
            id='mobile-menu-4'
          >
            <ul
              style={{ listStyleType: 'none' }}
              className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lge md:font-medium'
            >
              <li>
                <Link
                  className='block py-2 px-3 text-gray-600 rounded md:bg-white md:text-blue-700 md:p-0 cursor-pointer'
                  to='home'
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    setShowJob(false)
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className='block py-2 px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:bg-white md:border-0 md:hover:text-blue-700 md:p-0 cursor-pointer'
                  to='services'
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    setShowJob(false)
                  }}
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  className='block py-2 px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:bg-white md:border-0 md:hover:text-blue-700 md:p-0 cursor-pointer'
                  to='about_us'
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    setShowJob(false)
                  }}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className='block py-2  px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 cursor-pointer'
                  to='contact_us'
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={() => {
                    setShowJob(false)
                  }}
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {
        //************  LANDING CONTENT **************
      }
      {!showJob ? (
        <div>
          <div className='mt-24' id='home'>
            <div className='gap-3 flex flex-wrap w-full'>
              <div className='pl-3 md:pt-20 md:w-6/12 xl:pl-36 xl:pt-36 2xl:pl-44 2xl:pt-44'>
                <h2 className='text-3xl font-bold lg:w-9/12 xl:w-9/12 xl:text-4xl 2xl:text-5xl'>
                  <span className='highlight'>GradHire</span> An Intelligent Recruitment Platform
                </h2>
                <p className='text-gray-500 text-sm font-medium w-75 xl:w-7/12 2xl:w-6/12'>
                GradHire offers seamless and intelligent hiring solutions, enabling tech companies and scale-ups to efficiently recruit top talent.{' '}
                </p>
                <div className='mt-4'>
                  <button
                    style={{ border: 'none' }}
                    type='button'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    onClick={moveToSignUp}
                  >
                    Get Started
                    <svg
                      className='w-5 h-5 ml-2 -mr-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>

                  <Link
                    className='contact_btn mx-3 font-medium text-blue-800 hover:text-blue-800'
                    to='contact_us'
                    spy={true}
                    smooth={true}
                    offset={-90}
                    duration={500}
                  >
                    Contact us
                  </Link>
                </div>
              </div>
              <div className='hidden w-5/12 md:block '>
                <div className='w-full'>
                  <img
                    src={require('./../../img/illustrations2.png')}
                    className='img-fluid'
                    alt='landing img'
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-center hidden'>
              <div className='flex justify-content-around logos_card my-5 text-white w-8/12'>
                <div className='logo'>
                  <img
                    src={require('./../../img/05.png')}
                    className=''
                    style={{ width: '100%', height: '100%' }}
                    alt='FLEX'
                  />
                </div>
                <div className='logo'>
                  <img
                    src={require('./../../img/03.png')}
                    className=''
                    style={{ width: '100%', height: '100%' }}
                    alt='FLEX'
                  />
                </div>
                <div className='logo'>
                  <img
                    src={require('./../../img/01.png')}
                    className=''
                    style={{ width: '100%', height: '100%' }}
                    alt='FLEX'
                  />
                </div>
                <div className='logo'>
                  <img
                    src={require('./../../img/04.png')}
                    className=''
                    style={{ width: '100%', height: '100%' }}
                    alt='FLEX'
                  />
                </div>
                <div className='logo'>
                  <img
                    src={require('./../../img/02.png')}
                    className=''
                    style={{ width: '100%', height: '100%' }}
                    alt='FLEX'
                  />
                </div>
              </div>
            </div>
          </div>

          {
            //************  SERVICE SECTION **************
          }

          <div id='services'>
            <div className='left_black_img'>
              <img
                src={require('./../../img/Group 61.png')}
                alt=''
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className='right_black_img'>
              <img
                src={require('./../../img/Group 1667.png')}
                alt=''
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div id='section2' className='w-100'>
              <div className='flex justify-center text-center text-4xl font-semibold'>
                <div className=' 2xl:w-3/12'>
                  <span style={{ color: '#4E79CF' }}>Fast </span>and Relaible{' '}
                  <span style={{ color: '#4E79CF' }}>Recruitment</span> Solution
                </div>
              </div>
              <div className='flex text-center my-28'>
                <div className='services_bg ml-80'>
                  <img
                    className=''
                    src={require('./../../img/Group 1669.png')}
                    alt=''
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className='w-100 gap-3 flex flex-wrap justify-center xl:space-x-16 2xl:space-x-24'>
                  {cardsContent.map((el, i) => (
                    <div key={i} className=''>
                      {' '}
                      <Card
                        img={el.img}
                        heading={el.heading}
                        description={el.description}
                      />{' '}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {
            //************  About SECTION **************
          }
          <div className='candidate_div pl-8 pr-8' id='about_us'>
            <div>
              <div id='section3'>
                <div className='flex flex-wrap md:gap-0 md:justify-between'>
                  <div className='md:w-6/12 md:mt-5'>
                    <h1 className='text-8xl font-semibold text-blue-500'>
                      About Us
                    </h1>
                  </div>
                  <div className='md:w-6/12 text-justify text-xl text-gray-600 font-normal'>
                    {' '}
                    GradHire Search was created by Muhib Arshad and his team at
                    PUCIT. Team members include Shafqat Abbas, Muhammad Bila,
                    and Faiz Muhammad. The team is supported by the
                    Professor of Software Engeenering, Farhan Ahmad Ch. The team is
                    also supported by people of the industry.
                    <br />
                    <br />
                    Muhib with his team is the founder of GradHire and helps
                    tech companies and scale-ups with finding new talent. He
                    connects leaders to the right scale-ups. This is a role
                    well-suited to him and inline with his executive search
                    experiences and as a tech entrepreneur.
                    <br />
                    <br />
                    GradHire is an innovative platform that can change the way
                    traditional hiring happens.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {
            //************  CONTACT US **************
          }
          <div className='contact_us' id='contact_us'>
            <div className='flex flex-wrap justify-between p-4'>
              <div className='text-white lg:w-5/12 xl:w-4/12 2xl:w-3/12'>
                <h1 className='text-white text-xl font-bold lg:text-4xl lg:pt-20 2xl:pt-36 2xl:text-5xl'>
                  Contact Us
                </h1>
                <p className='text-white text-sm font-normal text-justify'>
                  If you have any question feel free to contact us, our team
                  will get to you in minutes and help you with everything you
                  need!
                </p>
              </div>
              <div className='contact_us_right lg:w-6/12 2xl:pt-36'>
                <form className='row'>
                  <div className='col-6'>
                    <input
                      type='text'
                      id='firstName'
                      placeholder='First name'
                    />
                  </div>
                  <div className='col-6'>
                    <input type='text' id='lastName' placeholder='Last name' />
                  </div>
                  <div className='col-12'>
                    <input
                      type='text'
                      id='emailAddress'
                      placeholder='Email Address'
                    />
                  </div>
                  <div className='col-12'>
                    <textarea
                      name='message'
                      id='message'
                      placeholder='Your message here!'
                      defaultValue={''}
                    />
                  </div>
                  <div className='col-12 submit_div'>
                    <button
                      style={{ border: 'none' }}
                      className='btn btn-primary '
                      type='submit'
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className='w-100 mt-52' id='faq_section'>
            <div className='flex justify-center text-center fw-bold fs-2'>
              <div className='2xl:w-4/12'>
                {/* <div className=" text-2xl">
              <span style={{ color: "#4E79CF" }}>FAQs</span>{" "}
            </div> */}
                <div className='text-4xl font-semibold'>
                  <span>
                    Frequently Asked{' '}
                    <span style={{ color: '#4E79CF' }}>Questions</span>
                  </span>
                </div>
              </div>
            </div>
            <div className='flex justify-center mt-20'>
              <div className='w-6/12'>
                {faqs.map((item, index) => {
                  return (
                    <div
                      key={index}
                      id={`accordion-flush-${index}`}
                      className='border-b border-gray-200 py-4'
                      data-accordion='collapse'
                      data-active-classes='bg-white dark:bg-gray-900 text-gray-900 dark:text-white'
                      data-inactive-classes='text-gray-500 dark:text-gray-400'
                    >
                      <h2 id={`accordion-flush-heading-${index}`}>
                        <button
                          type='button'
                          className={`flex justify-between items-center py-2 w-full font-medium text-left ${
                            item.shown === false
                              ? 'text-gray-500'
                              : 'text-gray-500'
                          } border-gray-200`}
                          data-accordion-target='#accordion-flush-body-1'
                          aria-expanded='true'
                          aria-controls={`accordion-flush-body-${index}`}
                          style={{
                            border: 'none',
                            backgroundColor: 'white',
                            fontWeight: '300',
                          }}
                          onClick={() => {
                            let newFaqs = [...faqs]
                            faqs[index].shown = !faqs[index].shown
                            setFaqs(newFaqs)
                          }}
                        >
                          <span className='font-semibold text-xl'>
                            {item.heading}
                          </span>
                          <svg
                            data-accordion-icon
                            className={`w-6 h-6 ${
                              item.shown === true ? 'rotate-180' : ''
                            } shrink-0`}
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                        </button>
                      </h2>
                      <div
                        id={`accordion-flush-body-${index}`}
                        className={`${
                          item.shown === true ? '' : 'hidden'
                        } pb-3`}
                        aria-labelledby={`accordion-flush-heading-${index}`}
                      >
                        <div className='py-2 dark:border-gray-700'>
                          <p className='mb-2 font-medium text-gray-500 dark:text-gray-400 text-justify'>
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <div className='text-4xl font-semibold'>Loading...</div>
        </div>
      )}
      {
        //************  FOOTER **************
      }
      <div className=' w-100 mt-28  text-muted'>
        <hr />
        <div className='pb-3'>
          <div className='flex justify-center text-center space-x-6'>
            <div className='mt-2 text-xs'>
              <span>Alright reserved © 2025 GradHire</span>
            </div>
            <div className='mt-2 text-xs'>
              <span>Any Inquiry ?</span>
            </div>
            <div className='mt-2 text-xs'>
              <span>Privacy Policy | Terms &amp; Conditions</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
