import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../interfaces/project';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {

  public page:number = 1;
  public projects = [];
  private view:boolean = true;

  constructor(private _projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.page = Number(params['page'])

      if (this.page < 0 || isNaN(this.page)) {
        this.page = 1
      }

      this._projectService.getProjects(this.page)
        .subscribe(data => this.projects = data);
    });
  }

  getImageFromURL (project: Project) {
    return `http://storage.googleapis.com/bitbloq-next/images/project/${project._id}`
  }

  getView ():boolean {
    return this.view;
  }

  setGrid () {
    this.view = true;
  }

  setList () {
    this.view = false;
  }
}
