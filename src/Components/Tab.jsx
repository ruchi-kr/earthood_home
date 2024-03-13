import React,{useState,useEffect} from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
// ant design components
import { Tabs,Table } from 'antd'
// api for fetching data
import { total_client_number_url} from '../config'

//figma icons 
import viewicon from '../Assets/viewicon.png';
import editicon from '../Assets/editicon.png';
// import vectorarrow from '../Assets/Vectorarrow.png'
import groupicon from '../Assets/Group 4.png'
import CustomTable from './CustomTable'
const Tab = () => {
    const [totalclients,setTotalclients] = useState(0)
    const[proposal_under_veri,setProposal_under_veri]= useState(0)
    const[proposal_under_modi,setProposal_under_modi]= useState(0)
    const fetchAllDashData = async () =>{
        const totalclientsdata = await axios.get(`${total_client_number_url}`);
        console.log(totalclientsdata)
        setTotalclients(totalclientsdata.dashboard.total_clients)
      
        // const proposal_under_veridata = await axios.get(`${prop_under_veri_number_url}`);
        setProposal_under_veri(totalclientsdata.data.dashboard.projects_under_verification)
      
        // const proposal_under_modidata = await axios.get(`${prop_under_modi_number_url}`);
        setProposal_under_modi(totalclientsdata.data.dashboard.project_reverted)
      }
      
      const columnstotalclient = [
        {
          title: 'S.No',
          dataIndex: 'key',
          fixed: 'left',
          width: 80,
        },
        {
          title: 'Client Name',
          dataIndex: 'client_name',
        },
        {
          title: 'Contact Person',
          dataIndex: 'contact_person',
        },
        {
          title: 'Country',
          dataIndex: 'country',
        },
        {
          title: 'Status',
          dataIndex: 'status',
        },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          fixed: 'right',
          width: 130,
          render: () => <a><img src={viewicon} alt="view icon" /> &nbsp;<img src={editicon} alt="edit icon" /></a>,
        },
      ];
      const columnsProposalTeam =[
        {
            title: 'S.No',
            dataIndex: 's_no',
            fixed: 'left',
            width: 80,
          },
          Table.SELECTION_COLUMN,
          {
            title: 'EID',
            fixed: 'left',
            dataIndex: 'eid',
          },
          {
            title: 'Client Name',
            dataIndex: 'client_name',
          },
          {
            title: 'Contact Person',
            dataIndex: 'contact_person',
          },
          {
            title: 'Country',
            dataIndex: 'country',
          },
          {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            fixed: 'right',
            width: 130,
            render: () => <a><img src={viewicon} alt="view icon" />&nbsp;<img src={editicon} alt="edit icon" /></a>,
          },
      ];
      useEffect(function(){
         fetchAllDashData()
      },[])
    return (
        <>
            <Tabs defaultActiveKey="1" centered 
            indicator={{ Backgroundcolor: '#07B6AF'}}>
                <Tabs.items tab={
                    <div className='border-1 borderlightgreen rounded-2 p-2 mx-3 text-center tab_dashboard_size bg-white shadow-sm'>
                        <img className='mb-3' src={groupicon} alt="icon" />
                        <p className='font14px textlightgreen text-capitalize'>Total Clients</p>
                        <p className='textcolorblue' style={{ fontSize: '35px' }}>{totalclients}</p>                      
                    </div>
                } key="1">
                   <CustomTable columns={columnstotalclient}/>
                </Tabs.items>
                <Tabs.items tab={
                    <div className='border-1 borderlightgreen rounded-2 p-2 mx-3 text-center tab_dashboard_size bg-white shadow-sm'>
                        <img className="mb-3" src={groupicon} alt="icon" />
                        <p className='font14px textlightgreen text-capitalize text'>proposal under verification</p>
                        <p className='textcolorblue' style={{ fontSize: '35px' }}>{proposal_under_veri}</p>
                    </div>
                } key="2">
                    <CustomTable columns={columnsProposalTeam}/>
                </Tabs.items>
                <Tabs.items tab={
                    <div className='border-1 borderlightgreen rounded-2 p-2 m-3 text-center tab_dashboard_size bg-white shadow-sm'>
                        <img className='mb-3' src={groupicon} alt="icon" />
                        <p className='font14px textlightgreen text-capitalize'>proposal under modification</p>
                        <p className='textcolorblue' style={{ fontSize: '35px' }}>{proposal_under_modi}</p>
                    </div>
                } key="3">
                    <CustomTable columns={columnsProposalTeam}/>
                </Tabs.items>
            </Tabs>
        </>
    )
}

export default Tab
