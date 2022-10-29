import { Component, OnInit } from '@angular/core';
import {MessageService} from "../message.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  constructor(public messageService: MessageService) {}

}
