import * as moment from 'moment';

export type ItemViewType = 'list' | 'grid';

export type ItemType = 'folder' | 'image' | 'video' | 'audio' | 'document';

export type Item = {
  id: string;
  parentId: string;
  name: string;
  type: ItemType;
  date: string; // to date
  size: string;
};

export interface ItemsResponse {
  items: Item[];
  path: Path;
}

export type ItemViewModel = Item & {
  isRenameMode?: boolean;
};

export type PathItem = {
  name: string;
  id: string;
};

export type Path = {
  segments: PathItem[];
};

export function toItem(file: File): ItemViewModel {
  return {
    id: '',
    parentId: '',
    name: file.name,
    type: getFileType(file),
    date: moment.utc(new Date()).format('yyyy-MM-DD'),
    size: getFileSize(file),
  };
}

function getFileType(file: File): ItemType {
  const { type } = file;

  if (type === 'inode/directory') {
    return 'folder';
  }

  const [fileType] = type.split('/');

  switch (fileType) {
    case 'image':
      return 'image';
    case 'video':
      return 'video';
    case 'audio':
      return 'audio';
    default:
      return 'document';
  }
}

const fileUnits = ['B', 'KB', 'MB', 'GB', 'TB'];

function getFileSize(file: File): string {
  let { size } = file; // todo rework to use const instead of let

  for (let i = 0; i < fileUnits.length - 1; i++) {
    if (size < 1024) {
      return `${size.toFixed(2)} ${fileUnits[i]}`;
    }

    size /= 1024;
  }

  return `${size.toFixed(2)} ${fileUnits[fileUnits.length - 1]}`;
}
