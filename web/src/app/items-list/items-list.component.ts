import { Component, OnInit } from '@angular/core';
import { ItemViewType } from '../utils/common';

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
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  viewType: ItemViewType = 'grid';
  items!: Item[];

  ngOnInit(): void {
    this._fillFolders();
  }

  onToggleViewType($event: ItemViewType): void {
    this.viewType = $event;
  }

  onAddNew(): void {
    this.items.push({
      type: 'folder',
      name: 'New Folder',
      date: '2021-01-01',
      size: '1.5 MB',
    });
  }

  private _fillFolders(): void {
    this.items = [
      {
        type: 'folder',
        name: 'Folder 1',
        date: '2021-01-01',
        size: '1.5 MB',
      },
      {
        type: 'folder',
        name: 'Folder 1',
        date: '2021-01-01',
        size: '1.5 MB',
      },
      {
        type: 'folder',
        name: 'Folder 1',
        date: '2021-01-01',
        size: '1.5 MB',
      },
      {
        type: 'folder',
        name: 'Folder 1',
        date: '2021-01-01',
        size: '1.5 MB',
      },
      {
        type: 'folder',
        name: 'Folder 1',
        date: '2021-01-01',
        size: '1.5 MB',
      },
      {
        type: 'folder',
        name: 'Folder 1',
        date: '2021-01-01',
        size: '1.5 MB',
      },
      {
        type: 'folder',
        name: 'Folder 1',
        date: '2021-01-01',
        size: '1.5 MB',
      },
      {
        type: 'folder',
        name: 'Folder 1',
        date: '2021-01-01',
        size: '1.5 MB',
      },
    ];
  }
}
