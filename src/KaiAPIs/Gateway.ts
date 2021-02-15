import { KaiGatewayResponse } from '../types/KaiTypes'
import KaiHttp from '../utils/KaiHttp'

export default class {
    kaiHttp: KaiHttp
    constructor(kaiHttp: KaiHttp) {
        this.kaiHttp = kaiHttp
    }
    async getGateway(): Promise<string> {
        return this.kaiHttp.get('gateway/index', { compress: 1 })
            .then(result => result.data as KaiGatewayResponse)
            .then(result => result.url)
    }
}