import { Customer } from 'types/investor';
import { generateAPIWithPaging } from './until';

const investorApi = {
    ...generateAPIWithPaging<Customer>('admin/investor')
};

export default investorApi;