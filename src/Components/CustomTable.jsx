import React, { useState } from 'react';
import { Button, Table } from 'antd';
import viewicon from '../Assets/viewicon.png';
import editicon from '../Assets/editicon.png';
// const columns = [
//   {
//     title: 'S.No',
//     dataIndex: 's_no',
//     fixed: 'left',
//     width: 80,
//   },
//   Table.SELECTION_COLUMN,
//   {
//     title: 'EID',
//     fixed: 'left',
//     dataIndex: 'eid',
//   },
//   {
//     title: 'Client Name',
//     dataIndex: 'client_name',
//   },
//   {
//     title: 'Contact Person',
//     dataIndex: 'contact_person',
//   },
//   {
//     title: 'Country',
//     dataIndex: 'country',
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//   },
//   {
//     title: 'Action',
//     dataIndex: '',
//     key: 'x',
//     fixed: 'right',
//     width: 130,
//     render: () => <a><img src={viewicon} alt="view icon" />&nbsp;<img src={editicon} alt="edit icon" /></a>,
//   },
// ];
// const data = [];
// for (let i = 0; i < 5; i++) {
//   data.push({
//     key: i,
//     s_no: i + 1,
//     eid: `EID${i}`,
//     client_name: `earthood`,
//     contact_person: `Edward King`,
//     country: ` London${i}`,
//     status: `status`,
//     action: `action`,
//   });
// }
const CustomTable = (props) => {



  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className='container'>
      <div className="row">
        <div className="col-12 border-2 border border-light-subtle p-0 rounded-3">
          <div className="d-flex justify-content-between align-items-center p-2 bg-white border-0 shadow-sm rounded-top-3">
            {/* select unselect */}
            <div className=''>
              <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                Unselect
              </Button>
              <span style={{ marginLeft: 8, }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
              </span>
            </div>
            {/* search section */}
            <div>
            <input className="form-control me-2 border-1 bg-light" type="search" placeholder="Search..." aria-label="Search" />
            </div>
          </div>

          <Table rowSelection={rowSelection} columns={props.columns} dataSource={props.data} scroll={{ x: 1300, }}  />
          {/* pagination={{position: [top, bottom],}} */}
        </div>
      </div>
    </div>

  );
};
export default CustomTable;