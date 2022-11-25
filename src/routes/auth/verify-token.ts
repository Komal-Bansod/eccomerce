import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { setTimesTamp } from '../../common/common-functions';
import { ERROR, LOGIN,REGISTER  } from '../../common/global-constants';
import { getJwtF } from '../../helpers/jwt.helper';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import User from '../../models/user.model';
import { verifyJwt } from '../../helpers/jwt.helper';
import { verifyTokenSchema } from '../../helpers/validation/verify-token.validation';

export const verifyToken = async (req: Request, res: Response) => {
    try {
       await verifyTokenSchema.validateAsync(req.body);
        const { token } = req.body
        const tokenDataRequestBody = await verifyJwt(token);
    
        const findUserCredential = await User.findOne({ public_id: tokenDataRequestBody.userId, email: tokenDataRequestBody.email })
   
        if (!findUserCredential) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send(responseGenerators({}, StatusCodes.BAD_REQUEST, REGISTER.USER_NOT_REGISTERED, true));
        }

        const tokenDataForgetPassword = await verifyJwt(findUserCredential.forgot_password_token);
      
        if ((tokenDataForgetPassword.userId && tokenDataForgetPassword.email) === (tokenDataRequestBody.userId && tokenDataRequestBody.email)) {
            return res
                .status(StatusCodes.OK)
                .send(responseGenerators({}, StatusCodes.OK, ERROR.TOKEN_MATCH, true));
        }    
    }   catch (error) {
        logsErrorAndUrl(req, error);
        if (error instanceof ValidationError) {
          return res.status(StatusCodes.BAD_REQUEST).send(responseValidation(StatusCodes.BAD_REQUEST, error.message, true));
        }
        return res.status(401).json({
          message: 'Unauthorized access. token expired.',
        });
      }
    };