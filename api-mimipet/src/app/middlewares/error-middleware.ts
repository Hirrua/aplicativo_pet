import { Request, Response, NextFunction } from "express"
import ErrorExtention from "../utils/error"

const httpErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const { status, message } =  err as ErrorExtention
    res.status(status || 500).json({ message })
}

export default httpErrorMiddleware