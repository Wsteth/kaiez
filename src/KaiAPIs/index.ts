import KaiHttp from '../utils/KaiHttp'
import Gateway from './Gateway'
export class KaiApi {
    public gateway: Gateway
    constructor(botToken: string) {
        const kaiHttp = new KaiHttp(botToken)
        this.gateway = new Gateway(kaiHttp)
    }

}