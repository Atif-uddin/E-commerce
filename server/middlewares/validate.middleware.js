

export const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const data =
            source == "query" ? req.query : req.body;

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