// Copyright (c) 2023, Ajamat and contributors
// For license information, please see license.txt

frappe.ui.form.on("Block", {
    refresh(frm) {
        frm.fields_dict["district"].get_query = function (doc) {
            return {
                filters: {
                    "state": 'Please select state',
                },
            };
        }
        // clear dependent dropdowns values
        //   frm.set_value('block_of_origin', '')
    },
    state: function (frm) {
        frm.fields_dict["district"].get_query = function (doc) {
            if (doc.state) {
                return {
                    filters: {
                        "state": doc.state,
                    },
                };
            }else{
                return {  filters: { "state": 'Please select state', }, };
            }

        }
        frm.set_value('district', '')
    }
});
