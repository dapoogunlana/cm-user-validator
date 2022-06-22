import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})

export class FilterService {

    constructor(private router: Router) {}

    processFilters(filters): any {
        return filters;
    }

    processQueries(param): any {
        let querySring = '';
        if (param && typeof(param) === 'object') {
            for (const item in param) {
                if (item) {
                    if (param[item] || param[item] === 0) {
                        if (querySring) {
                            querySring += `&${item}=${param[item]}`;
                        } else {
                            querySring += `${item}=${param[item]}`;
                        }
                    }
                }
            }
            if (querySring) {
                querySring = '?' + querySring;
            }
            return querySring;
        } else {
            return '';
        }
    }

}
