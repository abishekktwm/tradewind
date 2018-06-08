import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {TimeAgoPipe} from 'time-ago-pipe';

@Component({
  selector: 'microblog',
  templateUrl: './microblog.component.html',
  styleUrls: ['./microblog.component.css']
})



export class MicroblogComponent implements OnInit {
  @ViewChild('maininput')
  maininput: any;

  title = 'app';
  newMessage = '';
  replytoID = '';

  mouseEnter(id) {
    for (let i = 0; i < this.posts.length; i++) {
        if(this.posts[i].id == id ){
          this.posts[i]["hovered"] = true;
          break;
        }
    }
  }

  mouseLeave(id) {
    for (let i = 0; i < this.posts.length; i++) {
      if(this.posts[i].id == id ){
        this.posts[i]["hovered"] = false;

        if(this.posts[i]["replying"] == true){        
          this.posts[i]["hovered"] = true;
        }
        break;
      }

    }
  }

  // Dummy data
  users = {
    '1': {
      username: 'thanos',
      real_name: 'Thanos',
      verified: true
    },
    '2': {
      username: 'spiderman',
      real_name: 'Spiderman',
      verified: true
    },
    '3': {
      username: 'ironman',
      real_name: 'Ironman',
      verified: false
    }
  };

  posts = [
    {
      id: 2374237842,
      user: 1,
      message: 'There is no way you can stop me!.',
      ts: 1527823290,
      img: 'assets/thanos.jpg'
    },
    {
      id: 2374272076,
      user: 2,
      message: 'There is one way out of 14 million possibilities.',
      ts: 1527823395,
      img: 'assets/spiderman.jpg'
    },
    {
      id: 4545435344,
      user: 3,
      message: 'Spiderman, suit up! http://digitalspyuk.cdnds.net/17/48/980x490/landscape-1511974236-spidey2.jpg',
      ts: 1527823490,
      img: 'assets/ironman.jpg'
    },
    {
      id: 4629293242,
      user: 2,
      reply_to: 4545435344,
      message: 'Yes, sir! Wait, is that a reference from How I met your Mother?',
      ts: 1527823590,
      img: 'assets/spiderman.jpg'
    }
  ];

  newpost ={
      id: 0,
      user: 0,
      message: '',
      ts: 0,
      img: '',
      url: '',
      repostcount:'',
      favcount:'',
      replycount:''
  };

  currentuser ={
      username: 'starlord',
      real_name: 'Starlord',
      verified: true      
  };

  replymessage = {
    id: 0,
    user: 0,
    message: '',
    reply_to: 0,
    ts: 0,
    img: ''
  };

  ngOnInit() {

    this.currentuser ={
        username: 'starlord',
        real_name: 'Starlord',
        verified: true      
    };

    this.users["4"] = this.currentuser;
    this.posts[2]["replycount"] = 1;
    
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].message.indexOf('http') > 0) {
        this.posts[i]["url"] = this.posts[i].message.slice(this.posts[i].message.indexOf('http'));
        this.posts[i].message = this.posts[i].message.slice(0, this.posts[i].message.indexOf('http'));
      }
    }
  }

  postReply(id){
    this.replymessage = 
    {
      id: 0,
      user: 0,
      message: '',
      reply_to: 0,
      ts: 0,
      img: ''
    };

    let childReplyCounts = 0;
    
    this.maininput.nativeElement.focus();

    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == id) {
        this.posts[i]["hovered"] = true;
        this.posts[i]["replying"] = true;
        this.replytoID = id;
        break;
      }
    }

    if(this.newMessage!='' && this.newMessage.length<=140){
      this.replymessage["message"] = this.newMessage;
      this.replymessage["id"] = Math.round(Date.now()/100);
      this.replymessage["reply_to"] = id;
      this.replymessage["user"] = 4;
      this.replymessage["ts"] = Date.now()/1000;
      this.replymessage["img"] = 'assets/starlord.jpg';      

      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].reply_to == id && this.posts[i]["replycount"]) {
          childReplyCounts = childReplyCounts + parseInt(this.posts[i]["replycount"]);
        }
      }

      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].id == id) {

          if(this.posts[i]["replycount"]>0){
            this.posts[i]["replycount"]++;
          }
          else{
            this.posts[i]["replycount"] = 1;
          }

          this.posts[i]["hovered"] = false;
          this.posts[i]["replying"] = false;
          this.replytoID = '';

          this.posts.splice(i+this.posts[i]["replycount"] + childReplyCounts ,0,this.replymessage);
          this.newMessage = '';
          break;
        }
      }
    }

  }

  postRePost(id) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == id) {
        this.newpost["message"] = this.posts[i].message;
        this.newpost["url"] = this.posts[i]["url"];
        this.newpost["id"] = Math.round(Date.now()/100);
        this.newpost["user"] = 4;
        this.newpost["ts"] = Date.now()/1000;
        this.newpost["img"] = 'assets/starlord.jpg';
        if(this.posts[i]["repostcount"]>0)
          this.posts[i]["repostcount"]++;
        else
          this.posts[i]["repostcount"] = 1;
        
        break;
      }
    }
    this.newMessage = '';
    this.postNewPost(this.newpost);
  }

  postNewPost(newpost) {

    let now = Date.now();
    now = Math.round(now / 1000);

    if(this.replytoID!=''){
      this.postReply(this.replytoID);
    }

    else {
      if (this.newMessage != '' && this.newMessage.length <= 140) {
      
          this.newpost["message"] = this.newMessage;
          this.newpost["id"] = Math.round(Date.now()/100);
          this.newpost["user"] = 4;
          this.newpost["ts"] = Date.now()/1000;
          this.newpost["img"] = 'assets/starlord.jpg';
          
        if (this.newpost["message"].indexOf('http') >=0) {
          this.newpost["url"] = this.newpost.message.slice(this.newpost["message"].indexOf('http'));
          this.newpost["message"] = this.newpost.message.slice(0, this.newpost["message"].indexOf('http'));
        }

      this.newMessage = '';
      }
    
      if(this.newpost["message"]!='' || this.newpost["url"]!='')  {
        this.posts.unshift(this.newpost);
      }

      this.newpost = {
            id: 0,
            user: 0,
            message: '',
            ts: 0,
            img: '',
            url: '',
            repostcount:'',
            favcount:'',
            replycount:''
        };
    }
  }

  makePostFav(id){    
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == id) {
        if(this.posts[i]["favcount"]==1)
          this.posts[i]["favcount"]='';
        else
          this.posts[i]["favcount"] = 1;     
      
       break;
          }
    }
  }

}

