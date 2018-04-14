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
    let fistPage:boolean = false

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
    let currentPage:number = this.page
    let nOfPages:number = Math.trunc(this.count / 20)

    let setRange:Set<number> = new Set()
    let arrayRange:Array<number> = [], arrayRangeFilled:Array<number> = []

    if (nOfPages <= 1) {
      arrayRangeFilled = [1]
    } else {
      let numToPush:number = 7
      arrayRange = this.generateInitPagination (setRange, currentPage, nOfPages)
      arrayRangeFilled = this.fillWithDots (arrayRange, nOfPages)
      arrayRangeFilled = this.fillWithNumbers(arrayRangeFilled, arrayRange, nOfPages, numToPush)
    }

    return arrayRangeFilled
  }

  generateInitPagination (setRange:Set<number>, currentPage:number, nOfPages:number):Array<number> {
    let arrayRange:Array<number> = []
    let minPush:number = currentPage - 1
    let maxPush:number = currentPage + 1

    if (1 < minPush) {
      setRange.add(minPush)
    }

    if (maxPush < nOfPages) {
      setRange.add(maxPush)
    }

    setRange.add(1);
    setRange.add(nOfPages)
    setRange.add(currentPage)

    arrayRange = Array.from(setRange);
    arrayRange.sort((a, b) => a - b)

    return arrayRange
  }

  fillWithDots (arrayRange:Array<number>, nOfPages:number):Array<number> {
    let arrayRangeFilled:Array<number> = []
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

  fillWithNumbers (arrayRangeFilled:Array<number>, arrayRange:Array<number>, nOfPages:number, numToPush:number):Array<number> {
    if (nOfPages < numToPush) {
      numToPush = nOfPages
    }

    let numToFill:number = numToPush - arrayRangeFilled.length
    arrayRange = arrayRangeFilled.slice()

    if (arrayRange[1] !== null && arrayRange[arrayRange.length - 2] === null) {
      for (let index = 1; index <= numToFill; index++) {
        arrayRangeFilled.splice(arrayRange.length - 3 + index, 0, arrayRange[arrayRange.length - 3] + index);
      }

      if (arrayRangeFilled[arrayRangeFilled.length - 3] + 2 === arrayRangeFilled[arrayRangeFilled.length - 1]) {
        arrayRangeFilled[arrayRangeFilled.length - 2] = arrayRangeFilled[arrayRangeFilled.length - 1] - 1;
      }
    } else if (arrayRange[1] === null && arrayRange[arrayRange.length - 2] !== null) {
      for (let index = 1; index <= numToFill; index++) {
        arrayRangeFilled.splice(2, 0, arrayRange[2] - index);
      }

      if (arrayRangeFilled[0] + 2 === arrayRangeFilled[2]) {
        arrayRangeFilled[1] = arrayRangeFilled[0] + 1;
      }
    }

    return arrayRangeFilled
  }

}
