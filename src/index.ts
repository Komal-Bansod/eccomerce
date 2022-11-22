/* eslint-disable no-console */
import * as bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express'; // NextFunction,
import http from 'http';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';
// import { Server } from 'socket.io';
import logger from './lib/logger';
import { responseValidation } from './lib';
import { loginHandler ,updatePassword, Token ,forgotPassword } from './routes/auth';
import RoleRoute from './routes/roles';
import AdminRoute from './routes/admin';
import UserRoute from './routes/user';
import swaggerJsDoc from 'swagger-jsdoc';
import basicAuth from 'express-basic-auth';
import swaggerUi from 'swagger-ui-express';
import { features } from 'process';
import CategoryRoute from './routes/category'
import NotificationRoute from './routes/notification'

dotenv.config();

const app = express();

const server = new http.Server(app);
app.use(cors());
// const io = new Server(server,{cors: {origin: "*"}});
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  try {

    // set header for swagger.
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self';",
    );

    // end
    const xForwardedFor = ((req.headers['x-forwarded-for'] || '') as string).replace(/:\d+$/, '');
    const ip = xForwardedFor || req.connection.remoteAddress?.split(':').pop();
    logger.info(
      `------------ API Info ------------
      IMP - API called path: ${req.path},
      method: ${req.method},
      query: ${JSON.stringify(req.query)}, 
      remote address (main/proxy ip):${ip},
      reference: ${req.headers.referer} , 
      user-agent: ${req.headers['user-agent']}
      ------------ End ------------  `,
    );
  } catch (error) {
    logger.error(`error while printing caller info path: ${req.path}`);
  }

  next();
});

//Start swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Luminaree API',
      version: '1.0.0',
      description: 'A simple Express Library API',
      termsOfService: 'http://example.com/terms/',
      contact: {
        name: 'API Support',
        url: 'http://www.exmaple.com/support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Ecommerce API Documentation',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  // apis: ["**/*.ts"],
  apis: ['./src/**/*.ts'],
};
const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  basicAuth({ users: { ecommerce: 'Ecom@123' }, challenge: true }),
  swaggerUi.serve,
  swaggerUi.setup(specs),
);
//End swagger setup


const health = (req: Request, res: Response) => {
  res.json({
    message: 'Roulete server is working',
    env: process.env.NODE_ENV,
    headers: req.headers,
  });
};

app.get('/', health);
// Swagger for health API
/**
 * @swagger
 * definitions:
 *   health:
 *     example:
 *       data:
 *         message: string
 *         env: string
 *         headers: object
 */

/**
 * @swagger
 *  tags:
 *    name: Default
 *    description: Health Document
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health
 *     tags: [Default]
 *     security: {}
 *     responses:
 *       200:
 *         description: Health.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/health'
 *       500:
 *         description: Something went wrong, please try again later.
 */
app.get('/api/health', health);
// Swagger for login API
/**
 * @swagger
 * components:
 *   schemas:
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: password
 *       example:
 *         email: string
 *         password: string
 *
 */

/**
 * @swagger
 * definitions:
 *   loginInResponse:
 *     example:
 *       data:
 *         user_id: string
 *         first_name: string
 *         email: string
 *         role: string
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 *       token: string
 *       refreshToken: string
 */

/**
 * @swagger
 * definitions:
 *   ErrorResponse:
 *     properties:
 *       message:
 *         type: string
 *       errors:
 *         type: array
 */

/**
 * @swagger
 *  tags:
 *    name: Auth
 *    description: Auth Document
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     security: {}
 *     responses:
 *       200:
 *         description: The login was successfully response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/loginInResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
 app.post('/api/login', loginHandler);
/**
 * @swagger
 * components:
 *   schemas:
 *      ForgotPassword:
 *       type: object
 *       required:
 *         - email
 *         - userId
 *       properties:
 *         email:
 *           type: string
 *           description: email
 *         userId:
 *           type: string
 *           description: userId
 *       example:
 *         email: string
 *         userId: string
 *
 */

/**
 * @swagger
 * definitions:
 *    ForgotPasswordInResponse:
 *     example:
 *       data:
 *         userId: string
 *         email: string
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 */


/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: forgotPassword
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPassword'
 *     security: {}
 *     responses:
 *       200:
 *         description: The  ForgotPassword was successfully response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ForgotPasswordInResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */

app.post('/api/forgot-password', forgotPassword)
// Swagger for login API

/**
 * @swagger
 * definitions:
 *   tokenVerifyInResponse:
 *     example:
 *       data:
 *         verifyToken: string
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 *       token: string
 *       refreshToken: string
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     tokenVerify:
 *       type: object
 *       required:
 *         - verifyToken
 *       properties:
 *         verifyToken:
 *           type: string
 *           description: verifyToken
 *       example:
 *         verifyToken: string
 *
 */
/**
 * @swagger
 * /api/verifyToken:
 *   post:
 *     summary: api verifyToken
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tokenVerify'
 *     security: {}
 *     responses:
 *       200:
 *         description: The token was successfully response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/tokenVerifyInResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */
app.post('/api/verifyToken',Token)


/**
 * @swagger
 * definitions:
 *   updatePasswordInResponse:
 *     example:
 *       data:
 *         token: string
 *         password: string
 *       status_code: 200
 *       status_message: string
 *       response_error: false
 *       token: string
 *       refreshToken: string
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     apiUpdatePassword:
 *       type: object
 *       required:
 *         - token
 *         - password
 *       properties:
 *         token:
 *           type: string
 *           description: token
 *         password:
 *           type: string
 *           description: password
 *       example:
 *         token: string
 *         password: string
 *
 */
/**
 * @swagger
 * /api/updatePassword:
 *   post:
 *     summary: api updatePassword
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/apiUpdatePassword'
 *     security: {}
 *     responses:
 *       200:
 *         description: password reset 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/updatePasswordInResponse'
 *       500:
 *         description: Something went wrong, please try again later.
 */

app.post('/api/updatePassword', updatePassword)
app.use('/api/role', RoleRoute);
app.use('/api/admin', AdminRoute);
app.use('/api/user', UserRoute);
app.use('/api/category', CategoryRoute);
app.use('/api/notification', NotificationRoute)
app.use((req: Request, res: Response) => {
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(responseValidation(StatusCodes.INTERNAL_SERVER_ERROR, 'No route found'));
});

app.use((error: any, req: Request, res: Response) => {
  // , next: NextFunction
 
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
    responseValidation(
      StatusCodes.INTERNAL_SERVER_ERROR,
      /* If the environment is development, then return the error message, otherwise return an empty
        object. */
      process.env.NODE_ENV === 'development' ? error.message : {},
    ),
  );
});

process.on('unhandledRejection', function (reason, promise) {
  logger.error('Unhandled rejection', { reason, promise });
});

// set socket connection
// socketConnection(io);

export default server;