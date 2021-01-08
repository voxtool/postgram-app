import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketioService } from '../services/socketio.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  socket = this.socketService.socket
  messages = []

  constructor(private userService: UserService, private socketService: SocketioService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.socket.emit('join', { sender: this.userService.currentUser.username, receiver: this.router.snapshot.params.username });
    this.socket.on('chat', (data) => {
      this.messages.push(data);
    })
    this.socket.on('join', (data) => {
      this.messages = [];
      this.messages.push(...data);
    })
  }

  chatHandler(value) {
    this.socket.emit('chat', { message: value.comment, receiver: this.router.snapshot.params.username, sender: this.userService.currentUser.username });
  }

}
