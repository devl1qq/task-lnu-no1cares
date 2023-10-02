import {Component, OnInit} from '@angular/core';

type ViewType = 'list' | 'grid';

type ItemType = 'folder' | 'image' | 'video' | 'audio' | 'document';

interface Item {
  type: ItemType;
  name: string;
  date: string; // to date
  size: string;
}

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit{
  viewType: ViewType = 'list';
  items!: Item[];

  ngOnInit(): void {
    this.items = [{
      type: 'folder',
      name: 'Folder 1',
      date: '2021-01-01',
      size: '1.5 MB'
    }, {
      type: 'folder',
      name: 'Folder 1',
      date: '2021-01-01',
      size: '1.5 MB'
    }];
  }

  onToggleViewType(): void {
    this.viewType = this.viewType === 'list' ? 'grid' : 'list';
  }
}
