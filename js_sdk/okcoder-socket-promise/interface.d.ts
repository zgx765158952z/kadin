export interface Config {
    url: string;
    debug?: boolean;
    header?: object;
    method?: string;
    protocols?: string[];
    isReconnect?: boolean;
    reConnectTime?: number;
    isHeartData?: boolean;
    heartTime?: number;
    onSocketOpen?: Function;
    onSocketClose?: Function;
    onSocketError?: Function;
    onSendMessageBefore?: Function;
    onSendMessageAfter?: Function;
    onSocketMessageBefore?: Function;
    onSocketMessageAfter?: Function;
}
export interface SendParams {
    event: string;
    data: any;
}
export interface QueueOption extends SendParams {
    uuid: string;
}
export interface Close {
    code?: number;
    reason?: string;
    success?: Function;
    fail?: Function;
    complete?: Function;
}
