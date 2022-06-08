import { Paper, PaperProps, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface SearchNotFoundProps extends PaperProps {
  searchQuery?: string;
}

export default function SearchNotFound({ searchQuery = '', ...other }: SearchNotFoundProps) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Không tìm thấy
      </Typography>
      <Typography variant="body2" align="center">
        Không tìm thấy kết quả cho &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Hãy thử kiểm tra lỗi chính tả hoặc sử dụng các
        từ hoàn chỉnh.
      </Typography>
    </Paper>
  );
}
