import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DownloadImages } from '../Utils/DownloadImages'

export default function Form({
  loading,
  handleShowPromo,
  handleShowOrigin,
  handleLoad,
  loadZip,
  vendor,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  return (
    <>
      <form className="form-group" onSubmit={handleSubmit(handleLoad)}>
        <label htmlFor="">Vendor</label>
        <input
          className="form-control"
          type="text"
          {...register('vendor')}
          required
        />

        <label htmlFor="">Выберите Tag </label>
        <input
          className="form-control"
          type="file"
          {...register('promo_image')}
          onChange={(e) => handleShowPromo(e)}
        />

        <label htmlFor="">Выберите Origin</label>
        <input
          className="form-control"
          type="file"
          multiple
          {...register('origin_images')}
          onChange={(e) => handleShowOrigin(e)}
        />
        {!loading ? (
          <button
            // onClick={(e) => handleLoad(e)}
            className="btn btn-warning w-50 large mt-3"
          >
            Преобразовать
          </button>
        ) : (
          <button className="btn btn-warning w-50 large mt-3" disabled>
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          </button>
        )}
        {loadZip && (
          <p
            className="btn btn-success ms-3"
            style={{ marginTop: '32px' }}
            onClick={() => DownloadImages(vendor)}
          >
            Загрузить
          </p>
        )}
      </form>
    </>
  )
}
