import { Injectable } from '@angular/core';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceCalculatorService {

  constructor(private vatCategoriesService: VatCategoriesService) { }

  public CalculatePriceExclusiveVat(priceInclusiveVat: number, vatPercentage: number): number {
    return (priceInclusiveVat / (100 + vatPercentage)) * 100;
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    const invoice: Invoice = {
      invoiceLines: [],
      totalPriceInclusiveVat: 0,
      totalPriceExclusiveVat: 0,
      totalVat: 0
    };
    invoiceLines.forEach((value: InvoiceLine) => {
      const priceExclVat = this.CalculatePriceExclusiveVat(value.priceInclusiveVat, this.vatCategoriesService.getVat(value.vatCategory));
      invoice.invoiceLines.push(
        {
          product: value.product,
          priceInclusiveVat: value.priceInclusiveVat,
          vatCategory: value.vatCategory,
          priceExclusiveVat: priceExclVat
        }
      );
      invoice.totalPriceInclusiveVat += value.priceInclusiveVat;
      invoice.totalPriceExclusiveVat += priceExclVat;
      invoice.totalVat += value.priceInclusiveVat - priceExclVat;
    });
    return invoice;
  }
}
