import { flexRender, Header as _Header } from "@tanstack/react-table";
import { forwardRef, HTMLProps } from "react";

export const Header = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLElement> & {
    header: _Header<any, unknown>
  }
>(function Header({ header, ...props }, propRef) {
  return (
    <div {...props} ref={propRef}>
      {
        header.isPlaceholder
          ? null
          : flexRender(
            header.column.columnDef.header,
            header.getContext(),
          )
        }
    </div>
  )
}) 