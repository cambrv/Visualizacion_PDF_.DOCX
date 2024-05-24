import { Component, OnInit, inject, ApplicationConfig } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as mammoth from 'mammoth';
import { CommonModule } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FormsModule } from '@angular/forms';
import { Storage } from '@angular/fire/storage';
import {
  FirebaseStorage,
  provideStorage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgxExtendedPdfViewerModule,
    NgxDocViewerModule,
    FormsModule,
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent implements OnInit {
  archivoSeleccionado!: File;
  nombreArchivo: string | undefined;
  urlArchivo: string | undefined;
  urlPublica: string | undefined;
  urlFirebase: string | undefined;
  archivoCargado: boolean = false;
  esPublica: boolean = false;
  esPdf: boolean = false;
  tipoArchivo: string | undefined;

  private readonly _storage = inject(Storage);

  ngOnInit() {
    this.urlArchivo = '';
  }

  seleccionarArchivo(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.archivoSeleccionado = target.files[0];
      this.nombreArchivo = this.archivoSeleccionado.name;
      this.tipoArchivo = this.archivoSeleccionado.type;
    }
  }

  async subirArchivoDocx() {
    if (this.archivoSeleccionado) {
      const storageRef = ref(
        this._storage,
        `uploads/${this.archivoSeleccionado?.name}`
      );
      try {
        const snapshot = await uploadBytesResumable(
          storageRef,
          this.archivoSeleccionado
        );
        this.urlFirebase = await getDownloadURL(snapshot.ref);
        console.log('URL del archivo:', this.urlFirebase);
        this.esPdf = false;
        this.archivoCargado = true;
        return this.urlFirebase;
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        return null;
      }
    } else {
      alert('Seleccione un archivo');
      return null;
    }
  }

  verDocxConUrl() {
    if (this.urlPublica) {
      this.esPublica = true;
      this.archivoCargado = false;
      console.log(this.urlPublica + ' WORD PUBLICO Visualizado correctamente');
    } else {
      this.esPublica = false;
      console.log('No se ha ingresado ninguna URL');
    }
  }

  async subirArchivoPdf() {
    if (this.archivoSeleccionado) {
      const fileExtension = this.archivoSeleccionado.name
        .split('.')
        .pop()
        ?.toLowerCase();
      if (fileExtension === 'pdf') {
        const objectURL = URL.createObjectURL(this.archivoSeleccionado);
        this.urlArchivo = objectURL;
        this.esPdf = true;
        this.archivoCargado = true;
        console.log(this.urlArchivo + 'Visualizado correctamente');
      } else {
        alert(
          'Tipo de archivo no soportado. Por favor, suba un archivo PDF o DOCX.'
        );
      }
    } else {
      alert('Seleccione un archivo');
    }
  }
  
}
