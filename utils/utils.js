const SendResponse = (res, status = 200, message, data = [], error = [], success = true) => {

    const response = {
        status: status ? status : 400,
        success: success ? success : false,
        message: message ? message : "",
        data: data ? data : null,
        error: error ? error : null
    };

    return res.status(status).json(response);
};

const SendError = (err, req, res, next) => {

    let errorMessage = err.message ? err.message : "Something went wrong";
    const errorStatus = err.status ? err.status : 500;

    if (Array.isArray(err)) {
        errorMessage = err.map((e) => e.message);
    }
    res.status(errorStatus).json({ success: false, message: errorMessage.toString() });
    next();
};

const PageNotFound = (req, res, next) => {
    res.send("Page Not Found");
    next();
};

const generateDate = () => {
    return new Date();
};

module.exports = { SendResponse, SendError, PageNotFound, generateDate };