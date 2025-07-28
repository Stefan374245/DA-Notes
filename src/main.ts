import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp({
        apiKey: "AIzaSyByQV66zQPs_D19_wG-riur4GgbEvNlH5g",
        authDomain: "note-flow-20505.firebaseapp.com",
        projectId: "note-flow-20505",
        storageBucket: "note-flow-20505.appspot.com",
        messagingSenderId: "908254352473",
        appId: "1:908254352473:web:c62de2c5ab4497cf340d48"
      })),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth())
    )
  ]
})
.catch((err) => console.error(err));