import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import fetchArtworks from "../data/fetchData";
import type { Artwork, Pagination } from "../types/DataTypes";

import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import OverlayPanal from "./OverlayPanal";
import { selection } from "../libs/Selector";
import Paginator from "./Paginator";

export default function Main() {
  const [products, setProducts] = useState<Artwork[]>([]);
  const [paginatorData, setPaginatorData] = useState<Pagination>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const [bulkTarget, setBulkTarget] = useState<number | null>(null);
  const [bulkActive, setBulkActive] = useState(false);

  const bulkOverlayRef = useRef<OverlayPanel>(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 12;

  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, paginatorData?.total ?? 0);

  //fetching data on load and page change
  useEffect(() => {
    const currentData = async () => {
      setLoading(true);
      const data = await fetchArtworks(page); //returns data object with {data,paginaion}

      setProducts(data.data);
      setPaginatorData(data.pagination);
      // setLoading(false);
    };
    currentData();
  }, [page]);

  useEffect(() => {
    const handleBulkSelect = () => {
      if (!bulkActive || bulkTarget == null) return;

      setSelectedIds((prev) => {
        const next = new Set(prev);

        for (const item of products) {
          if (next.size >= bulkTarget) break;
          next.add(item.id);
        }

        // Stop bulk mode if target reached
        if (next.size >= bulkTarget) {
          setBulkActive(false);
        }

        return next;
      });
    };
    handleBulkSelect();
  }, [bulkActive, bulkTarget, products]);

  return (
    <div className="page-container">
      <p className="info-text">
        selected <span className="num">{selectedIds.size}</span> rows
      </p>
      {bulkActive && (
        <span className=" info-text">
          remaining{" "}
          <span className="num">
            {bulkTarget && bulkTarget - selectedIds.size}
          </span>{" "}
          rows
        </span>
      )}
      {loading && (
        <div className="overlay">
          <p className="loader"></p>
        </div>
      )}

     
       
        <div className={`table-wrapper`}>
          <DataTable
            value={products}
            scrollable
            scrollHeight="70vh"
            stripedRows
            dataKey="id"
            selectionMode="checkbox"
            selection={products.filter((p) => selectedIds.has(p.id))}
            onSelectionChange={(e) =>
              selection(e, selectedIds, setSelectedIds, products)
            }
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              selectionMode="multiple"
              headerClassName="bulk-select-header"
              header={
                <Button
                  icon="pi pi-chevron-down"
                  text
                  rounded
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    bulkOverlayRef.current?.toggle(e);
                  }}
                />
              }
            />

            <Column
              field="title"
              header="TITLE"
              bodyStyle={{ fontWeight: "bold" }}
            />
            <Column field="place_of_origin" header="PLACE OF ORIGIN" />
            <Column field="artist_display" header="ARTIST" />
            <Column field="inscriptions" header="INSCRIPTIONS" />
            <Column field="date_start" header="START DATE" />
            <Column field="date_end" header="END DATE" />
          </DataTable>
        </div>
        <aside>
          <span className="info-text">
            Showing <span className="num">{start}</span> to{" "}
            <span className="num">{end}</span> of{" "}
            <span className="num">{paginatorData?.total ?? 0}</span>
          </span>

          <Paginator
            page={page}
            rowsPerPage={rowsPerPage}
            totalRecords={paginatorData?.total ?? 0}
            onPageChange={setPage}
          />
        </aside>
      

      <OverlayPanal
        bulkOverlayRef={bulkOverlayRef}
        bulkTarget={bulkTarget}
        products={products}
        selectedIds={selectedIds}
        setBulkActive={setBulkActive}
        setBulkTarget={setBulkTarget}
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
}
{
  /* <InputNumber
        placeholder="Bulk select"
        value={bulkTarget}
        onValueChange={(e) => {
          const value = e.value ?? 0;

          if (value <= 0) return;

          bulkSelect(
            selectedIds,
            setSelectedIds,
            products,
            value,
            setBulkTarget,
            setBulkActive
          );
        }}
      /> */
}
