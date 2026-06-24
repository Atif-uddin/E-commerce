

export const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const data =
            source == "query" ? req.query : source == 'params' ? req.params : req.body;

        console.log("SOURCE:", source);
        console.log("BODY:", req.body);
        console.log("PARAMS:", req.params);
        console.log("DATA:", data);

        const result = schema.safeParse(data)

        if (!result.success) {
            return res.status(400).send({
                success: false,
                message: result.error.issues[0].message,
                errors: result.error.issues
            })
        }
        if (source === "params") {
            req.validatedParams = result.data;
        } else {
            req.validatedData = result.data;
        }
        next()
    }
}