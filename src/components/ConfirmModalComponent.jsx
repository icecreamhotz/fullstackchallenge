import React, { Component } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment";

import "./validate.scss";
import lockerServices from "../services/locker.js";
import { setCost, deleteMoney } from "../actions/cost.js";
import {
  setChangeToSuccessModal,
  setStatusSuccessModal,
  setStatusUnAvailableModal
} from "../actions/modal.js";

class ConfirmModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      modalInformation: false,
      telephone: "",
      valid: false,
      errorNumber: false,
      errorLength: false
    };
  }

  onClickInformationModal = () => {
    this.setState(state => ({
      modalInformation: !state.modalInformation
    }));
  };

  onTelephoneNumberChange = e => {
    const value = e.target.value;

    this.setState({
      telephone: value
    });
  };

  handleSubmit = async () => {
    const { telephone } = this.state;

    let errNumber = true;
    let errLength = true;

    const regNumber = /^\d+$/;
    if (!regNumber.test(telephone)) {
      errNumber = true;
    } else {
      errNumber = false;
    }
    if (telephone.length !== 10) {
      errLength = true;
    } else {
      errLength = false;
    }

    this.setState({
      errorNumber: errNumber,
      errorLength: errLength,
      valid: errNumber || errLength
    });

    if (!errNumber && !errLength) {
      this.setState({
        loading: true
      });
      const { locker, money } = this.props;
      const timeout = moment()
        .add(locker.time, "minutes")
        .format("YYYY-MM-DD[T]HH:mm:ss.SSS");
      const rentData = {
        _id: locker._id,
        telephone: telephone,
        income: money - locker.change,
        timeout: timeout,
        status: "1"
      };

      await lockerServices
        .rentLocker(rentData)
        .then(() => {
          this.props.setChangeToSuccessModal(locker.change);
          this.setState(
            {
              loading: false,
              modalInformation: false
            },
            () => {
              this.props.setCost({});
              this.props.deleteMoney(0);
              this.props.setStatusSuccessModal(true);
            }
          );
        })
        .catch(err => {
          this.setState(
            {
              loading: false
            },
            () => {
              this.props.setStatusUnAvailableModal(true);
            }
          );
        });
    }
  };

  render() {
    const {
      modalInformation,
      loading,
      telephone,
      valid,
      errorNumber,
      errorLength
    } = this.state;
    return (
      <div>
        <Button
          variant="outline-success"
          onClick={this.onClickInformationModal}
        >
          Confirm
        </Button>
        <Modal
          show={modalInformation}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Please fill your information.
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Col} controlId="validationTelephone">
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter telephone"
                value={telephone}
                isInvalid={valid}
                onChange={this.onTelephoneNumberChange}
                required
              />
              <Form.Control.Feedback
                type="invalid"
                className={errorNumber ? "validate-failed" : "validate-pass"}
              >
                - This field accept only numbers.
              </Form.Control.Feedback>
              <Form.Control.Feedback
                type="invalid"
                className={errorLength ? "validate-failed" : "validate-pass"}
              >
                - Must have 10 characters.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              disabled={loading}
              onClick={this.handleSubmit}
            >
              {loading ? "Loading…" : "Confirm"}
            </Button>
            <Button onClick={this.onClickInformationModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    locker: state.cost.cost,
    money: state.cost.money
  };
}

export default connect(
  mapStateToProps,
  {
    setCost: setCost,
    deleteMoney: deleteMoney,
    setChangeToSuccessModal: setChangeToSuccessModal,
    setStatusSuccessModal: setStatusSuccessModal,
    setStatusUnAvailableModal: setStatusUnAvailableModal
  }
)(ConfirmModalComponent);
