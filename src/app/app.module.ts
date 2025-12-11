import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './common/services/paginator/paginator';
import { SpinnerModule } from './common/components/spinner/spinner.module';
import { registerLocaleData } from '@angular/common';
import localeEsPE from '@angular/common/locales/es-PE';

// export const MY_FORMATS: MatDateFormats = {
//   parse: {
//     dateInput: 'DD/MM/YYYY',
//   },
//   display: {
//     dateInput: 'DD/MM/YYYY',
//     monthYearLabel: 'MMMM YYYY',
//     dateA11yLabel: 'DD/MM/YYYY',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };
registerLocaleData(localeEsPE)

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SpinnerModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-PE' },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
