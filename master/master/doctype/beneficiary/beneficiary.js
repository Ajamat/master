// Copyright (c) 2023, Ajamat and contributors
// For license information, please see license.txt



frappe.ui.form.on("Beneficiary", {
    refresh(frm) {
        frm.fields_dict["district"].get_query = function (doc) {
            return {
                filters: {
                    "state": 'Please select state',
                },
            };
        }
        frm.fields_dict["block"].get_query = function (doc) {
            return {
                filters: {
                    "district": 'Please select district',
                },
            };
        }
        frm.fields_dict["village"].get_query = function (doc) {
            return {
                filters: {
                    "block": 'Please select block',
                },
            };
        }


    },
    state: function (frm) {
        frm.fields_dict["district"].get_query = function (doc) {
            if (doc.state) {
                return {
                    filters: {
                        "state": doc.state,
                    },
                };
            } else {
                return { filters: { "state": 'Please select state', }, };
            }

        },
            frm.set_value('district', '')
        frm.fields_dict["block"].get_query = function (doc) {
            if (doc.district) {
                return {
                    filters: {
                        "district": doc.district,
                    },
                };
            } else {
                return { filters: { "district": 'Please select district', }, };
            }

        }
        frm.set_value('block', '')
        frm.fields_dict["village"].get_query = function (doc) {
            if (doc.block) {
                return {
                    filters: {
                        "block": doc.block,
                    },
                };
            } else {
                return { filters: { "block": 'Please select block', }, };
            }

        }
        frm.set_value('village', '')
    },
    district: function (frm) {
        frm.set_value('block', '')
    },
    block: function (frm) {
        frm.set_value('village', '')
    },
    date_of_birth: function(frm) {
        // Get date_of_birth
        var dob = frm.doc.date_of_birth;
        // Calculate update the 'age' field
        var age = calculateAgeFromDateOfBirth(dob);
        
        if (age >= 18) {
            frm.set_df_property('pan', 'reqd', 1);
        } else {
            frm.set_df_property('pan', 'reqd', 0);
        }
        
        frm.set_value('age', age);
        function calculateAgeFromDateOfBirth(dateOfBirth) {
            var today = new Date();
            var dob = new Date(dateOfBirth);
        
            var age = today.getFullYear() - dob.getFullYear();
        
            if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
                age--;
            }
        
            return age;
        }
    },
    pan: function(frm) {
        // Get the value of the PAN field
        
        var pan = frm.doc.pan;
        var panPattern = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

        if (!panPattern.test(pan) && pan.length >=10) {
            frappe.show_alert({message:'Please enter a valid PAN. ref:ABCDE1234E', indicator: 'yellow'});
            frappe.validated = 0;
        }
    }
    

});
