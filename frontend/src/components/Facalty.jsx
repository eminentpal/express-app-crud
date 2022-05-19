import React, { useEffect } from "react";
import Header from "./Header";
import { Container, Row, Col } from "react-bootstrap";
import muscle from "../images/muscle.png";
import lose from "../images/lose.png";
import back from "../images/back.png";
import running from "../images/running.png";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";

function Facalty({ authorised }) {
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
        <Row className="mt-5">
          <Col md={6} sm={6}>
            <h4>Build Muscle</h4>
            <p className="paregraph">
              When it comes to building muscle, there are numerous theories,
              methods, and preferences. Whether the goal is improved health,
              aesthetics, performance, or a combination of all three, there is
              no shortage of advice to help you get there. So much so that it
              can sometimes become overly complicated and you forget about the
              basic facts. But, it’s simpler than it seems. Getting stronger
              isn’t just about what takes place in the gym, though that’s a key
              component. How you tackle the rest of your day and night,
              including sleep, goes a long way to determining how or if you
              build muscle.
            </p>
          </Col>
          <Col md={6} sm={6}>
            <img src={muscle} alt="muscle" />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={6} sm={6}>
            <img src={lose} alt="lose" />
          </Col>
          <Col md={6} sm={6}>
            <h4>Lose Weight</h4>
            <p className="paregraph">
              Learning to balance healthy eating and physical activity can help
              you lose weight more easily and keep it off. Take it from people
              who have successfully maintained weight loss:
            </p>
            <ul>
              <li>98% have modified their eating habits.</li>
              <li>
                94% have increased their physical activity, especially walking.
              </li>
            </ul>
            <p>
              Maintaining your ideal body weight is tough, no matter where you
              are in your weight loss journey. If you’re overweight, losing even
              a few pounds can improve your health, so every step in the right
              direction counts! Use these tips to set yourself up for success
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={6} sm={6}>
            <h4>Back Exercises</h4>
            <p className="paregraph">
              Exercise is a vital part of treating the spine after injury or
              surgery. Active therapeutic exercises distribute nutrients into
              the disc space, joints and soft tissues in the back. A regular
              exercise routine helps patients improve mobility and strength,
              minimize recurrence, and reduces the severity and duration of
              possible future episodes of back pain.
            </p>
            <ul>
              <li>
                Strengthening: repeated muscle contractions until the muscle
                becomes tired.
              </li>
              <li>
                Stretching or Flexibility: slow, sustained lengthening of the
                muscle.
              </li>
              <li>
                Low-impact Aerobic: steady exercise using large muscle groups.
              </li>
            </ul>
          </Col>
          <Col md={6} sm={6}>
            <img src={back} alt="back" />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6} sm={6}>
            <img src={running} alt="running" />
          </Col>
          <Col md={6} sm={6}>
            <h4>Running</h4>
            <p className="paregraph">
              Jogging or running is a popular form of physical activity. About
              one in five Australians try running (or jogging) at some stage in
              their life. Running is an appealing exercise because it doesn't
              cost a lot to take part and you can run at any time that suits
              you. Some runners choose to participate in fun runs, athletics
              races or marathons. If you are interested in competing with other
              runners, contact your local running club.
              <p>
                Regular running or jogging offers many health benefits. Running
                can:
              </p>
            </p>
            <ul>
              <li>
                help to build strong bones, as it is a weight bearing exercise.
              </li>
              <li>strengthen muscles.</li>
              <li>help maintain a healthy weight.</li>
              <li>improve cardiovascular fitness.</li>
            </ul>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
      <Footer />
    </div>
  );
}

export default Facalty;
