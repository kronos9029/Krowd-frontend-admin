export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  homeEmail: string;
  homePhone: string;
  homeAddress: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyName: string;
  city: string;
  province: string;
  country: string;
  postcode: string;
  taxExempt: boolean;
  totalOrders: number;
  tags: string;
  acceptsMarketing: boolean;
  totalSpent: number;
  status: number;
}
export interface CustomerState {
  isLoading: boolean;
  error: boolean;
  customers: Customer[];
  customer: Customer | null;
  sortBy: string | null;
}
export const customersListData: Customer[] = [
  {
    id: 1,
    city: 'HCM',
    country: 'VN',
    homeEmail: 'customer1@gmail.com',
    homeAddress: '23 lVV, thủ đức, HCM',
    homePhone: '0939761499',
    companyAddress: '447 LVV, thủ đức',
    companyEmail: 'reso@gmail.com',
    companyPhone: '1231231233',
    lastName: 'Văn A1',
    firstName: 'Nguyễn',
    postcode: '123123',
    province: 'Thủ đức',
    acceptsMarketing: true,
    taxExempt: true,
    tags: 'Protential',
    totalOrders: 1,
    totalSpent: 2000000,
    status: 1,
    companyName: 'Reso'
  }
];
