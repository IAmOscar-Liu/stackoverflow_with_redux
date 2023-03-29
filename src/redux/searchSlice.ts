import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item, Tag, TRENDING_TAGS } from "../types";

export interface SearchState {
  currentTag: typeof TRENDING_TAGS[number];
  currentPage: number;
  currentItems: Item[];

  searchInput: string;
  searchTags: Tag[];
  searchSelectedTag: string;
  searchIsLoading: boolean;
  searchCurrentItems: Item[];
}

const initialState: SearchState = {
  currentTag: TRENDING_TAGS[0],
  currentPage: 1,
  currentItems: [],

  searchInput: "",
  searchTags: [],
  searchSelectedTag: "",
  searchIsLoading: false,
  searchCurrentItems: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    increseCurrentPage: (state) => {
      state.currentPage++;
    },
    setCurrentTag: (
      state,
      action: PayloadAction<typeof TRENDING_TAGS[number]>
    ) => {
      state.currentTag = action.payload;
      state.currentPage = 1;
      state.currentItems = [];
    },
    addCurrentItems: (state, action: PayloadAction<Item[]>) => {
      state.currentItems.push(...action.payload);
    },
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    setSearchTags: (state, action: PayloadAction<Tag[]>) => {
      state.searchTags = action.payload;
    },
    setSearchSelectedTag: (state, action: PayloadAction<string>) => {
      state.searchSelectedTag = action.payload;
    },
    setSearchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.searchIsLoading = action.payload;
    },
    setSearchCurrentItems: (state, action: PayloadAction<Item[]>) => {
      state.searchCurrentItems = action.payload;
    },
  },
});

export const {
  increseCurrentPage,
  setCurrentTag,
  addCurrentItems,
  setSearchInput,
  setSearchTags,
  setSearchSelectedTag,
  setSearchIsLoading,
  setSearchCurrentItems,
} = searchSlice.actions;
export default searchSlice.reducer;
