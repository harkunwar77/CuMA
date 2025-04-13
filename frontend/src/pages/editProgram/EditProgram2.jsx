import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import { useNavigate } from "react-router-dom";
import { KeyboardArrowLeftOutlined } from "@material-ui/icons";

const EditProgram = () => {
    const { programId } = useParams();
    const [formData, setFormData] = useState({ id: programId, name: '' });
    const [responseMsg, setResponseMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/updatePrograms', formData);
            setResponseMsg(response.data.success || response.data.error);
        } catch (error) {
            console.error('Error updating Program:', error);
            setResponseMsg('Error updating Program');
        }
    };

    return (
        <React.Fragment>
            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4 mb-4">
                <h3><KeyboardArrowLeftOutlined onClick={goBack} />Edit Program</h3>
                <div className="row mt-3 mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <form className="row" onSubmit={handleSubmit}>
                            <input type="hidden" name="id" value={formData.id} />

                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 mt-3">
                                <label>Name<span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Program Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="mt-3">
                                <Button type="submit" className={classes.primary}>Update Program</Button>

                            </div>
                        </form>
                    </div>
                </div>
                {responseMsg && (
                    <div className="col-3">
                        <div className="alert alert-success">{responseMsg}</div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default EditProgram;
