module.exports.prepareOperation = (operation) => {
    
    function ageOperation (request, response, next) {
        next(operation.age);
    }

    return Promise.resolve(ageOperation);
};