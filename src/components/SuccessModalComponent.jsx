import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setStatusSuccessModal } from "../actions/modal";

const SuccessModalComponent = ({ successModal, change, hideSuccessModal }) => {
  const handleClickHideSuccessModal = useCallback(() => {
    hideSuccessModal(false);
  }, [hideSuccessModal]);

  let cash = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
  let changeCash = [];
  let changeWord = [];

  if (change > 0) {
    cash.forEach((value, index) => {
      const getCash = parseInt(cash[index]);
      changeCash[index] = parseInt(change / getCash);
      change = change - changeCash[index] * getCash;
      if (changeCash[index] > 0) {
        changeWord = [
          ...changeWord,
          `${cash[index] >= 20 ? "Cash: " : "Coin :"}${cash[index]} x ${
            changeCash[index]
          }`
        ];
      }
    });
  }
  return (
    <div>
      <Modal
        show={successModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Thank you
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Success ! Transaction has doned.</h4>
          <h6>
            {changeWord.length > 0
              ? "Please get the change\n"
              : "Your have not a change, We hope to serve you again next time."}
          </h6>
          {changeWord.length > 0 &&
            changeWord.map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClickHideSuccessModal()}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

SuccessModalComponent.propTypes = {
  successModal: PropTypes.bool.isRequired,
  change: PropTypes.number,
  hideSuccessModal: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    successModal: state.modal.successModal,
    change: state.modal.change
  };
}

export default connect(
  mapStateToProps,
  { hideSuccessModal: setStatusSuccessModal }
)(SuccessModalComponent);
