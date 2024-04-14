import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DownloadImages } from '../Utils/DownloadImages'

export default function Form({
  loading,
  handleShowOrigin,
  handleLoad,
  loadZip,
  vendor,
  promoData,
  setSelValue,
  loadCreating,
}) {
  const {
    register,
    handleSubmit,
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
        <select
          className="form-select"
          onChange={(e) => setSelValue(e.target.value)}
        >
          <option defaultValue={'DEFAULT'}>Open this select menu</option>
          {promoData &&
            promoData?.map((obj) => (
              <option key={obj.id} value={obj.tag}>
                {obj.name}
              </option>
            ))}
        </select>

        <label htmlFor="">Выберите Origin</label>
        <input
          className="form-control"
          type="file"
          multiple
          {...register('origin_images')}
          onChange={(e) => handleShowOrigin(e)}
        />
        {!loading && !loadCreating ? (
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
