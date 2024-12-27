export interface IErrorObject {
  error: any;
  message: string;
  status: string | number;
}

export const modelErrorObject = (e: any): IErrorObject => {
  console.log(e);
  if (e.response && e.response.data && e.response.data.error && e.response.data.error_description) {
    return {
      error: e.response,
      message: e.response.data.error_description,
      status: e.response.status,
    };
  }
  
  if (e.response && e.response.data && e.response.data.error && e.response.data.message) {
    return {
      error: e.response.data,
      message: Array.isArray(e.response.data.message) ? e.response.data.message[0] : e.response.data.message,
      status: e.response.status,
    };
  }

  if (e.response && e.response.data && e.response.data.errorMessage) {
    return {
      error: e.response,
      message: e.response.data.errorMessage,
      status: e.response.status,
    };
  }
  
  if (e.data && e.errors && e.errors.length > 0) {
    return {
      error: e,
      message: e.errors[0].message,
      status: "error",
    };
  }

  if (e.message && e.code) {
    return {
      error: e,
      message: e.message.toString(),
      status: e.code,
    };
  }

  if (e.message) {
    return {
      error: e,
      message: e.message.toString(),
      status: "error",
    };
  }

  if (e.message) {
    return {
      error: e,
      message: e.message.toString(),
      status: "error",
    };
  }

  if (e.data) {
    if (e.data.statusCode && e.data.message) {
      return {
        error: e,
        message: e.data.message.toString(),
        status: e.data.statusCode,
      };
    }
  }

  if (typeof e === "string") {
    return {
      error: e,
      message: e,
      status: "error",
    };
  }

  return {
    error: e,
    message: JSON.stringify(e),
    status: "error",
  };
};
