import { Col, Container, Row } from "react-bootstrap";
import { SiFacebook } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";

function Footer(){
    return(
        <>
      <footer className="bg-light text-center p-3 mt-4">
        <Container>
          <Row>
            <Col>
             <p>© 2026 News Portal | All Rights Reserved</p>
              <h6 className="text-dark mb-2">Terms of Service</h6>
                    <p className="text-dark mb-1">Follow us on:</p>
                 <div>
              <SiFacebook className="text-dark mx-2" fontSize={20} />
              <AiFillInstagram className="text-dark mx-2" fontSize={20} />
              <IoLogoWhatsapp className="text-dark mx-2" fontSize={20} />
            </div>
            </Col>
          </Row>
        </Container>
      </footer>
        </>
    )
}
export default Footer;