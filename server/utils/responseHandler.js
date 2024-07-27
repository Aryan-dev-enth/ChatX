const successHandler = (res, data, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
        status: 'success',
        message,
        data
    });
};

const messageHandler = (res, message, statusCode = 200) => {
    res.status(statusCode).json({
        status: 'pending',
        message
    });
};

const errorHandler = (res, error) => {
    const statusCode = error && error.statusCode ? error.statusCode : 500;
    const message = error && error.message ? error.message : 'An error occurred';

    const response = {
        status: 'error',
        message,
    };

    console.error('Error:', error);

    res.status(statusCode).json(response);
};

export { successHandler, errorHandler, messageHandler };
