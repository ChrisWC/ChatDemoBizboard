import {PrioritisedArray} from 'arva-js/data/PrioritisedArray.js';
import {Message} from './MessageModel.js';
export class MessageStream extends PrioritisedArray {
    constructor() {
        super(Message)
    }
}
