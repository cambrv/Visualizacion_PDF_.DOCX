import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
export const routes: Routes = [
  { path: 'file-upload', component: FileUploadComponent },
  { path: '', redirectTo: '/file-upload', pathMatch: 'full' }, // Redirección por defecto
  { path: '**', redirectTo: '/file-upload', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })


  export class AppRoutingModule { }
