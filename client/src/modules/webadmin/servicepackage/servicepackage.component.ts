import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicePackageModel } from '../../../models/servicepackage/servicepackage.model';
import { SERVICEPACKAGE_SERVICE } from '../../../constants/injection/injection.constant';
import { IServicepackageService } from '../../../services/servicepackage/servicepackage.service.interface';

@Component({
  selector: 'app-servicepackage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicepackage.component.html',
  styleUrl: './servicepackage.component.css',
})
export class ServicepackageComponent {
  packages: ServicePackageModel[] = [];

  selectedPackage: ServicePackageModel | null = null;
  isCreating = false;

  formPackage!: ServicePackageModel;

  constructor(
    @Inject(SERVICEPACKAGE_SERVICE) private readonly servicePackageService: IServicepackageService,
  ){
    this.loadPackages();
  }

  loadPackages() {
    this.servicePackageService.getAll().subscribe((items) => {
      this.packages = items;
    });
  }

  createNew() {
    this.isCreating = true;
    this.selectedPackage = null;
    this.formPackage = {
      id: 0,
      name: '',
      description: '',
      duration: 30,
      price: 0,
    };
  }

  editPackage(pkg: ServicePackageModel) {
    this.isCreating = true;
    this.selectedPackage = { ...pkg };
    this.formPackage = { ...pkg };
  }

  savePackage() {
    if (this.selectedPackage) {
      // Gọi service update
      this.servicePackageService.update(this.formPackage.id, this.formPackage).subscribe((updated) => {
        this.loadPackages();
        this.cancel();
      });
    } else {
      console.log(this.formPackage);
      // Gọi service create
      this.servicePackageService.create(this.formPackage).subscribe((created) => {
        this.loadPackages();
        this.cancel();
      });
    }
  }

  deletePackage(pkg: ServicePackageModel) {
    this.servicePackageService.delete(pkg.id).subscribe(res => {
      this.packages = this.packages.filter(i => i.id !== pkg.id)
    });
  }

  cancel() {
    this.isCreating = false;
    this.selectedPackage = null;
    this.formPackage = {
      id: 0,
      name: '',
      description: '',
      duration: 30,
      price: 0,
    };
  }
}
