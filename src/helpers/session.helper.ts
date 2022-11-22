import { setTimesTamp } from '../common/common-functions';
import Sessions from '../models/session.model';

export const expiredValidSession = async (params) => {
  const { userId, userType } = params;
  return await Sessions.findOneAndUpdate(
    {
      user_id: userId,
      user_type: userType,
      is_expired: false,
    },
    {
      is_expired: true,
      deleted_at: setTimesTamp(),
    },
  );
};