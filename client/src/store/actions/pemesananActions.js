import PemesananService from '../../lib/services/pemesananService';

const SAVE_PEMESANAN = 'SAVE_PEMESANAN';
const SAVE_PEMESANAN_COUNT = 'SAVE_PEMESANAN_COUNT';

const savePemesanan = data => ({
  type: SAVE_PEMESANAN,
  data,
});

const savePemesananCount = data => ({
  type: SAVE_PEMESANAN_COUNT,
  data,
});

const fetchPemesanan = filter => (async (dispatch) => {
  try {
    const pemesanan = await PemesananService.filter(filter);

    dispatch(savePemesanan(pemesanan));
  } catch (error) {
    throw error;
  }
});

const fetchPemesananCount = () => (async (dispatch) => {
  try {
    const count = await PemesananService.count();

    dispatch(savePemesananCount(count));
  } catch (error) {
    throw error;
  }
});

export {
  SAVE_PEMESANAN,
  SAVE_PEMESANAN_COUNT,
  fetchPemesanan,
  fetchPemesananCount,
};
