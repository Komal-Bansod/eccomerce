import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, NOTIFICATION } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { setPagination } from '../../common/common-functions';
import Notification from '../../models/notifications.model';
import { notificationSingleSchema } from '../../helpers/validation/notification.validation'

// get single notification
export const getSingleHandler = async (req: Request, res: Response) => {
  try {
    await notificationSingleSchema.validateAsync(req.params);

    const { id } = req.params;

    const findId = await Notification.findOne({ public_id: id })
    if (!findId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, NOTIFICATION.NOT_FOUND, true));
    }

    return res.status(StatusCodes.OK).send(responseGenerators(findId, StatusCodes.OK, NOTIFICATION.FOUND, false));
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

// get list notification

export const getListHandler = async (req: Request, res: Response) => {
  try {


    const { search } = req.query as any;

    // get pagination
    const pagination = await setPagination(req.query);

    let where = {
      is_deleted: false
    };

    if (search) {
      where = {
        ...where,
        ...{
          user_id: new RegExp(search.toString(), 'i'),
        },
      };
    }


    // get the notification here
    const listNotification = await Notification.find(where)
      .sort(pagination.sort)
      .skip(pagination.offset)
      .limit(pagination.limit)
      .select({ _id: 0, __v: 0 });

    return res.status(StatusCodes.OK).send(responseGenerators(listNotification, StatusCodes.OK, NOTIFICATION.FOUND, false));
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
