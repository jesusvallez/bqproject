import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../interfaces/project';
import { Observable } from 'rxjs/Observable';
import { ProjectCount } from '../interfaces/projectCount';

@Injectable()
export class ProjectService {

  private url: string = 'http://api-next.bitbloq.k8s.bq.com/bitbloq/v1/project';
  private urlCount: string = 'http://api-next.bitbloq.k8s.bq.com/bitbloq/v1/project?count=*';


  constructor(private http: HttpClient) { }

  getProjects (page:number): Observable<Project[]> {
    if (isNaN(page)) {
      page = 0
    }

    return this.http.get<Project[]>(`${this.url}?page=${page}`);
  }

  getCountProjects (): Observable<ProjectCount> {
    return this.http.get<ProjectCount>(`${this.urlCount}`);
  }
}
