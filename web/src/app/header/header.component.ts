import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemViewType, Path } from '../utils/file';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  parsedPath!: Path;
  userName = 'John Doe';
  @Input() viewType!: ItemViewType;

  @Output() toggleViewType = new EventEmitter<ItemViewType>();
  @Output() addNew = new EventEmitter<void>();
  @Output() uploadFile = new EventEmitter<FileList>();
  @Output() updatePath = new EventEmitter<string>();

  @Input() set path(newPath: string) {
    const segments = newPath.split('/');
    this.parsedPath = {
      segments,
    };
  }

  onPathReselect(segmentIdx: number): void {
    const selectedPath = this.parsedPath.segments.slice(0, segmentIdx + 1);

    console.log(selectedPath);
    this.updatePath.emit(selectedPath.join('/'));
  }

  onToggleViewType(): void {
    this.viewType = this.viewType === 'list' ? 'grid' : 'list';
    this.toggleViewType.emit(this.viewType);
  }

  onAddNew(): void {
    this.addNew.emit();
  }

  onUploadFile($event: Event): void {
    const input = $event.target as HTMLInputElement;
    const { files } = input;

    if (!files || !files.length) {
      return;
    }

    this.uploadFile.emit(files);
  }
}
