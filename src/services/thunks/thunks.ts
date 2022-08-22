import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { fetchData } from '../../utils/api';
import { parseLinkHeader } from '../../utils/utils';

export type TLinkHeaderObject = {
  first: string;
  prev?: string;
  next?: string;
  last: string;
}

export const asyncThunkFactory = <T>(typePrefix: string) => {
  return createAsyncThunk<T[] | { data: T[]; linkHeaderObject: TLinkHeaderObject }, string, { rejectValue: string }>(
    typePrefix,
    async (url, { rejectWithValue }) => {
      const response: AxiosResponse<T[]> | AxiosError =
        await fetchData<T[]>(url);
      
      if (response instanceof AxiosError) {
        return rejectWithValue(response.message);
      }
      
      const linkHeader: string | undefined = response.headers.link;
      const { data } = response;

      if (typeof linkHeader === 'string') {
        const linkHeaderObject: TLinkHeaderObject = parseLinkHeader(linkHeader);
        
        return { data, linkHeaderObject }
      }

      return data;
    }
  );
}
