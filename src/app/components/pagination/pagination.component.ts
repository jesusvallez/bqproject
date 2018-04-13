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
    let delta = 1, numToPush = 7
    let arrayRange = [], arrayRangeFilled = []

    let setRange = new Set()
    let currentPage = this.page
    let nOfPages = Math.trunc(this.count / 20)

    if (nOfPages <= 1) {
      arrayRange.push(1)
      return arrayRange
    }

    for (let i = 1; i <= delta; i++) {
      let minPush = currentPage - i
      let maxPush = currentPage + i

      if (1 < minPush) {
        setRange.add(minPush)
      }

      if (maxPush < nOfPages) {
        setRange.add(maxPush)
      }
    }

    setRange.add(1);
    setRange.add(nOfPages)
    setRange.add(currentPage)

    arrayRange = Array.from(setRange);
    arrayRange.sort((a, b) => a - b)

    if (nOfPages < numToPush) {
      numToPush = nOfPages
    }

    for (let index = 0; index < arrayRange.length - 1; index++) {
      const element = arrayRange[index];
      const nextElement = arrayRange[index + 1];
      arrayRangeFilled.push(element)

      if (nextElement - element === 2) {
        arrayRangeFilled.push(element + 1);
      } else if (nextElement - element !== 1) {
        arrayRangeFilled.push(null);
      }
    }

    arrayRangeFilled.push(nOfPages)

    return arrayRangeFilled
  }
}
