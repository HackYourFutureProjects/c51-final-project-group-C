export function setJwtCookie(res, token) {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("jwt", token, {
    httpOnly: isProduction,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 👈 1 day
  });
}
