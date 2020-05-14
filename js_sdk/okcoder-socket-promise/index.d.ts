import { Config, SendParams } from "./interface";
export default class PromiseWebSocket {
    config: Config;
    initSocket: any;
    send: any;
    close: any;
    constructor(config: Config);
    _sendSocketMessage(option: SendParams): Promise<unknown>;
    _reConnectSocket(): void;
    _clearHeart(): void;
    _startHeart(): void;
}
