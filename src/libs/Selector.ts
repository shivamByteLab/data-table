import type { DataTableSelectionMultipleChangeEvent } from "primereact/datatable";
import type { Artwork } from "../types/DataTypes";

export const selection = (
  e: DataTableSelectionMultipleChangeEvent<Artwork[]>,
  selectedIds: Set<number>,
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>,
  products: Artwork[]
) => {
  const pageSelected = new Set(e.value.map((item) => item.id));

  const nextSelected = new Set(selectedIds); //dump all prev selected ids into nextselected

  // Add newly selected rows
  pageSelected.forEach((id) => {
    nextSelected.add(id); // add all remaining ids in nextselected
  });

  // Remove rows that were unselected on this page
  products.forEach((item) => {
    if (!pageSelected.has(item.id)) {
      nextSelected.delete(item.id);
    }
  });

  setSelectedIds(nextSelected);
};

export const bulkSelect = (
  selectedIds: Set<number>,
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>,
  products: Artwork[],
  bulkTarget: number | null,
  setBulkTarget: (n: number) => void,
  setBulkActive: (v: boolean) => void
) => {
  if (!bulkTarget || bulkTarget <= 0) return;

  const nextSelected = new Set(selectedIds);

  // Select rows from the current page until target is reached
  for (const item of products) {
    if (nextSelected.size >= bulkTarget) break;
    nextSelected.add(item.id);
  }

  setSelectedIds(nextSelected);

  // Activate or stop bulk intent
  if (nextSelected.size < bulkTarget) {
    setBulkTarget(bulkTarget);
    setBulkActive(true);
  } else {
    setBulkTarget(bulkTarget);
    setBulkActive(false);
  }
};

