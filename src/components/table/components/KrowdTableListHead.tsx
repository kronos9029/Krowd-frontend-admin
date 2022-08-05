import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { Box } from '@mui/system';
import { visuallyHidden } from '@mui/utils';

type KrowdTableListHeadProps = {
  headLabel: any[];
};

export default function KrowdTableListHead({ headLabel }: KrowdTableListHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
