import type { Module } from './types';
import { units } from './units';
import { foundationsModules } from './modules-foundations';
import { techModules } from './modules-tech';
import { searchGeoModules } from './modules-search-geo';
import { dataDeepModules } from './modules-data-deep';
import { socialModules } from './modules-social';
import { investigationModules } from './modules-investigation';
import { visualizationModules } from './modules-visualization';
import { aiModules } from './modules-ai';
import { advancedModules } from './modules-advanced';

export const allModules: Module[] = [
  ...foundationsModules,
  ...techModules,
  ...searchGeoModules,
  ...dataDeepModules,
  ...socialModules,
  ...investigationModules,
  ...visualizationModules,
  ...aiModules,
  ...advancedModules,
];

export function getModuleById(id: string): Module | undefined {
  return allModules.find(m => m.id === id);
}

export function getModulesByUnit(unitId: string): Module[] {
  return allModules.filter(m => m.unitId === unitId);
}

export function getUnitColor(unitId: string): string {
  return units.find(u => u.id === unitId)?.color ?? '#00e5a0';
}

export { units };
export type { Module, Unit } from './types';
