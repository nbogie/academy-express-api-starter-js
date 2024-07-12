import { albumSchema } from "./albumSchema.js";
//docs are at https://joi.dev/api/

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
                "Looks good!  I would save that album to database but this is just a demo.",
            validatedAlbum: value,
        });
    }
}
