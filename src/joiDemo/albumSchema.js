import Joi from "joi";
//docs are at https://joi.dev/api/

//This "schema" object will be used to validate that incoming album objects meet certain criteria.
//Note that it is a bit restrictive.  In reality we'd want to support spaces and other punctuation in album artist field, etc.
export const albumSchema = Joi.object().keys({
    artist: Joi.string().min(1).max(30).required(),
    title: Joi.string()
        .min(1)
        .max(255)
        .pattern(/^[a-zA-Z \-.,"']+$/)
        .required(),
    year: Joi.number().integer().min(1800).required(),
});
