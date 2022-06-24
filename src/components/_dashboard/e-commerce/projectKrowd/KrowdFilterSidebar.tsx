import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
// @types
//
import { MIconButton } from '../../../@material-extend';
import Scrollbar from '../../../Scrollbar';
import ColorManyPicker from '../../../ColorManyPicker';
import { FormikPropsShopView } from '../../../../@types/krowd/project';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'ZtoA', label: 'Name: Z-A' },
  { value: 'AtoZ', label: 'Name: A-Z' }
];
export const FILTER_CATEGORY_OPTIONS = ['a', 'b', 'c'];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_STATUS_OPTIONS = [
  { value: '0', label: 'Chưa duyệt' },
  { value: '1', label: 'Từ chối' },
  { value: '2', label: 'Đang kêu gọi đầu tư' },
  { value: '3', label: 'Đang hoạt động' },
  { value: '4', label: 'Hết thời gian kêu gọi' },
  { value: '5', label: 'Đóng dự án' }
];
export const FILTER_COLOR_OPTIONS = [
  '#14B7CC',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];

// ----------------------------------------------------------------------

type KrowdFilterSidebarProps = {
  onResetFilter: VoidFunction;
  onOpenFilter: VoidFunction;
  onCloseFilter: VoidFunction;
  isOpenFilter: boolean;
  formik: FormikPropsShopView;
};

export default function KrowdFilterSidebar({
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
  formik
}: KrowdFilterSidebarProps) {
  const { values, getFieldProps, handleChange } = formik;

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Lọc danh sách&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: 'none', overflow: 'hidden' }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Lọc danh sách
              </Typography>
              <MIconButton onClick={onCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </MIconButton>
            </Stack>

            <Divider />

            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Khu vực
                  </Typography>
                  <RadioGroup {...getFieldProps('areaId')}>
                    {FILTER_CATEGORY_OPTIONS.map((item) => (
                      <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                    ))}
                  </RadioGroup>
                </div>

                {/* <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Khu vực
                  </Typography>
                  <ColorManyPicker
                    name="colors"
                    colors={FILTER_COLOR_OPTIONS}
                    onChange={handleChange}
                    onChecked={(color) => values.colors.includes(color)}
                    sx={{ maxWidth: 36 * 4 }}
                  />
                </div> */}

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Trạng thái
                  </Typography>
                  <RadioGroup {...getFieldProps('status')}>
                    {FILTER_STATUS_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                </div>
              </Stack>
            </Scrollbar>

            <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={<Icon icon={roundClearAll} />}
              >
                Clear All
              </Button>
            </Box>
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}
