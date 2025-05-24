import jwt from "jsonwebtoken";

export function generateJWT(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret not defined");
  }

  const isProfileCompleted = Boolean(user.name && user.surname && user.country);

  return jwt.sign(
    { userId: user._id, email: user.email, isProfileCompleted },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
}
