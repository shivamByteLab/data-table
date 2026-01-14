import { OverlayPanel } from "primereact/overlaypanel";
import { bulkSelect } from "../libs/Selector";
import { InputNumber } from "primereact/inputnumber";
import type { OverlayPanalType } from "../types/DataTypes";

const OverlayPanal = ({
  bulkOverlayRef,
  bulkTarget,
  selectedIds,
  setSelectedIds,
  products,
  setBulkTarget,
  setBulkActive,
}: OverlayPanalType) => {
  return (
    <OverlayPanel ref={bulkOverlayRef}>
      <div className="popover">
        <label>
          Bulk select rows
        </label>

        <InputNumber
          placeholder="Enter number"
          value={bulkTarget}
          onValueChange={(e) => {
            const value = e.value ?? 0;
            if (value >= 0) {

            bulkSelect(
              selectedIds,
              setSelectedIds,
              products,
              value,
              setBulkTarget,
              setBulkActive
            );

            bulkOverlayRef.current?.hide();
          }}}
          min={1}
        />
      </div>
    </OverlayPanel>
  );
};

export default OverlayPanal;
