export interface Cell {
    row: number; 
    col: number; 
    isMine: boolean;  
    isRevealed: boolean;    
    neighboringMines: number; 
  }
  