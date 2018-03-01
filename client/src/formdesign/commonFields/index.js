export const commonFields = [
  {
    fieldtitle: '姓名',
    fieldname: 'xm',
    fieldlength: '20',
    required: '1',
    type: 'input'
  },
  {
    fieldtitle: '备注',
    fieldname: 'bz',
    fieldlength: '2000',
    required: '0',
    type: 'textarea'
  },
  {
    fieldtitle: '性别',
    fieldname: 'xb',
    fieldlength: '5',
    required: '1',
    type: 'radio',
    options: ['男', '女']
  },
  {
    fieldtitle: '经营范围',
    fieldname: 'jyfw',
    fieldlength: '500',
    required: '1',
    type: 'checkbox',
    options: ['农业产品', '零售食品', '保健品', '电子产品', '化妆品']
  },
  {
    fieldtitle: '从业人数',
    fieldname: 'cyrs',
    fieldlength: '500',
    required: '1',
    type: 'select',
    options: ['小于50人', '50~99人', '100~499人', '500~1999人', '2000人以上']
  }
]
