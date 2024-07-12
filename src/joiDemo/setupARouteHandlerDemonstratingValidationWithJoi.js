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

export function setupARouteHandlerDemonstratingValidationWithJoi(app) {
    app.post("/album", handlePOSTAlbumRequest);

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    function handlePOSTAlbumRequest(req, res) {
        const { error, value } = albumSchema.validate(req.body);
        if (error || !value) {
            res.status(400).json({ outcome: "failure", error });
            return;
        }

        res.json({
            outcome: "success",
            message:
                "your album submission was validated.  I would save it to database but this is just a demo.",
            validatedAlbum: value,
        });
    }
}
