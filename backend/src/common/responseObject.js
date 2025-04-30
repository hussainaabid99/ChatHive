export const InternalServerErrorResponse = (error) => {
  return {
    success: false,
    err: error,
    data: {},
    message: "Internal Server Error",
  };
};

export const CustomErrorResponse = (error) => {
  if (!error.explanation && !error.message) {
    return InternalServerError(error);
  }
  return {
    success: false,
    err: error.explanation,
    data: {},
    message: error.message,
  };
};

export const SuccessResponse = (data, message) => {
  return {
    success: true,
    message,
    data,
    err: {},
  };
};
