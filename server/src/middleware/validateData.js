import { ZodError } from "zod";

export const validate =
  (schema, source = "body") =>
  async (req, res, next) => {
    try {
      const validatedData = await schema.parseAsync(req[source]);
      req[source] = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorsByField = error.errors.reduce((acc, err) => {
          const field = err.path[0];
          if (!acc[field]) {
            acc[field] = [];
          }
          acc[field].push(err.message);
          return acc;
        }, {});

        // Format validation errors
        const validationErrors = Object.entries(errorsByField).map(
          ([field, messages]) => {
            // For now instead of showing specific password validationError we will
            // show combined message, maybe it will change later
            if (field === "password") {
              return {
                field,
                message:
                  "Password must be 8+ chars, with upper/lowercase chars, number, and symbol.",
              };
            }
            return {
              field,
              message: messages.join(". "),
            };
          },
        );

        return res.status(400).json({
          message: "Validation failed",
          validationErrors,
        });
      }

      return res.status(500).json({
        message: "Internal server error during validation",
      });
    }
  };
