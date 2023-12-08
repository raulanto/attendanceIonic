import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu1',
  templateUrl: './menu1.page.html',
  styleUrls: ['./menu1.page.scss'],
})
export class Menu1Page implements OnInit {
  groupData: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupData = {
        gro_id: params.get('gro_id'),
        gro_subject: params.get('gro_subject'),
        gro_code: params.get('gro_code'),
      };
    });
  }
}

