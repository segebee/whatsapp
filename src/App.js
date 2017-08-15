import React, { Component } from 'react';
//import { Grid,Image, List } from 'semantic-ui-react'
import './App.css';

class App extends Component {

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     contacts: [
  //       {
  //         "id": 1,
  //         "profilePhoto" : "http://www.joshfinnie.com/assets/images/josh-tm.jpeg",
  //         "name": "Gbenga",
  //         "lastMessage": "Bro smart: what i think this should be...",
  //         "chats": [
  //           {
  //             "activeUser" : "i will come to school soon",
  //             "receiver":  "i will be there too.. just give me few minutes"
  //           }
  //         ]
  //       },
  //       {
  //         "id": 2,
  //         "profilePhoto" : "http://loremflickr.com/g/320/240/paris",
  //         "name": "Tayo",
  //         "lastMessage": "Bro smart: what i think this should be...",
  //         "chats": [
  //           {
  //             "activeUser" : "i will come to school soon",
  //             "receiver":  "i will be there too.. just give me few minutes"
  //           }
  //         ]
  //       },
  //       {
  //         "id": 3,
  //         "profilePhoto" : "https://s.yimg.com/pw/images/buddyicon11_r.png#76029035@N02",
  //         "name": "uno",
  //         "lastMessage": "Bro smart: what i think this should be...",
  //         "chats": [
  //           {
  //             "activeUser" : "i will come to school soon",
  //             "receiver":  "i will be there too.. just give me few minutes"
  //           }
  //         ]
  //       },
      
  //     ]
  //   }

  // }

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


  constructor() {
    super()
    this.state = {items:[],messages:[]}
  }
  componentWillMount() {
    fetch("https://whatsappdemo.herokuapp.com/api/accounts/all").then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      this.setState({items: data})
    })


    fetch("https://whatsappdemo.herokuapp.com/api/message/all").then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      this.setState({messages: data})
    })

  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
   


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
           
            {
              this.state.items.map(contact => (
              <div className="Contact" key={contact._id} >
                <div className="ContactAvi">
                  <img src="http://placehold.it/40x40" />
                </div>
                <div className="ContactName">
                  {contact.fullname}
                  <p>{contact.phone}</p>
                </div>
                
              </div>
              ))
            }
            

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
            
            {
              this.state.messages.map(item => (
                <div className="talk-bubble tri-right left-top">
                  <div className="ChatUserName">
                    {item.messageby}
                  </div>

                  <div className="talk-text">
                    <p>{item.message}</p>
                    <p className="dateMsg">{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              
              ))
            }
            
            
            
            
          </div>

          <div className="ChatInputBar">
            <div className="Smileys">
              <img src="http://placehold.it/40x40" />
            </div>
            <div className="ChatInput">
              <form onSubmit={this.handleSubmit}>
                <input className="ChatBox" />
              </form>
            </div>
            <div className="Microphone">
              <img src="http://placehold.it/40x40" />
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
