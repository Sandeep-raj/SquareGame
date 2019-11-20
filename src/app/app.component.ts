import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SquareGame';
  level = 1;
  noOfSq = new Array(this.level + 3);
  current = -1;
  Queue = [];
  listOfColor = ['White',
    'Yellow',
    'Blue',
    'Red',
    'Green',
    'Black',
    'Brown',
    'Azure',
    'Ivory',
    'Teal',
    'Silver',
    'Purple',
    'Gray',
    'Orange',
    'Maroon',
    'Charcoal',
    'Aquamarine',
    'Coral'];
  state = {
    1: "Pattern is being played.Please Observe.",
    2: "Now select the boxes in correct order",
    3: "You have successfully completed the current level. Moving to next level.",
    4: "You have failed the current level. Going back to level 1.",
    5: "Congratulations!!! You have completed all the levels.",
    6: "Selection of boxes started. You can't replay the pattern."
  }
  status = 0;

  currentstate = " ";

  squares = [];

  setSqStyle(i: number) {
    return {
      'background-color': this.listOfColor[i]
    };
  }

  getRandom() {
    if (this.Queue.length == 0) {
      var arr = [];
      for (var i = 0; i < this.noOfSq.length; i++) {
        arr.push(i);
      }
      console.log(arr);
      for (let i = this.noOfSq.length; i > 0; i--) {
        var randomNum = Math.floor(Math.random() * i);
        this.Queue.push(arr[randomNum]);
        arr.splice(randomNum, 1);
      }
      console.log(this.Queue);
      this.highlight();
    }
    else if (this.Queue.length != this.noOfSq.length && this.Queue.length > 0) {
      this.status = 6;
      this.setStatus();
    }
    else {
      this.highlight();
    }
  }

  highlight() {
    this.status = 1;
    this.setStatus();
    var offset = 1000;
    this.Queue.forEach(x => {
      this.delay(offset).then(any => {
        console.log(this.current);
        this.current = x;
      });
      offset += 1000;
    });
    this.delay(offset).then(any => {
      this.current = -1;
      this.status = 2;
      this.setStatus();
    });
  }

  SquareSelect(i: number, square: HTMLElement) {
    if (this.Queue.length > 0) {
      if (i == this.Queue[0]) {
        this.Queue.splice(0, 1);
        square.style.border = "2px green solid";
        this.squares.push(square);
        if (this.Queue.length == 0) {
          console.log('Success');
          this.level += 1;
          this.noOfSq = new Array(this.level + 3);
          this.status = 3;
          this.setStatus();
          this.clearSquares();
          if (this.level == 11) {
            console.log("Winner");
            this.status = 5;
            this.setStatus();
            this.level = 1;
            this.noOfSq = new Array(this.level + 3);
          }
        }
      } else {
        this.Queue = [];
        console.log('Failed');
        this.status = 4;
        this.setStatus();
        this.clearSquares();
        this.level = 1;
        this.noOfSq = new Array(this.level + 3);
      }
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

  setStatus() {
    this.currentstate = this.state[this.status];
  }

  clearSquares() {
    this.squares.forEach(x => x.style.border = "");
    this.squares = [];
  }

}


