import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

class ConfirmModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      modalInformation: true,
      modalSuccess: false
    };
  }

  onClickInformationModal = () => {
    this.setState(state => ({
      modalInformation: !state.modalInformation
    }));
  };

  onClickConfirmButton = () => {
    this.setState({ isLoading: true }, () => {
      this.setState({ isLoading: false }, () => {
        this.setState({ modalInformation: false }, () => {
          this.setState({ modalSuccess: true });
        });
      });
    });
  };

  onClickConfirmHide = () => {
    this.setState({
      modalSuccess: false
    });
  };

  render() {
    const { modalInformation, loading, modalSuccess } = this.state;
    const { locker } = this.props;
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
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Please fill your information.
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Telephone</h4>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter telephone" />
              <Form.Text className="text-muted">* Required</Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              disabled={loading}
              onClick={!loading ? this.onClickConfirmButton : null}
            >
              {loading ? "Loading…" : "Confirm"}
            </Button>
            <Button onClick={this.onClickInformationModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={modalSuccess}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Thank you
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Success ! Transaction has doned.</h4>
            {locker.change > 0 ? `Your change is ${locker.change}` : ""}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onClickConfirmHide}>OK</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    locker: state.confirm
  };
}

export default connect(
  mapStateToProps,
  null
)(ConfirmModalComponent);
