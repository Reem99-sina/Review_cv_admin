import jwt from "jsonwebtoken";

type JwtPayload = {
  userId: string;
  role?: string;
};

export function generateToken(payload: JwtPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}