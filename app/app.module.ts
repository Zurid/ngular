import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserGridComponent } from './user-grid-component';
import { UserService } from './user.service';
import { ContenteditableDirective } from './content-editable-directive';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { FaderComponent } from './fader.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
    ],
    declarations: [
        AppComponent,
        UserGridComponent, FaderComponent,
        ContenteditableDirective
    ],
    bootstrap: [AppComponent],
    providers: [UserService]
})
export class AppModule { }
