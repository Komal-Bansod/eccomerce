import { nanoid } from 'nanoid';
import * as bcrypt from 'bcryptjs';
import Role from '../models/role.model';
import dayjs from 'dayjs';
import Notification from '../models/notifications.model';
const salt = bcrypt.genSaltSync(10);

export const setPagination = async (options) => {
  const sort: any = {};
  if (options.sort_column) {
    const sortColumn = options.sort_column;
    const order = options?.sort_order === 'asc' ? 1 : -1;
    sort[sortColumn] = order;
  } else {
    sort.created_at = -1;
  }

  const limit = +options.limit ? +options.limit : null;
  const offset = ((+options.offset ? +options.offset : 1) - 1) * (+limit ? +limit : 10);
  return { sort, offset, limit };
};

export const removeFields = (response) => {
  if (response) {
    delete response._doc._id;
    delete response._doc.__v;
    delete response._doc.password;
  }
  return response;
};

export const hashPassword = async (password) => {
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export const generatePublicId = () => {

  return nanoid();
};

export const getIp = (req) => {
  return req.split(':').pop();
};

export const setTimesTamp = () => {
  return dayjs().unix();
};

export const getTimesTamp = (date) => {
  return dayjs(date).unix();
};

export const getRoleId = async (role_name) => {
  // get role for Admin and User 
  const roleData = await Role.findOne({
    role_name:role_name,
    is_deleted: false,
  });

  if(roleData){
  return roleData.public_id;
  }else 
  { return false; }
};

export const getGameById = async (id) => {
  // get game by ID
  const gameData = {}
  //  await Game.findOne({
  //   id,
  //   is_deleted: false,
  // });

  return gameData;
};

// return only card number
export const sortbyNumber = (card) => {
  return +card.replace(/[^0-9]/g, '');
};

// return only card suit ex-(S,C,H,D)
export const sortbySuit = (card) => {
  return card.replace(/[^a-zA-Z]/g, '');
};

/**
 * If the suit is a club or spade, return true, otherwise return false.
 * @param suit - a string representing the suit of the card.
 * @returns A boolean value.
 */
export const isBlackSuit = (suit) => {
  if (suit === 'C' || suit === 'S') {
    return true;
  }
  return false;
};

/**
 * If the suit is a diamond or a heart, return true, otherwise return false.
 * @param suit - a string representing the suit of the card.
 * @returns A boolean value.
 */
export const isRedSuit = (suit) => {
  if (suit === 'D' || suit === 'H') {
    return true;
  }
  return false;
};


export const createNotification= async (user_id, message) => {
  const createNotification = await Notification.create({
    public_id: generatePublicId(),
    user_id,
    message,
    created_by: '',
    created_at: setTimesTamp(),
  });
  return createNotification
};
