import { CurrentUser } from './current-user.service'

export interface IReturn {
    Data: any | any[];
    Message: string;
    Success: boolean;
    Authorized: boolean;
}
export class WebApi {
    debug = true;
    //test
    apiUrl = '';

    async getHeaders() {
        let currentUser = await (new CurrentUser()).getCurrentUser();
        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Language': 'en',
            'AccessToken': '',

        }
        if (currentUser && currentUser.AccessToken) {
            let { AccessToken } = currentUser;
            headers['AccessToken'] = AccessToken;

        }
        return headers;
    }

    private async logging(path: string, response: any, rowBody: string = '',) {
        this.debug && console.log({ rowBody, path, response });
        return response;
    }
    async Get(controller: string): Promise<IReturn> {
        return await fetch(`${this.apiUrl}${controller}`, { method: 'GET', headers: await this.getHeaders() }).then(response => response.json()).then(response => this.logging(controller, response));
    }
    async Post(controller: string, body?: any): Promise<IReturn> {
        return await fetch(`${this.apiUrl}${controller}`, { method: 'POST', headers: await this.getHeaders(), body: JSON.stringify(body) }).then(response => response.json()).then(response => this.logging(controller, response, JSON.stringify(body)));
    }
    async Put(controller: string, body: any): Promise<IReturn> {
        return await fetch(`${this.apiUrl}${controller}`, { method: 'PUT', headers: await this.getHeaders(), body: JSON.stringify(body) }).then((response) => response.json()).then(response => this.logging(controller, response, JSON.stringify(body)));
    }
    async Delete(controller: string): Promise<IReturn> {
        return await fetch(`${this.apiUrl}${controller}`, { method: 'DELETE', headers: await this.getHeaders() }).then((response) => response.json()).then(response => this.logging(controller, response));
    }
    async FilePost(controller: string, body: any): Promise<IReturn> {
        return await fetch(`${this.apiUrl}${controller}`, { method: 'POST', headers: {}, body: body }).then(response => response.json()).then(response => this.logging(controller, response));
    }
}
