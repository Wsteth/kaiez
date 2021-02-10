import { KaiAssetResponse, KaiChannelMessageResponse, KaiGatewayResponse, KaiGuildRole, KaiGuildUserRoleResponse, KaiIntimacyResponse, KaiUserResponse } from "./KaiTypes"

export interface KaiAPIResponse {
    code: number
    message: string
    data: KaiAPIResponseData
}

export type KaiAPIResponseData =
    | KaiAssetResponse
    | KaiChannelMessageResponse
    | KaiGatewayResponse
    | KaiGuildRole[]
    | KaiGuildUserRoleResponse
    | KaiIntimacyResponse
    | KaiUserResponse