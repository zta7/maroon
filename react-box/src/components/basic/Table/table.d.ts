import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnOrderState,
  PaginationState,
  CellContext,
  HeaderContext,
  RowData,
  Table as _Table,
  Header as _Header,
  CoreHeader,
  ColumnSizingHeader,
  ColumnDefExtensions,
  TValue,
  // ColumnDefBase as _ColumnDefBase
  // Column as _Column
} from "@tanstack/react-table"
import { type } from "os"
import { ObjectSchema } from "yup"

declare module "@tanstack/react-table" {
  interface Column<TData extends unknown, TValue = unknown> {
    isDragging: boolean,
  }
  interface TableMeta<TData extends RowData> {
    updateColumn: (id: string, columnId: string, value: unknown) => void
    schema: ObjectSchema<any>
  }

  // interface Header<TData extends RowData, TValue> extends CoreHeader<TData, TValue>, ColumnSizingHeader {
  //   isDragging: boolean,
  //   isWrap: boolean
  // }
}