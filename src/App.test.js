import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import LockerComponent from "./components/LockerComponent.jsx";

import { mockLockers } from "./services/__mocks__/locker";
import { setCost, setMoney, deleteMoney } from "./actions/cost";

import cost from "./reducers/__mock__/cost";

import {
  setStatusSuccessModal,
  setStatusUnAvailableModal,
  setChangeToSuccessModal
} from "./actions/modal";

const mockStore = configureMockStore([thunk]);

Enzyme.configure({ adapter: new Adapter() });

describe("Test Case 1", () => {
  let store;
  let costReduce;

  beforeEach(() => {
    // mock data
    store = mockStore({
      locker: [],
      cost: { cost: {}, money: 0 },
      modal: { successModal: false, unAvailableModal: false, change: 0 },
      loading: false
    });
  });

  test("renders", () => {
    // check component has exists
    const wrapper = shallow(
      <Provider store={store}>
        <LockerComponent />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });

  test("Request Locker", async () => {
    // mock api
    await store.dispatch(mockLockers());
    const actions = store.getActions();

    //expect action redux
    expect(actions[0].type).toEqual("UPDATE_LOCKER_SELECTED");
  });

  test("Set money and select locker", async () => {
    // mock insert cash 1000
    await store.dispatch(setMoney(1000));
    // mock locker
    await store.dispatch(setCost());
    const actions = store.getActions();
    const costs = cost(undefined, {
      type: "UPDATE_MONEY",
      payload: {
        money: 1000
      }
    });
    // expect insert cash 1000 success
    expect(costs.money).toEqual(1000);
    // mock locker
    costReduce = cost(undefined, {
      type: "UPDATE_COST",
      payload: {
        cost: {
          _id: "5ceea163de8adf2ef81d502b",
          locker: 1,
          size: {
            _id: "5cee905b5162c31b700a185a",
            size: "S",
            perhour: 50,
            nextminute: 25
          },
          income: 700,
          status: "1",
          timeout: "2019-06-02T18:49:29.166",
          user: {
            _id: "5cf016743caf73157c995336",
            telephone: "0850300073"
          },
          time: 60,
          change: 950
        }
      }
    });
    //expect time is 60 minutes
    expect(costReduce.cost.time).toEqual(60);
    //expect charge is 50 bath perhour
    expect(costReduce.cost.size.perhour).toEqual(50);
    //expect action redux
    expect(actions[0].type).toEqual("UPDATE_MONEY");
    //expect action redux
    expect(actions[1].type).toEqual("UPDATE_COST");
  });

  test("Confirm Order And Rent Success", async () => {
    //mock open success modal
    await store.dispatch(setStatusSuccessModal(true));
    //call function calculateChange like cash and coin
    const change = calculateChangeCashAndCoin(costReduce.cost.change);
    //expect get five hundred cash
    expect(change[1]).toEqual(1);
    //expect get one hundred cash
    expect(change[2]).toEqual(4);
    //expect get fifty cash
    expect(change[3]).toEqual(1);

    await store.dispatch(setChangeToSuccessModal(0));
    await store.dispatch(deleteMoney());

    const actions = store.getActions();

    //expect action redux
    expect(actions[0].type).toEqual("UPDATE_MODAL_SUCCESS");
    expect(actions[1].type).toEqual("UPDATE_CHANGE_SUCCESS");
    expect(actions[2].type).toEqual("DELETE_MONEY");
  });
});

describe("Test Case 2", () => {
  let store;
  let costReduce;

  beforeEach(() => {
    // mock data
    store = mockStore({
      locker: [],
      cost: { cost: {}, money: 0 },
      modal: { successModal: false, unAvailableModal: false, change: 0 },
      loading: false
    });
  });

  test("renders", () => {
    // check component has exists
    const wrapper = shallow(
      <Provider store={store}>
        <LockerComponent />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });

  test("Request Locker", async () => {
    // mock api
    await store.dispatch(mockLockers());
    const actions = store.getActions();

    //expect action redux
    expect(actions[0].type).toEqual("UPDATE_LOCKER_SELECTED");
  });

  test("Set money and select locker", async () => {
    // mock insert cash 100
    await store.dispatch(setMoney(100));
    // mock locker
    await store.dispatch(setCost());
    const actions = store.getActions();
    const costs = cost(undefined, {
      type: "UPDATE_MONEY",
      payload: {
        money: 100
      }
    });
    // expect insert cash 100 success
    expect(costs.money).toEqual(100);
    // mock locker
    costReduce = cost(undefined, {
      type: "UPDATE_COST",
      payload: {
        cost: {
          _id: "5ceea163de8adf2ef81d502b",
          locker: 1,
          size: {
            _id: "5cee905b5162c31b700a185a",
            size: "S",
            perhour: 50,
            nextminute: 25
          },
          income: 700,
          status: "1",
          timeout: "2019-06-02T18:49:29.166",
          user: {
            _id: "5cf016743caf73157c995336",
            telephone: "0850300073"
          },
          time: 61,
          change: 25
        }
      }
    });
    //expect time is 60 minutes
    expect(costReduce.cost.time).toEqual(61);
    //expect charge is 50 bath perhour
    expect(costReduce.cost.size.perhour).toEqual(50);
    //expect next minute
    expect(costReduce.cost.size.nextminute).toEqual(25);
    //expect total perhour and nextminute
    expect(
      parseInt(costReduce.cost.size.perhour + costReduce.cost.size.nextminute)
    ).toEqual(75);
    //expect action redux
    expect(actions[0].type).toEqual("UPDATE_MONEY");
    //expect action redux
    expect(actions[1].type).toEqual("UPDATE_COST");
  });

  test("Confirm Order And Rent Success", async () => {
    //mock open success modal
    await store.dispatch(setStatusSuccessModal(true));
    //call function calculateChange like cash and coin
    const change = calculateChangeCashAndCoin(costReduce.cost.change);
    //expect get twenty cash
    expect(change[4]).toEqual(1);
    //expect get one bath coin
    expect(change[6]).toEqual(1);

    await store.dispatch(setChangeToSuccessModal(0));
    await store.dispatch(deleteMoney());

    const actions = store.getActions();

    //expect action redux
    expect(actions[0].type).toEqual("UPDATE_MODAL_SUCCESS");
    expect(actions[1].type).toEqual("UPDATE_CHANGE_SUCCESS");
    expect(actions[2].type).toEqual("DELETE_MONEY");
  });
});

describe("Test Case 3", () => {
  let store;
  let costReduce;

  beforeEach(() => {
    // mock data
    store = mockStore({
      locker: [],
      cost: { cost: {}, money: 0 },
      modal: { successModal: false, unAvailableModal: false, change: 0 },
      loading: false
    });
  });

  test("renders", () => {
    // check component has exists
    const wrapper = shallow(
      <Provider store={store}>
        <LockerComponent />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });

  test("Request Locker", async () => {
    // mock api
    await store.dispatch(mockLockers());
    const actions = store.getActions();

    //expect action redux
    expect(actions[0].type).toEqual("UPDATE_LOCKER_SELECTED");
  });

  test("Set money and select locker", async () => {
    // mock insert cash 100
    await store.dispatch(setMoney(100));
    // mock locker
    await store.dispatch(setCost());
    const actions = store.getActions();
    const costs = cost(undefined, {
      type: "UPDATE_MONEY",
      payload: {
        money: 100
      }
    });
    // expect insert cash 100 success
    expect(costs.money).toEqual(100);
    // mock locker
    costReduce = cost(undefined, {
      type: "UPDATE_COST",
      payload: {
        cost: {
          _id: "5ceea163de8adf2ef81d5026",
          locker: 2,
          size: {
            _id: "5cee905b5162c31b700a185b",
            size: "M",
            perhour: 100,
            nextminute: 50
          },
          income: 700,
          status: "0",
          timeout: "2019-06-02T18:49:29.166",
          user: {
            _id: "5cf016743caf73157c995336",
            telephone: "0850300073"
          },
          time: 0,
          change: 100
        }
      }
    });
    //expect time is 120 minutes
    expect(costReduce.cost.time).toEqual(120);
    //expect charge is 100 bath perhour
    expect(costReduce.cost.size.perhour).toEqual(100);
    //expect next minute
    expect(costReduce.cost.size.nextminute).toEqual(50);
    //expect total perhour and nextminute because user insert 100 bath but machine need 150 bath
    expect(
      costReduce.cost.size.persour + costReduce.cost.size.nextminute
    ).toEqual(100);
    //expect action redux
    expect(actions[0].type).toEqual("UPDATE_MONEY");
    //expect action redux
    expect(actions[1].type).toEqual("UPDATE_COST");
  });
});

describe("Test Case 4", () => {
  let store;
  let costReduce;

  beforeEach(() => {
    // mock data
    store = mockStore({
      locker: [],
      cost: { cost: {}, money: 0 },
      modal: { successModal: false, unAvailableModal: false, change: 0 },
      loading: false
    });
  });

  test("renders", () => {
    // check component has exists
    const wrapper = shallow(
      <Provider store={store}>
        <LockerComponent />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });

  test("Request Locker", async () => {
    // mock api
    await store.dispatch(mockLockers());
    const actions = store.getActions();

    costReduce = cost(undefined, {
      type: "UPDATE_COST",
      payload: {
        cost: {
          _id: "5ceea163de8adf2ef81d5026",
          locker: 2,
          size: {
            _id: "5cee905b5162c31b700a185b",
            size: "M",
            perhour: 100,
            nextminute: 50
          },
          income: 700,
          status: "1",
          timeout: "2019-06-02T18:49:29.166",
          user: {
            _id: "5cf016743caf73157c995336",
            telephone: "0850300073"
          },
          time: 0,
          change: 100
        }
      }
    });
    //expect status 1 because 0 is available and 1 is unavailable
    expect(costReduce.cost.status).toEqual("0");
    //expect action redux
    expect(actions[0].type).toEqual("UPDATE_LOCKER_SELECTED");
  });
});

describe("Test Case 5", () => {
  let store;
  let costReduce;

  beforeEach(() => {
    // mock data
    store = mockStore({
      locker: [],
      cost: { cost: {}, money: 0 },
      modal: { successModal: false, unAvailableModal: false, change: 0 },
      loading: false
    });
  });

  test("renders", () => {
    // check component has exists
    const wrapper = shallow(
      <Provider store={store}>
        <LockerComponent />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });

  test("Request Locker", async () => {
    // mock api
    await store.dispatch(mockLockers());
    const actions = store.getActions();

    //expect action redux
    expect(actions[0].type).toEqual("UPDATE_LOCKER_SELECTED");
  });

  test("Set money and select locker", async () => {
    // mock insert cash 100
    await store.dispatch(setMoney(400));
    // mock locker
    await store.dispatch(setCost());
    const actions = store.getActions();
    const costs = cost(undefined, {
      type: "UPDATE_MONEY",
      payload: {
        money: 400
      }
    });
    // expect insert cash 100 success
    expect(costs.money).toEqual(400);
    // mock locker
    costReduce = cost(undefined, {
      type: "UPDATE_COST",
      payload: {
        cost: {
          _id: "5ceea163de8adf2ef81d502b",
          locker: 12,
          size: {
            _id: "5cee905b5162c31b700a185a",
            size: "L",
            perhour: 100,
            nextminute: 150
          },
          income: 700,
          status: "0",
          timeout: "2019-06-02T18:49:29.166",
          user: {
            _id: "5cf016743caf73157c995336",
            telephone: "0850300073"
          },
          time: 145,
          change: 0
        }
      }
    });
    //expect time is 60 minutes
    expect(costReduce.cost.time).toEqual(145);
    //expect charge is 50 bath perhour
    expect(costReduce.cost.size.perhour).toEqual(100);
    //expect next minute
    expect(costReduce.cost.size.nextminute).toEqual(150);
    //expect total perhour and nextminute
    const total = parseInt(costReduce.cost.size.perhour * 4);
    expect(total).toEqual(400);
    //expect action redux
    expect(actions[0].type).toEqual("UPDATE_MONEY");
    //expect action redux
    expect(actions[1].type).toEqual("UPDATE_COST");
  });

  test("Confirm Order And Rent Success", async () => {
    //mock open success modal
    await store.dispatch(setStatusSuccessModal(true));
    //call function calculateChange like cash and coin
    const change = calculateChangeCashAndCoin(costReduce.cost.change).filter(
      cash => cash !== 0
    );
    //expect not receiving change
    expect(change.length).toEqual(0);

    await store.dispatch(setChangeToSuccessModal(0));
    await store.dispatch(deleteMoney());

    const actions = store.getActions();

    //expect action redux
    expect(actions[0].type).toEqual("UPDATE_MODAL_SUCCESS");
    expect(actions[1].type).toEqual("UPDATE_CHANGE_SUCCESS");
    expect(actions[2].type).toEqual("DELETE_MONEY");
  });
});

// this function for calculate cash and coin.
const calculateChangeCashAndCoin = change => {
  let cash = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
  let changeCash = [];

  if (change > 0) {
    cash.forEach((value, index) => {
      const getCash = parseInt(cash[index]);
      changeCash[index] = parseInt(change / getCash);
      change = change - changeCash[index] * getCash;
    });
  }

  return changeCash;
};
