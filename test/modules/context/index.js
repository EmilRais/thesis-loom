module.exports.prepareOperation = (operation, context) => {
    
    function contextOperation (request, response, next) {
        next(context);
    }

    return Promise.resolve(contextOperation);
};