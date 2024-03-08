import React from "react";
import Header from "../component/header";
import cover1 from "../assets/cover1.jpg";
import cover2 from "../assets/cover2.jpg";
import cover3 from "../assets/cover3.jpg";
import wifi from "../assets/wifi.png";
import clean from "../assets/clean.png";
import Laundry from "../assets/Laundry.png";
import Rental from "../assets/rental.png";
import Fitness from "../assets/fitness.png";
import about from "../assets/about.jpg";
import Footer from "../component/footer";

function Home() {
  return (
    <>
      <Header />
      <div className="slider-frame">
        <div className="slide-image">
          <img src={cover1} alt="" id="s1" />

          <img src={cover2} sizes="200px" alt="" id="s1" />

          <img src={cover3} alt="" id="s1" />
        </div>
      </div>

      <div className="paragraph">
        <div className="aboutus-container">
          <div className="paragraph-container">
            <h2>About US</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum modi nulla quos quibusdam totam non nobis sequi quasi
              optio voluptatibus praesentium saepe quis recusandae voluptates,
              voluptatem dolorum delectus asperiores dignissimos! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Voluptatum modi nulla
              quos quibusdam totam non nobis sequi quasi optio voluptatibus
              praesentium saepe quis recusandae voluptates, voluptatem dolorum
              delectus asperiores dignissimos!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum modi nulla quos quibusdam totam non nobis sequi quasi
              optio voluptatibus praesentium saepe quis recusandae voluptates,
              voluptatem dolorum delectus asperiores dignissimos! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Voluptatum modi nulla
              quos quibusdam totam non nobis sequi quasi optio voluptatibus
              praesentium saepe quis recusandae voluptates, voluptatem dolorum
              delectus asperiores dignissimos!
            </p>
          </div>

          <div className="about-image">
            <img src={about} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
