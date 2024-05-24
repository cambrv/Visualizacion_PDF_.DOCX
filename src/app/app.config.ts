import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp (() =>
      initializeApp ({
        projectId: "sistema-mmo-practicas",
        appId: "1:296302736710:web:cc0c4c648c16ce8951e147",
        storageBucket: "sistema-mmo-practicas.appspot.com",
        apiKey: "AIzaSyAKpfb4J4L8S2ZLUfkKZPoWtbrYynPRqjs",
        authDomain: "sistema-mmo-practicas.firebaseapp.com",
        messagingSenderId: "296302736710",
      }),
    ),
  ),
      importProvidersFrom(provideStorage(() => getStorage())),
  ],
};
