import { PDFDocument } from 'pdf-lib';

class Report extends PDFDocument {
  constructor(data) {
    super();

    this.addTitle('Reporte de ventas');
    this.addParagraph('Este reporte muestra las ventas del último mes.');

    this.addTable([
      ['Producto', 'Cantidad', 'Precio'],
      ['Producto 1', 100, 100],
      ['Producto 2', 200, 200],
      ['Producto 3', 300, 300],
    ]);
  }
}