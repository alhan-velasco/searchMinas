import { Component, Input } from '@angular/core';
import { BuscaminasService } from '../../services/buscaminas.service';
import { Cell } from '../../models/cell.model';

@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.css']
})
export class CeldaComponent {
  @Input() cell!: Cell;

  constructor(private buscaminasService: BuscaminasService) {}

  revealCell(): void {
    if (this.cell.isMine) {
      this.buscaminasService.gameOver();
    } else {
      this.buscaminasService.revealAdjacentCells(this.cell.row, this.cell.col);
      if (this.buscaminasService.checkVictory()) {
        alert('¡Felicidades, has ganado!');
      }
    }
  }
}
