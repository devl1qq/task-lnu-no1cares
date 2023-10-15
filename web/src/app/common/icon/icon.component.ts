import {
  Component,
  Input,
  OnInit as OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnChanges {
  @Input() name!: string;

  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name']) {
      this._matIconRegistry.addSvgIcon(
        this.name,
        this._domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${this.name}.svg`
        )
      );
    }
  }
}
