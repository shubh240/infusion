const { SELECT_Q, INSERT_Q, UPDATE_Q } = require('../../../../utils/SQLWorker');
const { sendResponse, translateMsg } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const SECRET = CryptoJS.enc.Utf8.parse(process.env.KEY);
const IV = CryptoJS.enc.Utf8.parse(process.env.KEY);
const moment = require('moment');
const con = require('../../../../config/database');
const common = require('../../../../utils/common');
const { PER_PAGE_TEN } = require('../../../../config/constants');


//////////////////////////////////////////////////////////////////////
//                            Social API                              //
//////////////////////////////////////////////////////////////////////


let Social = {

    addPost: async (req, res) => {
        try {
            const { body } = req;

            let sql = `INSERT INTO tbl_post (title, author,description) VALUES (?,?,?)`;
            let values = [body?.title, body?.author, body?.description];
            await INSERT_Q(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "add_post_success" });
        } catch (e) {
            return sendResponse(req, res, 500, '0', { keyword: "something_went_wrong" }, e?.message);
        }
    },

    postListing: async (req, res) => {
        try {
            let { body } = req;
            let searching = ""

            if (body?.search !== undefined) {
                searching = ` and (title LIKE '%${body?.search}%' or author LIKE '%${body?.search}%')`;
            }

            if (body.page == '0' || body.page == undefined) {
                body.page = 1;
            }

            let per_page = PER_PAGE_TEN;
            let limit = ((body.page - 1) * PER_PAGE_TEN);

            let postDetails = await SELECT_Q(`select * ,${PER_PAGE_TEN} as per_page,
            (select count(*) from  tbl_post where is_deleted = 0) as post_count   
            from tbl_post where is_deleted=0 ${searching} limit ${per_page} OFFSET ${limit} `, false);

            if (postDetails?.[0]) {
                postDetails = postDetails.map(post => {
                    return {
                        ...post,
                        created_at: new Date(post.created_at).toLocaleDateString('en-GB'),
                        updated_at: new Date(post.updated_at).toLocaleDateString('en-GB')
                    };
                });

                return sendResponse(req, res, 200, '1', { keyword: "startup_list_found", components: {} }, postDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (error) {
            console.log('error.message :', error.message);
            return sendResponse(req, res, 200, '0', { keyword: "startup_list_failed", components: {} }, error.message);
        }
    },

    editPost: async (req, res) => {
        try {
            const { body } = req;
            let post_id = req.params.id;

            let sql = `UPDATE tbl_post SET title = ?, author = ?, description = ? WHERE id = ? `;

            let values = [
                body?.title,
                body?.author,
                body?.description,
                post_id
            ];

            await UPDATE_Q(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "edit_startup_success", components: {} });
        } catch (e) {
            return sendResponse(req, res, 500, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    deleteStartUp: async (req, res) => {
        try {
            let { body } = req;
            let startup_id = body?.id;

            let sql = `UPDATE tbl_startup SET is_deleted = true WHERE id = $1 RETURNING *`
            let values = [startup_id]
            await UPDATE_Q(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "delete_startup", components: {} });
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_delete_startup", components: {} }, e?.message);
        }
    },
}


module.exports = {
    Social
};