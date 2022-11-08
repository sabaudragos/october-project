import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "./service/localstorage-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'october-project';


  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.localStorageService.setCompanyId(1);
  }
}
