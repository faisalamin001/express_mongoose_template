module.exports = {
  successResponse: (res, statusCode, message, data) => {
    return res.status(200).send({
      success: true,
      status: statusCode,
      message,
      data,
    });
  },
  infoResponse: (res, success, statusCode, message, data) => {
    return res.status(statusCode || 200).send({
      success,
      status: statusCode,
      message,
      ...data,
    });
  },
  paginatedRespone: () => {
    // will work on this later
  },
};
