import {Breadcrumb, Button, Card, Form, Input, message, Radio, Select, Space, Upload} from 'antd'
import {Link, useSearchParams} from 'react-router-dom'
import './index.scss'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from "react-quill";
import {useEffect, useRef, useState} from "react";
import {createArticleApi, getArticleByIdApi, updateArticleApi} from "@/apis/article";
import {PlusOutlined} from "@ant-design/icons";
import {useChannel} from "@/hooks/useChannel";


const {Option} = Select

const Publish = () => {
  const {channelList} = useChannel();

  // 提交表单
  const onFinish = async (formValue) => {
    // 校验封面类型是否和实际的图片列表相同
    if (imageList.length !== imageType) {
      message.warning('封面类型和图片数量不匹配')
      return
    }
    const {title, content, channel_id} = formValue;
    const params = {
      title,
      content,
      cover: {
        type: imageType,
        // 新增时这样取
        images: imageList.map(item => {
          if(item.response){
            return item.response.data.url
          }else {
            return item.url
          }
        })
      },
      channel_id: channel_id
    }
    // 新增或者编辑
    if(articleId){
      await updateArticleApi(params,articleId)
    }else {
      await createArticleApi(params)
    }
    
    message.success(`${articleId ? '编辑文章成功' : '发布文章成功'}`)
  }

  // 如果当前为三图模式，已经完成了上传，选择单图只显示一张，再切换到三图继续显示三张。
  const cacheImageList = useRef([])
  const [imageList, setImageList] = useState([])
  const onUploadChange = (value) => {
    cacheImageList.current = value.fileList
  }

  // 切换图片封面
  const [imageType, setImageType] = useState(0)
  const onRadioChange = (event) => {
    const type = event.target.value;
    setImageType(type)
    if (type === 1) {
      // 单图，截取第一张展示
      const imgList = cacheImageList.current[0] ? [cacheImageList.current[0]] : []
      setImageList(imgList)
    } else if (type === 3) {
      // 三图，取所有图片展示
      setImageList(cacheImageList.current)
    }
  }

  // 回填数据
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  const [form] = Form.useForm();

  useEffect(() => {
    const getArticleDetail = async () => {
      const res = await getArticleByIdApi(articleId);
      form.setFieldsValue({
        ...res.data,
        type: res.data.cover.type,

      })
      setImageType(res.data.cover.type)
      setImageList(res.data.cover.images.map(url => {
        return {url}
      }))
    }
    // 只有在有id时才调用
    if (articleId) {
      getArticleDetail()
    }
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            {title: <Link to={'/'}>首页</Link>},
            {title: `${articleId ? '编辑文章' : '发布文章'}`},
          ]}
          />
        }
      >
        <Form
          labelCol={{span: 4}}
          wrapperCol={{span: 16}}
          initialValues={{type: 0}}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{required: true, message: '请输入文章标题'}]}
          >
            <Input placeholder="请输入文章标题" style={{width: 400}}/>
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{required: true, message: '请选择文章频道'}]}
          >
            <Select placeholder="请选择文章频道" style={{width: 400}}>
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              {/* eslint-disable-next-line react/jsx-no-undef */}
              <Radio.Group onChange={onRadioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 &&
              <Upload
                listType="picture-card"
                showUploadList
                name="image"
                action={'http://geek.itheima.net/v1_0/upload'}
                onChange={onUploadChange}
                maxCount={imageType}
                multiple={imageType > 1}
                fileList={imageList}
              >
                <div style={{marginTop: 8}}>
                  <PlusOutlined/>
                </div>
              </Upload>
            }
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{required: true, message: '请输入文章内容'}]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />

          </Form.Item>

          <Form.Item wrapperCol={{offset: 4}}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '编辑文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish