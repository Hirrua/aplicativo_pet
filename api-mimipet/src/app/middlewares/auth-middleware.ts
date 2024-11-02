import { Request, Response, NextFunction } from "express";
import Auth from "../utils/auth";
import ErrorExtention from "../utils/error";

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new ErrorExtention(404, "Token não informado")
  }

  const token = authHeader.replace(/^Bearer\s+/, "")

  try {
    const tokenGenerate = new Auth()
    tokenGenerate.authenticateToken(token)
    next()
  } catch (error) {
    res.status(401).json({ message: "Falha na autenticação: " + error })
  }
}

export default authenticationMiddleware
