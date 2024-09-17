import { Request, Response, NextFunction } from "express";

const convertIdToNumber = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id) {
      (req as any).idNumber = Number(req.params.id);        }
    next();
};

export default convertIdToNumber;
