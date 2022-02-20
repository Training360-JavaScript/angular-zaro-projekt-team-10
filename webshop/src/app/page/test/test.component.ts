import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

class Progress {
  constructor(
    public file: string = '',
    public toDelete: any[] = [],
    public toDeleteDone: boolean,
    public deleted: number = 0,
    public deleteDone: boolean,
    public toPush: any[] = [],
    public toPushDone: boolean,
    public pushed: number = 0,
    public pushDone: boolean,
  ){}
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  constructor(
    private http: HttpClient
  ) {
    this.files.forEach((file) => {
      this.progress.set(file, new Progress(file, [], false, 0, false, [], false, 0, false))
    });
  }
  
  progress: Map<string, Progress> = new Map<string, Progress>();
  localAddress: string = 'http://localhost:3000';
  remoteAddress: string = 'https://nettuts.hu/jms/team10';
  files: string[] = [
    'address',
    'bill',
    'category',
    'customer',
    'order',
    'orderline',
    'product',
  ];

  currentFileIndex: number = 0;

  ngOnInit(): void {
  }

  startProgress(): void {
    this.progress.clear();
    this.files.forEach((file) => {
      this.progress.set(file, new Progress(file, [], false, 0, false, [], false, 0, false))
    });

    this. currentFileIndex = 0;
    this.startFile();
  }

  startFile() {
    let step = this.progress.get(this.files[this.currentFileIndex]);
    if (step) {
      this.getListRemote(step);
    } else {
      console.error('Couldn\'t find: ' + this.files[this.currentFileIndex]);
    }
  }

  getListRemote(step: Progress) {
    this.http.get<any[]>(`${this.remoteAddress}/${step.file == 'orderline' ? 'order-line' : step.file}`)
      .subscribe((entities) => {
        step.toDelete = entities;
        step.toDeleteDone = true;
        this.progress.set(step.file, step);
        if (step.toDelete.length == 0) {
          step.deleteDone = true;
          this.progress.set(step.file, step);
          this.getListLocal(step);
        } else {
          this.deleteRemote(step);
        }
      });    
  }

  deleteRemote(step: Progress) {
    step.toDelete.forEach((entity) => {
      this.http.delete(`${this.remoteAddress}/${step.file == 'orderline' ? 'order-line' : step.file}/${entity['id']}`)
        .subscribe((result) => {
          step.deleted++;
          step.deleteDone = step.deleted == step.toDelete.length;
          this.progress.set(step.file, step);
          if (step.deleteDone) {
            this.getListLocal(step);
          }
        });
    });
  }

  getListLocal(step: Progress) {
    this.http.get<any[]>(`${this.localAddress}/${step.file}`)
      .subscribe((entities) => {
        step.toPush = entities;
        step.toPushDone = true;
        this.progress.set(step.file, step);
        this.pushRemote(step);
      });    
  }

  pushRemote(step: Progress) {
    step.toPush.forEach((entity) => {
      this.http.post<any>(`${this.remoteAddress}/${step.file == 'orderline' ? 'order-line' : step.file}`, entity)
        .subscribe((ret) => {
          step.pushed++;
          step.pushDone = step.pushed == step.toPush.length;
          this.progress.set(step.file, step);
          if (step.pushDone) {
            if (this.currentFileIndex < this.files.length - 1) {
              this.currentFileIndex++;
              this.startFile();
            }
          }
        })
    });
  }
}
