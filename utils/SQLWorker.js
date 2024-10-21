const con = require("../config/database");

module.exports = {
    //////////////////////////////////////////////////////////////////////
    //                           DB  Workers                            //
    //////////////////////////////////////////////////////////////////////

    SELECT_Q: async (query, no_data_err = true) => {
        try {
            const [result] = await con.query(query);  
            if (result.length > 0) {
                return result; 
            } else {
                if (no_data_err) {
                    throw new Error("no_data");  
                } else {
                    return []; 
                }
            }
        } catch (err) {
            console.log('Error during SELECT:', err);
            throw err; 
        }
    },

    UPDATE_Q: async (query, data) => {
        try {
            const [result] = await con.query(query, data);
            return result;  
        } catch (err) {
            console.log('Error during UPDATE:', err);
            throw err;  
        }
    },

    INSERT_Q: async (query, data) => {
        try {
            const [result] = await con.query(query, data);
            return result.insertId; 
        } catch (err) {
            console.log('Error during INSERT:', err);
            throw err;  
        }
    },

    DELETE_Q: async (query) => {
        try {
            const [result] = await con.query(query); 
            return result; 
        } catch (err) {
            console.log('Error during DELETE:', err);
            throw err;  
        }
    },
};
