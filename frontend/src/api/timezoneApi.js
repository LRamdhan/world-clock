import axios from "axios";
import { BACKEND_URL } from "../config/env";

const timezoneApi = {
  getTimezoneByCountry: async (country = "") => {
    const result = await axios.get(`${BACKEND_URL}/timezone/?key=${country}`);
    return result.data.data
  },

  getTimeByTimezone: async (timezone = "", success) => {
    let result = await axios.get(`${BACKEND_URL}/time/?key=${timezone}`);
    if(typeof result.data === 'string') throw new Error('Timezone is invalid or not found')

    result = result.data

    let city = result.timeZone.split('/');
    city = city[1];
    const time = new Date(result.dateTime);
    let hour = result.hour;
    let twelve = "am";
    if(hour >= 12) {
        hour = hour - 12;
        twelve = "pm";
    }
    const minute = result.minute
    const second = result.seconds
    const date = `${time.getDate()} ${time.toLocaleString('default', { month: 'long' })} ${time.getFullYear()}`;

    success()

    return {
      city,
      hour,
      minute,
      second,
      ampm: twelve,
      date
    }
  }
}

export default timezoneApi