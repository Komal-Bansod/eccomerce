import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { ERROR, PRODUCT, CATEGORY, Users, ITokenData, INVENTORY } from '../../common/global-constants';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import { generatePublicId, generateSKU, removeFields, getRoleId, setTimesTamp } from '../../common/common-functions';
import { productCreateSchema } from '../../helpers/validation/product.validation';
import Product from '../../models/product.model';

import Category from '../../models/category.model';
import { isConstructorDeclaration } from 'typescript';
import Inventory from '../../models/inventory.model';

// create product here 
export const createHandler = async (req: Request, res: Response) => {
  try {
    await productCreateSchema.validateAsync(req.body);

    const { slug, name, tags, description, category_id, inventory_id, images, price, discount_id, brand } = req.body;

    const tokenData = (req.headers as any).tokenData as ITokenData;
    const adminRoleId = await getRoleId('Admin');
    const findInventory = await Inventory.findOne({public_id:inventory_id})
    if(!findInventory){
      return res
      .status(StatusCodes.NOT_FOUND)
      .send(responseGenerators({}, StatusCodes.NOT_FOUND, INVENTORY.NOT_FOUND, true));
    }
    const categoryName = await Category.findOne({ public_id: category_id })
    if (!categoryName) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(responseGenerators({}, StatusCodes.NOT_FOUND, CATEGORY.NOT_FOUND, true));
    }
    const concat = categoryName.name.concat(name)
    if (images) {
      let newPrices = images.filter((x) => ((x.primary === true)))
  
      if (newPrices.length > 1) {
        let setFalse = newPrices.map((x) => (x.primary = false))   
    }
    newPrices[0].primary = true
  }
    let createProduct
    if (tokenData.roleId === adminRoleId) {
      createProduct = await Product.create({
        public_id: generatePublicId(),
        slug,
        name,
        tags,
        description,
        category_id,
        inventory_id,
        images,
        price,
        discount_id,
        sku: generateSKU(concat),
        brand,
        created_by: '',
        created_at: setTimesTamp(),
      });
    }
    if (!createProduct)
      return res
        .status(StatusCodes.FORBIDDEN)
        .send(responseGenerators({}, StatusCodes.FORBIDDEN, Users.NO_PERMISSION_CREATE, true));

    return res
      .status(StatusCodes.OK)
      .send(responseGenerators(removeFields(createProduct), StatusCodes.OK, PRODUCT.CREATED, false));
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
