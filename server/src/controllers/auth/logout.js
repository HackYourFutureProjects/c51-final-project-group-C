export async function logout(req, res) {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
}
