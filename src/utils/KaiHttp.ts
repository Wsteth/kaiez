import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { KaiAPIResponse } from '../types/APIResponse'

const serverConfig: { serverURL: string, apiVersion: number } = {
    serverURL: 'https://www.kaiheila.cn',
    apiVersion: 3
}

export default class {

    private requestor: AxiosInstance
    constructor(botToken: string) {
        const config: AxiosRequestConfig = {
            baseURL: `${serverConfig.serverURL}/api/v${serverConfig.apiVersion}`,
            headers: {
                'Authorization': `Bot ${botToken}`,
            }
        }
        this.requestor = axios.create(config)

    }

    async get(url: string, params = {}): Promise<KaiAPIResponse> {
        let result!: KaiAPIResponse
        await this.requestor.get(url, { params })
            .then(response => result = response.data as KaiAPIResponse)
            .catch(response => { throw response })
        return result
    }

    async post(url: string, data = {}): Promise<KaiAPIResponse> {
        let result!: KaiAPIResponse
        await this.requestor.post(url, data, { headers: { 'Content-type': 'application/json' } })
            .then(response => result = response.data as KaiAPIResponse)
            .catch(response => { throw response })
        return result
    }

}