import { Component } from '@angular/core';
import {FormGroup,FormControl,FormBuilder} from '@angular/forms'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
filterForm: FormGroup;
  filterFields: any[];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.filterFields = [
      {
        key: "common",
        title: "main fields",
        group: [
          {
            key: "createdAt",
            title: "Create Date",
            type: "date"
          },
          {
            key: "individualPerson",
            title: "Physical Person",
            group: [
              {
                key: "firstname",
                title: "First Name",
                type: "text"
              },
              {
                key: "lastname",
                title: "Last Name",
                type: "text"
              },
              {
                key: "phone",
                title: "Phone Number",
                type: "text"
              },
              {
                key: "citizenshipCountry",
                title: "Country",
                type: "text"
              }
            ]
          },
          {
            key: "legalPerson",
            title: "Legal Person",
            group: [
              {
                key: "brandname",
                title: "Brand Name",
                type: "text"
              },
              {
                key: "fullname",
                title: "Full Name",
                type: "text"
              },
              {
                key: "phone",
                title: "Phone",
                type: "text"
              },
              {
                key: "registrationCountry",
                title: "Country",
                type: "text"
              }
            ]
          }
        ]
      }
    ];

    this.filterForm = this.generateFilterForm();
  }

  generateFilterForm(): FormGroup {
    const baseForm = this.fb.group({});
    this.filterFields.forEach(field => {
      baseForm.addControl(field.key, this.generateFormGroup(baseForm, field));
    });
    console.log(baseForm);
    return baseForm;
  }

  generateFormGroup(baseForm: FormGroup, field): FormGroup|FormControl {
    if (field.group) {
      const formGroup = this.fb.group({});
      field.group.forEach(item => {
        formGroup.addControl(item.key, this.generateFormGroup(formGroup, item));
      });
      return formGroup;
    }

      return new FormControl("");
  }}
