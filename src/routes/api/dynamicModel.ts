import auth from "../../middleware/auth";
import {check, validationResult} from "express-validator/check";
import Request from "Request";
import {Response, Router} from "express";
import HttpStatusCodes from "http-status-codes";

import DynamicModel, {IDynamicModel} from "../../models/DynamicModels";
const router: Router = Router();

// @route   POST api/profile
// @desc    Create or update user's profile
// @access  Private
router.post(
    "/",
    [
        auth,
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

            let dynamicModel: IDynamicModel = await DynamicModel.findOne({ user: req.userId });
            if (dynamicModel) {
                // Update
                dynamicModel = await DynamicModel.findOneAndUpdate(
                    { user: req.userId },
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

export default router;
