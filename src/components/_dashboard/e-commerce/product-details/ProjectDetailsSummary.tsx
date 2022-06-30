import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import { useFormik, Form, FormikProvider, useField } from 'formik';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Link,
  Button,
  Rating,
  Tooltip,
  Divider,
  TextField,
  Typography,
  FormHelperText
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../../utils/formatNumber';
//
import Label from '../../../Label';
import { MIconButton } from '../../../@material-extend';
import ColorSinglePicker from '../../../ColorSinglePicker';
import { Product, CartItem } from '../../../../@types/products';
import { Project } from '../../../../@types/krowd/project';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />
  },
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

const Incrementer = ({ name, available }: { name: string; available: number }) => {
  const [field, , helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032'
      }}
    >
      <MIconButton size="small" color="inherit" disabled={value <= 1} onClick={decrementQuantity}>
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block'
        }}
      >
        {value}
      </Typography>
      <MIconButton
        size="small"
        color="inherit"
        disabled={value >= available}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

type ProductDetailsSumaryprops = {
  product: Project;
};

export default function ProjecrDetailsSummary({ product }: ProductDetailsSumaryprops) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, name, address, approvedBy, business, createBy, areaId, image, status } = product;

  return (
    <RootStyle>
      <Form autoComplete="off" noValidate>
        <Typography
          variant="overline"
          sx={{
            mt: 2,
            mb: 1,
            display: 'block'
          }}
        >
          {status}
        </Typography>

        <Typography variant="h5" paragraph>
          {name}
        </Typography>

        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#212B36' }}>
            Người tạo : 'type'
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Thuộc doanh nghiệp
          </Typography>
          KFC
        </Box>
        <Box
          sx={{
            my: 3,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Thuộc Khu vực:
          </Typography>
          Thành phố HCM
        </Box>

        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Địa chỉ:
          </Typography>
          Quận 12
        </Box>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          {SOCIALS.map((social) => (
            <Tooltip key={social.name} title={social.name}>
              <MIconButton>{social.icon}</MIconButton>
            </Tooltip>
          ))}
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ mt: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                size="large"
                type="button"
                // color="warning"
                variant="contained"
                // startIcon={<Icon icon={roundAddShoppingCart} />}
                // onClick={handleAddCart}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Duyệt dự án
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button fullWidth size="large" color="error" variant="contained">
                TỪ chối
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </RootStyle>
  );
}
