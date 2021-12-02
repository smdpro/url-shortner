const Joi = require('joi');
const { isNumber } = require('util');

const errorMapper= (errors) => {
    const usefulErrors = [];
    errors.map((error) => {
        let path=error.path.filter(c=>!isNumber(c));
        let len = (error.type.search('min') >= 0 || error.type.search('max') >= 0)
        if(path.length>0)
        usefulErrors.push({
            message: `error.${path.join('.')}.${len?error.type+'.'+error.context.limit:error.type}`
        });
       
    });
    return usefulErrors;
};

module.exports =   (values, schema) => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(values, schema, options);
    return error ?
        errorMapper(error.details) :
        null;
}