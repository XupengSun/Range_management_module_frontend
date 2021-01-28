import * as React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { FILTER_FORM_LAYOUT } from '@/constant';
import { Input, Select } from 'antd';
import styles from './index.scss';

import { compose, withState } from 'recompose';
import { RangeEditModel } from '@/interfaces/range';
import ModalButtons from '@/components/ModalButtons';

const { Option } = Select;

export interface UserFormProps extends FormComponentProps {
  saving: boolean;
  detailData?: RangeEditModel;
  onClose: () => void;
  onSubmit: (data: RangeEditModel) => void;
}

class UserForm extends React.PureComponent<UserFormProps> {
  public componentDidMount() {
    const { detailData } = this.props;
    if (detailData) {
      this.props.form.setFieldsValue(detailData);
    }
  }

  public handleSubmit = () => {
    this.props.form.validateFields({ force: true }, (error: Error, values: RangeEditModel) => {
      if (error) {
        return;
      }
      this.props.onSubmit(values);
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" className={styles.form}>
        <Form.Item label="场地名称" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('rangeName', {
            rules: [
              {
                required: true,
                message: '请输入场地名称',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="场地位置" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('rangeLocation', {
            rules: [
              {
                required: true,
                message: '请输入场地位置',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="场地状态" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('status', {
            rules: [
              {
                required: true,
                message: '请选择场地状态',
              },
            ],
          })(
            <Select placeholder="请选择场地状态">
              <Option value={1}>未开始</Option>
              <Option value={2}>进行中</Option>
              <Option value={3}>已结束</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="关闭原因" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('closeReason', {
            rules: [
              {
                required: false,
                message: '请输入',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item
          label="备注"
          style={{ width: '100%' }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          {getFieldDecorator('description')(<Input placeholder="请输入备注" />)}
        </Form.Item>
        <ModalButtons
          onCancel={this.props.onClose}
          onOk={this.handleSubmit}
          loading={this.props.saving}
        />
      </Form>
    );
  }
}

export default compose<
  {},
  {
    saving: boolean;
    detailData?: RangeEditModel;
    onClose: () => void;
    onSubmit: (data: RangeEditModel) => void;
  }
>(withState('vehicleList', 'changeVehicleList', []))(Form.create()(UserForm));
