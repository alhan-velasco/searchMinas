import { Injectable } from '@angular/core';
import { Cell } from '../models/cell.model';


@Injectable({
  providedIn: 'root'
})
export class BuscaminasService {
  private board: Cell[][] = [];
  private rows = 10;
  private cols = 10;
  private mines = 10;

  constructor() { }

  initializeBoard(): Cell[][] {
    this.board = Array.from({ length: this.rows }, (_, row) =>
      Array.from({ length: this.cols }, (_, col) => ({
        row,
        col,
        isMine: false,
        isRevealed: false,
        neighboringMines: 0
      }))
    );
    this.placeMines();
    return this.board;
  }

  private placeMines(): void {
    let minesPlaced = 0;
    while (minesPlaced < this.mines) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      if (!this.board[row][col].isMine) {
        this.board[row][col].isMine = true;
        minesPlaced++;
        this.updateNeighbors(row, col);
      }
    }
  }

  private updateNeighbors(row: number, col: number): void {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (this.isInBounds(newRow, newCol) && !this.board[newRow][newCol].isMine) {
          this.board[newRow][newCol].neighboringMines++;
        }
      }
    }
  }

  private isInBounds(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  gameOver(): void {
    // Revelamos todas las minas en el tablero
    this.board.forEach(row => {
      row.forEach(cell => {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
      });
    });
    alert('Game Over!');
  }

  checkVictory(): boolean {
    for (const row of this.board) {
      for (const cell of row) {
        if (!cell.isMine && !cell.isRevealed) {
          // Si encontramos una celda que no es mina y no ha sido revelada, aún no se gana
          return false;
        }
      }
    }
    return true;
  }


  // Nueva función para revelar celdas adyacentes
  revealAdjacentCells(row: number, col: number): void {
    const cell = this.board[row][col];
    if (!this.isInBounds(row, col) || cell.isRevealed || cell.isMine) return;

    cell.isRevealed = true;

    // Si no hay minas vecinas, revelamos recursivamente las celdas adyacentes
    if (cell.neighboringMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (!(i === 0 && j === 0)) {
            const newRow = row + i;
            const newCol = col + j;
            this.revealAdjacentCells(newRow, newCol);
          }
        }
      }
    }
  }
}
