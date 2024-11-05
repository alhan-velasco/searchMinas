import { Component, OnInit } from '@angular/core';
import { BuscaminasService } from '../../services/buscaminas.service';
import { Cell } from '../../models/cell.model';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  board: Cell[][] = [];

  constructor(private buscaminasService: BuscaminasService) {}

  ngOnInit(): void {
    this.board = this.buscaminasService.initializeBoard();
  }
}
