import React, { useEffect } from "react";
import { Carousel, Container, Button } from "react-bootstrap";
import Header from "./Header";
import first from "../images/first.png";
import second from "../images/second.jpg";
import third from "../images/third.jpg";
import { LinkContainer } from "react-router-bootstrap";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";

function Home({ authorised }) {
  const history = useHistory();
  useEffect(() => {
    if (!authorised) {
      history.push("/");
    }
  }, [authorised]);
  return (
    <div>
      <Header />
      <Container>
        <Carousel fade>
          <Carousel.Item>
            <img className="d-block w-100" src={first} alt="first" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={second} alt="second" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={third} alt="third" />
          </Carousel.Item>
        </Carousel>

        <div className="mt-5">
          <h1>Gym Managment System</h1>
          <div className="mt-5">
            <p>
              Being physically and mentally fit is necessary for an individual
              to live a happy, long life. Typically, exercise is one of the best
              ways to keep a person healthy. Hence, no matter how busy you are,
              it is always best to find time to do a workout routine. With the
              numerous diseases that spread in the world today, many individuals
              realized the essence of workout. <br />
              Specifically, having a workout routine will give an individual the
              greatest benefit in physical, mental and social aspects.
              Accordingly, exercise will not just help you increase energy
              levels, reduce the risk of chronic disease and lose weight but
              will also help improve brain health and memory. With such
              benefits, you probably will love to do workout routines soon.
              Luckily, you don’t need to do it by yourself as various personal
              trainers or professional fitness coaches exist to provide the help
              you need. And joining fitness classes is just at your fingertips.
              Today, we’re going to provide you with ample gym websites design
              that will help fitness enthusiasts and personal trainers craft
              amazing gym websites with innovation.
            </p>

            <p>
              As people are now using the internet to access different services
              and products, crafting a website for businesses becomes a must!
              With such a marketing strategy, you will be able to reach more
              people and generate more leads. That is why as a business, you
              shouldn’t let your brand be left out. Craft a great website to
              boost your reputation and to help you succeed. In this amazing
              list of gym websites design, you can find different ways of
              presenting your brand. Don’t miss out on these stunning gym
              websites and see which elements you’ll apply for your own website
              soon.
            </p>
          </div>
        </div>
      </Container>
      <div className="facalty">
        <div className="facalty-inside">
          <h3>Facilities</h3>
          <p>
            we provide what Members need to be better <br />
            than before
          </p>
          <LinkContainer to="/facalty">
            <Button variant="light">View Details</Button>
          </LinkContainer>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
