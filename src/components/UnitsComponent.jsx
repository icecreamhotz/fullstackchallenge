import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { connect } from "react-redux";

import withScreenLoading from "./withScreenLoading";

class UnitsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lockers: props.lockers || [],
      now: moment()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.setCurrentTime(), 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lockers !== nextProps.lockers) {
      this.setState({
        lockers: nextProps.lockers
      });
    }
  }

  setCurrentTime = () => {
    this.setState({ now: moment() });
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { now, lockers } = this.state;
    const getDate = now.format("ddd MMM DD YYYY");
    const getTime = now.format("HH:mm:ss");
    return (
      <Row>
        <Col xs={4}>
          <h1>Size S</h1>
        </Col>
        <Col xs={4}>
          <h1>Size M</h1>
        </Col>
        <Col xs={4}>
          <h1>Size L</h1>
        </Col>
        {lockers.map((locker, index) => {
          const sizeData = locker.size;
          return (
            <Col
              xs={4}
              style={{
                marginBottom: 15
              }}
              key={index}
            >
              <Card className={locker.selected === "0" ? "" : "selected"}>
                <Card.Body>
                  <Row className="text-muted" key={index}>
                    <Col>
                      <Badge pill variant="primary">
                        {`${sizeData.perhour}B / 60 minutes`}
                      </Badge>
                      <Badge pill variant="info">
                        {`${sizeData.nextminute}B / 1 minute after 60 minutes`}
                      </Badge>
                    </Col>
                    <Col className="align-right">
                      <Badge pill variant="dark">
                        {locker.locker}
                      </Badge>
                    </Col>
                  </Row>
                  <Card.Text>I Gear Locker</Card.Text>
                  <Card.Text className="align-right">{getDate}</Card.Text>
                  <Card.Text className="align-right">{getTime}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
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
      timeout: PropTypes.instanceOf(Date),
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
