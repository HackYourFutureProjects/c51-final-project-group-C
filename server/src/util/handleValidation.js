export const validate = (schema, data) => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;

    const formattedErrors = {};
    for (const key in flattened) {
      formattedErrors[key] = flattened[key];
    }

    throw { status: 400, errors: formattedErrors };
  }
  return parsed.data;
};
