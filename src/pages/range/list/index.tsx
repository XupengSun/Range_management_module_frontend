
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {
  RangeModel,
  RangeEditModel,
  RangeSearchProps,
  defaultRangeSearchProps,
} from '@/interfaces/range';
import CustomTable from '@/components/CustomTable';
import { compose, withState } from 'recompose';
import { RangeService } from '@/services/range.service';
import Loading from '@/components/Loading';
import { Divider, Modal } from 'antd';
const CommonModal = React.lazy(() => import('@/components/CommonModal'));
import RangeForm from './RangeForm';
import { ButtonItem } from '@/interfaces/component';
import SearchFilter from './SearchFilter';
export interface RangePageProps {
  rangeService: RangeService;
  selectedRowKeys: string[];
  selectRow: (selectedRowKeys: string[]) => void;

  searchProps: RangeSearchProps;
  setSearchProps: (searchProps: RangeSearchProps) => void;

  range?: RangeEditModel;
  setRange: (range?: RangeEditModel) => void;

  visible: boolean;
  setVisible: (visible: boolean) => void;
}

@inject('rangeService')
@observer
class RangePage extends React.Component<RangePageProps> {
  private columns = [
    { title: '场地编码', dataIndex: 'rangeCode' },
    { title: '场地名称', dataIndex: 'rangeName' },
    { title: '位置', dataIndex: 'rangeLocation' },
    { title: '状态编码', dataIndex: 'status' },
    { title: '状态描述', dataIndex: 'statusDesc' },
    { title: '更新时间', dataIndex: 'updatedAt' },
    {
      title: '操作',
      render: (_: any, record: RangeModel) => (
        <>
          <a
            onClick={() => {
              this.props.setRange({
                ...record,
              });
              this.props.setVisible(true);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              this.handleDelete([record.rangeCode]);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  public componentDidMount() {
    this.props.rangeService.fetchPageData(this.props.searchProps);
  }

  public render() {
    const { selectRow, selectedRowKeys, rangeService } = this.props;
    const {
      pageData: { list, page, total },
      loading,
    } = rangeService.store;

    const buttons: ButtonItem[] = [
      {
        text: '新增',
        icon: 'icon-xinzeng',
        type: 'default',
        onClick: () => {
          this.props.setRange(undefined);
          this.props.setVisible(true);
        },
      },
      {
        text: '删除',
        icon: 'icon-xinzeng',
        disabled: this.props.selectedRowKeys.length === 0,
        type: 'primary',
        onClick: () => this.handleDelete(this.props.selectedRowKeys),
      },
    ];

    return (
      <>
        <CustomTable
          loading={loading}
          columns={this.columns}
          buttons={buttons}
          dataSource={list}
          current={page}
          total={total}
          genRowKey={(record: RangeModel) => `${record.rangeCode}`}
          onPagination={(current: number) => {
            const searchProps = {
              ...this.props.searchProps,
              page: current,
            };
            rangeService.fetchPageData(searchProps);
          }}
          onRow={(record: RangeModel) => ({
            onClick: () => selectRow([`${record.rangeCode}`]),
          })}
          rowSelection={{
            columnTitle: '选择',
            selectedRowKeys,
            onChange: (keys: string[]) => selectRow(keys),
          }}
        >
          <SearchFilter
            searchProps={this.props.searchProps}
            changeSearchProps={props => {
              this.props.setSearchProps({
                ...this.props.setSearchProps,
                ...props,
              });
            }}
            onSearch={() => {
              rangeService.fetchPageData(this.props.searchProps);
            }}
          />
        </CustomTable>

        <React.Suspense fallback={<Loading />}>
          <CommonModal
            title={!!this.props.range ? '修改场地' : '新增场地'}
            visible={this.props.visible}
            setVisible={this.props.setVisible}
          >
            <RangeForm
              saving={loading}
              detailData={this.props.range}
              onClose={() => this.props.setVisible(false)}
              onSubmit={this.handleSave}
            />
          </CommonModal>
        </React.Suspense>
      </>
    );
  }

  private handleDelete = (codeList: string[]) => {
    if (!codeList || codeList.length === 0) {
      return;
    }

    const modal = Modal.confirm({
      centered: true,
      title: `您确定要删除选定的${codeList.length}个场地吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        modal.update({
          okButtonProps: {
            loading: true,
          },
        });
        const result = await this.props.rangeService.delete(codeList);
        if (result) {
          this.props.rangeService.fetchPageData({
            ...this.props.searchProps,
            page: 1,
          });
          this.props.selectRow([]);
        }
      },
    });
  };

  private handleSave = (data: RangeEditModel) => {
    let result: Promise<boolean>;
    if (this.props.range) {
      result = this.props.rangeService.update({
        ...data,
        rangeCode: this.props.range.rangeCode,
      });
    } else {
      result = this.props.rangeService.add(data);
    }

    result.then(() => {
      this.props.rangeService.fetchPageData(this.props.searchProps);
      this.props.setVisible(false);
    });
  };
}

export default compose(
  withState('selectedRowKeys', 'selectRow', []),
  withState('searchProps', 'setSearchProps', defaultRangeSearchProps),
  withState('range', 'setRange', undefined),
  withState('visible', 'setVisible', false),
)(RangePage);
