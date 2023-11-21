import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../utils/file';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  constructor(private _http: HttpClient) {}

  getFoldersContent(path: string): Item[] {
    // : Observable<Item[]>
    // mock api call
    // return this._http.get('https://jsonplaceholder.typicode.com/todos/1')

    if (path === 'Home/Products/Shoes') {
      return [
        {
          name: 'Running Shoes',
          date: moment.utc(new Date()).format('yyyy-MM-dd'),
          type: 'folder',
          size: '1.5 MB',
        },
        {
          name: 'image 2',
          date: moment.utc(new Date()).format('yyyy-MM-dd'),
          type: 'image',
          size: '1.5 MB',
        },
        {
          name: 'folder 3',
          date: moment.utc(new Date()).format('yyyy-MM-dd'),
          type: 'folder',
          size: '1.5 MB',
        },
      ];
    } else if (path === 'Home/Products/Shoes/Running Shoes') {
      return [
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
    } else {
      return [];
    }
  }
}
