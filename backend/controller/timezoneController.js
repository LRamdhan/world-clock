import { TIME_URL } from "../config/env.js"
import poolPg from "../config/postgreConfig.js"
import responseUtils from "../utils/responseUtils.js"

const timezoneController = {
  searchTimezone: async (req, res, next) => {
    try {
      // api spec
      // GET
      // query : 
      //  - key
      // response :
      // {
      //   status: 200,
      //   message: "",
      //   data: [
      //     {
      //       country_code: "",
      //       country_name: "",
      //       zone: ""
      //     }
      //   ]
      // }

      // validation
      const keyword = req.query.key
      if(!keyword && (keyword !== "")) {
        const error = new Error("key query is required")
        error.errCode = 400
        throw error
      }

      // query data
      const result = await poolPg.query(
        `
          SELECT * FROM time_zone WHERE country_name ILIKE $1 LIMIT 20
        `,
        [`%${keyword}%`]
      );

      // response
      res.json(responseUtils.success(result.rows.length === 0 ? [] : result.rows));
    } catch(err) {
      next(err)
    }
  },

  // proxy
  searchTime: async (req, res, next) => {
    try {
      // validation
      const keyword = req.query.key
      if(!keyword && (keyword !== "")) {
        const error = new Error("key query is required")
        error.errCode = 400
        throw error
      }

      // api fetching
      const fetchResult = await fetch(`${TIME_URL}?timeZone=${keyword}`)
        .then((response) => response.json())

      // response
      res.status(200).json(fetchResult)

    } catch(err) {
      next(err)
    }
  }
}

export default timezoneController