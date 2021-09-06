import { Document, Model, model, models, Schema } from "mongoose";

/**
 * Interface to model the Dynamic Model Schema for TypeScript.
 * @param document:string
 * @param model:object
 */

export interface IDynamicModel extends Document {
    document: string;
    model: any;
}

const dynamicModelSchema: Schema = new Schema({
    document: {
        type: String,
        required: true
    },
    model: {
        type: Object,
        required: true
    },
});

const dynamicModel = models.DynamicModel || model<IDynamicModel>("DynamicModel", dynamicModelSchema);

export default dynamicModel;
