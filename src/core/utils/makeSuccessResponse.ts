export const makeSuccessResponse = (data = {}) => {
  return {
    status: 'success',
    data,
  };
};
