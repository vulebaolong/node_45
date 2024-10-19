export const responseSuccess = (metaData = null, message = `oke`, code = 200) => {
   return {
      status: `success`,
      code: code,
      message: message,
      metaData: metaData,
      doc: `api.example.com`,
   };
};
