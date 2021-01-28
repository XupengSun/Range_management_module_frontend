import * as React from 'react';
import { Input, Button, Select } from 'antd';
import styles from './index.scss';
import { RangeSearchProps } from '@/interfaces/range.ts';
const { Option } = Select;
interface SearchFilterProps {
  searchProps: RangeSearchProps;
  changeSearchProps: (searchProps: RangeSearchProps) => void;
  onSearch: () => void;
}

export default class SearchFilter extends React.PureComponent<SearchFilterProps> {
  render() {
    const { onSearch, changeSearchProps } = this.props;
    return (
      <div className={styles.filterPanel}>
        <div className={styles.filterItem}>
          <span className={styles.label}>场地名称：</span>
          <Input
            allowClear={true}
            placeholder="请输入场地名称"
            onChange={e => changeSearchProps({ rangeName: e.target.value })}
          />
        </div>
        <div className={styles.filterItem}>
          <span className={styles.label}>场地位置：</span>
          <Input
            allowClear={true}
            placeholder="请输入场地位置"
            onChange={e => changeSearchProps({ rangeLocation: e.target.value })}
          />
        </div>
        <div className={styles.filterItem}>
          <span className={styles.label}>场地状态：</span>
          <Select
            placeholder="选择场地状态"
            onChange={(e: any) => changeSearchProps({ status: e })}
          >
            <Option value={1}>未开始</Option>
            <Option value={2}>进行中</Option>
            <Option value={3}>已结束</Option>
          </Select>
          ,
        </div>
        <Button type="primary" onClick={onSearch}>
          查询
        </Button>
      </div>
    );
  }
}
