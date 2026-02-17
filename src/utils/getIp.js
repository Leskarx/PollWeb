const getClientIP = (req) => {
  // console.log(req);
  
    return (
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress
    );
  };
  
export default getClientIP;
  