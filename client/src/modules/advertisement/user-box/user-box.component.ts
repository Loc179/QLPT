import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-box',
  imports: [CommonModule],
  templateUrl: './user-box.component.html',
  styleUrl: './user-box.component.css'
})
export class UserBoxComponent {
  // Vietnamese location API endpoints
  private readonly API_PROVINCES = 'https://esgoo.net/api-tinhthanh/1/0.htm';
  private readonly API_DISTRICTS = 'https://esgoo.net/api-tinhthanh/2/';
  private readonly API_WARDS = 'https://esgoo.net/api-tinhthanh/3/';

  cityData: any[] = [];
  districtData: any[] = [];
  communeData: any[] = [];

  selectedCity = { id: '', name: '' };
  selectedDistrict = { id: '', name: '' };
  selectedCommune = { id: '', name: '' };

  @Output() addressChange = new EventEmitter<string>();
  @Output() onFilter = new EventEmitter<void>();

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>(`${this.API_PROVINCES}`).subscribe(res => {
      this.cityData = res.data;
    });
  }

  onCityChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === '-1') {
      this.selectedCity = { id: '', name: '' };
      this.addressChange.emit('');
      return;
    }

    const selected = this.cityData.find(c => c.id === value);
    if (selected) {
      this.selectedCity = { id: value, name: selected.name };
      this.addressChange.emit(selected.name);

      this.http.get<any>(`${this.API_DISTRICTS}${value}.htm`).subscribe(res => {
        this.districtData = res.data;
        this.communeData = [];
        this.selectedDistrict = { id: '', name: '' };
        this.selectedCommune = { id: '', name: '' };
      });
    }
  }

  onDistrictChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === '-1') {
      this.selectedDistrict = { id: '', name: '' };
      this.addressChange.emit(this.selectedCity.name);
      return;
    }

    const selected = this.districtData.find(d => d.id === value);
    if (selected) {
      this.selectedDistrict = { id: value, name: selected.name };
      this.addressChange.emit(`${selected.name}, ${this.selectedCity.name}`);

      this.http.get<any>(`${this.API_WARDS}${value}.htm`).subscribe(res => {
        this.communeData = res.data;
        this.selectedCommune = { id: '', name: '' };
      });
    }
  }

  onCommuneChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === '-1') {
      this.selectedCommune = { id: '', name: '' };
      this.addressChange.emit(`${this.selectedDistrict.name}, ${this.selectedCity.name}`);
      return;
    }

    const selected = this.communeData.find(c => c.id === value);
    if (selected) {
      this.selectedCommune = { id: value, name: selected.name };
      this.addressChange.emit(`${selected.name}, ${this.selectedDistrict.name}, ${this.selectedCity.name}`);
    }
  }

}
