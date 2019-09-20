import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-percentage-box',
  templateUrl: './percentage-box.component.html',
  styleUrls: ['./percentage-box.component.css']
})
export class PercentageBoxComponent implements OnInit {
  @Input() percent: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
