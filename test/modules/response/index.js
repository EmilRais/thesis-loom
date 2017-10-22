module.exports.prepareOperation = (operation) => {
    
    function responseOperation (request, response, next) {
        response.status(operation.status).end(operation.text);
    }

    return Promise.resolve(responseOperation);
};