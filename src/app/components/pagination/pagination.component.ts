import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProjectService } from '../../services/project.service'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {

  private pages:Array<number> = []
  private page:number = 1
  private count:number = 0

  constructor(private _projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.page = Number(params['page'])

      if (this.page < 0 || isNaN(this.page)) {
        this.page = 1
      }

      this._projectService.getCountProjects()
        .subscribe(data => this.count = data.count)
    })
  }

  setPage (value:number) {
    return `?page=${value}`
  }

  isFirstPage (value:number):boolean {
    let fistPage = false

    if(this.page === 1)
      fistPage = true

    return fistPage
  }

  isLastPage (value:number):boolean {
    let lastPage = false
    let nrOfPages = Math.ceil(this.count / 20) - 1

    if(this.page === nrOfPages)
      lastPage = true

    return lastPage
  }

  goToPrevPage(value:number) {
    let prevPage = this.page - 1
    return `?page=${prevPage}`
  }

  goToNextPage(value:number) {
    let nextPage = this.page + 1
    return `?page=${nextPage}`
  }

  getCountProjects () {
    let numToPush = 1
    let setRange = new Set()
    let arrayRange = []
    let currentPage = this.page
    let nrOfPages = Math.ceil(this.count / 20) - 1

    if (nrOfPages <= 1) {
      arrayRange.push(1)
      return arrayRange
    }

    for (let i = 1; i <= numToPush; i++) {
      let minPush = currentPage - i
      let maxPush = currentPage + i

      if (1 < minPush) {
        setRange.add(minPush)
      }

      if (maxPush < nrOfPages) {
        setRange.add(maxPush)
      }
    }

    setRange.add(1);
    setRange.add(nrOfPages)
    setRange.add(currentPage)

    arrayRange = Array.from(setRange);
    arrayRange.sort((a, b) => a - b)

    return arrayRange
  }
}
