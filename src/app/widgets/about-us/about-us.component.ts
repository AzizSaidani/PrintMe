import {Component, Input, Signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {HoveredPictureWidgetComponent} from "../hovered-picture-widget/hovered-picture-widget.component";
import {toSignal} from "../../utils/signals/signal.util";
import {HoveredPicutreModel} from "../models/hovered-picutre.model";
import {HoveredPictureMemberComponent} from "../hovered-picture-member/hovered-picture-member.component";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    NgOptimizedImage,
    HoveredPictureWidgetComponent,
    HoveredPictureMemberComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

  @Input({transform: toSignal})
  product!: Signal<HoveredPicutreModel[]>

}
