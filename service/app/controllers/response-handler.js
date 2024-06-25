
export const setResponse = (data, response) => {
    response.status(200);
    response.json(data);
}

export const setError = (err, response) => {
    console.log(err);
    response.status(500);
    response.json({
        error: {
            code: 'InternalServerError',
            message: 'Error occured while processing the request'
        }
    })
}

export const setBadRequest = (err, response) => {
    console.error(err);
    response.status(400);
    response.json({
        error: {
            code: 'Bad Request',
            message: "Check request - request not defined"
        }
    });
}

export const setNotFound = (data, response) => {
    response.status(404);
    response.json(data);
}

export const setSuccess = (data, response) => {
    response.status(201);
    response.json(data);
}