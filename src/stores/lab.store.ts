import { observable } from 'mobx';
import { LabModel } from '@/interfaces/lab';

import { Pagination, initalPaginationValue } from '@/interfaces/common';

export class LabStore {
  // 正在获取数据状态
  @observable
  public loading: boolean;

  // 部门分页列表数据
  @observable
  public pageData: Pagination<LabModel> = initalPaginationValue;
}
