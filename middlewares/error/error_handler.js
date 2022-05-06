const errorHandler = (err, req, res, next) => {
    let error = err;
    console.log(err.name + ":" + err.message);
    let message = err.message;

    res.status(400)
      .json({
        success: false,
        message: message
      })
  }
  
  export default errorHandler
  