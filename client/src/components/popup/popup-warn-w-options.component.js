import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function PopupWarnWOptions(props) {
  function onCancel() {
    props.onCancel();
  };

  function onConfirm() {
    props.onConfirm();
  };
  
  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.subtitle}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={props.confirmVariant} onClick={onConfirm}>
          {props.confirmButtonText}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          {props.cancelButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};