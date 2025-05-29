import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BreadcrumbService } from '../../../services/breadcrumb/breadcrumb.service';
import { faAngleRight, faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BreadcrumbModel } from '../../../models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: BreadcrumbModel[] = [];
  public faHome: IconDefinition = faHome;
  public faAngleRight: IconDefinition = faAngleRight;

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
