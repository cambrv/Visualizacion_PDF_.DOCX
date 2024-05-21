import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as mammoth from 'mammoth';
import { CommonModule } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgxExtendedPdfViewerModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent implements OnInit {
  archivoSeleccionado: File | undefined;
  nombreArchivo: string | undefined;
  urlArchivo: string | undefined;
  archivoCargado: boolean = false;
  esPdf: boolean = false;
  urlPrueba: any;

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.urlArchivo = '';
  }
  seleccionarArchivo(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.archivoSeleccionado = target.files[0];
      this.nombreArchivo = this.archivoSeleccionado.name;
    }
  }

  async subirArchivo() {
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
      } else if (fileExtension === 'doc' || fileExtension === 'docx') {
        // const objectURL = URL.createObjectURL(this.archivoSeleccionado);
        // this.urlArchivo = objectURL;
        //   this.urlPrueba = this.sanitizer.bypassSecurityTrustResourceUrl(
        //     this.urlArchivo
        //   );
        //   console.log('Url' + this.urlPrueba);
          console.log('Archivo DOC o DOCX');
          const arrayBuffer = await this.archivoSeleccionado.arrayBuffer();
          const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
          this.urlArchivo = this.sanitizer
            .bypassSecurityTrustHtml(html)
            .toString();
          this.esPdf = false;
          this.archivoCargado = true;
          console.log('Hola' + this.urlArchivo + 'DOCX correctamente');

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
