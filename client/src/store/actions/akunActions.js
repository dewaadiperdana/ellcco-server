import AkunService from '../../lib/services/akunService';

const SAVE_PELANGGAN_ACCOUNT_LIST = 'SAVE_PELANGGAN_ACCOUNT_LIST';
const SAVE_TUKANG_ACCOUNT_LIST = 'SAVE_TUKANG_ACCOUNT_LIST';
const SAVE_PELANGGAN_ACCOUNT_COUNTS = 'SAVE_PELANGGAN_ACCOUNT_COUNTS';
const SAVE_TUKANG_ACCOUNT_COUNTS = 'SAVE_TUKANG_ACCOUNT_COUNTS';

const savePelangganAccountList = data => ({
  type: SAVE_PELANGGAN_ACCOUNT_LIST,
  data,
});

const saveTukangAccountList = data => ({
  type: SAVE_TUKANG_ACCOUNT_LIST,
  data,
});

const savePelangganAccountCounts = data => ({
  type: SAVE_PELANGGAN_ACCOUNT_COUNTS,
  data,
});

const saveTukangAccountCounts = data => ({
  type: SAVE_TUKANG_ACCOUNT_COUNTS,
  data,
});

const fetchAccountList = role => (async (dispatch) => {
  try {
    const response = await AkunService.accountList(role);

    switch (role) {
      case 'pelanggan':
        dispatch(savePelangganAccountList(response));
        break;
      case 'tukang':
        dispatch(saveTukangAccountList(response));
        break;
      default:
        dispatch(savePelangganAccountList(response));
        break;
    }
  } catch (error) {
    throw error;
  }
});

const fetchAccountCounts = role => (async (dispatch) => {
  try {
    const response = await AkunService.counts(role);

    switch (role) {
      case 'pelanggan':
        dispatch(savePelangganAccountCounts(response.counts));
        break;
      case 'tukang':
        dispatch(saveTukangAccountCounts(response.counts));
        break;
      default:
        dispatch(savePelangganAccountCounts(response.counts));
        break;
    }
  } catch (error) {
    throw error;
  }
});

export {
  SAVE_PELANGGAN_ACCOUNT_LIST,
  SAVE_TUKANG_ACCOUNT_LIST,
  SAVE_PELANGGAN_ACCOUNT_COUNTS,
  SAVE_TUKANG_ACCOUNT_COUNTS,
  fetchAccountList,
  fetchAccountCounts,
};
