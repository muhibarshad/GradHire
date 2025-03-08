import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Slider=() => {

  //Owl Carousel Settings
  const options={
    margin: 400,
    responsiveClass: true,
    nav: true,
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    rewind: true,
    // mergeFit: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 3.5,
      }
    },
  };





  return (
    <OwlCarousel className="slider-items owl-carousel" style={{ opacity: 0.81 }} {...options}>


      <div className="comment_box item">
        <div className="ms-4 star_sec">
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
        </div>
        <h5 className="heading">Excellent Service </h5>
        <p className="para">Lorem ipsum dolor sit amet, sed dia nonumy eirmod tempor invidunt ut le et dliquyam erat, sed diam voluptua. At vero eos
          et aco dolores et ea rebum.</p>
        <div className="row mt-5">
          <div className="col-2 ">
            <img src={require( "./../../img/person.jpg" )} className="comment_img" alt="person" />
          </div>
          <div className="col-10">
            <p className="comment_owner">Adam McDonald</p>
            <p className="comment_timeline">Cto at McDonald</p>
          </div>
        </div>
      </div>

      <div className="comment_box item">
        <div className="ms-4 star_sec">
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
        </div>
        <h5 className="heading">Excellent Service </h5>
        <p className="para">Lorem ipsum dolor sit amet, sed dia nonumy eirmod tempor invidunt ut le et dliquyam erat, sed diam voluptua. At vero eos
          et aco dolores et ea rebum.</p>
        <div className="row mt-5">
          <div className="col-2 ">
            <img src={require( "./../../img/person.jpg" )} className="comment_img" alt="person" />
          </div>
          <div className="col-10">
            <p className="comment_owner">Adam McDonald</p>
            <p className="comment_timeline">Cto at McDonald</p>
          </div>
        </div>
      </div>

      <div className="comment_box item">
        <div className="ms-4 star_sec">
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
        </div>
        <h5 className="heading">Excellent Service </h5>
        <p className="para">Lorem ipsum dolor sit amet, sed dia nonumy eirmod tempor invidunt ut le et dliquyam erat, sed diam voluptua. At vero eos
          et aco dolores et ea rebum.</p>
        <div className="row mt-5">
          <div className="col-2 ">
            <img src={require( "./../../img/person.jpg" )} className="comment_img" alt="person" />
          </div>
          <div className="col-10">
            <p className="comment_owner">Adam McDonald</p>
            <p className="comment_timeline">Cto at McDonald</p>
          </div>
        </div>
      </div>

      <div className="comment_box item">
        <div className="ms-4 star_sec">
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faStar} /></span>
        </div>
        <h5 className="heading">Excellent Service </h5>
        <p className="para">Lorem ipsum dolor sit amet, sed dia nonumy eirmod tempor invidunt ut le et dliquyam erat, sed diam voluptua. At vero eos
          et aco dolores et ea rebum.</p>
        <div className="row mt-5">
          <div className="col-2 ">
            <img src={require( "./../../img/person.jpg" )} className="comment_img" alt="person" />
          </div>
          <div className="col-10">
            <p className="comment_owner">Adam McDonald</p>
            <p className="comment_timeline">Cto at McDonald</p>
          </div>
        </div>
      </div>


    </OwlCarousel>



  )
}

export default Slider