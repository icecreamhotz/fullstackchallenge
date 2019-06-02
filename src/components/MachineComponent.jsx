import React, { Component } from "react";
import PropTypes from "prop-types";
import "./locker.scss";
import { Row, Col, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import { setCost } from "../actions/cost.js";
import { setLockers } from "../actions/locker.js";

import PriceScreenComponent from "./PriceScreenComponent";
import CoinComponent from "./CoinComponent";
import ConfirmModalComponent from "./ConfirmModalComponent";
import SuccessModalComponent from "./SuccessModalComponent";
import UnAvailableModalComponent from "./UnAvailableModalComponent";

const LoadingStatus = () => (
  <Row>
    <Col xs={12}>
      {" "}
      <div className="shimmerBG content-line-common price endcommon" />
    </Col>
    <Col xs={12}>
      {" "}
      <div className="shimmerBG content-line-common price endcommon" />
    </Col>
  </Row>
);

const LoadingUnitsHeader = () => (
  <Row noGutters={true}>
    <Col>
      <div className="shimmerBG content-line-header header endheader" />
    </Col>
    <Col>
      <div className="shimmerBG content-line-header header endheader" />
    </Col>
    <Col>
      <div className="shimmerBG content-line-header header endheader" />
    </Col>
  </Row>
);

const LoadingUnits = () => (
  <div>
    <Row noGutters={true}>
      <Col>
        <div className="shimmerBG content-line-common common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common common endcommon" />
      </Col>
    </Row>
    <Row noGutters={true}>
      <Col>
        <div className="shimmerBG content-line-common common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common common endcommon" />
      </Col>
    </Row>
    <Row noGutters={true}>
      <Col>
        <div className="shimmerBG content-line-common common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common common endcommon" />
      </Col>
    </Row>
    <Row noGutters={true}>
      <Col>
        <div className="shimmerBG content-line-common common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common common endcommon" />
      </Col>
    </Row>
  </div>
);

class MachineComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lockers: [],
      loading: props.loading || true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lockers !== nextProps.lockers) {
      this.setState({
        lockers: nextProps.lockers
      });
    }
    if (this.props.loading !== nextProps.loading) {
      this.setState({
        loading: nextProps.loading
      });
    }
  }

  onClickSelectedUnit = (id, status) => {
    // detect unavailable click
    if (status === "1") {
      return;
    }

    const { lockers } = this.state;
    const newLocker = lockers.map(locker => {
      if (locker._id === id) {
        return {
          ...locker,
          selected: "1"
        };
      }
      return { ...locker, selected: "0" };
    });
    let lockerSelected = newLocker.filter(locker => locker._id === id)[0];

    this.props.setLockers(newLocker);
    this.props.setCost(lockerSelected);

    this.setState({
      lockers: newLocker
    });
  };

  render() {
    const { lockers, loading } = this.state;
    const { confirm } = this.props;
    let isPay;
    if (Object.keys(confirm).length !== 0) {
      if (confirm.hasOwnProperty("time")) {
        if (confirm.time >= 60) {
          isPay = true;
        }
      }
    } else {
      isPay = false;
    }
    return (
      <Card className="pay-machine">
        <Card.Body>
          {loading ? (
            <LoadingStatus />
          ) : (
            <ul className="fa-ul">
              <li>
                <span className="fa-li">
                  <i className="far fa-square available" />
                </span>
                Green is available
              </li>
              <li>
                <span className="fa-li">
                  <i className="far fa-square unavailable" />
                </span>
                Red is unavailable
              </li>
            </ul>
          )}
          <div className="tv-touchscreen">
            <Row>
              {loading ? (
                <Col>
                  <LoadingUnitsHeader />
                  <LoadingUnits />
                </Col>
              ) : (
                <Col>
                  <Row noGutters={true} className="align-center">
                    <Col xs={4}>
                      <h6>S</h6>
                    </Col>
                    <Col xs={4}>
                      <h6>M</h6>
                    </Col>
                    <Col xs={4}>
                      <h6>L</h6>
                    </Col>
                  </Row>
                  <Row noGutters={true}>
                    {lockers.map((locker, index) => {
                      let toolTipText;
                      if (locker.status === "0") {
                        toolTipText = "Select";
                      } else if (locker.status === "1") {
                        toolTipText = "Please select other locker";
                      }
                      if (locker.selected === "1") {
                        toolTipText = "Selected";
                      }
                      return (
                        <Col
                          xs={4}
                          key={index}
                          onClick={() =>
                            this.onClickSelectedUnit(locker._id, locker.status)
                          }
                        >
                          <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-disabled">
                                {toolTipText}
                              </Tooltip>
                            }
                          >
                            <div
                              className={`unit ${
                                locker.status === "0"
                                  ? "available"
                                  : "unavailable cursor-unavailable"
                              } ${locker.selected === "0" ? "" : "selected"}`}
                            >
                              {locker.locker}
                            </div>
                          </OverlayTrigger>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              )}
            </Row>
          </div>
          {isPay && (
            <Row>
              <Col
                className="align-center"
                style={{
                  paddingTop: 30
                }}
              >
                <ConfirmModalComponent />
              </Col>
            </Row>
          )}
          <Row
            style={{
              paddingTop: 20
            }}
          >
            <Col>
              <PriceScreenComponent loading={loading} />
            </Col>
          </Row>
          <Row>
            <Col>
              <CoinComponent loading={loading} />
            </Col>
          </Row>
          <SuccessModalComponent />
          <UnAvailableModalComponent />
        </Card.Body>
      </Card>
    );
  }
}

MachineComponent.propTypes = {
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    lockers: state.locker,
    confirm: state.cost.cost
  };
}

export default connect(
  mapStateToProps,
  { setCost: setCost, setLockers: setLockers }
)(MachineComponent);
