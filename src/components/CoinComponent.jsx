import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { setMoney } from "../actions/cost.js";
import "./money.scss";
import "./locker.scss";

const LoadingContent = () => (
  <div className="coin-container" style={{ paddingTop: 20 }}>
    <div className="shimmerBG content-line-common price endcoin-header" />
    <Row noGutters={true}>
      <Col>
        <div className="shimmerBG content-line-common price endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common price endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common price endcommon" />
      </Col>
      <Col>
        <div className="shimmerBG content-line-common price endcommon" />
      </Col>
    </Row>
    <div
      className="shimmerBG content-line-common price endcoin-header"
      style={{ marginTop: 20 }}
    />
    <Row noGutters={true}>
      <Col xs={4}>
        <div className="shimmerBG content-line-common price endcommon" />
      </Col>
      <Col xs={4}>
        <div className="shimmerBG content-line-common price endcommon" />
      </Col>
      <Col xs={4}>
        <div className="shimmerBG content-line-common price endcommon" />
      </Col>
    </Row>
    <Row noGutters={true}>
      <Col xs={6}>
        <div className="shimmerBG content-line-common price endcommon" />
      </Col>
      <Col xs={6}>
        <div className="shimmerBG content-line-common price endcommon" />
      </Col>
    </Row>
  </div>
);

const CoinComponent = ({ setMoney, loading }) => {
  const handleClickAddMoney = useCallback(
    money => {
      setMoney(money);
    },
    [setMoney]
  );

  if (loading) return <LoadingContent />;

  return (
    <div className="coin-container">
      <h6>Coin</h6>
      <div className="coin bronze" onClick={() => handleClickAddMoney(1)}>
        <p>1</p>
      </div>
      <div className="coin brown" onClick={() => handleClickAddMoney(2)}>
        <p>2</p>
      </div>
      <div className="coin silver" onClick={() => handleClickAddMoney(5)}>
        <p>5</p>
      </div>
      <div className="coin gold" onClick={() => handleClickAddMoney(10)}>
        <p>10</p>
      </div>
      <h6>Cash</h6>
      <Row noGutters={true}>
        <Col xs={4}>
          <div
            className="cash c-bronze"
            onClick={() => handleClickAddMoney(20)}
          >
            <p>20</p>
          </div>
        </Col>
        <Col xs={4}>
          <div className="cash c-blue" onClick={() => handleClickAddMoney(50)}>
            <p>50</p>
          </div>
        </Col>
        <Col xs={4}>
          <div
            className="cash c-orange"
            onClick={() => handleClickAddMoney(100)}
          >
            <p>100</p>
          </div>
        </Col>
      </Row>
      <Row noGutters={true}>
        <Col xs={6}>
          <div
            className="cash bigger c-purple"
            onClick={() => handleClickAddMoney(500)}
          >
            <p>500</p>
          </div>
        </Col>
        <Col xs={6}>
          <div
            className="cash bigger c-gray"
            onClick={() => handleClickAddMoney(1000)}
          >
            <p>1000</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

CoinComponent.propTypes = {
  setMoney: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  null,
  { setMoney: setMoney }
)(CoinComponent);
