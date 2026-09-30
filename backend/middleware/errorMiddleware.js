import responseUtils from "../utils/responseUtils.js"

const errorMiddleware = (err, req, res, next) => {
  if(err.errCode === 400) {
    res.status(400).json(responseUtils.error(err.message))
  } else {
    res.status(500).json(responseUtils.error(err.message))
  }
}

export default errorMiddleware