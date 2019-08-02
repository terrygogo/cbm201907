import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { sysanalysisData, SystemDataType } from './data';
import { fakeChartData } from './service';
import SystemRow from './components/SystemRow';


export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: sysanalysisData) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: sysanalysisData;
  effects: {
    fetch: Effect;
    fetchSalesData: Effect;
  };
  reducers: {
    save: Reducer<sysanalysisData>;
    clear: Reducer<sysanalysisData>;
  };
}

const initState = {
  systemData: {},
  visitData: [],
  visitData2: [],
  salesData: [],
  searchData: [],
  offlineData: [],
  offlineChartData: [],
  salesTypeData: [],
  salesTypeDataOnline: [],
  salesTypeDataOffline: [],
  radarData: [],
};

const Model: ModelType = {
  namespace: 'dashboardAnalysis',

  state: initState,

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
