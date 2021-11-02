import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AdminService } from '../services/admin.service';
import { ToasterService } from '../../services/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create-webinar',
  templateUrl: './create-webinar.component.html',
  styleUrls: ['./create-webinar.component.scss']
})
export class CreateWebinarComponent implements OnInit {

  createWebinar: FormGroup;
  editId: string = '';
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  constructor(private readonly fb: FormBuilder, private readonly adminService: AdminService,
    private readonly toasterService: ToasterService, private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {
    this.createWebinar = this.getWebinarForm();
  }

  ngOnInit(): void {
    this.editId = this.activatedRoute.snapshot.queryParams.id;
    if (this.editId) {
      this.initEditForm();
    }
  }

  initEditForm() {
    const filter = `/id/${this.editId}`;
    this.adminService.getWebinar(filter).subscribe(response => {
      const formValue = response[0];
      const controls = [
        'id',
        'title',
        'author',
        'description',
        'date',
        'pdtTime',
        'edtTime',
        'liveOneAttendeePrice',
        'livegroupAttendeesPrice',
        'recOneAttendeePrice',
        'recgroupAttendeesPrice',
        'comboOneAttendeePrice',
        'combogroupAttendeesPrice',
        'duration',
        'webinarType',
        'webinarLink',
        'category',
        'htmlContent'
      ];
      controls.forEach(control => {
        this.createWebinar.get(control)!.setValue(formValue[control]);
      });
      this.createWebinar.get('thumbnailImage')!.setValue(formValue.webinarImageUrl);
      this.createWebinar.get('authorImage')!.setValue(formValue.authorImageUrl);
      this.createWebinar.get('title')!.setValue(formValue.title);
    }, error => {
      this.toasterService.error(error.message);
    })
  }

  getWebinarForm(): FormGroup {
    return this.fb.group({
      id: [],
      title: [],
      author: [],
      description: [],
      date: [],
      pdtTime: [],
      edtTime: [],
      liveOneAttendeePrice: [],
      livegroupAttendeesPrice: [],
      recOneAttendeePrice: [],
      recgroupAttendeesPrice: [],
      comboOneAttendeePrice: [],
      combogroupAttendeesPrice: [],
      duration: [],
      webinarType: [],
      webinarLink: [],
      category: [],
      thumbnailImage: [],
      authorImage: [],
      htmlContent: []
    });
  }

  saveWebinar() {
    console.log(this.createWebinar.value);
    this.adminService.saveWebinar(this.createWebinar.value).subscribe(response => {
      this.toasterService.success('Webinar Saved');
    }, error => {
      this.toasterService.error(error.message);      
    })
  }

  fileUpload(event: any, control: string) {
    console.log(event.target.files[0], control);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      // reader.onload = this._handleReaderLoaded.bind(this);
      reader.onload = (readerEvt: any) => {
        this.createWebinar.get(control)!.setValue(btoa(readerEvt.target.result));
        this.createWebinar.get(control)!.updateValueAndValidity();
      }
      reader.readAsBinaryString(file);
    }
  }

  // _handleReaderLoaded(readerEvt: any) {
  //   var binaryString = readerEvt.target.result;
  //   console.log(btoa(binaryString));
  // }

}
