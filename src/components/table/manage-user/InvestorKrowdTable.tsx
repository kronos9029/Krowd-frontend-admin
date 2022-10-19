import { ROLE_USER_TYPE } from '../../../@types/krowd/users';
import { useEffect } from 'react';
import { getUserKrowdList } from 'redux/slices/krowd_slices/users';
import { dispatch, RootState, useSelector } from 'redux/store';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'image', label: 'HÌNH ẢNH', align: 'left' },
  { id: 'fullName', label: 'HỌ VÀ TÊN', align: 'left' },
  { id: 'phoneNum', label: 'SỐ ĐIỆN THOẠI', align: 'left' },
  { id: 'email', label: 'EMAIL', align: 'left' },
  { id: 'createDate', label: 'NGÀY TẠO', align: 'left' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' },
  { id: '', label: 'THAO TÁC', align: 'center' }
];

export default function ProjectOwnerKrowdTable() {
  const { userLists, isLoading } = useSelector((state: RootState) => state.userKrowd);
  const { listOfUser: list } = userLists;

  useEffect(() => {
    dispatch(getUserKrowdList(ROLE_USER_TYPE.INVESTOR));
  }, [dispatch]);

  const getData = (): RowData[] => {
    if (!list) return [];
    return (
      list
        // .filter((_item) => _item.role.name === ROLE_USER_TYPE.PROJECT_MANAGER)
        .map<RowData>((_item, _idx) => {
          return {
            id: _item.id,
            items: [
              {
                name: 'idx',
                value: _idx + 1,
                type: DATA_TYPE.NUMBER
              },
              {
                name: 'image',
                value: _item.image,
                type: DATA_TYPE.IMAGE
              },
              {
                name: 'fullname',
                value: `${_item.firstName} ${_item.lastName}`,
                type: DATA_TYPE.TEXT
              },
              {
                name: 'phoneNum',
                value: _item.phoneNum,
                type: DATA_TYPE.TEXT
              },
              {
                name: 'email',
                value: _item.email,
                type: DATA_TYPE.TEXT
              },
              {
                name: 'createDate',
                value: _item.createDate,
                type: DATA_TYPE.TEXT
              },
              {
                name: 'status',
                value: `${_item.status}` === 'ACTIVE' ? 'Đang hoạt động' : 'Chưa hoạt động',
                type: DATA_TYPE.TEXT,
                textColor: `${_item.status}` === 'ACTIVE' ? 'green' : 'black'
              }
            ]
          };
        })
    );
  };

  return (
    <KrowdTable
      headingTitle="chủ sở hữu dự án"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      deleteRecord={() => {}}
    />
  );
}
