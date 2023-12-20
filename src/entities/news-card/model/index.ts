import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { News, newsService } from '@/shared/api'
import { ErrorResponse, parseJSON } from '@/shared/lib'
import { NewsState } from './types'

const favNews =
	typeof window !== 'undefined'
		? parseJSON<News[]>(localStorage.getItem('favorite') || '')
		: []

const initialState: NewsState = {
	favorite: (favNews as News[]) || [],
	isLoading: false,
	isSuccess: false,
	error: null,
}

export const addToFavorite = createAsyncThunk(
	'/news/favorite/add',
	async (id: number, thunkApi) => {
		try {
			const data = await newsService.addToFavorite(id)

			return data
		} catch (error) {
			throw thunkApi.rejectWithValue(error as ErrorResponse)
		}
	},
)

export const checkIsFavorite = createAsyncThunk(
	'/news/favorite/check',
	async (id: number, thunkApi) => {
		try {
			await newsService.checkIsNewsFavorite(id)
		} catch (error) {
			throw thunkApi.rejectWithValue(error as ErrorResponse)
		}
	},
)

export const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setDefaultNewsStateFields(state) {
			state.isLoading = false
			state.isSuccess = false
			state.error = null
		},

		deleteFromBookmarks(state, action) {
			state.favorite = state.favorite.filter((el) => el.id !== action.payload)
		},
	},
	extraReducers: (builder) => {
		builder

			.addCase(addToFavorite.pending, (state) => {
				state.isLoading = true
				state.error = null
				state.isSuccess = false
			})
			.addCase(addToFavorite.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true

				state.favorite.push(action.payload)

				if (typeof window !== 'undefined') {
					localStorage.setItem('favorite', JSON.stringify(state.favorite))
				}
			})
			.addCase(addToFavorite.rejected, (state, action) => {
				state.isLoading = false
			})

			.addCase(checkIsFavorite.pending, (state) => {
				state.isLoading = true
				state.error = null
				state.isSuccess = false
			})
			.addCase(checkIsFavorite.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(checkIsFavorite.rejected, (state, action) => {
				state.isLoading = false
			})
	},
})

export const { setDefaultNewsStateFields, deleteFromBookmarks } =
	newsSlice.actions

export const newsReducer = newsSlice.reducer
