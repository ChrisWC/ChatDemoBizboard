import {Model} from 'arva-js/core/Model.js';

export class Message extends Model {
    get value() {}
    get sender() {}
    get senderNickname() {}
    get senderChannel() {}
    get timestamp() {}
    constructor(id, data, options) {
        super(id, data, {...options, path:'/messages'})
    }
}

