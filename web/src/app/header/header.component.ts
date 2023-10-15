import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemViewType } from '../utils/common';

interface Path {
  segments: string[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  path!: Path;
  userName = 'John Doe';
  @Input() viewType!: ItemViewType;

  @Output() toggleViewType = new EventEmitter<ItemViewType>();
  @Output() addNew = new EventEmitter<void>();

  ngOnInit(): void {
    this.path = {
      segments: ['Home', 'Products', 'Shoes', 'Running Shoes'],
    };
  }

  onPathReselect(segmentIdx: number): void {
    const selectedPath = this.path.segments.slice(0, segmentIdx + 1);

    console.log(selectedPath);
  }

  onToggleViewType(): void {
    this.viewType = this.viewType === 'list' ? 'grid' : 'list';
    this.toggleViewType.emit(this.viewType);
  }

  onAddNew(): void {
    this.addNew.emit();
  }
}
