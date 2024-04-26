import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { createMessageUrl, getMessagesUrl, getRecieverDetailsUrl } from '../../constants/endpoint-usage';
import { ToastserviceService } from '../../services/toastservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import Peer from 'peerjs';

export interface message {
  roomId: string,
  sender: string,
  receiver: string,
  messageText: string,
  sentAt: string,
  lastSeen: string,
  lastMessage: string
}



@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit, OnDestroy {
  userDetails: any = {}
  recieverDetails: any
  messages: any[] = []
  message: string = ''
  callingStarted: boolean = false
  IncomingCall: boolean = false
  IncomingCallDetails: string = ""
  videoStreaming: boolean = false
  peer:Peer
  peerIdShare: string;
  peerId: string
  lazyStream: any;
  currentPeer: any;
  peerList: Array<any> = []

  constructor(public apiService: ApiService, public toastService: ToastserviceService, private activatedRoute: ActivatedRoute, private websocketService: WebsocketService, private router: Router) {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
    this.peer = new Peer()
  }

  ngOnInit(): void {
    this.getRecieverDetailsUrl()
    this.getMessages()
    this.onMessage()
    this.onIncomingCall()
    this.onDeclineCall()
    this.handleConnectionError()
    this.onAccept()
    this.getPeerId()

  }


  onMessage() {
    this.websocketService.onMessage().subscribe(message => {
      this.messages.push(message)
    })
  }



  onIncomingCall() {
    this.websocketService.onIncomingCall().subscribe(IncomingCallDetails => {
      this.IncomingCallDetails = IncomingCallDetails
      this.IncomingCall = true
    })
  }

  onAccept() {
    this.websocketService.onAccept().subscribe(IncomingCallDetails => {
      this.IncomingCall = false
      this.callingStarted = false
      this.videoStreaming = true
    })
  }

  acceptCall() {
    this.IncomingCall = false
    this.callingStarted = false
    this.videoStreaming = true

    const callDetails = {
      roomId: this.activatedRoute.snapshot.params['roomid'],
      sender: '',
      receiver: this.recieverDetails._id,
      sentAt: Date.now,
      lastSeen: '',
      lastMessage: '',
      peerId: this.peerId,
      token: localStorage.getItem('token')
    }

    // by socket call
    this.websocketService.accept(callDetails, (acknowledgment) => {
      // Handle acknowledgment message from the server
      if (acknowledgment && acknowledgment.status === 200) {
        this.callPeer(this.IncomingCallDetails['peerId'])
      }
    });
  }

  onDeclineCall() {
    this.websocketService.onDeclineCall().subscribe(IncomingCallDetails => {
      this.IncomingCall = false
      this.callingStarted = false
      this.toastService.error('Call declined')
    })
  }


  handleConnectionError() {
    this.websocketService.handleConnectionError().subscribe(message => {
      this.toastService.error(message)
    })
  }

  async sendMessage() {
    if (!this.message) {
      this.toastService.error('Message can not be empty')
      return
    }
    try {
      const chat = {
        roomId: this.activatedRoute.snapshot.params['roomid'],
        sender: '',
        receiver: this.recieverDetails._id,
        messageText: this.message,
        sentAt: Date.now,
        lastSeen: '',
        lastMessage: '',
        token: localStorage.getItem('token')
      }

      // by socket call
      this.websocketService.sendMessage(chat, (acknowledgment) => {
        // Handle acknowledgment message from the server
        if (acknowledgment && acknowledgment.status === 200) {
          this.messages.push(chat)
          this.message = ''
        }
      });

      // by api call
      // const response = await this.apiService.postData(createMessageUrl, message).toPromise();
      // if (response.status == 200 || response.status == 201) {
      //   // fetch data 
      //   this.message = ''
      //   // receive message while send
      //   this.getMessages()
      // } else {
      //   this.toastService.error(response.message)
      // }
    } catch (error) {
      this.toastService.error('Server error')
    }
  }

  async getRecieverDetailsUrl() {
    try {

      const payload = {
        roomId: this.activatedRoute.snapshot.params['roomid']
      }
      const response = await this.apiService.postData(getRecieverDetailsUrl, payload).toPromise();
      if (response.status == 200) {
        // fetch data 
        this.recieverDetails = response['data']

      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }

  }



  async getMessages() {
    try {

      const payload = {
        roomId: this.activatedRoute.snapshot.params['roomid']
      }
      const response = await this.apiService.postData(getMessagesUrl, payload).toPromise();
      if (response.status == 200) {
        // fetch data 
        this.messages = response['messages']

      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }

  }

  ngOnDestroy(): void {
  }

  routeToPage() {
    this.router.navigate(['chat/dashboard'])
  }

  startCall() {
    const callDetails = {
      roomId: this.activatedRoute.snapshot.params['roomid'],
      sender: '',
      receiver: this.recieverDetails._id,
      sentAt: Date.now,
      lastSeen: '',
      lastMessage: '',
      peerId: this.peerId,
      token: localStorage.getItem('token')
    }

    this.websocketService.startCall(callDetails, (acknowledgment) => {
      // Handle acknowledgment message from the server
      if (acknowledgment && acknowledgment.status === 200) {
        this.callingStarted = true
      }
    });
  }


  declineCall() {

    const callDetails = {
      roomId: this.activatedRoute.snapshot.params['roomid'],
      sender: '',
      receiver: this.recieverDetails._id,
      sentAt: Date.now,
      lastSeen: '',
      lastMessage: '',
      peerId: this.peerId,
      token: localStorage.getItem('token')
    }

    this.websocketService.declineCall(callDetails, (acknowledgment) => {
      // Handle acknowledgment message from the server
      if (acknowledgment && acknowledgment.status === 200) {
        this.IncomingCall = false
        this.callingStarted = false
      }
    });
  }



  private getPeerId = () => {
    //Generate unique Peer Id for establishing connection
    
    this.peer.on('open', (id) => {
      this.peerId = id;
    });

    // Peer event to accept incoming calls
    this.peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        this.lazyStream = stream;

        call.answer(stream);
        call.on('stream', (remoteStream) => {
          if (!this.peerList.includes(call.peer)) {
            this.streamRemoteVideo(remoteStream, call.peer);
            this.currentPeer = call.peerConnection;
            this.peerList.push(call.peer);
          }
        });

      }).catch(err => {
        console.log(err + 'Unable to get media');
      });
    });
  }


  private streamRemoteVideo(stream, peer) {
    const video = document.createElement('video');
    video.classList.add('reel-video');
    video.srcObject = stream;
    video.play();

    peer != null && peer != this.peerIdShare ? document.getElementById('local-video').append(video) : document.getElementById('remote-video').append(video);
    peer != null && peer == this.peerIdShare ? document.getElementById('remote-video').append(video) : document.getElementById('local-video').append(video);


  }

  public callPeer(id: string): void {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      this.lazyStream = stream;

      const call = this.peer.call(id, stream);
      call.on('stream', (remoteStream) => {
        if (!this.peerList.includes(call.peer)) {
          this.streamRemoteVideo(remoteStream, call.peer);
          this.currentPeer = call.peerConnection;
          this.peerList.push(call.peer);
          this.IncomingCall = false
          this.callingStarted = false
          this.videoStreaming = true
        }
      });
    }).catch(err => {
      console.log(err + 'Unable to connect');
    });
  }

  public shareScreen() {
    // @ts-ignore
    navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    }).then(stream => {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.onended = () => {
        this.stopScreenShare();
      };

      const sender = this.currentPeer.getSenders().find(s => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
    }).catch(err => {
      console.log('Unable to get display media ' + err);
    });
  }

  public stopScreenShare() {
    const videoTrack = this.lazyStream.getVideoTracks()[0];
    const sender = this.currentPeer.getSenders().find(s => s.track.kind === videoTrack.kind);
    sender.replaceTrack(videoTrack);
  }

  connectWithPeer() {
    this.callPeer(this.peerIdShare)
  }

  screenShare() {
    this.shareScreen()
  }

}