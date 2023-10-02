import {Component, OnInit} from '@angular/core';

interface Path {
  segments: string[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  path!: Path;
  userName = 'John Doe';

  ngOnInit(): void {
    this.path = {
      segments: ['Home', 'Products', 'Shoes', 'Running Shoes']
    };
  }

  onPathReselect(segmentIdx: number): void {
    const selectedPath = this.path.segments.slice(0, segmentIdx + 1);

    console.log(selectedPath);
  }
}
