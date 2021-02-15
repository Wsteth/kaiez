export enum WsEvent {
    HELLO = 1,
    EVENT = 0,
    PING = 2,
    PONG = 3,
    RECONNECT = 5,
    RESUME_ACK = 6,
}


export interface WsSignal {
    s: number,
    d?: any,
    sn?: number
}