import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setStatusUnAvailableModal } from "../actions/modal";

const UnAvailableModalComponent = ({
  unAvailableModal,
  hideUnAvailableModal
}) => {
  const handleClickHideUnAvailableModal = useCallback(() => {
    hideUnAvailableModal(false);
  }, [hideUnAvailableModal]);
  return (
    <div>
      <Modal
        show={unAvailableModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Sorry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>This locker is unavailable, Please select other locker.</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClickHideUnAvailableModal()}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

UnAvailableModalComponent.propTypes = {
  unAvailableModal: PropTypes.bool.isRequired,
  hideUnAvailableModal: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    unAvailableModal: state.modal.unAvailableModal
  };
}

export default connect(
  mapStateToProps,
  { hideUnAvailableModal: setStatusUnAvailableModal }
)(UnAvailableModalComponent);
