

export const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const data =
            source == "query" ? req.query : source == 'params' ?req.params : req.body;

        const result = schema.safeParse(data)

        if (!result.success) {
            return res.status(400).send({
                success: false,
                errors: result.error.issues
            })
        }
        req.validatedData = result.data
        next()
    }
}