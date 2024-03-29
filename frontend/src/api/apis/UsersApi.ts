/* tslint:disable */
/* eslint-disable */
/**
 * Swagger
 * This is a sample server
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    User,
    UserFromJSON,
    UserToJSON,
} from '../models';

export interface ApiUserPostRequest {
    user: User;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * Register user given their email and password, returns the token upon successful registration
     */
    async apiUserPostRaw(requestParameters: ApiUserPostRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.user === null || requestParameters.user === undefined) {
            throw new runtime.RequiredError('user','Required parameter requestParameters.user was null or undefined when calling apiUserPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/user`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserToJSON(requestParameters.user),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Register user given their email and password, returns the token upon successful registration
     */
    async apiUserPost(requestParameters: ApiUserPostRequest, initOverrides?: RequestInit): Promise<void> {
        await this.apiUserPostRaw(requestParameters, initOverrides);
    }

}
