import React from "react";
import { useTable, usePagination } from "react-table";
import { ChevronLeft, ChevronRight } from "#components/Icons";
import Button, {
  ButtonType,
  ButtonVariant,
  ButtonIconPosition,
  ButtonSize,
} from "#components/Button";

const Table = ({ columns, items, meta, page = 1 }) => {
  const data = items.data || items;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: meta.lastPage,
    },
    usePagination
  );

  const pages = React.useMemo(() => {
    if (page === 1) {
      return [1, 2, 3];
    }

    if (pageCount === page) {
      return [page - 2, page - 1, page];
    }

    return [page - 1, page, page + 1];
  }, [pageCount, page]);

  // Render the UI for your table
  return (
    <>
      <table className="table-auto w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="bg-gray-100" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="border-b border-t px-2 py-4 text-xs text-left text-gray-700"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                className="cursor-pointer px-4 hover:bg-gray-200"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="border-b px-2 py-4 text-sm text-gray-700"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="w-full px-2 py-4 text-center">
        <Button
          onClick={previousPage}
          label="Back"
          icon={ChevronLeft}
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.SMALL}
          type={ButtonType.FLAT}
        />
        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => {}}
            label={pageNumber.toString()}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.SMALL}
            type={pageNumber === page ? ButtonType.OUTLINE : ButtonType.NORMAL}
          />
        ))}
        <Button
          onClick={nextPage}
          label="Next"
          icon={ChevronRight}
          iconPosition={ButtonIconPosition.RIGHT}
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.SMALL}
          type={ButtonType.FLAT}
        />
      </div>
    </>
  );
};

export default Table;
