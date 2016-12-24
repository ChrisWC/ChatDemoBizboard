import Surface              from 'famous/core/Surface.js';
import CollectionLayout from 'famous-flex/layouts/CollectionLayout';
import {View}               from 'arva-js/core/View.js';
import {DataBoundScrollView} from 'arva-js/components/DataBoundScrollView';
import {layout, event} from 'arva-js/layout/Decorators.js';

/****************************
 * ChatHistoryView
 *
 * - Shows chat messages in the database
 * - Timestamp is not valid for ordering messages. It shows the time
 *   sent to the database, and the timestamp may be lower than the 
 *   timestamp of the current messages. We do not want to messages
 *   showing up further back in our history. So, we are going to
 *   get display them in the order they are received.
 ****************************************************/

export class ChatHistoryView extends View {
    
    //top
    @layout.dock.fill()
    message = new DataBoundScrollView({
        layout:CollectionLayout,
        layoutOptions: {
            itemSize: [undefined, 24]
        },
        itemTemplate: (message) => new Surface({
            content: `(${message.senderChannel}) ${message.senderNickname}: ${message.value}`
        }),
        dataFilter: (model) => {
            if (this.options.showHistory) {
                return true;
            }
            else {
                if (model.timestamp < this.options.starttime) {
                    return false;
                }
                return true;
            }
        },
        dataStore: this.options.messageStream,
        chatScrolling:false,
        ensureVisible:() => {
            //chat scrolling only takes you to the element previous to last
            return true
        },
        orderBy:(m1, m2) => {
            if (m1.timestamp >= m2.timestamp) {
                return true
            }
            return false
        },
        useContainer:true,
        flowOptions:{
            properties:{
                border:'1px solid lightgrey',
                backgroundColor:'white'
            }
        }
    })
    @layout.size(undefined, undefined)
    @layout.stick.top()
    @layout.translate(0,0,-1)
    backdrop = new Surface({
        properties:{
            backgroundColor:'white',
            border:'0px solid lightgrey',
            boxShadow:'0px 3px 29px 0px rgba(0,0,0,0.25)'
        }
    });

    constructor(options = {}){
        super({...options});
    }
}
