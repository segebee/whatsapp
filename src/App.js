import React, { Component } from 'react';
import { Input,Icon } from 'semantic-ui-react'
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

    this.state = {items:[],messages:[],newMessage:'',sendButton:'unmute'};

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


    fetch("https://whatsappdemo.herokuapp.com/api/message/allwithusers").then(res => {
      return res.json()
    }).then(data => {
      //console.log(data)
      this.setState({messages: data})
    })

  }

  // getUserName(userId) {
  //   fetch("https://whatsappdemo.herokuapp.com/api/accounts/"+userId).then(res => {
  //     return res.json()
  //   }).then(data => {
  //     console.log(data.info.fullname)
  //     return data.info.fullname;
  //   })
  // }

  postMessage(messageby,message) {
    let postData = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({messageby: messageby, message: message})
    };

    fetch("https://whatsappdemo.herokuapp.com/api/message/new",postData).then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      //return data.info.fullname;
    })

  }
   
  handleSubmit(event, currentUser) {
    //console.log(event, data)
    event.preventDefault();
    this.setState({sendButton: 'unmute'});
    this.state.messages.push({messageby: {"_id":currentUser._id,"fullname":currentUser.fullname},message:this.state.newMessage,createdAt: Date.now() });
    //upload new message
    this.postMessage(currentUser._id,this.state.newMessage)
    //reset state
    this.setState({newMessage: ''});
  }
  
  handleChange(event) {
    this.setState({sendButton: 'send'});
    this.setState({newMessage: event.target.value});
  }

  //return time wout secs
  getTime(time) {
    time = new Date(time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return time;
  }

  isSender(item,currentUser) {

    console.log("item:",item)
    //console.log("currentUser",currentUser)
    //validate ids are present
    if (!item.messageby) return;
    if (!currentUser._id === null) return;

    if (item.messageby._id === currentUser._id) return "sender right-top ";

    return "left-top ";
  }

  //get random colors
  getRandomColor() {
    const colors = ["#ea960d","#ca28eb","#72cef6","#67ab18"];

    let chosen = Math.random() * colors.length;
    return colors[parseInt(chosen)];
  }


  render() {
    
    const contacts = this.state.items;
    const messages = this.state.messages;

    let currentUser = "";

    if (contacts[0]) { currentUser = contacts[0]; }
    //if (currentUser) console.log(currentUser);
    
    let members = contacts.map(contact => (contact.shortname));
    members = members.join().substring(0,50);
    members += "...";

    let filteredChats = messages.filter( 
      (message) => (message.messageby && message.message)
    )

    let chats = filteredChats.map(item => (


      <div className={"talk-bubble tri-right "+ this.isSender(item,currentUser)} >
        <div className="ChatUserName" style={{color:this.getRandomColor()}}>
          {item.messageby.fullname}
        </div>

        <div className="talk-text">
          <p>{item.message}</p>
          
          <p className="dateMsg">{ this.getTime(item.createdAt) }</p>
        </div>
      </div>
  
    ));
    
    //console.log(members);

    return (
      <div className="WhatsApp">

        <div className="SideBar">
          <div className="SideBarHeader">
            <div className="SideBarHeaderAvi">
              <img src="/images/oval.jpg" width="50px" height="50px" />
            </div>
            <div className="SideBarHeaderUserName">
              {currentUser.fullname}
            </div>
            <div className="SideBarHeaderIcons">
              <Icon name='edit' size="large" />

              <Icon name='angle down' size="large" />
            </div>
          </div>
          <div className="SideBarSearch">
            <Input icon="search" iconPosition="left" placeholder="Search contacts" />
            
          </div>
          <div className="ContactsList">
           
            {
              this.state.items.map(contact => (   
                <div className="Contact" key={contact._id} >
                  <div className="ContactAvi">
                    <img src={`http://loremflickr.com/g/200/200/love/all?random=${contact._id}`} width="50" height="50" />
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
              <Icon circular inverted color='teal' size="large" name='users' />
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
              <Icon size="large" name='search' />
              <Icon size="large" name='attach' />
              <Icon size="large" name='angle down' />
            </div>
          </div>

          <div className="Chats">
            
            { chats }
            
            
            
            
          </div>

          <div className="ChatInputBar">
            <div className="Smileys">
              <Icon size="large" name='smile' />
            </div>
            <div className="ChatInput">
              <form onSubmit={ (e) => this.handleSubmit(e,currentUser)}>
                <input className="ChatBox" value={this.state.newMessage} onChange={this.handleChange}  />
              </form>
            </div>
            <div className="Microphone">
              <Icon size="large" name={this.state.sendButton} />
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
