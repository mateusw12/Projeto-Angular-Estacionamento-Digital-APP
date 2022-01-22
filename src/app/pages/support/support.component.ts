import {
  Component,
  ElementRef,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Support } from 'src/app/models/support/support';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent implements OnInit {
  form!: FormGroup;
  name = 'Angular ' + VERSION.major;
  dataimage: any;

  @ViewChild('fileInput') fileInput: ElementRef | any;
  fileAttr = 'Choose File';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  uploadFileEvt(imgFile: any): void {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name;
      });
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
          this.dataimage = imgBase64Path;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  private createForm() {
    return (this.form = this.fb.group({
      complaint: ['', [Validators.required]],
      file: [''],
    }));
  }

  private getModel(): Support {
    const model = new Support();
    const formValue = this.form.getRawValue();
    model.complaint = formValue.complaint as string;
    model.file = formValue.file as string;
    model.fileName = formValue.fileName as string;
    return model;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const model = this.getModel();
    }
  }
}
