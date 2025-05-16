export interface AdvertisementModel {
  title: string;
  description: string;
  cost: number;
  area: number;
  latitude: number;
  longitude: number;
  province: string;
  district: string;
  ward: string;
  provinceName: string;
  districtName: string;
  wardName: string;
  userId: number;
  type: number;
  images: File[];
}