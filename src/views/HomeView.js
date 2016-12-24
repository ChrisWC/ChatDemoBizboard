import {View}               from 'arva-js/core/View.js';
import {layout, event}      from 'arva-js/layout/Decorators.js';
import {ChatView} from '../views/ChatView.js'

export class HomeView extends View {
    @layout.dock.bottom(490, 0, 0)
    @layout.size(~800, 500)
    @layout.origin(0.5,0.0)
    @layout.align(0.5, 0, 0)
    message = new ChatView(this.options);

    constructor(options = {}){
        super(options);
    }
}
