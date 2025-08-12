import { Table } from '@mui/material'
import React from 'react'
import UserInfoTable from './PractitionerDash/Table/UserInfoTable'
import './PractitionerDash/MainDash/MainDash.css'

export const AdminDash = () => {
  return (
      <div className='MainDash'>
          <div className="top-bar" style={{marginBottom:"30px"}}>
              <h1>注册请求</h1>
          </div>
          <UserInfoTable/>

      </div>

  )
}
