import React, { Component } from "react";
import PropTypes from "prop-types";
import "./locker.scss";
import { Row, Col, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import { setLockers } from "../actions/locker.js";
import { setCost } from "../actions/cost.js";

import PriceScreenComponent from "./PriceScreenComponent";
import CoinComponent from "./CoinComponent";
import ConfirmModalComponent from "./ConfirmModalComponent";

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
        <div className="shimmerBG content-line-common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common endcommon" />
      </Col>
    </Row>
    <Row noGutters={true}>
      <Col>
        <div className="shimmerBG content-line-common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common endcommon" />
      </Col>
    </Row>
    <Row noGutters={true}>
      <Col>
        <div className="shimmerBG content-line-common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common endcommon" />
      </Col>
    </Row>
    <Row noGutters={true}>
      <Col>
        <div className="shimmerBG content-line-common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common endcommon" />
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
    const lockerSelected = newLocker.filter(locker => locker._id === id)[0];

    this.props.setCost(lockerSelected);
    this.props.setLockers(newLocker);

    this.setState({
      lockers: newLocker
    });
  };

  render() {
    const { lockers, loading } = this.state;
    return (
      <Card className="pay-machine">
        <Card.Body>
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
          {Object.keys(this.props.confirm).length !== 0 && (
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
        </Card.Body>
      </Card>
    );
  }
}

MachineComponent.propTypes = {
  lockers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      locker: PropTypes.number.isRequired,
      size: PropTypes.shape({
        size: PropTypes.string.isRequired,
        perhour: PropTypes.number.isRequired,
        nextminute: PropTypes.number.isRequired
      }).isRequired,
      income: PropTypes.number.isRequired,
      timeout: PropTypes.instanceOf(Date),
      status: PropTypes.string.isRequired,
      user: PropTypes.shape({
        _id: PropTypes.string,
        telephone: PropTypes.string
      })
    })
  ),
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    lockers: state.locker,
    confirm: state.confirm
  };
}

export default connect(
  mapStateToProps,
  { setLockers: setLockers, setCost: setCost }
)(MachineComponent);
