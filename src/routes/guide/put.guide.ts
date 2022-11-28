import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, GUIDE, ROLE, Users } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { setTimesTamp, hashPassword } from '../../common/common-functions';
import User from '../../models/user.model';
import { guideUpdateSchema } from '../../helpers/validation/guide.validation'
import UserDetails from '../../models/user-details.model';
import Guide from '../../models/guide.model';
// update user
export const updateHandler = async (req: Request, res: Response) => {
  try {
    await guideUpdateSchema.validateAsync({ ...req.body, ...req.params });

    const { personal_details, contact_details, company_details, job_history, other_certificates, username, email, mobile, display_name, gender, date_of_birth, first_name, last_name, address, profile_pic } = req.body;

    const { updateId } = req.params;

    const findGuide = await Guide.findOne({ public_id: updateId, is_deleted: false })
    if (!(findGuide)) {
      res.status(StatusCodes.BAD_REQUEST).send(responseGenerators({}, StatusCodes.BAD_REQUEST, GUIDE.NOT_FOUND, true));
    }

    const findUser = await User.findOne({ guide_id: updateId, is_deleted: false })
    if (!(findUser)) {
      res.status(StatusCodes.BAD_REQUEST).send(responseGenerators({}, StatusCodes.BAD_REQUEST, GUIDE.NOT_FOUND, true));
    }
    const findUserDetails = await UserDetails.findOne({ public_id: findUser.user_details_id })
    if (!(findUserDetails)) {
      res.status(StatusCodes.BAD_REQUEST).send(responseGenerators({}, StatusCodes.BAD_REQUEST, GUIDE.NOT_FOUND, true));
    }



    // update guide here
    const updateGuide = await Guide.findOneAndUpdate(
      { public_id: updateId, is_deleted: false },
      {
        personal_details,
        contact_details,
        company_details,
        job_history,
        other_certificates,
        address,
        updated_at: setTimesTamp()

      },
      { returnOriginal: false },
    );
    // update user here

    const updateUser = await User.findOneAndUpdate(
      { public_id: findUser.public_id, is_deleted: false },
      {

        username,
        mobile,
        updated_at: setTimesTamp(),
      },
      { returnOriginal: false },
    );
    console.log(updateUser)
    //update user meta data here  

    const updateUserMetaData = await UserDetails.findOneAndUpdate({ public_id: findUserDetails.public_id }, {
      display_name,
      gender,
      date_of_birth,
      first_name,
      last_name,
      address,
      profile_pic,
    }, { returnOriginal: false },)


    return res.status(StatusCodes.OK).send(responseGenerators({}, StatusCodes.OK, GUIDE.UPDATED, false));
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
