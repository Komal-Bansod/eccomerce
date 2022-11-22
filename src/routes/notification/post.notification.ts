import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, NOTIFICATION, Users } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { generatePublicId, removeFields, setTimesTamp } from '../../common/common-functions';
import { notificationCreateSchema } from '../../helpers/validation/notification.validation';
import Notification from '../../models/notifications.model';
import User from '../../models/user.model'


// create user
export const createHandler = async (req: Request, res: Response) => {
  try {

    await notificationCreateSchema.validateAsync(req.body);

    const { user_id, message } = req.body;
    const userData = await User.findOne({ public_id: user_id })
    if (!userData) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, Users.NOT_FOUND, true));
    }
    const createNotification = await Notification.create({
      public_id: generatePublicId(),
      user_id: userData.public_id,
      message,
      created_by: '',
      created_at: setTimesTamp(),
    });

    return res
      .status(StatusCodes.OK)
      .send(responseGenerators(removeFields(createNotification), StatusCodes.OK, NOTIFICATION.CREATED, false));
  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    if (error instanceof ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).send(responseValidation(StatusCodes.BAD_REQUEST, error.message, true));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
};
