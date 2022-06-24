import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Chip, Typography, Stack, Button } from '@mui/material';
// utils
import getColorName from '../../../../utils/getColorName';
import { ProjectFilter, FormikPropsShopView } from '../../../../@types/krowd/project';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
});

const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`
}));

const LabelStyle = styled((props) => (
  <Typography component="span" variant="subtitle2" {...props} />
))(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderRight: `solid 1px ${theme.palette.divider}`
}));

// ----------------------------------------------------------------------

function labelPriceRange(range: string) {
  if (range === 'below') {
    return 'Below $25';
  }
  if (range === 'between') {
    return 'Between $25 - $75';
  }
  return 'Above $75';
}

type ShopTagFilteredProps = {
  formik: FormikPropsShopView;
  filters: ProjectFilter;
  isShowReset: boolean;
  isDefault: boolean;
  onResetFilter: VoidFunction;
};

export default function ShopTagFiltered({
  formik,
  filters,
  isShowReset,
  onResetFilter,
  isDefault
}: ShopTagFilteredProps) {
  const theme = useTheme();
  const { values, handleSubmit, setFieldValue, initialValues } = formik;
  const { areaId, status } = filters;
  const isShow = values !== initialValues && !isShowReset;

  const handleRemoveStatus = (value: string) => {
    const newValue = filter(status, (_item) => _item !== value);
    handleSubmit();
    setFieldValue('status', newValue);
  };

  const handleRemoveAreaId = () => {
    handleSubmit();
    setFieldValue('areaId', 'HCM');
  };

  // const handleRemoveColor = (value: string) => {
  //   const newValue = filter(colors, (_item) => _item !== value);
  //   handleSubmit();
  //   setFieldValue('colors', newValue);
  // };

  // const handleRemovePrice = () => {
  //   handleSubmit();
  //   setFieldValue('priceRange', '');
  // };

  // const handleRemoveRating = () => {
  //   handleSubmit();
  //   setFieldValue('rating', '');
  // };

  return (
    <RootStyle>
      {status?.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Gender:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            {status.map((_status) => (
              <Chip
                key={_status}
                label={_status}
                size="small"
                onDelete={() => handleRemoveStatus(_status)}
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {areaId !== 'All' && (
        <WrapperStyle>
          <LabelStyle>Area:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={areaId} onDelete={handleRemoveAreaId} sx={{ m: 0.5 }} />
          </Stack>
        </WrapperStyle>
      )}

      {/* {colors.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Colors:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            {colors.map((color) => (
              <Chip
                key={color}
                label={getColorName(color)}
                size="small"
                onDelete={() => handleRemoveColor(color)}
                sx={{
                  m: 0.5,
                  bgcolor: color,
                  color: theme.palette.getContrastText(color),
                  ...((color === '#FFFFFF' || color === '#000000') && {
                    border: `solid 1px ${theme.palette.grey[500_32]}`,
                    '& .MuiChip-deleteIcon': {
                      color: 'text.disabled'
                    }
                  })
                }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {priceRange && (
        <WrapperStyle>
          <LabelStyle>Price:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              size="small"
              label={labelPriceRange(priceRange)}
              onDelete={handleRemovePrice}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {rating && (
        <WrapperStyle>
          <LabelStyle>Rating:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              size="small"
              label={sentenceCase(rating)}
              onDelete={handleRemoveRating}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )} */}

      {isShow && !isDefault && (
        <Button
          color="error"
          size="small"
          type="button"
          onClick={onResetFilter}
          startIcon={<Icon icon={roundClearAll} />}
        >
          Clear All
        </Button>
      )}
    </RootStyle>
  );
}
