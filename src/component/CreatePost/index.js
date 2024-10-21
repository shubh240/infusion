import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as API from "../../utils/api.service"
import { TOAST_ERROR, TOAST_SUCCESS } from "../../utils/common.service";
const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log('location :', location?.state);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        clearErrors,
    } = useForm();

    const onSubmit = async (body) => {
        try {

            const { code, message } = location?.state ?
                await API.editPost(location?.state?.id , body)
                :
                await API.addPost(body);
            if (code === "1") {
                TOAST_SUCCESS(message);
                navigate('/dashboard')
            }
        } catch (error) {
            TOAST_ERROR(error.message);
        }
    };

    useEffect(() => {
        setValue('title', location?.state?.title);
        setValue('author', location?.state?.author);
        setValue('description', location?.state?.description);
    }, [location?.state]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-150">
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow bg-light" style={{ width: '600px' }}>
                <h2 className="mb-4 text-center">Create Post</h2>

                <div className="mb-4">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        id="title"
                        {...register('title', { required: 'Title is required' })}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input
                        type="text"
                        className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                        id="author"
                        {...register('author', { required: 'Author is required' })}
                    />
                    {errors.author && <div className="invalid-feedback">{errors.author.message}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="form-label">description</label>
                    <textarea
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        {...register('description', { required: 'Description is required' })}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2"> {location?.state ? 'Edit Post' : 'Add Post'}</button>
                    <div>
                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
