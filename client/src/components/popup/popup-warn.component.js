import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function PopupWarn(props) {
  function onCancel() {
    props.onCancel();
  };

  console.log('PopupWarn');
  
  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.subtitle}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {props.cancelButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};