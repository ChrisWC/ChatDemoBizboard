import Surface              from 'famous/core/Surface.js';
import InputSurface         from 'famous/surfaces/InputSurface.js';
import {View}               from 'arva-js/core/View.js';
import {layout, event}      from 'arva-js/layout/Decorators.js';
import {ChatHistoryView} from '../views/ChatHistoryView.js';

export class ChatView extends View {
    
    @layout.dock.bottom(64,0,0)
    spacing = new Surface({
        properties:{
        }
    })
    @layout.size(undefined, 40)
    @layout.stick.bottomLeft()
    @layout.translateFrom(0,-16,0)
    backdrop = new Surface({
        properties:{
            boxShadow:'0px 3px 29px 0px rgba(0,0,0,0.25)'
        }
    })
    @layout.size(undefined, 40)
    @layout.stick.bottomLeft()
    @layout.translateFrom(0,-16,0)
    @event.on('keydown', function(e, v) {
        if (e.keyIdentifier == "Enter") {
            this.options.sendMessage(this.message_input.getValue())
            this.message_input.setValue("")
        }
    });
    message_input = new InputSurface({
        value:``,
        properties:{
            borderColor:'#03A9F4',
            paddingLeft:'8px'
        }
    })
    @event.on('click', function(e) {
        this.options.sendMessage(this.message_input.getValue())
        this.message_input.setValue("")
        
    });
    @layout.translateFrom(-4,-20,0)
    @layout.size(~100, 32)
    @layout.stick.bottomRight()
    send_button = new Surface({
        content:`Send`,
        properties:{
            backgroundColor:'#03A9F4',
            lineHeight:'24px',
            paddingLeft:'8px',
            paddingRight:'8px',
            borderRadius:'2px'
        }
    });
    //top
    @layout.dock.fill()
    message = new ChatHistoryView(this.options)

    constructor(options = {}){
        super({message:"", ...options});
    }
}
