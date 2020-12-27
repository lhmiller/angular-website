import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { TitleService } from '../shared/title.service';
import { groups, sites } from './part-data';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {
  partNum: FormControl;
  part: string;
  group: string;
  sites = sites;

  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.partNum = new FormControl('', this.partNumberValidator);
    this.partNum.valueChanges.subscribe(() => {
      this.makeLinks();
    });
    this.titleService.setTitle('BMW Part Lookup');
  }

  makeLinks = () => {
    if (this.partNum.valid) {
      const pn = this.formatPartNum(this.partNum.value);
      const groupNum = pn.substring(0, 2);
      this.part = `Part: ${groupNum} ${pn.substring(2, 4)} ${pn.substring(4, 5)} ${pn.substring(5, 8)} ${pn.substring(8, 11)} `;
      this.group = groups[groupNum];
    } else {
      this.part = '';
      this.group = '';
    }
  }

  searchSite = (searchUrl: string) => {
    window.open(searchUrl + this.formatPartNum(this.partNum.value));
  }

  private formatPartNum = (rawInput: string) => rawInput.replace(/\D/g, '');

  private partNumberValidator = (control: AbstractControl): {[key: string]: any} | null => {
    const { value } = control;
    const partNum = value.replace(/\D/g, '');
    return partNum.length !== 11
      ? { invalid: { value } }
      : null;
  }
}
