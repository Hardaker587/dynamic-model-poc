import auth from "../../middleware/auth";
import {check, validationResult} from "express-validator/check";
import Request from "Request";
import {Response, Router} from "express";
import HttpStatusCodes from "http-status-codes";

import { Document, model, models, Schema } from "mongoose";

import DynamicModel, {IDynamicModel} from "../../models/DynamicModels";
const router: Router = Router();

/**
 * @typedef Property
 * @property {string} type - data type
 */

/**
 * @typedef Model
 * @property {Property.model} property - Property to add
 */

/**
 * @typedef DynamicModel
 * @property {string} documentId - To update the dynamic model
 * @property {string} document.required
 * @property {Model.model} model.required - Some description for product
 */

/**
 * @typedef DynamicDataRequestModel
 * @property {string} documentId - To update the dynamic model
 * @property {Property.model} requestModel - data to inject into dynamic model
 */

/**
 * Create and control dynamic models
 * @route POST /api/dynamicModels - Create and control dynamic models
 * @group Dynamic Models
 * @param {DynamicModel.model} Model.body.required
 * @returns {object} 200 - Successfully created model
 * @returns {Error}  default - Unexpected error
 * @access Private
 * @security JWT
 */

router.post(
    "/",
    [
        check("document", "Document is required").not().isEmpty(),
        check("model", "Model is required").not().isEmpty(),
        auth
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(HttpStatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        const { document, model } = req.body;

        // Build profile object based on IProfile
        const dynamicModelFields = {
            document,
            model,
        };

        try {

            let dynamicModel: IDynamicModel = await DynamicModel.findOne({ _id: req.body.documentId });
            if (dynamicModel) {
                // Update
                dynamicModel = await DynamicModel.findOneAndUpdate(
                    { _id: req.body.documentId },
                    { $set: dynamicModelFields },
                    { new: true }
                );

                return res.json(dynamicModel);
            }

            // Create
            dynamicModel = new DynamicModel(dynamicModelFields);

            await dynamicModel.save();

            res.json(dynamicModel);
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
);

/**
 * Create data for specified Data Model
 * @route POST /api/dynamicModels/createData - Create data for specified Data Model
 * @group Dynamic Models
 * @param {DynamicDataRequestModel.model} Model.body.required
 * @returns {object} 200 - Successfully created model
 * @returns {Error}  default - Unexpected error
 * @access Private
 * @security JWT
 */

// @route POST api/dynamicModels
// @desc this is about to get funky
// @access who knows at this point?

router.post("/createData", [
    check("documentId", "DocumentId is required").not().isEmpty(),
],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(HttpStatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        const { documentId, requestModel } = req.body;

        const modelFields = {
            documentId,
            requestModel,
        };

        try {
            let document = await DynamicModel.findOne({ _id: documentId });
            if(!document) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({
                    errors: [
                        {
                            msg: "Document does not exist",
                        },
                    ],
                });
            }
            console.log(requestModel)
            // Time for the magic
            const modelSchema: Schema = new Schema({
                ...document.model
            })
            const modelDeclaration = models[document.document] || model(document.document, modelSchema)
            const modelExecution = new modelDeclaration({...requestModel})
            await modelExecution.save()

            return res.json(modelExecution);
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    })
/**
 * Get all dynamic models
 * @route GET /api/dynamicModels - Get all dynamic models
 * @group Dynamic Models
 * @returns {object} 200 - Successfully got dynamic models
 * @returns {Error}  default - Unexpected error
 * @access Private
 * @security JWT
 */
router.get("/", auth,
    async (req: Request, res: Response) => {
    try {
        const documents = await DynamicModel.find();
        return res.json(documents);
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
    })
/**
 * Get all dynamic models
 * @route DELETE /api/dynamicModels - Get all dynamic models
 * @group Dynamic Models
 * @param {string} documentId.query.required
 * @returns {object} 200 - Successfully got dynamic models
 * @returns {Error}  default - Unexpected error
 * @access Private
 * @security JWT
 */
router.delete("/", auth,
    async (req: Request, res: Response) => {
        try {
            const documentId = req.query.documentId
            const document = await DynamicModel.deleteOne({_id: documentId})
            return res.json(document)
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    })
export default router;
