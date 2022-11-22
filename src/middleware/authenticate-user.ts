
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ERROR } from '../common/global-constants';
import { verifyJwt } from '../helpers/jwt.helper';
import { logsErrorAndUrl, responseGenerators } from '../lib';
import Role from '../models/role.model';
import Sessions from '../models/session.model';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(responseGenerators({}, StatusCodes.UNAUTHORIZED, ERROR.PROVIDE_TOKEN_ERROR, true));
    }

    const session = await Sessions.findOne({
      access_token: authorization,
      is_expired: false,
      is_deleted: false,
    });

    if (!session) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(responseGenerators({}, StatusCodes.UNAUTHORIZED, ERROR.TOKEN_EXPIRED_ERROR, true));
    }

    const tokenData = await verifyJwt(authorization);
    const roleData = await Role.find({ is_deleted: false }, { _id: 0, public_id: 1 });
    const roleIds = await roleData.map(function (item) {
      return item.public_id;
    });
    if (!roleIds.includes(tokenData.roleId)) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(responseGenerators({}, StatusCodes.UNAUTHORIZED, ERROR.UNAUTHORIZED_ROLE_ERROR, true));
    }
    req.headers.tokenData = tokenData as any;
    next();
  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    return res.status(401).json({
      message: 'Unauthorized access. token expired.',
    });
  }
};
