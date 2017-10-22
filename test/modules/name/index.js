module.exports.prepareOperation = (operation) => {

    function nameOperation (request, response, next) {
        next(operation.name);
    }

    return Promise.resolve(nameOperation);
};