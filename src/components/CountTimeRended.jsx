import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

class CountTimeRended extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calRendedTime: ""
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.calRendedTime();
    }, 1000);
  }

  calRendedTime = () => {
    const { timeout } = this.props;
    const now = moment().valueOf();
    const diffTime = moment(timeout).valueOf() - now;
    const duration = moment.duration(diffTime, "milliseconds");

    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    this.setState({
      calRendedTime: `${hours} h ${minutes} m ${seconds} s`
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { calRendedTime } = this.state;
    return `Timeout: ${calRendedTime}`;
  }
}

CountTimeRended.propTypes = {
  loading: PropTypes.string
};

export default CountTimeRended;
