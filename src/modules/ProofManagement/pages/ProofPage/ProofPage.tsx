/* eslint-disable import/named */
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import useSorting from 'src/modules/Share/hooks/useSorting'
import path from 'src/modules/Share/constants/path'
import InputSearch from 'src/modules/Share/components/InputSearch'
import { FormFilterProofSchema, FormFilterProofType } from '../../utils'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PopoverCustom from 'src/modules/Share/components/Popover'
import { URLSearchParamsInit, createSearchParams, useNavigate } from 'react-router-dom'
import { isEmpty, omitBy } from 'lodash'
import Button from 'src/modules/Share/components/Button'
import Pagination from 'src/modules/Share/components/Pagination'
import { GetAllProofsQuery } from '../../services'
import useQueryProofConfig from '../../hooks/useQueryProofConfig'
import ProofTable from '../../components/ProofTable'
import FilterProof from '../../components/FilterProof'

const ProofPage = () => {
  const navigate = useNavigate()

  const queryProofConfig = useQueryProofConfig()

  const SortProof = useSorting({ queryConfig: queryProofConfig, pathname: path.proof })

  const getAllProofQuery = new GetAllProofsQuery()
  const proof = getAllProofQuery.fetch()

  const FilterProofForm = useForm<FormFilterProofType>({
    resolver: yupResolver(FormFilterProofSchema)
  })

  const handleSubmitFormFilter = FilterProofForm.handleSubmit((data) => {
    const config = {
      ...queryProofConfig,
      page: 1,
      status: data.status,
      type: data.type,
      search: data.search
    }
    navigate({
      pathname: path.proof,
      search: createSearchParams(omitBy(config, isEmpty) as URLSearchParamsInit).toString()
    })
  })

  const handleResetFormFilter = () => {
    FilterProofForm.resetField('search')
    FilterProofForm.resetField('status')
    FilterProofForm.resetField('type')
  }

  return (
    <Fragment>
      <Helmet>
        <title>Proofs</title>
        <meta name='description' content='Proofs Page'></meta>
      </Helmet>
      <div className='flex justify-between items-center pt-[16px] pb-[40px] font-normal'>
        <form onSubmit={handleSubmitFormFilter}>
          <InputSearch
            classNameInput='bg-white border-[1px] border-gray-200 rounded-md h-[44px] w-[240px] outline-[#26C6DA] pl-8 pr-2 shadow-sm font-normal text-gray-600 placeholder:font-normal placeholder:text-[14px]'
            placeholder='Tìm kiếm minh chứng'
            name='search'
            register={FilterProofForm.register}
          />
        </form>
        <PopoverCustom
          renderPopover={
            <form onSubmit={handleSubmitFormFilter}>
              <FilterProof control={FilterProofForm.control} onResetForm={handleResetFormFilter} />
            </form>
          }
        >
          <Button classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
              />
            </svg>
            <span>Lọc</span>
          </Button>
        </PopoverCustom>
      </div>
      <ProofTable
        proof={proof}
        isLoading={getAllProofQuery.isLoading()}
        onSort={SortProof.handleSort}
        onEditProof={() => {}}
      />
      <Pagination
        queryConfig={queryProofConfig}
        pageSize={getAllProofQuery.getTotalPages()}
        pathname={path.proof}
        className='flex justify-end'
      />
    </Fragment>
  )
}

export default ProofPage
