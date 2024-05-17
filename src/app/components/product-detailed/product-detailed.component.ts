import {Component, Input, output, Signal} from '@angular/core';
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {toSignal} from "../../utils/signals/signal.util";
import {ProductModel} from "../../models/product.model";
import {NgOptimizedImage} from "@angular/common";
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-detailed',
  standalone: true,
  imports: [
    ProductCardComponent,
    NgOptimizedImage,
    NgxDropzoneModule,
    FormsModule
  ],
  templateUrl: './product-detailed.component.html',
  styleUrl: './product-detailed.component.scss'
})
export class ProductDetailedComponent {
  @Input({transform: toSignal})
  item!: Signal<ProductModel>
  setItemUndefined = output<void>();
  fileName = 'Choisir une image'
  amount = 1
  isCustomized = false;

  plus() {
    this.amount += 1
  }

  minus() {
    if (this.amount > 1) {
      this.amount -= 1
    }
  }


  files: File[] = []


  onSelect(event: any) {
    this.files = [];
    const firstFile = event.addedFiles[0];
    if (firstFile) {
      this.files.push(firstFile);
    }
    this.fileName = this.files[0].name
  }

}
