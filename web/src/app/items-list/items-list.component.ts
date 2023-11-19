import { Component, OnInit } from '@angular/core';
import { ContextMenuSettings, ItemViewType } from '../utils/common';

type ItemType = 'folder' | 'image' | 'video' | 'audio' | 'document';

type Item = {
  type: ItemType;
  name: string;
  date: string; // to date
  size: string;
};

type ItemViewModel = Item & {
  isRenameMode?: boolean;
};

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  viewType: ItemViewType = 'grid';
  items!: ItemViewModel[];
  newItemName: string = '';
  contextMenuSettings: ContextMenuSettings = {
    x: 0,
    y: 0,
    isVisible: false,
    data: [],
  };

  ngOnInit(): void {
    this._fillFolders();
  }

  onToggleViewType($event: ItemViewType): void {
    this.disableContextMenu();
    this.viewType = $event;
  }

  // region Context Menu

  onAddNew(): void {
    this.disableContextMenu();
    this.items.push({
      type: 'folder',
      name: 'New Folder',
      date: '2021-01-01',
      size: '1.5 MB',
    });
  }

  onRemove(item: ItemViewModel) {
    this.disableContextMenu();
    this.items = this.items.filter((i) => i !== item);
  }

  onRename(item: ItemViewModel) {
    this.disableContextMenu();
    item.isRenameMode = true;
  }

  rename(item: ItemViewModel) {
    item.isRenameMode = false;

    if (!this.newItemName) {
      return;
    }

    item.name = this.newItemName;
    this.newItemName = '';
  }

  disableContextMenu() {
    this.contextMenuSettings.isVisible = false;
  }

  onContextMenu($event: MouseEvent, item: ItemViewModel) {
    $event.preventDefault();
    this.disableContextMenu(); // remove previous context menu

    this.contextMenuSettings.isVisible = true;
    this.contextMenuSettings.x = $event.clientX;
    this.contextMenuSettings.y = $event.clientY;
    this.contextMenuSettings.data = [
      {
        name: 'Rename',
        action: () => {
          this.onRename(item);
        },
      },
      {
        name: 'Remove',
        action: () => {
          this.onRemove(item);
        },
      },
    ];
  }

  // endregion

  // region Private Methods

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

  // endregion
}
