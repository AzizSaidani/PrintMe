import {Component} from '@angular/core';
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {NgxDropzoneModule} from "ngx-dropzone";
import {AddProductService} from "../service/add-product.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgStyle,
    NgClass,
    NgxDropzoneModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedElement = 'Products'
  files: File[] = []

  constructor(private service: AddProductService) {
  }


  onSelect(event: any) {
    this.files = [];
    const firstFile = event.addedFiles[0];
    if (firstFile) {
      this.files.push(firstFile);
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1)
  }


  async addProduct() {

    let imagePath: string

    if (!this.files[0]) {
      alert('no files')
    }
    const file_data = this.files[this.files.length - 1]
    const data = new FormData()
    data.append('file', file_data)
    data.append('upload_preset', 'pfe_product')
    data.append('cloud_name', 'dwkp2dnfs')
    this.service.uploadImage(data).subscribe((res) => {
      imagePath = res.url

      const product = {
        name: 'product1',
        price: '2000',
        imagePath: imagePath,
        description: 'seramique'
      }
      this.service.addProduct(product).subscribe(res => {
          console.log(res)
        },
        (error) => {
          console.error('Login failed:', error);
        })

    })


  }


}
