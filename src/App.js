import React, { Component } from 'react';
//import { Grid,Image, List } from 'semantic-ui-react'
import './App.css';

class App extends Component {

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     contacts: [
  //       
      
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

  constructor() {
    super();
    this.state = {items:[],messages:[],newMessage:""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentWillMount() {
    fetch("https://whatsappdemo.herokuapp.com/api/accounts/all").then(res => {
      return res.json()
    }).then(data => {
      //console.log(data)
      this.setState({items: data})
    })


    fetch("https://whatsappdemo.herokuapp.com/api/message/all").then(res => {
      return res.json()
    }).then(data => {
      //console.log(data)
      this.setState({messages: data})
    })

  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.messages.push({messageby: 'Segebee',message:this.state.newMessage,createdAt: Date.now() });
    //upload new message
    this.setState({newMessage: ''});
  }
  
  handleChange(event) {
    this.setState({newMessage: event.target.value});
  }

  //return time wout secs
  getTime(time) {
    time = new Date(time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return time;
    
    // let times = time.split(":");
    // return time = times[0]+":"+times[1];
  }


  render() {
    
    const contacts = this.state.items;
    const messages = this.state.messages;

    let currentUser = "";

    if (contacts[0]) { currentUser = contacts[0].fullname; }
    //if (currentUser) console.log(currentUser);
    
    let members = contacts.map(contact => (contact.shortname));
    members = members.join();

    let chats = messages.map(item => (
                  <div className="talk-bubble tri-right left-top">
                    <div className="ChatUserName">
                      {item.messageby}
                    </div>

                    <div className="talk-text">
                      <p>{item.message}</p>
                      
                      <p className="dateMsg">{ this.getTime(item.createdAt) }</p>
                    </div>
                  </div>
              
              ))
    
    //console.log(members);

    return (
      <div className="WhatsApp">

        <div className="SideBar">
          <div className="SideBarHeader">
            <div className="SideBarHeaderAvi">
              <img src="http://placehold.it/40x40" />
            </div>
            <div className="SideBarHeaderUserName">
              {currentUser}
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
                { members }
              </div>
            </div>
            <div className="GroupIcons">
              <img src="http://placehold.it/40x40" />
              <img src="http://placehold.it/40x40" />
              <img src="http://placehold.it/40x40" />
            </div>
          </div>

          <div className="Chats">
            
            { chats }
            
            
            
            
          </div>

          <div className="ChatInputBar">
            <div className="Smileys">
              <img src="http://placehold.it/40x40" />
            </div>
            <div className="ChatInput">
              <form onSubmit={this.handleSubmit}>
                <input className="ChatBox" value={this.state.value} onChange={this.handleChange}  />
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
