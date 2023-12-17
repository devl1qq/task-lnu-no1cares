import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, ItemsResponse, Path } from '../utils/file';
import * as moment from 'moment';
import { environment } from '../environments/environment';
import { itemRoutes } from '../utils/api-routes';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  constructor(private _http: HttpClient) {}

  getFoldersContent(id: string): Observable<ItemsResponse> {
    const route = environment.apiUrl + itemRoutes.getFiles;

    return this._http.get<ItemsResponse>(route, { params: { id: id }});

    return new Observable<ItemsResponse>((subscriber) => {
      subscriber.next({
        path: this._getFakePath(),
        items: this._getFakeItems(id)
      });
      subscriber.complete();
    });
  }

  private _getFakeItems(path: string): Item[] {
    if (path === 'Home/Products/Shoes') {
      return [
        {
          id: '',
          parentId: '',
          name: 'Running Shoes',
          date: moment.utc(new Date()).format('yyyy-MM-dd'),
          type: 'folder',
          size: '1.5 MB',
        },
        {
          id: '',
          parentId: '',
          name: 'image 2',
          date: moment.utc(new Date()).format('yyyy-MM-dd'),
          type: 'image',
          size: '1.5 MB',
        },
        {
          id: '',
          parentId: '',
          name: 'folder 3',
          date: moment.utc(new Date()).format('yyyy-MM-dd'),
          type: 'folder',
          size: '1.5 MB',
        },
      ];
    } else if (path === 'Home/Products/Shoes/Running Shoes') {
      return [
        {
          id: '',
          parentId: '',
          type: 'folder',
          name: 'Folder 1',
          date: '2021-01-01',
          size: '1.5 MB',
        },
        {
          id: '',
          parentId: '',
          type: 'folder',
          name: 'Folder 1',
          date: '2021-01-01',
          size: '1.5 MB',
        },
        {
          id: '',
          parentId: '',
          type: 'folder',
          name: 'Folder 1',
          date: '2021-01-01',
          size: '1.5 MB',
        },
        {
          id: '',
          parentId: '',
          type: 'folder',
          name: 'Folder 1',
          date: '2021-01-01',
          size: '1.5 MB',
        },
        {
          id: '',
          parentId: '',
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

  private _getFakePath(): Path {
    return {
      segments: [
        { name: 'Home', id: '1' },
        { name: 'Products', id: '2' },
        { name: 'Shoes', id: '3' },
      ]
    };
  }
}
