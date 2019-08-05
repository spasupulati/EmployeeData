import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

//import * as _ from 'underscore';

import { PagerService } from './_services/index'
import { CssSelector } from '@angular/compiler';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
    constructor(private http: Http, private pagerService: PagerService) { }

    // array of all items to be paged
    private allItems: any[];
    private pagesize:number;

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
    
    myPages: any [];

    ngOnInit() {
        // get dummy data
        this.http.get('./assets/dummy-data.json')
            .map((response: Response) => response.json())
            .subscribe(data => {
                // set items to json response
                this.allItems = data;
                this.pagesize = 5;
                // initialize to page 1
                this.setPage(1);

            });

    }
    
    filterForeCasts(filterVal: any) {
      
        if (filterVal == "0"){
            this.pagesize=10;
        }else if (filterVal == "1"){
          this.pagesize=50;
        } else{
          this.pagesize=100;
        }
        this.setPage(1);
    }
    
    submitEmployeeData(rowId: any, rowStatus: any) {
      alert('Employee data with Id: '+rowId + ' and Status: '+ rowStatus + ' has been submitted');
      
    }
    

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page,this.pagesize);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}