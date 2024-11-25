export const responseSuccess = (metaData = null, message = `oke`, code = 200) => {
   return {
      status: `success`,
      code: code,
      message: message,
      metaData: metaData,
      doc: `api.example.com`,
   };
};

export const responseError = (message = "Internal Server Error", code = 500, stack = null) => {
   return {
      status: `error`,
      code: code,
      message: message,
      stack: stack,
   };
};
