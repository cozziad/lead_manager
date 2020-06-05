import axios from "axios";
import { createMessage, returnErrors } from './messages';

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

// GET LEADS
export const getLeads = () => dispatch => {
    axios
        .get("http://127.0.0.1:8000/api/leads/")
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE LEADS
export const deleteLead = (id) => dispatch => {
    axios
        .delete(`http://127.0.0.1:8000/api/leads/${id}/`)
        .then(res => {
            dispatch(createMessage({ deleteLead: 'Lead Deleted' }));
            dispatch({
                type: DELETE_LEAD,
                payload: id
            });
        })
        .catch(err => console.log(err));
};

// ADD LEAD
export const addLead = (lead) => dispatch => {
    axios
        .post("http://127.0.0.1:8000/api/leads/", lead)
        .then(res => {
            dispatch(createMessage({ addLead: 'Lead Added' }));
            dispatch({
                type: ADD_LEAD,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};
