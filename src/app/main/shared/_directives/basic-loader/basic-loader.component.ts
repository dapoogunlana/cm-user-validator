import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-loader',
  templateUrl: './basic-loader.component.html',
  styleUrls: ['./basic-loader.component.scss']
})
export class BasicLoaderComponent implements OnInit {

  @Input() dimentions: any;
  @Input() colorMap: string;
  @Input() trueColor: string;

  constructor() { }

  ngOnInit() {
    if (this.dimentions) {
      this.styleSize();
    }
    if (this.colorMap) {
      this.styleColorMap();
    }
    if (this.trueColor) {
      this.styleTrueColor();
    }
  }

  styleSize(): void {
    const container: any = document.querySelector('.full');
    const spinners: any = document.querySelectorAll('.lds-ring div');
    if (container && spinners) {
      container.style.width = `${this.dimentions.size}px`;
      container.style.height = `${this.dimentions.size}px`;
      for (const div of spinners) {
        div.style.borderWidth = `${this.dimentions.stroke}px`;
      }
    }
  }

  styleColorMap(): void {
    let color;
    switch (this.colorMap) {
      case 'light':
        color = '#ffffff';
        break;
      case 'mid':
        color = '#567DF4';
        break;
      case 'grey':
        color = '#818181';
        break;
      case 'dark-grey':
        color = '#414141';
        break;
      case 'dark':
        color = '#14133b';
        break;
      default:
        color = '#ffffff';
        break;
    }
    const colorHolders: any = document.querySelectorAll('.lds-ring div');
    for (const div of colorHolders) {
      div.style.borderColor = `${color} transparent transparent transparent`;
    }
  }

  styleTrueColor(): void {
    const colorHolders: any = document.querySelectorAll('.lds-ring div');
    for (const div of colorHolders) {
      div.style.borderColor = `${this.trueColor} transparent transparent transparent`;
    }
  }

}
