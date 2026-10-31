// Axios puts the server's JSON body in error.response.data.
// Our backend always sends { success: false, message }.
export function getErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
}