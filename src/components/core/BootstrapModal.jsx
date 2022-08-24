import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const BootstrapModal = (props) => {
    const [showModal, setShowModal] = useState({...props.showModal});
    const [modalTitle, setModalTitle] = useState({...props.modalTitle});
    const [modalBody, setModalBody] = useState({...props.modalBody});

    useEffect(() => {
        setShowModal(props.showModal);
    }, [props.showModal]);

    useEffect(() => {
        setModalTitle(props.modalTitle);
    }, [props.modalTitle]);

    useEffect(() => {
        setModalBody(props.modalBody);
    }, [props.modalBody]);

    return (
        <Modal show={showModal} onHide={props.handleCloseModal}>
            <Modal.Header>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    );
}

export default BootstrapModal;