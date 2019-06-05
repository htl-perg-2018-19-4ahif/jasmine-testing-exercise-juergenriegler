import { Injectable } from '@angular/core';

export enum VatCategory {
  Food,
  Drinks
}

@Injectable({
  providedIn: 'root'
})
export class VatCategoriesService {

  constructor() { }

  public getVat(category: VatCategory): number {
    if (category === 0) {
      return 20;
    }
    if (category === 1) {
      return 10;
    }
    return NaN;
  }
}
