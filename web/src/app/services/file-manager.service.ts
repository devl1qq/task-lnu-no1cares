import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';

export interface Item {
  name: string;
  date: string;
  type: string;
  size: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  private readonly shoesPath = 'Home/Products/Shoes';
  private readonly runningShoesPath = 'Home/Products/Shoes/Running Shoes';

  private generateMockData(type: string, count: number): Item[] {
    return Array.from({ length: count }, (_, index) => ({
      type,
      name: `${type} ${index + 1}`,
      date: moment.utc(new Date()).format('yyyy-MM-dd'),
      size: '1.5 MB',
    }));
  }

  getFoldersContent(path: string): Observable<Item[]> {
    if (path === this.shoesPath) {
      return of([
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
      ]);
    } else if (path === this.runningShoesPath) {
      return of(this.generateMockData('folder', 5));
    } else if (path.startsWith(`${this.runningShoesPath}/Folder`)) {
      const folderNumber = +path.split('/').pop();
      return of(this.generateMockData('file', folderNumber * 3));
    } else {
      return throwError('Invalid path');
    }
  }
}
