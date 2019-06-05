import { Component, OnInit } from '@angular/core';
import { InvoiceLine, InvoiceCalculatorService, Invoice } from './invoice-calculator.service';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  invoiceLines: InvoiceLine[] = [];
  invoice: Invoice;

  product = '';
  priceInclusiveVat = 0;
  vatCategoryString = 'Food';

  negativeValueMessage = false;

  vatCategories = VatCategory;

  constructor(private invoiceCalculator: InvoiceCalculatorService) { }

  ngOnInit(): void {
    this.calculateInvoice();
  }

  addInvoice() {
    if (this.priceInclusiveVat >= 0) {
      this.negativeValueMessage = false;
      this.invoiceLines.push(
        {
          product: this.product,
          vatCategory: VatCategory[this.vatCategoryString],
          priceInclusiveVat: this.priceInclusiveVat
        }
      );
      this.calculateInvoice();
    } else {
      this.negativeValueMessage = true;
    }
  }

  calculateInvoice() {
    this.invoice = this.invoiceCalculator.CalculateInvoice(this.invoiceLines);
  }

}
