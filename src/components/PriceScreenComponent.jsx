import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirmLocker } from "../actions/locker.js";

import "./screen.scss";

const PriceScreenComponent = ({
  loading,
  lockerSelected,
  costSelected,
  money,
  lockers,
  confirmLocker
}) => {
  let change = 0;
  let minute = 0;
  let time = 0;
  let excess = 0;
  let debt = 0;
  let selectedCost = false;
  let selectedLocker =
    lockers.length > 0
      ? lockers.filter(locker => locker.selected === "1")[0]
      : {};
  if (Object.keys(costSelected).length !== 0) {
    selectedCost = true;
    if (money > costSelected.size.perhour) {
      const substractExcess = money - costSelected.size.perhour;
      minute = substractExcess / costSelected.size.nextminute;
      if (minute > 0) {
        const modExcess = substractExcess % costSelected.size.nextminute;
        excess =
          modExcess === 0
            ? 0
            : parseInt(costSelected.size.perhour) +
              (parseInt(minute) + 1) * parseInt(costSelected.size.nextminute) -
              parseInt(money);
        change =
          modExcess === 0
            ? 0
            : money -
              (costSelected.size.perhour +
                costSelected.size.nextminute * parseInt(minute));
        time = 60 + minute;
      } else {
        change = money - costSelected.size.perhour;
        time = 60;
      }
      selectedLocker = { ...selectedLocker, change: change, time: time };
      confirmLocker(selectedLocker);
    } else if (money === costSelected.size.perhour) {
      time = 60;
      selectedLocker = { ...selectedLocker, change: change, time: time };
      confirmLocker(selectedLocker);
    } else if (money < costSelected.size.perhour) {
      debt = costSelected.size.perhour - money;
      confirmLocker({});
    }
  }
  return (
    <div className="screen">
      <div className="cost">
        <div className="price">{`${
          !selectedCost ? "0" : costSelected.size.perhour
        }B`}</div>
        <div className="detail">
          {!selectedCost ? "" : `${costSelected.size.nextminute}B next minute`}
        </div>
        <div className="detail">
          {!selectedCost ? "" : `Timeout : ${parseInt(time)} minutes`}
        </div>
      </div>
      <div className="pay">
        <div className="price">{`${money}B`}</div>
        <div className={`detail ${debt > 0 ? "fail" : "correct"}`}>
          {selectedCost &&
            `${debt > 0 ? `Lacking ${debt}` : `Your change ${change}`}B`}
        </div>
        <div className={`detail ${debt > 0 ? "fail" : "correct"}`}>
          {selectedCost &&
            `${excess > 0 ? `Add ${parseInt(excess)}B for one minute` : ``}`}
        </div>
      </div>
    </div>
  );
};

PriceScreenComponent.propTypes = {
  costSelected: PropTypes.shape({
    _id: PropTypes.string,
    locker: PropTypes.number,
    size: PropTypes.shape({
      size: PropTypes.string,
      perhour: PropTypes.number,
      nextminute: PropTypes.number
    })
  }),
  loading: PropTypes.bool.isRequired,
  money: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    costSelected: state.cost.cost,
    money: state.cost.money,
    lockers: state.locker
  };
}

export default connect(
  mapStateToProps,
  { confirmLocker: confirmLocker }
)(PriceScreenComponent);
