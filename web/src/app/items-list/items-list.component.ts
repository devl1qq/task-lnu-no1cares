import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContextMenuSettings } from '../utils/common';
import { ItemViewModel, ItemViewType, Path, toItem } from '../utils/file';
import { FileManagerService } from '../services/file-manager.service';
import { Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit, OnDestroy {
  viewType: ItemViewType = 'grid';
  itemId: string = '';
  path: Path = {
    segments: [
      { name: 'Home',
        id: ''
      },
      { name: 'Products',
        id: ''
      },
      { name: 'Shoes',
        id: ''
      },
    ]
  };
  items!: ItemViewModel[];
  newItemName: string = '';
  contextMenuSettings: ContextMenuSettings = {
    x: 0,
    y: 0,
    isVisible: false,
    data: [],
  };

  private folders$?: Subscription;

  constructor(private _fileManagerService: FileManagerService) {}

  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy(): void {
    this.folders$?.unsubscribe();
  }

  refresh(): void {
    this.folders$ = this._fileManagerService.getFoldersContent(this.itemId).pipe(catchError(err => {
      console.log(err);
      return [];
    })).subscribe(({path, items}) => {
      this.items = items;
      this.path = path;
    });
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

  onPathChange(id: string): void {
    this.itemId = id;
    this.refresh();
  }

  // region Item Actions

  onItemOpened(item: ItemViewModel): void {
    if (item.type !== 'folder') {
      // for now we only support folders
      return;
    }

    this.itemId = item.id;
    this.refresh();
  }

  onAddNew(): void {
    this.disableContextMenu();
    this._addItem({
      id: '',
      parentId: '',
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

  private _addItem(item: ItemViewModel) {
    this.items.push(item);
  }

  // endregion
}
