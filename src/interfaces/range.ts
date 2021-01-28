/*
 * @Author: 孙旭鹏
 * @Date: 2020-03-21 12:32:44
 * @LastEditTime: 2020-04-08 20:03:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \labs-fronted\src\interfaces\range.ts
 */

import { PAGE_SIZE } from './common';

export interface RangeModel {
  /**
   * 场地编码
   */
  rangeCode: string;
  /**
   * 场地名称
   */
  rangeName: string;
  /**
   * 场地位置
   */
  rangeLocation: string;
  /**
   * 场地状态
   */
  status: number;
  /**
   * 场地状态描述
   */
  statusDesc: string;
  /**
   * 关闭原因
   */
  closeReason: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 创建时间
   */
  createdAt: string;
  /**
   * 创建人
   */
  createdBy: string;
  /**
   * 更新时间
   */
  updatedAt: string;
  /**
   * 更新人
   */
  updatedBy: string;
}

export interface RangeEditModel {
  //场地编码
  rangeCode?: string;
  //场地名称
  rangeName?: string;
  //场地位置
  rangeLocation?: string;
  //场地状态
  status?: number;
  //状态描述
  statusDesc: string;
  //关闭原因
  closeReason?: string;
  //描述
  description?: string;
  //创建时间
  createdAt: string;
  //创建人
  createdBy: string;
  //更新时间
  updatedAt: string;
  //更新人
  updatedBy: string;
}

export interface RangeSearchProps {
  //场地名称
  rangeName?: string;
  //场地位置
  rangeLocation?: string;
  //场地状态
  status?: number;
  //页数
  page?: number;
  //总页数
  pageSize?: number;
}

export const defaultRangeSearchProps: RangeSearchProps = {
  rangeName: undefined,
  page: 1,
  pageSize: PAGE_SIZE,
};
