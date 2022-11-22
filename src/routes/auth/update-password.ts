import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { setTimesTamp, hashPassword, createNotification } from '../../common/common-functions';
import { ERROR, LOGIN ,NOTIFICATION_MESSAGE,  REGISTER} from '../../common/global-constants';
import { getJwtF } from '../../helpers/jwt.helper';
import { expiredValidSession } from '../../helpers/session.helper';
import { updatePasswordSchema } from '../../helpers/validation/update-password.validation';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import User from '../../models/user.model';
import { verifyJwt } from '../../helpers/jwt.helper';

export const updatePassword = async (req: Request, res: Response) => {
    try {
        await updatePasswordSchema.validateAsync(req.body);

        const{token , password } = req.body
        const decodeToken = await verifyJwt(token);

        let userData = await User.findOne({public_id:decodeToken.userId, email: decodeToken.email , is_deleted:false})

         // hash the password
    const hashPass = await hashPassword(password);
    
        if(userData){
            const updatePassword = await User.findOneAndUpdate(
            { public_id: userData.public_id },
      {
        password: hashPass,
        update_at: setTimesTamp(),
      },
       ) 

       createNotification(decodeToken.userId, NOTIFICATION_MESSAGE.UPDATE_PASSWORD)
       return res.status(StatusCodes.OK).send(responseGenerators(updatePassword, StatusCodes.OK, REGISTER.PASSWORD_UPDATE, false));
    }

    } catch (err) {
        // set logs Error function
        logsErrorAndUrl(req, err);
 
        return res.status(401).json({
          message: 'Unauthorized access. token expired.',
        });
      }
    };