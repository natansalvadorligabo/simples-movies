import { Component } from '@angular/core';
import { Language } from '../../@types/Language';
import { TranslateService } from '../../services/translate.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'language-selector',
  imports: [TranslatePipe],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent {
  currentLanguage!: Language;
  languages: Language[] = [];

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.currentLanguage = this.translateService.getCurrentLanguageValue();
    this.getLanguageIcon(this.currentLanguage);
    this.languages = this.translateService.getAllLanguages();
  }

  setLanguage(lang: Language) {
    this.currentLanguage = lang;
    this.translateService.updateLanguage(lang);
  }

  getLanguageIcon(lang: Language): string {
    switch (lang.code) {
      case 'pt-BR':
        return 'br';
      case 'en-US':
        return 'us';
      case 'fr':
        return 'fr';
      default:
        return '';
    }
  }
}
