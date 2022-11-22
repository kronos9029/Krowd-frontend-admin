import { createSlice } from '@reduxjs/toolkit';
import { dispatch, store } from '../../store';
// utils
import axios from 'axios';
import { REACT_APP_API_URL } from '../../../config';
import { Stage, ProjectStageList, Chart, FilterCount } from '../../../@types/krowd/stage';
import { ProjectStageAPI } from '_apis_/krowd_apis/stage';
// ----------------------------------------------------------------------

type ProjectState = {
  isLoading: boolean;
  error: boolean;
  projectStageList: {
    numOfStage: number;
    listOfStage: Stage[];
    filterCount: FilterCount | null;
  };
  stageDetail: { isStageLoading: boolean; StageId: Stage | null };
  chartStage: Chart | null;
  listOfChartStage: Chart[];
};

const initialState: ProjectState = {
  isLoading: false,
  error: false,
  projectStageList: { numOfStage: 0, listOfStage: [], filterCount: null },
  listOfChartStage: [],
  chartStage: null,
  stageDetail: { isStageLoading: false, StageId: null }
};

const slice = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET Chart LIST
    getProjectStageListSuccess(state, action) {
      state.isLoading = false;
      state.listOfChartStage = action.payload;
    },
    //ALL STAGE
    getAllProjectStageSuccess(state, action) {
      state.isLoading = false;
      state.projectStageList = action.payload;
    },

    // GET STAGE ID
    // START LOADING
    startStageIDLoading(state) {
      state.stageDetail.isStageLoading = true;
    },

    //1 STAGE

    getProjectStageIDSuccess(state, action) {
      state.stageDetail.isStageLoading = false;
      state.stageDetail.StageId = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

//--------------------------------------
export function getProjectStageList(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await ProjectStageAPI.get({ id: projectId });
      dispatch(slice.actions.getProjectStageListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getAllProjectStage(projectId: string, pageIndex: number, status: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await ProjectStageAPI.gets(projectId, pageIndex, status);
      dispatch(slice.actions.getAllProjectStageSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProjectStageID(stageId: string) {
  return async () => {
    dispatch(slice.actions.startStageIDLoading());
    try {
      const response = await ProjectStageAPI.getStageId({ id: stageId });
      dispatch(slice.actions.getProjectStageIDSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
