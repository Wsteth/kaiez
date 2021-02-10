export interface KaiAssetResponse {
    url: string
}

export interface KaiChannelMessageResponse {
    msg_id: string
    msg_timestamp: number
    nonce: string
}

export interface KaiGuildRole {
    role_id: number
    name: string
    color: number
    position: number
    hoist: number
    mentionable: number
    permissions: number
}

export interface KaiGuildUserRoleResponse {
    user_id: string
    guild_id: string
    roles: number[]
}

export interface KaiIntimacyResponse {
    img_url: string
    social_info: string
    last_read: number
    score: number
    img_list: { id: string, url: string }[]
}

export interface KaiUserResponse {
    id: string
    username: string
    identify_num: string
    online: boolean
    status: number
    avatar: string
    bot: boolean
    mobile_verified: boolean
    system: boolean
    mobile_prefix: string
    mobile: string
    invited_count: number
}

export interface KaiGatewayResponse {
    url: string
}