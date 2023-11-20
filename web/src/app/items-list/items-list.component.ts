import { Component, OnInit } from '@angular/core';
import { ContextMenuSettings } from '../utils/common';
import { ItemViewModel, ItemViewType, toItem } from '../utils/file';

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

  onUploadFile(files: FileList): void {
    Array.from(files)
      .map((file) => toItem(file))
      .forEach((item) => this._addItem(item));
  }

  // region Context Menu

  onAddNew(): void {
    this.disableContextMenu();
    this._addItem({
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

  private _addItem(item: ItemViewModel) {
    this.items.push(item);
  }

  // endregion
}
