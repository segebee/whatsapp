import React, { Component } from 'react';
//import { Grid,Image, List } from 'semantic-ui-react'
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      contacts: [
        {
          "id": 1,
          "profilePhoto" : "http://www.joshfinnie.com/assets/images/josh-tm.jpeg",
          "name": "Gbenga",
          "lastMessage": "Bro smart: what i think this should be...",
          "chats": [
            {
              "activeUser" : "i will come to school soon",
              "receiver":  "i will be there too.. just give me few minutes"
            }
          ]
        },
        {
          "id": 2,
          "profilePhoto" : "http://loremflickr.com/g/320/240/paris",
          "name": "Tayo",
          "lastMessage": "Bro smart: what i think this should be...",
          "chats": [
            {
              "activeUser" : "i will come to school soon",
              "receiver":  "i will be there too.. just give me few minutes"
            }
          ]
        },
        {
          "id": 3,
          "profilePhoto" : "https://s.yimg.com/pw/images/buddyicon11_r.png#76029035@N02",
          "name": "uno",
          "lastMessage": "Bro smart: what i think this should be...",
          "chats": [
            {
              "activeUser" : "i will come to school soon",
              "receiver":  "i will be there too.. just give me few minutes"
            }
          ]
        },
      
      ]
    }

  }

  // getChats = (event, id) => {
  //    event.preventDefault();

  //    const { contacts, selectedContactChat } = this.state;
  //    let chat = []
  //    contacts.filter( (contact) => {
  //       if (contact.id === id) {
  //         return chat = [...chat, contact]
  //       }
  //    })

  //    this.setState({ chatHistoryVisible: true, selectedChat: id, selectedContactChat: chat });
  //  }



  // render() {
  //   const { contacts, chatHistoryVisible, selectedContactChat } = this.state;
  //   return (
  //     <div className="app">
  //         <ChatList contacts={ contacts } getChats={ this.getChats }/>
  //         <View visibility={ chatHistoryVisible } selectedContact={ selectedContactChat }/>
  //     </div>
  //   );
  // }


   


  render() {
    return (
      <div className="WhatsApp">

        <div className="SideBar">
          <div className="SideBarHeader">
            <div className="SideBarHeaderAvi">
              <img src="http://placehold.it/40x40" />
            </div>
            <div className="SideBarHeaderUserName">
              Segun Abisagbo
            </div>
            <div className="SideBarHeaderIcons">
              <img src="http://placehold.it/30x30" />
              <img src="http://placehold.it/30x30" />
            </div>
          </div>
          <div className="SideBarSearch">
            <input type="text" className="searchBox" placeholder="Search or start new chats" />
          </div>
          <div className="ContactsList">
           
            <div className="Contact">
              <div className="ContactAvi">
                <img src="http://placehold.it/40x40" />
              </div>
              <div className="ContactName">
                Segebeee
              </div>
            </div>

          </div>
        </div>

        
        <div className="MainChat">

          <div className="MainChatHeader">
            <div className="GroupAvi">
              <img src="http://placehold.it/40x40" />
            </div>
            <div className="GroupDetails">
              <div className="GroupDetailsName"> 
                TSS Devs
              </div>
              <div className="GroupDetailsMembers"> 
                Joseph, Muyiwa
              </div>
            </div>
            <div className="GroupIcons">
              <img src="http://placehold.it/40x40" />
              <img src="http://placehold.it/40x40" />
              <img src="http://placehold.it/40x40" />
            </div>
          </div>

          <div className="Chats">
            <div className="Chat">
              <div className="ChatUserName">
                Segebee
              </div>
              <div className="ChatMessage">
                Hello how are you
              </div>
            </div>
           <div className="Chat">
              <div className="ChatUserName">
                Segebee
              </div>
              <div className="ChatMessage">
                Hello how are you
              </div>
            </div>
            <div className="Chat">
              <div className="ChatUserName">
                Segebee
              </div>
              <div className="ChatMessage">
                Hello how are you
              </div>
            </div>
          </div>

          <div className="ChatInputBar">
            <div className="Smileys">
              
            </div>
            <div className="ChatInput">
              <input className="ChatBox" />
            </div>
            <div className="Microphone">
              
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
