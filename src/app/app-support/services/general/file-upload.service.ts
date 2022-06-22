import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { imageExtensionList, videoExtensionList } from '../../constants/core-constants';

@Injectable({
    providedIn: 'root',
})

export class FileUploadService {

    constructor(
        private router: Router,
        private toastr: ToastrService
    ) {}

    checkFileFormat(file, format: string): boolean {
        const dotPos = file.name.lastIndexOf('.');
        const extension = file.name.substring(dotPos);
        let extensionList: string[];
        if (format === 'image') {
          extensionList = imageExtensionList;
        } else if (format === 'video') {
          extensionList = videoExtensionList;
        }
        if (extensionList.indexOf(extension) < 0) {
          let allowPhrase = '';
          let allowedFormats = '';
          extensionList.map((item, index) => {
            if (extensionList.length < 2) {
              allowPhrase = 'allowed format is ';
              allowedFormats += ` ${item.substring(1)}.`;
            } else {
              allowPhrase = 'allowed formats are ';
              if ((index + 1) < extensionList.length) {
                if ((index + 2) < extensionList.length) {
                  allowedFormats += `${item.substring(1)}, `;
                } else {
                  allowedFormats += `${item.substring(1)} and `;
                }
              } else {
                allowedFormats += `${item.substring(1)}.`;
              }
            }
          });
          const allowed = allowPhrase + allowedFormats;
          this.toastr.error(`You are attempting to upload a wrong file format, ${allowed}`, 'Wrong Format');
          return false;
        }
        return true;
    }

    checkFileSize(file, size: number, measure?: string): boolean {
        let sizeEstimate;
        if (measure && measure.toLocaleLowerCase() === 'mb') {
            sizeEstimate = size * (1024 * 1024);
        } else if (measure && measure.toLocaleLowerCase() === 'kb') {
            sizeEstimate = size * 1024;
        } else {
            sizeEstimate = size;
        }
        console.log({file: file.size, sizeEstimate});
        if (file.size > sizeEstimate) {
            let fileLimit;
            if (sizeEstimate > (1024 * 1024)) {
                fileLimit = (Math.round((sizeEstimate * 100) / (1024 * 1024)) / 100) + 'MB';
            } else if (sizeEstimate > 1024) {
                fileLimit = Math.round(sizeEstimate / 1024) + 'KB';
            } else {
                fileLimit = sizeEstimate + 'B';
            }
            this.toastr.error(`please upload a file smaller than ${fileLimit}`, 'Too Large');
            return false;
        }
        return true;
    }

}
