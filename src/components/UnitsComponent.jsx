import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { connect } from "react-redux";

import withScreenLoading from "./withScreenLoading";
import CountTimeRended from "./CountTimeRended";

class UnitsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      now: moment()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.setCurrentTime(), 1000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.lockers !== nextProps.lockers) {
      return true;
    }
    if (this.state.now !== nextState.now) {
      return true;
    }
    return false;
  }

  setCurrentTime = () => {
    this.setState({ now: moment() });
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { now } = this.state;
    const { lockers } = this.props;
    const formatDate = "MMMM DD YYYY HH:mm:ss";
    return (
      <Row noGutters={true}>
        <Col xs={12} lg={4}>
          <h1>Size S</h1>
          {lockers
            .filter(item => item.size.size === "S")
            .map((locker, index) => {
              const sizeData = locker.size;
              const classNameRended = locker.status === "0" ? "" : "rended";
              const getDate =
                locker.status === "1"
                  ? moment(locker.timeout)
                      .subtract(1, "hours")
                      .format(formatDate)
                  : now.format(formatDate);
              const startRended =
                locker.status === "1" ? `Start: ${getDate}` : getDate;
              const endRended =
                locker.status === "1" ? (
                  <CountTimeRended timeout={locker.timeout} />
                ) : (
                  "\u00A0"
                );
              const timeout =
                locker.status === "1"
                  ? `End: ${moment(locker.timeout).format(
                      "MMMM DD YYYY HH:mm:ss"
                    )}`
                  : "\u00A0";
              return (
                <Col
                  xs={12}
                  style={{
                    marginBottom: 15
                  }}
                  key={index}
                >
                  <Card
                    className={`${
                      locker.selected === "0" ? "" : "selected"
                    } ${classNameRended}`}
                  >
                    <Card.Body>
                      <Row className="text-muted" key={index}>
                        <Col>
                          <Badge pill variant="primary">
                            {`${sizeData.perhour}B / 60 minutes`}
                          </Badge>
                          <Badge pill variant="info">
                            {`${sizeData.nextminute}B / add one minute`}
                          </Badge>
                        </Col>
                        <Col className="align-right">
                          <Badge
                            pill
                            variant="dark"
                            className={`${classNameRended}`}
                          >
                            {locker.locker}
                          </Badge>
                        </Col>
                      </Row>
                      <Card.Text>
                        {locker.user === null || locker.status === "0"
                          ? "I Gear Locker"
                          : `Contact : ${locker.user.telephone}`}
                      </Card.Text>
                      <Card.Text className="align-right">
                        {startRended}
                      </Card.Text>
                      <Card.Text className="align-right">{timeout}</Card.Text>
                      <Card.Text className="align-right">{endRended}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Col>
        <Col xs={12} lg={4}>
          <h1>Size M</h1>
          {lockers
            .filter(item => item.size.size === "M")
            .map((locker, index) => {
              const sizeData = locker.size;
              const classNameRended = locker.status === "0" ? "" : "rended";
              const getDate =
                locker.status === "1"
                  ? moment(locker.timeout)
                      .subtract(1, "hours")
                      .format(formatDate)
                  : now.format(formatDate);
              const startRended =
                locker.status === "1" ? `Start: ${getDate}` : getDate;
              const endRended =
                locker.status === "1" ? (
                  <CountTimeRended timeout={locker.timeout} />
                ) : (
                  "\u00A0"
                );
              const timeout =
                locker.status === "1"
                  ? `End: ${moment(locker.timeout).format(
                      "MMMM DD YYYY HH:mm:ss"
                    )}`
                  : "\u00A0";
              return (
                <Col
                  xs={12}
                  style={{
                    marginBottom: 15
                  }}
                  key={index}
                >
                  <Card
                    className={`${
                      locker.selected === "0" ? "" : "selected"
                    } ${classNameRended}`}
                  >
                    <Card.Body>
                      <Row className="text-muted" key={index}>
                        <Col>
                          <Badge pill variant="primary">
                            {`${sizeData.perhour}B / 60 minutes`}
                          </Badge>
                          <Badge pill variant="info">
                            {`${sizeData.nextminute}B / add one minute`}
                          </Badge>
                        </Col>
                        <Col className="align-right">
                          <Badge
                            pill
                            variant="dark"
                            className={`${classNameRended}`}
                          >
                            {locker.locker}
                          </Badge>
                        </Col>
                      </Row>
                      <Card.Text>
                        {locker.user === null || locker.status === "0"
                          ? "I Gear Locker"
                          : `Contact : ${locker.user.telephone}`}
                      </Card.Text>
                      <Card.Text className="align-right">
                        {startRended}
                      </Card.Text>
                      <Card.Text className="align-right">{timeout}</Card.Text>
                      <Card.Text className="align-right">{endRended}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Col>
        <Col xs={12} lg={4}>
          <h1>Size L</h1>
          {lockers
            .filter(item => item.size.size === "L")
            .map((locker, index) => {
              const sizeData = locker.size;
              const classNameRended = locker.status === "0" ? "" : "rended";
              const getDate =
                locker.status === "1"
                  ? moment(locker.timeout)
                      .subtract(1, "hours")
                      .format(formatDate)
                  : now.format(formatDate);
              const startRended =
                locker.status === "1" ? `Start: ${getDate}` : getDate;
              const endRended =
                locker.status === "1" ? (
                  <CountTimeRended timeout={locker.timeout} />
                ) : (
                  "\u00A0"
                );
              const timeout =
                locker.status === "1"
                  ? `End: ${moment(locker.timeout).format(
                      "MMMM DD YYYY HH:mm:ss"
                    )}`
                  : "\u00A0";
              return (
                <Col
                  xs={12}
                  style={{
                    marginBottom: 15
                  }}
                  key={index}
                >
                  <Card
                    className={`${
                      locker.selected === "0" ? "" : "selected"
                    } ${classNameRended}`}
                  >
                    <Card.Body>
                      <Row className="text-muted" key={index}>
                        <Col>
                          <Badge pill variant="primary">
                            {`${sizeData.perhour}B / 60 minutes`}
                          </Badge>
                          <Badge pill variant="info">
                            {`${sizeData.nextminute}B / add one minute`}
                          </Badge>
                        </Col>
                        <Col className="align-right">
                          <Badge
                            pill
                            variant="dark"
                            className={`${classNameRended}`}
                          >
                            {locker.locker}
                          </Badge>
                        </Col>
                      </Row>
                      <Card.Text>
                        {locker.user === null || locker.status === "0"
                          ? "I Gear Locker"
                          : `Contact : ${locker.user.telephone}`}
                      </Card.Text>
                      <Card.Text className="align-right">
                        {startRended}
                      </Card.Text>
                      <Card.Text className="align-right">{timeout}</Card.Text>
                      <Card.Text className="align-right">{endRended}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Col>
      </Row>
    );
  }
}

UnitsComponent.propTypes = {
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
      timeout: PropTypes.string,
      status: PropTypes.string.isRequired,
      user: PropTypes.shape({
        _id: PropTypes.string,
        telephone: PropTypes.string
      })
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    lockers: state.locker
  };
}

export default connect(
  mapStateToProps,
  null
)(withScreenLoading(UnitsComponent));
