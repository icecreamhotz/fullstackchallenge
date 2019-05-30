import React, { Component } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import "./locker.scss";
import { connect } from "react-redux";
import { setLockers } from "../actions/locker.js";

import lockerService from "../services/locker.js";
import { socket } from '../config/socket.js'
import UnitsComponent from "./UnitsComponent";
import MachineComponent from "./MachineComponent";

class LockerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    await this.fetchLockers();
     socket.emit('sent-message', "eiei")
     socket.on('new-message', (messageNew) => {
      console.log(messageNew);
    })
  }

  fetchLockers = async () => {
    const locker = await lockerService.getAllLocker();
    const lockerData = locker.data.lockers

    const addSelectedKey = lockerData.map(locker => {
      return {
        ...locker,
        selected: "0"
      }
    })

    this.props.setLockers(addSelectedKey)

    this.setState({
      loading: false
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div style={{ paddingTop: 30 }}>
        <Container>
          <Row>
            <Col xs={3}>
              <MachineComponent loading={loading} />
            </Col>
            <Col xs={9}>
              <UnitsComponent loading={loading} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default  connect(
  null,
  { setLockers: setLockers }
)(LockerComponent);
