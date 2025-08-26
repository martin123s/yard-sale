import jwt from 'jsonwebtoken';


export const generateJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "7days",
  });

  res.cookie("token", token, {
    httpOnly: true, // avoid xss attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // avoid csrf attack
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
}