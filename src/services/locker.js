import { instance as API } from "../config/api";

export default {
  getAllLocker: async () => {
    const requestBody = {
      query: `query {
                lockers {
                    _id
                    locker
                    size {
                        size
                        perhour
                        nextminute
                    }
                    timeout
                    status
                    income
                    user {
                      telephone
                    }
                }
            }
        `
    };
    try {
      const locker = await API.post(`/graphql`, JSON.stringify(requestBody));
      return locker.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  rentLocker: async ({ _id, telephone, income, timeout, status }) => {
    const requestBody = {
      query: `mutation
        {
          createUserAndRentLocker(locker: {
            _id: "${_id}", 
            telephone: "${telephone}", 
            income: ${income}, 
            timeout: "${timeout}", 
            status : "${status}"
            }) 
          {
            _id,
            locker,
            size {
              size
            },
            income,
            timeout,
            status,
            user {
              telephone
            }
          }
        }
      `
    };
    try {
      const rent = await API.post(`/graphql`, JSON.stringify(requestBody));
      return rent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
