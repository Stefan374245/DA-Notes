import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp({
        apiKey: "AIzaSyByQV66zQPs_D19_wG-riur4GgbEvNlH5g",
        authDomain: "note-flow-20505.firebaseapp.com",
        projectId: "note-flow-20505",
        storageBucket: "note-flow-20505.appspot.com",
        messagingSenderId: "908254352473",
        appId: "1:908254352473:web:c62de2c5ab4497cf340d48"
      })),
      provideFirestore(() => getFirestore())
      // Weitere Firebase-Provider hier ergänzen
    )
  ]
})
.catch((err) => console.error(err));