import {Controller} from 'arva-js/core/Controller.js';
import {HomeView} from '../views/HomeView.js';
import {MessageStream} from '../models/MessageStreamModel';

import {FirebaseDataSource as fds} from 'arva-js/data/datasources/FirebaseDataSource.js';
import firebase from 'firebase';
/****************
 * Initializes HomeView and passes in stuff to enable the ChatView
 ****************/
export class HomeController extends Controller {
    Index(){
        this.displayName = "Guest";
        this.starttime = Date.now();
        this.channel = "default";
        if (!this.messageStream) {
            this.messageStream = new MessageStream()
                this.messageStream._dataSource.getAuth().then((u) => {
                    this.uid = u.uid

                    if (u.displayName && u.displayName != "") {
                        this.displayName = u.displayName
                    }
                    return u;
                })
        }
        if(!this.homeView) {
            this.homeView = new HomeView({
                sendMessage:(message)=>{    
                    if (message.startsWith("\\nick")) {
                        this.displayName = message.substring(("\\nick").length, message.length).trim()
                    }
                    else if (message.startsWith("\\channel")) {
                        this.channel = message.substring(("\\channel").length, message.length).trim()
                    }
                    else if (message != "") {
                        var m = {
                            value:message,
                            senderNickname:this.displayName,
                            sender:this.uid,
                            senderChannel:this.channel,
                            timestamp:firebase.database.ServerValue.TIMESTAMP
                        }
                        
                        this.messageStream.add(m)
                    }
                },  
                messageStream:this.messageStream, 
                starttime:this.starttime, 
                showHistory:true
            });
        }
        return this.homeView;
    }
}
