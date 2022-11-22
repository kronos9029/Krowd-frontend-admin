import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/template_slice/mail';
import chatReducer from './slices/template_slice/chat';
import blogReducer from './slices/template_slice/blog';
import userReducer from './slices/template_slice/user';
import productReducer from './slices/template_slice/product';
import kanbanReducer from './slices/template_slice/kanban';
import businessReducer from './slices/krowd_slices/business';
import userKrowdReducer from './slices/krowd_slices/users';
import fieldKrowdReducer from './slices/krowd_slices/field';
import AreaKrowdReducer from './slices/krowd_slices/area';
import RiskReducer from './slices/krowd_slices/riskType';
import WalletReducer from './slices/krowd_slices/wallet';
import projectReducer from './slices/krowd_slices/project';
import RolesReducer from './slices/krowd_slices/roles';
import TransactionReducer from './slices/krowd_slices/transaction';
import WithdrawRequestReducer from './slices/krowd_slices/withdrawRequest';
import ProjectStageReducer from './slices/krowd_slices/stage';
import InvestmentReducer from './slices/krowd_slices/investment';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  kanban: kanbanReducer,
  business: businessReducer,
  userKrowd: userKrowdReducer,
  fieldKrowd: fieldKrowdReducer,
  areaKrowd: AreaKrowdReducer,
  riskKrowd: RiskReducer,
  roleKrowd: RolesReducer,
  wallet: WalletReducer,
  project: projectReducer,
  stage: ProjectStageReducer,
  investment: InvestmentReducer,
  transaction: TransactionReducer,
  product: persistReducer(productPersistConfig, productReducer),
  withdrawRequest: WithdrawRequestReducer
});

export { rootPersistConfig, rootReducer };
