import {Component, Input, Signal} from '@angular/core';
import {HoveredPictureMemberComponent} from "../../widgets/hovered-picture-member/hovered-picture-member.component";
import {HoveredPictureWidgetComponent} from "../../widgets/hovered-picture-widget/hovered-picture-widget.component";
import {NgOptimizedImage} from "@angular/common";
import {toSignal} from "../../utils/signals/signal.util";
import {HoveredPicutreModel} from "../../models/hovered-picutre.model";

@Component({
  selector: 'app-our-service',
  standalone: true,
  imports: [
    HoveredPictureMemberComponent,
    HoveredPictureWidgetComponent,
    NgOptimizedImage
  ],
  templateUrl: './our-service.component.html',
  styleUrl: './our-service.component.scss'
})
export class OurServiceComponent {
  @Input({transform: toSignal})
  product!: Signal<HoveredPicutreModel[]>
}
