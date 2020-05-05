import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService} from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-glogin',
  templateUrl: './glogin.component.html',
  styleUrls: ['./glogin.component.scss']
})
export class GloginComponent implements OnInit {
  constructor(public as :AuthService ,private route:Router) { }


  ngOnInit() {
    
  }
  

}

