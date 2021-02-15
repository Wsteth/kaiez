import WebSocket from 'ws'
import KaiLog from '../utils/KaiLog'
import pako from 'pako'
import { WsEvent, WsSignal } from '../types/websocket'
export default class {
    private ws!: WebSocket
    private gatewayURL: string
    private timeoutEvent: { [key: string]: NodeJS.Timeout }
    private msgQueue: number[]
    constructor(gatewayURL: string) {
        this.gatewayURL = gatewayURL
        this.msgQueue = []
        this.timeoutEvent = {}
        this.gatewayURL = gatewayURL
    }

    private connect() {
        this.ws = new WebSocket(this.gatewayURL)
        this.ws.onopen = (e) => {
            this.timeoutEvent.HELLO = this.createReconnectTimeout()
            KaiLog('与服务器建立连接中...')
        }

        this.ws.onerror = (e) => {
            KaiLog('发生错误', e.error, e.message)
            this.reconnect()
        }

        this.ws.onclose = (e) => {
            KaiLog('与服务器断开，重连', e.code, e.reason)
            this.reconnect()
        }

        this.ws.onmessage = (e) => {
            // 解压缩消息
            const u8Array: Uint8Array = new Uint8Array(e.data as ArrayBuffer)
            const { s: signal, d: data, sn: msgNumber }: WsSignal = JSON.parse(pako.inflate(u8Array, { to: 'string' }))
            // 分别对收到的型号进行处理
            switch (signal) {

                case WsEvent.HELLO:
                    this.cancelReconnectTimeout(this.timeoutEvent.HELLO)
                    this.timeoutEvent.HELLO = this.createPINGInterval()
                    KaiLog('与服务器建立连接成功！')
                    // TODO emit ready
                    break

                case WsEvent.PONG:
                    KaiLog('收到PONG消息')
                    this.cancelReconnectTimeout(this.timeoutEvent.PONG)
                    break

                case WsEvent.RECONNECT:
                    this.reconnect()
                    break

                case WsEvent.RESUME_ACK:

                    break

                case WsEvent.EVENT:

                    if (this.msgQueue.includes(msgNumber!)) {
                        break
                    }
                    if (this.msgQueue.length > 20) {
                        this.msgQueue.shift()
                    }
                    this.msgQueue.push(msgNumber!)

                    // TODO emit('kaiEvent', data)
                    break

                default:
                    break
            }
        }
    }


    private createReconnectTimeout(): NodeJS.Timeout {
        return setTimeout(() => {
            this.reconnect()
        }, 6000);
    }

    private reconnect() {
        // clear all message, terminate the connection, cancel sending Ping
        this.msgQueue = []
        this.ws.terminate()
        this.clearPINGInterval(this.timeoutEvent.PING)
        this.timeoutEvent = {}
        this.connect()
    }


    private cancelReconnectTimeout(id: NodeJS.Timeout) {
        clearTimeout(id)
    }

    private createPINGInterval(): NodeJS.Timeout {
        return setInterval(() => {
            const sendData: string = JSON.stringify({
                s: 2,
                sn: this.msgQueue[this.msgQueue.length - 1]
            })
            this.ws!.send(sendData)
            this.timeoutEvent.PONG = this.createReconnectTimeout()
            KaiLog('PING消息已经发送')
        }, 25000 + Math.random() * 10000)
    }

    private clearPINGInterval(id: NodeJS.Timeout) {
        clearInterval(id)
    }
}