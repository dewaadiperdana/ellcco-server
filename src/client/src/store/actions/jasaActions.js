import JasaService from '../../lib/services/jasaService';

const SAVE_JASA = 'SAVE_JASA';
const SAVE_JASA_COUNT = 'SAVE_JASA_COUNT';

const saveDataJasa = jasa => ({
  type: SAVE_JASA,
  data: jasa,
});

const saveJasaCount = jasa => ({
  type: SAVE_JASA_COUNT,
  data: jasa,
});

const fetchAllDataJasa = () => (async (dispatch) => {
  try {
    const jasa = await JasaService.all();

    dispatch(saveDataJasa(jasa));
  } catch (error) {
    throw error;
  }
});

const fetchJasaCount = () => (async (dispatch) => {
  try {
    const count = await JasaService.count();

    dispatch(saveJasaCount(count));
  } catch (error) {
    throw error;
  }
});

export {
  SAVE_JASA,
  SAVE_JASA_COUNT,
  saveDataJasa,
  fetchAllDataJasa,
  fetchJasaCount,
};
