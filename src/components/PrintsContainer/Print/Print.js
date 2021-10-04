import { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import styles from "./Print.module.css";

export default function Print({ print }) {
  const [show, setShow] = useState(false);

  const artist = print.people.find((person) => person.role === "Artist")?.name;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col md={4} sm={6} className="p-0">
        <Card
          className={`m-2 rounded-0 border-0 ${styles["print-card"]}`}
          onClick={handleShow}
        >
          <Card.Img
            variant="top"
            src={print.primaryimageurl + "?width=300"}
            alt={print.description}
          />
          <Card.Body>
            <h5>{artist ? artist : "Unknown artist"}</h5>
            <h4>
              <i>{print.title ? print.title : "[no title]"}</i>
            </h4>
            <h6>{print.dated ? print.dated : "Unknown date"}</h6>
          </Card.Body>
        </Card>
      </Col>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        data-test={"modal-component"}
      >
        <img src={print.primaryimageurl} alt={print.description} />
      </Modal>
    </>
  );
}
