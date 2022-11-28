import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { logsErrorAndUrl, responseGenerators } from '../../lib';
import { ERROR, UPLOAD} from '../../common/global-constants';
import { Router } from 'express';
import multer from 'multer'

const UploadRoute = Router();
/**
 * @swagger
 *  tags:
 *    name: Upload
 *    description: Upload Document
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     upload:
 *       type: object
 *       required:
 *         - images
 *       properties:
 *         images:
 *           type: file
 *           format: binary
 *       example:
 *         images: images
 * 
 */
/**
 * @swagger
 * /api/upload/profile:
 *   post:
 *     summary: Upload image
 *     tags: [Upload]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true 
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/upload'
 *     responses:
 *       200:
 *         description: File upload successfully
 *       500:
 *         description: Something went wrong, please try again later.
 */



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({
  storage: storage,
})


UploadRoute.post("/profile", upload.array("images", 4), (req, res) => {
  try {
    let file = req['files']

    let arr = []
    if (file.length) {

      for (let i = 0; i < file.length; i++) {
        arr.push(file[i].originalname)
      }
    }

    return res.status(StatusCodes.OK).send(responseGenerators(arr, StatusCodes.OK, UPLOAD.UPLOAD, false));
  } catch (error) {
    if (error instanceof ValidationError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, error.message, true));
    }
    // set logs Error function
    logsErrorAndUrl(req, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
})



export default UploadRoute


