export const makeErrorResponse = (data = {}) => {
  return {
    status: 'error',
    data,
  };
};
