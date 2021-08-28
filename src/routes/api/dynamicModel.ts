import auth from "../../middleware/auth";
import {check, validationResult} from "express-validator/check";
import Request from "Request";
import {Response, Router} from "express";
import HttpStatusCodes from "http-status-codes";

import { Document, model, models, Schema } from "mongoose";

import DynamicModel, {IDynamicModel} from "../../models/DynamicModels";
import User, {IUser} from "../../models/User";
const router: Router = Router();

// @route   POST api/dynamicModels
// @desc    Create or update a dynamic model
// @access  Private
router.post(
    "/",
    [
        check("document", "Document is required").not().isEmpty(),
        check("model", "Model is required").not().isEmpty(),
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
                            msg: "User not registered",
                        },
                    ],
                });
            }

            // Time for the magic
            const modelSchema: Schema = new Schema({
                ...document.model
            })
            const modelDeclaration = models[document.document] || model(document.document, modelSchema)
            const modelExecution = new modelDeclaration(requestModel)
            await modelExecution.save()

            return res.json(modelExecution);
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    })
export default router;
