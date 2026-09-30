import poolPg from "../config/postgreConfig.js"
import responseUtils from "../utils/responseUtils.js"

const cityController = {
  search: async (req, res, next) => {
    try {
      // api spec
      // GET
      // query : 
      //  -q
      // response :
      // {
      //   status: 200,
      //   message: "",
      //   data: [
      //     {
      //       id: "",
      //       name: "",
      //       country: ""
      //     }
      //   ]
      // }

      // validation
      const keyword = req.query.q
      if(!keyword && (keyword !== "")) {
        const error = new Error("q query is required")
        error.errCode = 400
        throw error
      }

      // query data
      const result = await poolPg.query(
        `
          SELECT * FROM city WHERE name ILIKE $1 LIMIT 20
        `,
        [`%${keyword}%`]
      );

      // response
      res.json(responseUtils.success(result.rows.length === 0 ? [] : result.rows));
    } catch(err) {
      next(err)
    }
  }
}

export default cityController