import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./locker.scss";
import { connect } from "react-redux";
import { setLockers } from "../actions/locker.js";

import lockerService from "../services/locker.js";
import { socket } from "../config/socket.js";
import UnitsComponent from "./UnitsComponent";
import MachineComponent from "./MachineComponent";

class LockerComponent extends Component {

  state = { loading: true }

  async componentDidMount() {
    await this.fetchLockers();
    socket.on("lockers", data => {
      const addSelectedKey = this.mapLocker(data);
      this.props.setLockers(addSelectedKey);
    });
  }

  fetchLockers = async () => {
    try {
      const locker = await lockerService.getAllLocker();
      const lockerData = await locker.data.lockers;
      const addSelectedKey = this.mapLocker(lockerData);
      this.props.setLockers(addSelectedKey);
      this.setState({
        loading: false
      })
    } catch (err) {
      alert("something has wrong");
      console.log(err);
    }
  };

  mapLocker = data => {
    return data.map(locker => {
      return {
        ...locker,
        selected: "0"
      };
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div style={{ paddingTop: 30 }}>
        <Container>
          <Row>
            <Col xs={12} lg={3}>
              <MachineComponent loading={loading} />
            </Col>
            <Col xs={12} lg={9}>
              <UnitsComponent loading={loading} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  null,
  { setLockers: setLockers }
)(LockerComponent);
