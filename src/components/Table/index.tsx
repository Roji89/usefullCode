import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableSortLabel,
  Box,
  styled,
} from "@mui/material";

import { SortableContainer, SortableElement } from "react-sortable-hoc";

const usersData = [
  {
    picture: "rrrrr",
    userId: "1234",
    name: "Roja",
    phoneNumber: "roja.gh@gmail",
    email: "Lim ",
  },
  {
    picture: "a",
    userId: "12345",
    name: "abdenour",
    phoneNumber: "abdenour.gh@gmail",
    email: "Lim ",
  },
  {
    picture: "b",
    userId: "12346",
    name: "mohammed",
    phoneNumber: "mohammed.gh@gmail",
    email: "Lim sas",
  },
  {
    picture: "c",
    userId: "12347",
    name: "yaser",
    phoneNumber: "yaser.gh@gmail",
    email: "Lim sas",
  },
];

const columns = [
  { text: "picture", valKey: "picture" },
  {
    text: "name",
    valKey: "name",
    sortFunc: (a: string, b: any) => a.localeCompare(b),
  },
  {
    text: "phoneNumber",
    valKey: "phoneNumber",
    sortFunc: (a: string, b: any) => a.localeCompare(b),
  },
  {
    text: "email",
    valKey: "email",
    sortFunc: (a: string, b: any) => a.localeCompare(b),
  },
];

const ResizableBox = styled(Box)({
  width: ".5px",
  height: "20px",

  "&:hover": {
    backgroundColor: "#555555",
    resize: "horizontal",
    overflow: "auto",
  },
  "&.resizeHandle": {
    position: "absolute",
    cursor: "col-resize",
    width: "2px",
    right: "0",
    top: "0",
    "z-index": "1",
    borderRight: "2px solid transparent #555555",
  },
  "&.resize-handle:hover": {
    backgroundColor: "#555555",
  },
  "&.resize-handle.active": {
    backgroundColor: "#555555",
  },
});

const TableCellResizable = styled(TableCell)({
  "&.resizable": {
    resize: "horizontal",
    overflow: "auto",
  },
});
const SortableHead = SortableContainer(({ children }: any) => (
  <TableHead>
    <TableRow>{children}</TableRow>
  </TableHead>
));

// eslint-disable-next-line react/jsx-no-useless-fragment
const SortableCell = SortableElement(({ value }: any) => <>{value}</>);

const handleSort = (
  rows: any[],
  column: { valKey: any; sortFunc: any },
  dir: number
) =>
  rows.sort((aRow: { [x: string]: any }, bRow: { [x: string]: any }) => {
    const a = aRow[column.valKey];
    const b = bRow[column.valKey];
    const f = column.sortFunc;
    return (f ? f(a, b) : a - b) * dir;
  });

export const TableMovable = () => {
  const [displayRows, setDisplayRows] = React.useState(usersData);
  const [order, setOrder] = React.useState(
    new Array(usersData.length).fill(null).map((n, i) => i)
  );
  const [sort, setSort] = React.useState({ column: {}, dir: 1 });

  const onReorderEnd = React.useCallback(
    ({ oldIndex, newIndex }: any) => {
      const newOrder = [...order];
      const moved = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, moved[0]);
      setOrder(newOrder);
    },
    [order, setOrder]
  );

  const onHeaderClick = (column: any) => () => {
    const dir = column.valKey === sort.column.valKey ? sort.dir * -1 : 1;
    setSort({ column, dir });
    setDisplayRows(handleSort(displayRows, column, dir));
  };

  return (
    <TableContainer component={Paper}>
      {/* <a
				style={{
					width: '5px',
					cursor: 'col-resize',
					resize: 'horizontal',
					overflow: 'auto',
				}}
			>
				{' '}
			</a> */}
      <Table aria-label="simple table" sx={{}}>
        <SortableHead axis="x" onSortEnd={onReorderEnd} distance={5}>
          {order.map((colIdx) => (
            <SortableCell
              index={colIdx}
              key={colIdx}
              value={
                <TableCellResizable
                  onClick={onHeaderClick(columns[colIdx])}
                  align="left"
                  className="resizable"
                >
                  <TableSortLabel
                    active={sort.column.valKey === columns[colIdx].valKey}
                    direction={sort.dir === 1 ? "asc" : "desc"}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <ResizableBox
                      onMouseDown={() => mouseDownSize(columns[colIdx])}
                      className={`resizeHandle `}
                    />

                    {columns[colIdx].text}
                  </TableSortLabel>
                </TableCellResizable>
              }
            />
          ))}
        </SortableHead>
        <TableBody>
          {displayRows.map((row) => (
            <TableRow key={row.name}>
              {order.map((colIdx, i) => (
                <TableCell
                  key={columns[colIdx].valKey}
                  component="th"
                  scope="row"
                  align="left"
                >
                  {row[columns[colIdx].valKey]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
