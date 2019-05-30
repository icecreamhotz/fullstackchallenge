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
                    status
                    income
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
  }
};
