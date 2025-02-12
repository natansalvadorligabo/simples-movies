import { Injectable } from '@angular/core';
import { Language } from '../@types/Language';
import { Observable, Subject } from 'rxjs';
import { TranslateService as TranslateServiceCore } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private language$: Subject<Language> = new Subject();
  private currentLanguage: Language = { name: 'Português', code: 'pt-BR' };

  LANGUAGES: Language[] = [
    { name: 'languages.portuguese', code: 'pt-BR' },
    { name: 'languages.english', code: 'en-US' },
    { name: 'languages.french', code: 'fr' },
  ];

  constructor(private translate: TranslateServiceCore) {}

  getCurrentLanguageValue(): Language {
    return this.currentLanguage;
  }

  getAllLanguages() {
    return this.LANGUAGES;
  }

  getCurrentLanguage(): Observable<Language> {
    return this.language$.asObservable();
  }

  updateLanguage(lang: Language): void {
    this.currentLanguage = lang;
    this.language$.next(lang);
    this.translate.use(lang.code);
  }
}
