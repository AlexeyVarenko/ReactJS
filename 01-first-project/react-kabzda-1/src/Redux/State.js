const ADD_POST='ADD-POST';
const UPDATE_NEW_POST_TEXT='UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY='UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE='SEND_MESSAGE';


let store = {
  _state: {

    profilePage: {
      posts: [
        { id: 1, message: 'Hi, how are you?', likeCount: 12 },
        { id: 2, message: "It's my first post", likeCount: 11 },
        { id: 3, message: "Blabla", likeCount: 13 },
        { id: 4, message: "DAda", likeCount: 14 },
      ],
      newPostText: 'it-kamasutra.com'


    },

    dialogsPage: {
      messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },
      ],
      dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Victor' },
        { id: 6, name: 'Valera' },
      ],
      newMessageBody: ""

    }

  },
  _callSubscriber() {
    console.log('State changed')
  },

  getState() {
    
    return this._state;
  },
  subscribe  (observer)  {
    this._callSubscriber = observer;
  },

  
  dispatch(action){
    if(action.type===ADD_POST){
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likeCount: 0,
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = '';
      this._callSubscriber( this._state);
    }
    else if(action.type===UPDATE_NEW_POST_TEXT){
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber( this._state);
    } 
    else if (action.type===UPDATE_NEW_MESSAGE_BODY){
      this._state.dialogsPage.newMessageBody = action.body;
      this._callSubscriber( this._state);
    }
    else if (action.type===SEND_MESSAGE){
      let body=this._state.dialogsPage.newMessageBody
      this._state.dialogsPage.newMessageBody = '';
      this._state.dialogsPage.messages.push({ id: 6, message: body });
      this._callSubscriber( this._state);
    }
  }

}

export const addPostActionCreator=()=>({ type: ADD_POST });
export const updateNewPostTextActionCreator=(text)=>({type: UPDATE_NEW_POST_TEXT, newText:text});

export const sendMessageCreator=()=>({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator=(body)=>({ type: UPDATE_NEW_MESSAGE_BODY, body:body });




export default store;
window.store=store;