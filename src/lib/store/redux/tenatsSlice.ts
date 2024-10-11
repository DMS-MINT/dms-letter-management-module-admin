import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	tenants: {
		id: "",
		name_en: "",
		name_am: "",
		slug: "",
		domains: [
			{
				domain: "",
				is_primary: true,
			},
			{
				domain: "",
				is_primary: false,
			},
		],
		created_at: "",
		updated_at: "",
		tenant_settings: {
			auto_ref_number_letters: true,
			auto_date_letters: true,
		},
	},
	sysTenant: {
		haveTenant: false,
		haveMultiTenant: false,
	},
};

const tenantsSlice = createSlice({
	name: "tenants",
	initialState,
	reducers: {
		SetTenants: (state, action) => {
			state.tenants = action.payload;
			state.sysTenant.haveTenant = true;
		},
		ClearTenants: (state) => {
			state.tenants = initialState.tenants;
			state.sysTenant = initialState.sysTenant;
		},
		SetHaveTenant: (state, action) => {
			state.sysTenant.haveTenant = action.payload;
		},
		SetHaveMultiTenant: (state, action) => {
			state.sysTenant.haveMultiTenant = action.payload;
		},
	},
});

// Exporting all the actions
export const { SetTenants, ClearTenants, SetHaveTenant, SetHaveMultiTenant } =
	tenantsSlice.actions;

// Exporting the reducer
export default tenantsSlice.reducer;
