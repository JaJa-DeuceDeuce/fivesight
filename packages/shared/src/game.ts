import { type } from 'arktype';

/**
 * Board = 4 quadrants
 * 1 quadrant = 3x3 (9) cells
 */

 export const PlayerT = type("'black' | 'white'");
 export type Player = typeof PlayerT.infer;

 // CELL
 export const CellT = type("null | 'black' | 'white'");
 export type Cell = typeof CellT.infer;

 export const CellIndexT = type("0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8");
 export type CellIndex = typeof CellIndexT.infer;

 // QUADRANT
 export const QuadrantT = type([CellT, CellT, CellT, CellT, CellT, CellT, CellT, CellT, CellT]);
 export type Quadrant = typeof QuadrantT.infer;

 export const QuadrantIndexT = type("0 | 1 | 2 | 3");
 export type QuadrantIndex = typeof QuadrantIndexT.infer;

 //BOARD
 export const BoardT = type([QuadrantT, QuadrantT, QuadrantT, QuadrantT]);
 export type Board = typeof BoardT.infer;

 export const RotationDirectionT = type("'cw' | 'ccw'");
 export type RotationDirection = typeof RotationDirectionT.infer;

 export const PhaseT = type("'place' | 'rotate'");
 export type Phase = typeof PhaseT.infer;

 export const StatusT = type("'waiting' | 'active' | 'finished'");
 export type Status = typeof StatusT.infer;