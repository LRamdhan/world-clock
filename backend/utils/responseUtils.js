const responseUtils = {
  success: (data = "") => {
    return {
      status: "success",
      message: "operation success",
      data
    }
  },

  error: (message = "operations failed") => {
    return {
      status: "failed",
      message: message,
      data: ""
    }
  }
}

export default responseUtils